use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, sqlx::FromRow)]
#[allow(non_snake_case)]
pub struct BlogModel {
    pub id: String,
    pub username: String,
    pub text: String,
    pub avatar: Option<String>,
    pub image: Option<String>,
    pub created_at: NaiveDateTime,
}