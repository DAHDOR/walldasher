use super::{
    error::Error,
    protocol::{build_client, data, request_client, Start},
};
use graphql_client::GraphQLQuery;
use serde_json::{from_value, Value};
use tauri::State;
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
    start: State<'_, Start>,
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
    use super::*;
    use reqwest::Client;
    use tauri::Manager;

    fn create_app() -> tauri::App<tauri::test::MockRuntime> {
        tauri::test::mock_builder()
            .plugin(tauri_plugin_shell::init())
            .plugin(tauri_plugin_store::Builder::new().build())
            .invoke_handler(tauri::generate_handler![set_start_key])
            .build(tauri::generate_context!())
            .expect("error while running tauri application")
    }

    #[tokio::test]
    async fn test_set_start_key() {
        let app = create_app();

        let client = Client::default();
        app.manage(Start::new(StartInner { client }));

        let app_handle = app.handle().clone();

        let id = set_start_key(
            app_handle,
            app.state::<Start>(),
            "a1f9a2bf90a62e3931df098c02ad7126",
        )
        .await
        .unwrap();

        assert_eq!(id, 2001252);
    }
}
