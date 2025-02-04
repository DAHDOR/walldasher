use super::{
    error::Error,
    protocol::{build_client, data, request_client, Start},
};
use graphql_client::GraphQLQuery;
use serde_json::{from_value, Value};
use tauri::Manager;
use tauri_plugin_store::StoreExt;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/graphql/schema.graphql",
    query_path = "src/graphql/queries.graphql",
    response_derives = "Debug"
)]
struct UserID;

/// Sets the Start.gg client given a token. Returns the associated user ID.
///
/// # Errors
///
/// Fails if there is an error in the request or if the token is invalid.
#[tauri::command]
pub async fn set_start_key<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
    key: &str,
) -> Result<i64, Error> {
    let client = build_client(key)?;

    let body = UserID::build_query(user_id::Variables {});

    let res = request_client(&client, &body).await?;

    let data: user_id::ResponseData = match res.get("data") {
        Some(data) => match from_value(data.clone()) {
            Ok(data) => data,
            Err(e) => return Err(Error::SerdeJson(e)),
        },
        None => return Err(Error::InvalidKey("Invalid key".to_string())),
    };

    let user: user_id::UserIdCurrentUser = match data.current_user {
        Some(user) => user,
        None => return Err(Error::Custom("No user in response".to_string())),
    };

    match user.id {
        Some(id) => {
            let store = app.store("store.json")?;
            store.set("key", key.to_string());
            store.set("user_id", id.clone());

            let start = app.state::<Start>();
            start.lock().await.client = client;

            Ok(id)
        }
        None => return Err(Error::Custom("No user ID in response".to_string())),
    }
}

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/graphql/schema.graphql",
    query_path = "src/graphql/queries.graphql",
    response_derives = "Debug"
)]
struct Tournaments;

#[tauri::command]
pub async fn tournaments(app: tauri::AppHandle) -> Result<Value, Error> {
    let body = Tournaments::build_query(tournaments::Variables {});

    let data = data(&app, &body).await?;

    Ok(data)
}

#[cfg(test)]
mod tests {
    use super::super::protocol::{Start, StartInner};
    use super::set_start_key;
    use reqwest::Client;
    use tauri::Manager;

    #[tokio::test]
    async fn test_set_start_key() {
        let app = tauri::test::mock_app();
        let client = Client::new();
        app.manage(Start::new(StartInner { client }));
        let app_handle = app.handle().clone();
        let id = set_start_key::<tauri::test::MockRuntime>(
            app_handle,
            "a1f9a2bf90a62e3931df098c02ad7126",
        )
        .await
        .unwrap();
        assert_eq!(id, 2001252);
    }
}
