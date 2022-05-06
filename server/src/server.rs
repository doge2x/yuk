use anyhow::anyhow;
use futures::prelude::*;
use mongodb::{
    bson::{doc, oid::ObjectId, DateTime},
    options::UpdateOptions,
    Collection, Database,
};
use serde::{Deserialize, Serialize};
use serde_json::Value as Json;
use std::{
    fmt::{self, Display},
    str::FromStr,
    time::{Duration, SystemTime},
};

#[derive(Debug, Deserialize, Serialize)]
struct Session {
    username: String,
    exam_id: i32,
    expire_time: DateTime,
}

#[derive(Debug, Deserialize, Serialize)]
struct Answer {
    exam_id: i32,
    username: String,
    problem_id: i32,
    result: String,
}

#[derive(Clone, Copy)]
pub struct UserToken(ObjectId);

impl Display for UserToken {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0.to_hex())
    }
}

impl FromStr for UserToken {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        ObjectId::parse_str(s)
            .map(Self)
            .map_err(|_| anyhow!("invalid token"))
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserAnswer {
    pub username: String,
    pub problem_id: i32,
    pub result: Json,
}

pub struct Server {
    sessions: Collection<Session>,
    answers: Collection<Answer>,
}

impl Server {
    pub fn new(db: Database) -> Self {
        Self {
            sessions: db.collection("sessions"),
            answers: db.collection("answers"),
        }
    }

    pub async fn login(
        &self,
        username: String,
        exam_id: i32,
        dur: Duration,
    ) -> anyhow::Result<UserToken> {
        self.sessions
            .delete_many(
                doc! {
                    "username": &username,
                    "expire_time": {
                        "$lt": DateTime::from_system_time(SystemTime::now()),
                    },
                },
                None,
            )
            .await?;
        let id = self
            .sessions
            .insert_one(
                Session {
                    username,
                    exam_id,
                    expire_time: DateTime::from_system_time(SystemTime::now() + dur),
                },
                None,
            )
            .await?
            .inserted_id
            .as_object_id()
            .expect("not ObjectId");
        Ok(UserToken(id))
    }

    pub async fn update_answer(
        &self,
        token: UserToken,
        problem_id: i32,
        result: Json,
    ) -> anyhow::Result<()> {
        let Session {
            username, exam_id, ..
        } = self
            .sessions
            .find_one(
                doc! {
                    "_id": token.0,
                },
                None,
            )
            .await?
            .ok_or_else(|| anyhow!("invalid token"))?;
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

    pub async fn fetch_answers(&self, token: UserToken) -> anyhow::Result<Vec<UserAnswer>> {
        let Session { exam_id, .. } = self
            .sessions
            .find_one(
                doc! {
                    "_id": token.0,
                },
                None,
            )
            .await?
            .ok_or_else(|| anyhow!("invalid token"))?;
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
