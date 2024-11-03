use std::sync::Arc;
use axum::extract::State;
use axum::http::StatusCode;
use crate::models::blog::BlogModel;
use crate::state::AppState;

pub async fn create(
    data: Arc<AppState>,
    blog: BlogModel,
) -> Result<StatusCode, (StatusCode, String)> {
    let result = sqlx::query!(
        "INSERT INTO blog (id, username, text, avatar_path, image_path, created_at)
        VALUES (?, ?, ?, ?, ?, ?)",
        blog.id,
        blog.username,
        blog.text,
        blog.avatar_path,
        blog.image_path,
        blog.created_at
    )
        .execute(&data.db)
        .await;

    match result {
        Ok(_) => Ok(StatusCode::CREATED),
        Err(err) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to insert blog post: {}", err),
        )),
    }
}