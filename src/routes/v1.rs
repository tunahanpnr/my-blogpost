use axum::routing::get;
use axum::Router;
use crate::handlers;

pub fn configure() -> Router {
    Router::new().route("/hello", get(handlers::hello::hello))
}