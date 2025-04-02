use std::{
    collections::HashMap,
    sync::Arc,
    time::{SystemTime, UNIX_EPOCH},
};

use futures::channel::mpsc::UnboundedSender;
use tokio::sync::Mutex;
use tokio_tungstenite::tungstenite::Message;

#[derive(Debug)]
pub struct Connection {
    pub tx: UnboundedSender<Message>,
    pub registered_functions: Vec<String>,
}

impl Connection {
    pub fn new(tx: UnboundedSender<Message>) -> Self {
        Self {
            tx,
            registered_functions: Vec::new(),
        }
    }

    pub fn register_function(&mut self, name: &String) {
        if !self.registered_functions.contains(name) {
            self.registered_functions.push(name.clone());
        }
    }

    pub fn unregister_function(&mut self, data: &String) {
        if let Some(index) = self.registered_functions.iter().position(|f| f == data) {
            self.registered_functions.remove(index);
        }
    }
}

pub type ConnectionMap = Arc<Mutex<HashMap<String, Connection>>>;

pub trait ConnectionMapExt {
    async fn create_connection(&self, tx: UnboundedSender<Message>) -> String;
}

impl ConnectionMapExt for ConnectionMap {
    async fn create_connection(&self, tx: UnboundedSender<Message>) -> String {
        let id = get_new_id();
        self.lock().await.insert(id.clone(), Connection::new(tx));
        println!("{} connected", &id);
        id
    }
}

pub fn get_new_id() -> String {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_millis()
        .to_string()
}
