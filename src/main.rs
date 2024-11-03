use std::sync::Arc;
use sqlx::sqlite::SqlitePoolOptions;
use my_blogposts::routes;
use my_blogposts::state::AppState;

#[tokio::main]
async fn main() {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must set");
    let pool = SqlitePoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await
        .expect("❌ Failed to connect to the database");

    let app = routes::v1::configure(Arc::new(AppState { db: pool.clone() }));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    axum::serve(listener, app).await.unwrap();
}
