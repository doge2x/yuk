use crate::entity::*;
use sea_schema::migration::prelude::*;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m202205041451_initial"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(users::Entity)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(users::Column::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(users::Column::Name)
                            .string()
                            .not_null()
                            .unique_key(),
                    )
                    .to_owned(),
            )
            .await?;
        manager
            .create_table(
                Table::create()
                    .table(answers::Entity)
                    .if_not_exists()
                    .col(ColumnDef::new(answers::Column::UserId).integer().not_null())
                    .col(ColumnDef::new(answers::Column::ExamId).integer().not_null())
                    .col(
                        ColumnDef::new(answers::Column::ProblemId)
                            .integer()
                            .not_null(),
                    )
                    .col(ColumnDef::new(answers::Column::Result).json().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-answers-user_id")
                            .from_tbl(answers::Entity)
                            .from_col(answers::Column::UserId)
                            .to_tbl(users::Entity)
                            .to_col(users::Column::Id),
                    )
                    .primary_key(
                        Index::create()
                            .name("pk-answers")
                            .col(answers::Column::UserId)
                            .col(answers::Column::ExamId)
                            .col(answers::Column::ProblemId)
                            .primary(),
                    )
                    .to_owned(),
            )
            .await?;
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(users::Entity).if_exists().to_owned())
            .await?;
        manager
            .drop_table(Table::drop().table(answers::Entity).if_exists().to_owned())
            .await?;
        Ok(())
    }
}
