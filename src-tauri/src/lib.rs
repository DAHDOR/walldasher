// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod db;
mod start;
use reqwest::Client;
use start::{
    protocol::{build_client, Start, StartInner},
    query::{set_start_key, tournaments},
};
use tauri::Manager;
use tauri_plugin_store::StoreExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:test0.db", db::migrations::get_migrations())
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            let store = app.store("store.json").unwrap();

            let client = match store.get("key") {
                Some(key) => build_client(key.as_str().unwrap_or_default()).unwrap_or_default(),
                None => Client::default(),
            };

            app.manage(Start::new(StartInner { client }));

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![set_start_key, tournaments])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
