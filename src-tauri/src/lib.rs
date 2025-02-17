mod db;
mod rl;
mod router;
mod start;
use reqwest::Client;
use start::{
    client::{build, Start, StartInner},
    query::{bracket_matches, event_players, set_start_key, tournament, tournaments},
};
use tauri::Manager;
use tauri_plugin_store::StoreExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let port: u16 = 9527;
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:test1.db", db::migrations::get_migrations())
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

            // TODO: el cliente panickea si falla la conexión. implementar reconexión
            tauri::async_runtime::spawn(rl::client::init());
            tauri::async_runtime::spawn(router::server::init());

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            set_start_key,
            tournaments,
            tournament,
            bracket_matches,
            event_players
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
