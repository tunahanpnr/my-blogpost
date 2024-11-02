use axum::routing::get;
use axum::Router;

async fn handler() -> &'static str {
    "Hello, world!"
}

pub fn configure() -> Router {
    Router::new().route("/hello", get(handler))
}