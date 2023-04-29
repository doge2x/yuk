use crate::error;
use mongodb::bson::{doc, oid::ObjectId, Bson};
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, fmt};
use std::{fmt::Display, str::FromStr};
use thisctx::IntoError;

pub type Json = serde_json::Value;

#[derive(Debug, Deserialize)]
pub struct PostPaper {
    pub title: String,
    pub problems: Vec<Problem>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Problem {
    #[serde(rename = "problem_id")]
    pub id: i64,
    #[serde(flatten)]
    pub extra: HashMap<String, Json>,
}

#[derive(Clone, Debug, Serialize)]
pub struct UserAnswer {
    pub username: String,
    pub problem_id: i64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<Json>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub context: Option<AnswerContext>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AnswerContext {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub state: Option<i32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub msg: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct PostAnswer {
    pub problem_id: i64,
    pub result: Option<Json>,
    pub context: Option<AnswerContext>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct GetPaper {
    pub title: String,
    pub problems: Vec<Problem>,
}

#[derive(Clone, Copy, Debug)]
pub struct UserToken(ObjectId);

impl From<ObjectId> for UserToken {
    fn from(value: ObjectId) -> Self {
        Self(value)
    }
}

impl From<UserToken> for Bson {
    fn from(value: UserToken) -> Self {
        value.0.into()
    }
}

impl FromStr for UserToken {
    type Err = error::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Self(
            ObjectId::parse_str(s).map_err(|_| error::InvalidToken.build())?,
        ))
    }
}

impl Display for UserToken {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ListPaper {
    pub exam_id: i64,
    pub title: String,
}
