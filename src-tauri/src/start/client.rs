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

/// Builds a reqwest client with the provided authorization token.
///
/// # Arguments
///
/// * `key` - A string slice that holds the authorization token or key.
///
/// # Errors
///
/// This function will fail if the string has invalid values or if TLS cannot be initialized.
pub fn build(key: &str) -> Result<Client, Error> {
    let mut headers = header::HeaderMap::new();
    headers.insert(
        "Authorization",
        header::HeaderValue::from_str(&format!("Bearer {}", key))?,
    );
    let client = Client::builder().default_headers(headers).build()?;
    Ok(client)
}

/// Sends a request to the start.gg API.
///
/// # Arguments
///
/// * `client` - A reference to the reqwest client.
/// * `body` - The body of the request to be serialized.
///
/// # Errors
///
/// This function will return an error if the request fails or if the response cannot be parsed.
pub async fn request<T: Serialize>(client: &Client, body: &T) -> Result<Value, Error> {
    let res = client
        .post("https://api.start.gg/gql/alpha")
        .json(&body)
        .send()
        .await?
        .json::<Value>()
        .await?;
    Ok(res)
}

/// Fetches data from the start.gg API using the provided request body and app handle.
///
/// # Arguments
///
/// * `app` - A reference to the Tauri app handle.
/// * `body` - The body of the request to be serialized.
///
/// # Errors
///
/// This function will return an error if the request fails, if the response cannot be parsed,
/// or if the response contains GraphQL errors.
pub async fn fetch<T: Serialize>(app: &tauri::AppHandle, body: &T) -> Result<Value, Error> {
    let res = request(&app.state::<Start>().lock().await.client, &body).await?;

    if let Some(errors) = res.get("errors") {
        return Err(Error::Custom(format!("GraphQL errors: {:?}", errors)));
    }

    match res.get("data") {
        Some(data) => return Ok(data.clone()),
        None => return Err(Error::Custom("No data in response".to_string())),
    };
}
