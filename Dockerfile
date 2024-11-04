FROM rust:latest as builder

RUN apt-get update && apt-get install -y libsqlite3-dev

WORKDIR /app

COPY . .

RUN cargo install sqlx-cli

RUN cargo build --release

FROM ubuntu:24.04

RUN apt-get update && apt-get install -y libsqlite3-0 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/target/release/my-blogposts /app/my-blogposts

COPY .env ./
COPY migrations ./migrations

EXPOSE 8080

CMD ["sqlx", "migrate", "run"]

CMD ["./my-blogposts"]
