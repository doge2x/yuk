mod m202205041451_initial;

pub use sea_schema::migration::prelude::*;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![Box::new(m202205041451_initial::Migration)]
    }
}
