use std::fs::File;
use std::io::Write;
use std::sync::Arc;
use axum::{debug_handler, Json};
use axum::extract::{Multipart, State};
use axum::http::StatusCode;
use uuid::Uuid;
use bytes::Bytes;
use crate::models::blog::BlogModel;
use crate::repository;
use crate::state::AppState;

#[debug_handler]
pub async fn create(State(state): State<Arc<AppState>>, mut multipart: Multipart) -> Result<StatusCode, (StatusCode, String)> {
    let mut username = String::new();
    let mut text = String::new();
    let mut image_path = String::new();
    let mut avatar_path = String::new();
    let created_at = chrono::offset::Utc::now();

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
                let file_path = format!("./tmp/{}-{}.png", Uuid::new_v4(), created_at.timestamp());
                save_image(data, &file_path);
                image_path = file_path;
            }
            "avatar" => {
                let data = field.bytes().await.unwrap();
                let file_path = format!("./tmp/{}-{}.png", Uuid::new_v4(), created_at.timestamp());
                save_image(data, &file_path);
                avatar_path = file_path;
            }
            _ => {}
        }
    }

    if username.is_empty() || text.is_empty() {
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "Failed to insert blog post: username and text must me filled.".to_string(),
        ));
    }

    let blog = BlogModel {
        id: Uuid::new_v4().to_string(),
        username,
        text,
        image_path: Option::from(image_path),
        avatar_path: Option::from(avatar_path),
        created_at: created_at.naive_utc()
    };

    repository::blog::create(state, blog).await
}

fn save_image(data: Bytes, file_path: &String) {
    let mut file = File::create(&format!("{file_path}")).expect("Unable to create file");
    file.write_all(&data).expect("Unable to write file");
}


#[debug_handler]
pub async fn list(State(state): State<Arc<AppState>>) -> Result<Json<Vec<BlogModel>>, (StatusCode, String)> {
    match repository::blog::get_all(state).await {
        Ok(blogs) => Ok(Json(blogs)),
        Err(err) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to fetch blogs: {}", err),
        )),
    }
}