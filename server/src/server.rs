use crate::entity::*;
use anyhow::anyhow;
use sea_orm::{prelude::*, FromQueryResult, QuerySelect, Set};
use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    fmt,
    str::FromStr,
    time::{Duration, Instant},
};
use uuid::Uuid;

struct Session {
    user_id: i32,
    exam_id: i32,
    expire_time: Instant,
}

#[derive(Clone, Copy)]
pub struct UserToken(Uuid);

impl FromStr for UserToken {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Uuid::from_str(s)
            .map(Self)
            .map_err(|_| anyhow!("invalid token"))
    }
}

impl fmt::Display for UserToken {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

#[derive(Debug, FromQueryResult, Deserialize, Serialize)]
pub struct UserResult {
    pub username: String,
    pub problem_id: i32,
    pub result: Json,
}

pub struct Server {
    db: DatabaseConnection,
    sessions: HashMap<Uuid, Session>,
    threshold: usize,
}

impl Server {
    pub fn new(db: DatabaseConnection) -> Self {
        Self {
            db,
            sessions: HashMap::new(),
            threshold: 1024,
        }
    }

    pub fn gc(&mut self) {
        let now = Instant::now();
        self.sessions.retain(|_, v| v.expire_time > now);
    }

    pub fn check_gc(&mut self) {
        if self.sessions.len() > self.threshold {
            self.gc();
            self.threshold = self.sessions.len() * 2;
        }
    }

    pub async fn login(&mut self, username: String, exam_id: i32) -> anyhow::Result<UserToken> {
        self.check_gc();
        // NB: https://github.com/SeaQL/sea-query/pull/279
        let user_id = match users::Entity::find()
            .filter(users::Column::Name.eq(username.clone()))
            .one(&self.db)
            .await?
        {
            Some(users::Model { id, .. }) => id,
            None => {
                users::ActiveModel {
                    name: Set(username),
                    ..Default::default()
                }
                .insert(&self.db)
                .await?
                .id
            }
        };
        let mut token = Uuid::new_v4();
        while self.sessions.contains_key(&token) {
            token = Uuid::new_v4();
        }
        self.sessions.insert(
            token,
            Session {
                user_id,
                exam_id,
                expire_time: Instant::now() + Duration::from_secs(3600),
            },
        );
        Ok(UserToken(token))
    }

    pub async fn update_answer(
        &mut self,
        token: UserToken,
        problem_id: i32,
        result: Json,
    ) -> anyhow::Result<()> {
        let &Session {
            user_id, exam_id, ..
        } = self
            .sessions
            .get(&token.0)
            .ok_or_else(|| anyhow!("invalid token"))?;
        // NB: https://github.com/SeaQL/sea-query/pull/279
        if let Some(ent) = answers::Entity::find_by_id((user_id, exam_id, problem_id))
            .one(&self.db)
            .await?
        {
            let mut act = answers::ActiveModel::from(ent);
            act.result = Set(result);
            act.update(&self.db).await?;
        } else {
            answers::ActiveModel {
                user_id: Set(user_id),
                exam_id: Set(exam_id),
                problem_id: Set(problem_id),
                result: Set(result),
            }
            .insert(&self.db)
            .await?;
        }
        Ok(())
    }

    pub async fn fetch_answers(&self, token: UserToken) -> anyhow::Result<Vec<UserResult>> {
        let &Session { exam_id, .. } = self
            .sessions
            .get(&token.0)
            .ok_or_else(|| anyhow!("Invalid token"))?;
        Ok(answers::Entity::find()
            .filter(answers::Column::ExamId.eq(exam_id))
            .inner_join(users::Entity)
            .select_only()
            .column_as(users::Column::Name, "username")
            .column(answers::Column::ProblemId)
            .column(answers::Column::Result)
            .into_model::<UserResult>()
            .all(&self.db)
            .await?)
    }
}
