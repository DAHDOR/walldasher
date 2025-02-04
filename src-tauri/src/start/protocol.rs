use super::error::Error;
use reqwest::{header, Client};
use serde::Serialize;
use serde_json::Value;
use tauri::Manager;
use tokio::sync::Mutex;

pub type Start = Mutex<StartInner>;

#[derive(Default)]
pub struct StartInner {
    pub client: Client,
}

/// Builds a client given a token.
///
/// # Errors
///
/// This function will fail if the string has invalid values or if TLS cannot be initialized.
pub fn build_client(token: &str) -> Result<Client, Error> {
    let mut headers = header::HeaderMap::new();
    headers.insert(
        "Authorization",
        header::HeaderValue::from_str(&format!("Bearer {}", token))?,
    );
    let client = Client::builder().default_headers(headers).build()?;
    Ok(client)
}

pub async fn request<T: Serialize>(app: &tauri::AppHandle, body: &T) -> Result<Value, Error> {
    let res = app
        .state::<Start>()
        .lock()
        .await
        .client
        .post("https://api.start.gg/gql/alpha")
        .json(&body)
        .send()
        .await?
        .json::<Value>()
        .await?;
    Ok(res)
}

pub async fn request_client<T: Serialize>(client: &Client, body: &T) -> Result<Value, Error> {
    let res = client
        .post("https://api.start.gg/gql/alpha")
        .json(&body)
        .send()
        .await?
        .json::<Value>()
        .await?;
    Ok(res)
}

pub async fn data<T: Serialize>(app: &tauri::AppHandle, body: &T) -> Result<Value, Error> {
    let res = request(&app, &body).await?;

    if let Some(errors) = res.get("errors") {
        return Err(Error::Custom(format!("GraphQL errors: {:?}", errors)));
    }

    match res.get("data") {
        Some(data) => return Ok(data.clone()),
        None => return Err(Error::Custom("No data in response".to_string())),
    };
}
