use std::sync::PoisonError;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
    #[error("Reqwest error: {0}")]
    Reqwest(#[from] reqwest::Error),
    #[error("Invalid header value: {0}")]
    HeaderValue(#[from] reqwest::header::InvalidHeaderValue),
    #[error("Serde JSON error: {0}")]
    SerdeJson(#[from] serde_json::Error),
    #[error("Invalid key")]
    InvalidKey(String),
    #[error("Poison error: {0}")]
    Poison(String),
    #[error("Tauri store error: {0}")]
    TauriStore(#[from] tauri_plugin_store::Error),
    #[error("Error: {0}")]
    Custom(String),
}
#[derive(serde::Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
enum ErrorKind {
    Io(String),
    Reqwest(String),
    HeaderValue(String),
    SerdeJson(String),
    InvalidKey(String),
    Poison(String),
    TauriStore(String),
    Custom(String),
}
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = self.to_string();
        let error_kind = match self {
            Self::Io(_) => ErrorKind::Io(error_message),
            Self::Reqwest(_) => ErrorKind::Reqwest(error_message),
            Self::HeaderValue(_) => ErrorKind::HeaderValue(error_message),
            Self::SerdeJson(_) => ErrorKind::SerdeJson(error_message),
            Self::InvalidKey(_) => ErrorKind::InvalidKey(error_message),
            Self::Poison(_) => ErrorKind::Poison(error_message),
            Self::TauriStore(_) => ErrorKind::TauriStore(error_message),
            Self::Custom(_) => ErrorKind::Custom(error_message),
        };
        error_kind.serialize(serializer)
    }
}

impl<T> From<PoisonError<T>> for Error {
    fn from(err: PoisonError<T>) -> Self {
        Error::Poison(err.to_string())
    }
}
