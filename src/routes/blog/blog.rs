use axum::Router;
use axum::routing::{get, post};
use crate::handlers;

pub fn configure() -> Router {
    Router::new()
        .route("/create", post(handlers::blog::blog::create))
        .route("/list", get(handlers::blog::blog::list))
}