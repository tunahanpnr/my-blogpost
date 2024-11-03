use std::sync::Arc;
use axum::Router;
use crate::state::AppState;

mod blog;

pub fn configure(state: Arc<AppState>) -> Router {
    Router::new().nest("/blog", blog::configure(state))
}