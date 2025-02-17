use super::{
    client::{build, fetch, request, Start},
    error::Error,
    types::{
        event_players, phase_group_sets, tournament, tournaments, user_id, EventPlayers,
        PhaseGroupSets, Tournament, Tournaments, UserID,
    },
};
use graphql_client::GraphQLQuery;
use serde_json::{from_value, Value};
use tauri::{Manager, Runtime};
use tauri_plugin_store::StoreExt;

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
    let client = build(key)?;

    let body = UserID::build_query(user_id::Variables {});

    let res = request(&client, &body).await?;

    if let Some(errors) = res.get("errors") {
        return Err(Error::GraphQL(format!("GraphQL errors: {:?}", errors)));
    }

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

            app.state::<Start>().lock().await.client = client;

            Ok(id)
        }
        None => return Err(Error::Custom("No user ID in response".to_string())),
    }
}

/// Fetches the list of tournaments.
///
/// # Errors
///
/// This function will return an error if there is an issue with the request or response.
#[tauri::command]
pub async fn tournaments<R: Runtime>(app: tauri::AppHandle<R>) -> Result<Value, Error> {
    let body = Tournaments::build_query(tournaments::Variables {});

    let data = fetch(&app, &body).await?;

    Ok(data)
}

/// Fetches the list of matches for a tournament.
///
/// # Errors
///
/// This function will return an error if there is an issue with the request or response.
#[tauri::command]
pub async fn tournament<R: Runtime>(
    app: tauri::AppHandle<R>,
    slug: String,
) -> Result<Value, Error> {
    let body = Tournament::build_query(tournament::Variables { slug: Some(slug) });

    let data = fetch(&app, &body).await?;

    Ok(data)
}

/// Fetches the list of matches for a bracket.
///
/// # Errors
///
/// This function will return an error if there is an issue with the request or response.
#[tauri::command]
pub async fn bracket_matches<R: Runtime>(
    app: tauri::AppHandle<R>,
    id: i64,
) -> Result<Value, Error> {
    let body = PhaseGroupSets::build_query(phase_group_sets::Variables {
        phase_group_id: id.to_string(),
    });

    let data = fetch(&app, &body).await?;

    Ok(data)
}

/// Fetches the list of teams and players for an event.
///
/// # Errors
///
/// This function will return an error if there is an issue with the request or response.
#[tauri::command]
pub async fn event_players<R: Runtime>(app: tauri::AppHandle<R>, id: i64) -> Result<Value, Error> {
    let body = EventPlayers::build_query(event_players::Variables {
        event_id: id.to_string(),
    });

    let data = fetch(&app, &body).await?;

    Ok(data)
}

#[cfg(test)]
mod tests {
    use super::super::client::{Start, StartInner};
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

    async fn create_app_with_client() -> tauri::App<tauri::test::MockRuntime> {
        let app = create_app();

        let client = Client::default();

        app.manage(Start::new(StartInner { client }));

        let app_handle = app.handle().clone();

        let key = "a1f9a2bf90a62e3931df098c02ad7126";

        set_start_key(app_handle, key).await.unwrap();

        app
    }

    #[tokio::test]
    async fn test_set_start_key() {
        let app = create_app();

        let client = Client::default();
        app.manage(Start::new(StartInner { client }));

        let app_handle = app.handle().clone();

        let id = set_start_key(app_handle, "a1f9a2bf90a62e3931df098c02ad7126")
            .await
            .unwrap();
        assert_eq!(id, 2001252);
    }

    #[tokio::test]
    async fn test_tournaments_query() {
        let app = create_app_with_client().await;
        let tournaments = tournaments(app.handle().clone()).await.unwrap();
        println!("\nTournaments:\n{:?}", tournaments);
    }

    #[tokio::test]
    async fn test_tournament_query() {
        let app = create_app_with_client().await;
        let tournament = tournament(app.handle().clone(), "lvrl-e1".to_string())
            .await
            .unwrap();
        println!("\nTournament:\n{:?}", tournament);
    }

    #[tokio::test]
    async fn test_bracket_matches_query() {
        let app = create_app_with_client().await;
        let bracket_matches = bracket_matches(app.handle().clone(), 2050142)
            .await
            .unwrap();
        println!("\nBracket Matches:\n{:?}", bracket_matches);
    }

    #[tokio::test]
    async fn test_event_players_query() {
        let app = create_app_with_client().await;
        let event_players = event_players(app.handle().clone(), 892193).await.unwrap();
        println!("\nEvent Players:\n{:?}", event_players);
    }
}
