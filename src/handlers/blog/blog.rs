use std::fs::File;
use std::io::Write;
use std::sync::Arc;
use axum::{debug_handler, Json};
use axum::extract::{Multipart, State};
use axum::http::StatusCode;
use uuid::Uuid;
use bytes::Bytes;
use crate::models::blog::BlogModel;
use crate::{repository, utils};
use crate::state::AppState;

#[debug_handler]
pub async fn create(State(state): State<Arc<AppState>>, mut multipart: Multipart) -> Result<StatusCode, (StatusCode, String)> {
    let mut username = String::new();
    let mut text = String::new();
    let mut image = String::new();
    let mut avatar = String::new();
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
            "avatar" => {
                let url = field.text().await.unwrap();
                avatar = format!("{}-{}.png", Uuid::new_v4(), created_at.timestamp());
                let file_path = format!("./tmp/{}", avatar);
                if utils::image_downloader::download_image(&url, &file_path).await.is_err() {
                    return Err((
                        StatusCode::INTERNAL_SERVER_ERROR,
                        "Failed to downloading avatar image".to_string(),
                    ));
                }
            }
            "image" => {
                let data = field.bytes().await.unwrap();
                image = format!("{}-{}.png", Uuid::new_v4(), created_at.timestamp());
                let file_path = format!("./tmp/{}", image);
                save_image(data, &file_path);
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
        image: Option::from(image),
        avatar: Option::from(avatar),
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