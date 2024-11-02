use axum::Router;
use axum::routing::get;
use crate::handlers;

pub fn configure() -> Router {
    Router::new()
        .route("/create", get(handlers::blog::blog::create))
        .route("/list", get(handlers::blog::blog::list))
}