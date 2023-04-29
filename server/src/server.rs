mod migration;

use crate::{error, types::*};
use futures::prelude::*;
use mongodb::{
    bson::{self, doc, oid::ObjectId, Bson, DateTime},
    options::{FindOneAndUpdateOptions, ReturnDocument},
    Collection, Database,
};
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use thisctx::IntoError;

#[derive(Debug, Deserialize, Serialize)]
struct Session {
    #[serde(rename = "_id")]
    id: ObjectId,
    username: String,
    exam_id: i64,
    last_post: DateTime,
    msg: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct Answer {
    session_id: ObjectId,
    problem_id: i64,
    result: Option<JsonData>,
    context: Option<AnswerContext>,
    last_update: DateTime,
}

#[derive(Debug, Deserialize, Serialize)]
struct Paper {
    exam_id: i64,
    title: String,
    problems: Vec<BinProblem>,
}

#[derive(Debug, Deserialize, Serialize)]
struct BinProblem {
    id: i64,
    extra: JsonData,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(transparent)]
struct JsonData(bson::Binary);

impl JsonData {
    fn se<T: Serialize>(t: T) -> Self {
        Self(bson::Binary {
            subtype: bson::spec::BinarySubtype::Generic,
            bytes: serde_json::to_vec(&t).unwrap(),
        })
    }

    fn de<T: DeserializeOwned>(self) -> T {
        serde_json::from_slice(&self.0.bytes).unwrap()
    }
}

impl From<JsonData> for Bson {
    fn from(t: JsonData) -> Self {
        Bson::from(t.0)
    }
}

pub struct Server {
    // FIXME: used for bulk_update
    db: Database,
    sessions: Collection<Session>,
    answers: Collection<Answer>,
    papers: Collection<Paper>,
}

impl Server {
    pub fn new(db: Database) -> Self {
        Self {
            sessions: db.collection("sessions"),
            answers: db.collection("answers"),
            papers: db.collection("papers"),
            db,
        }
    }

    pub async fn migrate(&self) -> error::Result<()> {
        migration::migrate(self).await
    }

    pub async fn login(
        &self,
        username: String,
        exam_id: i64,
        msg: Option<String>,
    ) -> error::Result<UserToken> {
        #[derive(Debug, Serialize)]
        struct Session2 {
            last_post: DateTime,
            msg: Option<String>,
        }

        let Session { id, .. } = self
            .sessions
            .find_one_and_update(
                doc! {
                    "username": &username,
                    "exam_id": exam_id,
                },
                doc! {
                    "$set": bson::to_document(&Session2 {
                        last_post: DateTime::MIN,
                        msg,
                    }).unwrap()
                },
                FindOneAndUpdateOptions::builder()
                    .return_document(ReturnDocument::After)
                    .upsert(true)
                    .build(),
            )
            .await?
            .expect("no return document");
        Ok(id.into())
    }

    pub async fn update_paper(&self, exam_id: i64, paper: PostPaper) -> error::Result<()> {
        let PostPaper {
            title,
            mut problems,
        } = paper;
        problems.sort_by_key(|p| p.id);
        if let Some(old_paper) = self
            .papers
            .find_one(doc! {"exam_id": exam_id}, None)
            .await?
        {
            // Remove present problems.
            let mut slice = old_paper.problems.as_slice();
            problems.retain(|p| match slice.binary_search_by_key(&p.id, |p| p.id) {
                Ok(i) => {
                    slice = &slice[i + 1..];
                    false
                }
                Err(i) => {
                    slice = &slice[i..];
                    true
                }
            });
            // Extend problems.
            if !problems.is_empty() {
                let problems = problems
                    .into_iter()
                    .map(|Problem { id, extra }| {
                        doc! {
                            "id": id,
                            "extra":JsonData::se(&extra),
                        }
                    })
                    .collect::<Vec<_>>();
                self.papers
                    .update_one(
                        doc! { "exam_id": exam_id },
                        doc! { "$push": { "problems": { "$each": problems  } } },
                        None,
                    )
                    .await?;
            }
        } else {
            self.papers
                .insert_one(
                    Paper {
                        exam_id,
                        title,
                        problems: problems
                            .into_iter()
                            .map(|Problem { id, extra }| BinProblem {
                                id,
                                extra: JsonData::se(extra),
                            })
                            .collect(),
                    },
                    None,
                )
                .await?;
        }
        Ok(())
    }

    pub async fn list_papers(&self) -> error::Result<Vec<ListPaper>> {
        let papers = self
            .papers
            .aggregate(
                [doc! {
                    "$project": {
                        "exam_id": true,
                        "title": true,
                    },
                }],
                None,
            )
            .await?
            .map_ok(|d| bson::from_document::<ListPaper>(d).unwrap())
            .try_collect::<Vec<_>>()
            .await?;
        Ok(papers)
    }

    pub async fn get_paper(&self, exam_id: i64) -> error::Result<GetPaper> {
        let Paper {
            title, problems, ..
        } = self
            .papers
            .find_one(doc! {"exam_id": exam_id}, None)
            .await?
            .ok_or_else(|| error::UndefinedExam(exam_id).build())?;
        Ok(GetPaper {
            title,
            problems: problems
                .into_iter()
                .map(|BinProblem { id, extra }| Problem {
                    id,
                    extra: JsonData::de(extra),
                })
                .collect(),
        })
    }

    pub async fn update_answer(
        &self,
        token: UserToken,
        answers: Vec<PostAnswer>,
    ) -> error::Result<(i64, DateTime, Option<String>)> {
        let new_post = DateTime::now();
        let Session {
            id: session_id,
            exam_id,
            last_post,
            msg,
            ..
        } = self
            .sessions
            .find_one_and_update(
                doc! { "_id": token },
                doc! { "$set": { "last_post": new_post } },
                None,
            )
            .await?
            .ok_or(error::UndefinedToken(token))?;
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
                            result: Option<JsonData>,
                            #[serde(
                                rename = "context.state",
                                skip_serializing_if = "Option::is_none"
                            )]
                            context_state: Option<i32>,
                            #[serde(
                                rename = "context.msg",
                                skip_serializing_if = "Option::is_none"
                            )]
                            context_msg: Option<String>,
                            last_update: DateTime,
                        }
                        let (context_state, context_msg) =
                            context.map(|ctx| (ctx.state, ctx.msg)).unwrap_or_default();
                        let set = bson::to_document(&Set {
                            result: result.map(JsonData::se),
                            context_state,
                            context_msg,
                            last_update: new_post,
                        })
                        .unwrap();
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
        Ok((exam_id, last_post, msg))
    }

    pub async fn fetch_answers(
        &self,
        exam_id: i64,
        start_time: DateTime,
    ) -> error::Result<Vec<UserAnswer>> {
        #[derive(Debug, Deserialize)]
        struct Answer2 {
            username: String,
            problem_id: i64,
            #[serde(default)]
            result: Option<JsonData>,
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
            .map_ok(|doc| {
                let Answer2 {
                    username,
                    problem_id,
                    result,
                    context,
                } = bson::from_document(doc).expect("invalid aggregate result");
                UserAnswer {
                    username,
                    problem_id,
                    result: result.map(JsonData::de),
                    context,
                }
            })
            .try_collect::<Vec<_>>()
            .await?)
    }
}
