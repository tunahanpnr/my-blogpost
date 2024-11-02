use axum::Router;

mod blog;

pub fn configure() -> Router {
    Router::new().nest("/blog", blog::configure())
}