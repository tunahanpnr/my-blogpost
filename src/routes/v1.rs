use std::sync::Arc;
use axum::Router;
use crate::routes::blog;
use crate::state::AppState;

pub fn configure(state: Arc<AppState>) -> Router {
    Router::new().nest("/v1", blog::configure(state))
}