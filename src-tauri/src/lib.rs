mod db;
mod relay;
mod rl;
use relay::server::spawn_server;
use rl::client::{connect_to_rl, connect_to_rl_without_validation, RLClient, RLInner};
use tauri::Manager;
use tauri_plugin_store::StoreExt;

fn check_store<R: tauri::Runtime>(store: &tauri_plugin_store::Store<R>) {
    store
        .get("rl_url")
        .is_none()
        .then(|| store.set("rl_url", "localhost:49122".to_string()));
}

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
                .add_migrations("sqlite:walldasher.db", db::migrations::get_migrations())
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(move |app| {
            let store = app.store("store.json").unwrap();
            check_store(&store);

            app.manage(RLClient::new(RLInner { handle: None }));

            let app_handle_clone = app.handle().clone();
            spawn_server(app_handle_clone);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            connect_to_rl,
            connect_to_rl_without_validation
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
