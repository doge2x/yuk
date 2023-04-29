use super::{JsonData, Server};
use crate::{error, types::*};
use futures::TryStreamExt;
use log::info;
use mongodb::bson::{self, doc, oid::ObjectId};
use serde::{Deserialize, Serialize};

#[async_trait::async_trait]
trait Migration {
    fn name(&self) -> &str;
    async fn up(&self, server: &Server) -> error::Result<()>;
}

struct M202205231231;

#[async_trait::async_trait]
impl Migration for M202205231231 {
    fn name(&self) -> &str {
        "m202205231231_bindata"
    }

    async fn up(&self, server: &Server) -> error::Result<()> {
        #[derive(Debug, Deserialize)]
        struct Answer2 {
            session_id: ObjectId,
            problem_id: i64,
            result: Option<String>,
        }

        // Convert strings to bindata.
        let updates = server
            .answers
            .aggregate(
                [doc! {
                    "$project": {
                        "session_id": true,
                        "problem_id": true,
                        "result": true,
                    },
                }],
                None,
            )
            .await?
            .map_ok(|d| bson::from_document::<Answer2>(d).expect("bad aggregate document"))
            .map_ok(
                |Answer2 {
                     session_id,
                     problem_id,
                     result,
                 }| {
                    let set = result
                        .map(|r| serde_json::from_str::<Json>(&r).unwrap())
                        .map(JsonData::se)
                        .map(|r| doc! {"result": r})
                        .unwrap_or_else(|| doc! {});
                    doc! {
                        "q": {
                            "session_id": session_id,
                            "problem_id": problem_id,
                        },
                        "u": { "$set": set },
                        "multi": false,
                    }
                },
            )
            .try_collect::<Vec<_>>()
            .await?;
        if !updates.is_empty() {
            let command = doc! {
                "update": server.answers.name(),
                "updates": updates,
            };
            server.db.run_command(command, None).await?;
        }

        // We must clear `problems` field in papers, since we
        // cannot deserialize them.
        // [https://github.com/bincode-org/bincode/issues/374]
        server
            .papers
            .update_many(doc! {}, doc! { "$set": { "problems": [] } }, None)
            .await?;

        Ok(())
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct DbMigration {
    idx: i32,
    name: String,
}

pub async fn migrate(server: &Server) -> error::Result<()> {
    let migrations: &[Box<dyn Migration>] = &[Box::new(M202205231231)];
    let coll = server.db.collection::<DbMigration>("migrations");
    let mut db_migrations = coll
        .find(doc! {}, None)
        .await?
        .try_collect::<Vec<_>>()
        .await?;
    // Check migrations.
    db_migrations.sort_by_key(|x| x.idx);
    for (a, b) in db_migrations.iter().zip(migrations.iter()) {
        assert_eq!(a.name, b.name())
    }
    if db_migrations.len() >= migrations.len() {
        return Ok(());
    }
    // Apply migrations.
    for m in &migrations[db_migrations.len()..] {
        info!("apply migration: {}", m.name());
        m.up(server).await?;
    }
    // Insert applied migrations.
    coll.insert_many(
        migrations
            .iter()
            .enumerate()
            .skip(db_migrations.len())
            .map(|(idx, m)| DbMigration {
                idx: idx as i32,
                name: m.name().to_owned(),
            }),
        None,
    )
    .await?;
    Ok(())
}
