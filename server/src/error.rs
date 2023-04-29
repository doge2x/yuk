use crate::types::UserToken;
use thisctx::WithContext;
use thiserror::Error;

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug, Error, WithContext)]
pub enum Error {
    #[error("Invalid name")]
    InvalidName,
    #[error("Invalid user token")]
    InvalidToken,
    #[error("Undefined exam '{0}'")]
    UndefinedExam(i64),
    #[error("Undefined user token '{0}'")]
    UndefinedToken(UserToken),
    #[error(transparent)]
    MongoDb(#[from] mongodb::error::Error),
    #[error(transparent)]
    AddrParse(#[from] std::net::AddrParseError),
}

impl From<Error> for jsonrpsee::types::ErrorObjectOwned {
    fn from(value: Error) -> Self {
        Self::owned(200, value.to_string(), None::<()>)
    }
}
