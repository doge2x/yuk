use crate::Json;
use anyhow::anyhow;
use futures::prelude::*;
use log::info;
use mongodb::{
    bson::{self, doc, oid::ObjectId, DateTime},
    options::{FindOneAndUpdateOptions, ReturnDocument},
    Collection, Database,
};
use serde::{Deserialize, Serialize};
use std::fmt;
use std::{fmt::Display, str::FromStr};

#[derive(Debug, Deserialize, Serialize)]
struct Session {
    #[serde(rename = "_id")]
    id: ObjectId,
    username: String,
    exam_id: i64,
    last_post: DateTime,
}

#[derive(Debug, Deserialize, Serialize)]
struct Answer {
    session_id: ObjectId,
    problem_id: i64,
    result: Option<String>,
    context: Option<AnswerContext>,
    last_update: DateTime,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserAnswer {
    pub username: String,
    pub problem_id: i64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<Json>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub context: Option<AnswerContext>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AnswerContext {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub state: Option<i32>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct PostAnswer {
    pub problem_id: i64,
    pub result: Option<Json>,
    pub context: Option<AnswerContext>,
}

#[derive(Debug)]
pub struct UserToken(ObjectId);

impl FromStr for UserToken {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Self(
            ObjectId::parse_str(s).map_err(|_| anyhow!("invalid token"))?,
        ))
    }
}

impl Display for UserToken {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

fn json_to_string(json: Json) -> String {
    serde_json::to_string(&json).unwrap_or_else(|_| unreachable!())
}

fn string_to_json(s: String) -> Json {
    serde_json::from_str(&s).unwrap_or_else(|_| unreachable!())
}

pub struct Server {
    // FIXME: used for bulk_update
    db: Database,
    sessions: Collection<Session>,
    answers: Collection<Answer>,
}

impl Server {
    pub fn new(db: Database) -> Self {
        Self {
            sessions: db.collection("sessions"),
            answers: db.collection("answers"),
            db,
        }
    }

    pub async fn login(&self, username: String, exam_id: i64) -> anyhow::Result<UserToken> {
        info!("login: {}, {}", username, exam_id);
        let Session { id, .. } = self
            .sessions
            .find_one_and_update(
                doc! {
                    "username": &username,
                    "exam_id": exam_id,
                },
                doc! { "$set": { "last_post": DateTime::MIN } },
                FindOneAndUpdateOptions::builder()
                    .return_document(ReturnDocument::After)
                    .upsert(true)
                    .build(),
            )
            .await?
            .expect("no return document");
        Ok(UserToken(id))
    }

    pub async fn update_answer(
        &self,
        token: UserToken,
        answers: Vec<PostAnswer>,
    ) -> anyhow::Result<(i64, DateTime)> {
        let new_post = DateTime::now();
        let Session {
            id: session_id,
            exam_id,
            last_post,
            ..
        } = self
            .sessions
            .find_one_and_update(
                doc! { "_id": token.0 },
                doc! { "$set": { "last_post": new_post } },
                None,
            )
            .await?
            .ok_or_else(|| anyhow!("undefined token"))?;
        info!("update: {}, {} => {}", token, last_post, new_post);
        if !answers.is_empty() {
            // FIXME: [bulk_update](https://jira.mongodb.org/browse/RUST-531)
            let updates = answers
                .into_iter()
                .map(
                    |PostAnswer {
                         problem_id,
                         result,
                         context,
                     }| {
                        #[derive(Debug, Serialize)]
                        struct Set {
                            #[serde(skip_serializing_if = "Option::is_none")]
                            result: Option<String>,
                            #[serde(
                                rename = "context.state",
                                skip_serializing_if = "Option::is_none"
                            )]
                            context_state: Option<i32>,
                            last_update: DateTime,
                        }
                        let set = bson::to_bson(&Set {
                            result: result.map(json_to_string),
                            context_state: context.map(|ctx| ctx.state).flatten(),
                            last_update: new_post,
                        })
                        .unwrap_or_else(|_| unreachable!());
                        doc! {
                            "q": {
                                "session_id": session_id,
                                "problem_id": problem_id,
                            },
                            "u": {
                                "$set": set,
                            },
                            "upsert": true,
                            "multi": false,
                        }
                    },
                )
                .collect::<Vec<_>>();
            let command = doc! {
                "update": self.answers.name(),
                "updates": updates,
            };
            self.db.run_command(command, None).await?;
        }
        Ok((exam_id, last_post))
    }

    pub async fn fetch_answers(
        &self,
        exam_id: i64,
        start_time: DateTime,
    ) -> anyhow::Result<Vec<UserAnswer>> {
        #[derive(Debug, Deserialize)]
        struct Answer2 {
            username: String,
            problem_id: i64,
            #[serde(default)]
            result: Option<String>,
            #[serde(default)]
            context: Option<AnswerContext>,
        }

        Ok(self
            .answers
            .aggregate(
                [
                    doc! {
                        "$lookup": {
                            "from": self.sessions.name(),
                            "localField": "session_id",
                            "foreignField": "_id",
                            "as": "session",
                        },
                    },
                    doc! { "$unwind": "$session" },
                    doc! {
                        "$match": {
                            "session.exam_id": exam_id,
                            "last_update": {
                                "$gt": start_time,
                            },
                        },
                    },
                    doc! {
                        "$project": {
                            "username": "$session.username",
                            "problem_id": true,
                            "result": true,
                            "context": true,
                        },
                    },
                ],
                None,
            )
            .await?
            .try_collect::<Vec<_>>()
            .await?
            .into_iter()
            .map(|doc| {
                let Answer2 {
                    username,
                    problem_id,
                    result,
                    context,
                } = bson::from_bson(doc.into()).expect("invalid aggregate result");
                UserAnswer {
                    username,
                    problem_id,
                    result: result.map(string_to_json),
                    context,
                }
            })
            .collect())
    }
}
