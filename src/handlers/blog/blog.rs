use std::fs::File;
use std::io::Write;
use axum::extract::Multipart;
use axum::http::StatusCode;
use uuid::Uuid;
use bytes::Bytes;

pub async fn create(mut multipart: Multipart) -> Result<StatusCode, StatusCode> {
    let mut username = String::new();
    let mut text = String::new();
    let mut image_path = String::new();
    let mut avatar_path = String::new();
    let created_at = chrono::offset::Utc::now().timestamp();

    while let Some(field) = multipart.next_field().await.unwrap() {
        let field_name = field.name().unwrap().to_string();
        match field_name.as_str() {
            "username" => {
                username = field.text().await.unwrap();
            }
            "text" => {
                text = field.text().await.unwrap();
            }
            "image" => {
                let data = field.bytes().await.unwrap();
                let file_path = format!("./tmp/{}-{}.png", Uuid::new_v4(), created_at);
                save_image(data, &file_path);
                image_path = file_path;
            }
            "avatar" => {
                let data = field.bytes().await.unwrap();
                let file_path = format!("./tmp/{}-{}.png", Uuid::new_v4(), created_at);
                save_image(data, &file_path);
                avatar_path = file_path;
            }
            _ => {}
        }
    }

    if { username.is_empty() || text.is_empty() } {
        Err(StatusCode::BAD_REQUEST)
    } else {
        Ok(StatusCode::CREATED)
    }
}

fn save_image(data: Bytes, file_path: &String) {
    let mut file = File::create(&format!("{file_path}")).expect("Unable to create file");
    file.write_all(&data).expect("Unable to write file");
}


pub async fn list() -> &'static str {
    "List blog"
}