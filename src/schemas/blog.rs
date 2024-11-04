use serde::{Deserialize, Serialize};

pub struct CreateBlogRequest {
    pub username: String,
    pub text: String,
    pub avatar: Option<String>,
    pub image: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>
}

#[derive(Serialize, Deserialize, Debug)]
pub struct BlogResponse {
    pub username: String,
    pub text: String,
    pub avatar: Option<String>,
    pub image: Option<String>,
    pub created_at: i64
}