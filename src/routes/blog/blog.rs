use std::sync::Arc;
use axum::Router;
use axum::routing::{get, post};
use crate::handlers;
use crate::state::AppState;

pub fn configure(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/create", post(handlers::blog::blog::create)).with_state(state.clone())
        .route("/list", get(handlers::blog::blog::list)).with_state(state.clone())
}