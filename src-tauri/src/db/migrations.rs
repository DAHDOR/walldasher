use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![Migration {
        version: 1,
        description: "load db",
        sql: include_str!("migrations.sql"),
        kind: MigrationKind::Up,
    }]
}
