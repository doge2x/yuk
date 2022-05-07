use futures::prelude::*;
use mongodb::{bson::doc, Collection, Database};
use serde::{Deserialize, Serialize};
use serde_json::Value as Json;

#[derive(Debug, Deserialize, Serialize)]
struct Answer {
    username: String,
    exam_id: i64,
    problem_id: i64,
    result: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserAnswer {
    pub username: String,
    pub problem_id: i64,
    pub result: Json,
}

pub struct Server {
    db: Database,
    answers: Collection<Answer>,
}

impl Server {
    pub fn new(db: Database) -> Self {
        Self {
            answers: db.collection("answers"),
            db,
        }
    }

    // FIXME: [bulk_update](https://jira.mongodb.org/browse/RUST-531)
    pub async fn update_answer(
        &self,
        exam_id: i64,
        answers: Vec<UserAnswer>,
    ) -> anyhow::Result<()> {
        let updates = answers.into_iter().map(
            |UserAnswer {
                 username,
                 problem_id,
                 result,
             }| {
                doc! {
                    "q": {
                        "exam_id": exam_id,
                        "username": username,
                        "problem_id": problem_id,
                    },
                    "u": {
                        "$set": {
                            "result": serde_json::to_string(&result).unwrap_or_else(|_| unreachable!()),
                        },
                    },
                    "upsert": true,
                    "multi": false,
                }
            },
        ).collect::<Vec<_>>();
        let command = doc! {
            "update": self.answers.name(),
            "updates": updates,
        };
        self.db.run_command(command, None).await?;
        Ok(())
    }

    pub async fn fetch_answers(&self, exam_id: i64) -> anyhow::Result<Vec<UserAnswer>> {
        Ok(self
            .answers
            .find(
                doc! {
                    "exam_id": exam_id,
                },
                None,
            )
            .await?
            .try_collect::<Vec<_>>()
            .await?
            .into_iter()
            .map(
                |Answer {
                     username,
                     problem_id,
                     result,
                     ..
                 }| UserAnswer {
                    username,
                    problem_id,
                    result: serde_json::from_str(&result).unwrap_or_else(|_| unreachable!()),
                },
            )
            .collect())
    }
}
