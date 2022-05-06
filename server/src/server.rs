use futures::prelude::*;
use mongodb::{bson::doc, options::UpdateOptions, Collection, Database};
use serde::{Deserialize, Serialize};
use serde_json::Value as Json;

#[derive(Debug, Deserialize, Serialize)]
struct Answer {
    username: String,
    exam_id: i64,
    problem_id: i32,
    result: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserAnswer {
    pub username: String,
    pub problem_id: i32,
    pub result: Json,
}

pub struct Server {
    answers: Collection<Answer>,
}

impl Server {
    pub fn new(db: Database) -> Self {
        Self {
            answers: db.collection("answers"),
        }
    }

    pub async fn update_answer(
        &self,
        exam_id: i64,
        UserAnswer {
            username,
            problem_id,
            result,
        }: UserAnswer,
    ) -> anyhow::Result<()> {
        self.answers
            .update_one(
                doc! {
                    "exam_id": exam_id,
                    "username": username,
                    "problem_id": problem_id,
                },
                doc! {
                    "$set": {
                        "result": serde_json::to_string(&result)?,
                    },
                },
                UpdateOptions::builder().upsert(true).build(),
            )
            .await?;
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
