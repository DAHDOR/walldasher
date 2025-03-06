mod db;
mod relay;
mod rl;
mod start;
use reqwest::Client;
use rl::client::{connect_to_rl, RLClient, RLInner};
use serde_json::from_value;
use start::{
    client::{build, Start, StartInner},
    query::{bracket_matches, event_players, set_start_key, tournament, tournaments},
};
use tauri::Manager;
use tauri_plugin_store::StoreExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let port: u16 = 9527;
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init());

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
        }));
    }

    builder
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:test4.db", db::migrations::get_migrations())
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(move |app| {
            let store = app.store("store.json").unwrap();

            let client = match store.get("key") {
                Some(key) => build(key.as_str().unwrap_or_default()).unwrap_or_default(),
                None => Client::default(),
            };

            app.manage(Start::new(StartInner { client }));

            let url = match store.get("rl_url") {
                Some(url) => from_value::<String>(url).unwrap_or("localhost:49122".to_string()),
                None => "localhost:49122".to_string(),
            };

            store.set("rl_url", url);

            app.manage(RLClient::new(RLInner { handle: None }));

            let app_handle = app.handle().clone();
            tauri::async_runtime::spawn(relay::server::init(app_handle));

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            set_start_key,
            tournaments,
            tournament,
            bracket_matches,
            event_players,
            connect_to_rl
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
