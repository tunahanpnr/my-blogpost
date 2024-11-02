use axum::Router;
use crate::routes::blog;

pub fn configure() -> Router {
    Router::new().nest("/v1", blog::configure())
}