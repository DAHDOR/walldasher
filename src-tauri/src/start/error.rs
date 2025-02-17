#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Reqwest(#[from] reqwest::Error),
    #[error(transparent)]
    HeaderValue(#[from] reqwest::header::InvalidHeaderValue),
    #[error(transparent)]
    SerdeJson(#[from] serde_json::Error),
    #[error("Invalid key")]
    InvalidKey(String),
    #[error("Data too big")]
    TooBig(String),
    #[error("GraphQL errors: {0}")]
    GraphQL(String),
    #[error(transparent)]
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
    TooBig(String),
    GraphQL(String),
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
            Self::TooBig(_) => ErrorKind::TooBig(error_message),
            Self::GraphQL(_) => ErrorKind::GraphQL(error_message),
            Self::TauriStore(_) => ErrorKind::TauriStore(error_message),
            Self::Custom(_) => ErrorKind::Custom(error_message),
        };
        error_kind.serialize(serializer)
    }
}
