use my_blogposts::routes;

#[tokio::main]
async fn main() {
    let app = routes::configure();
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    axum::serve(listener, app).await.unwrap();
}
