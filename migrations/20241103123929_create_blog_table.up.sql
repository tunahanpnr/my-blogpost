-- Add up migration script here
CREATE TABLE IF NOT EXISTS blog (
    id CHAR(36) PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    content TEXT NOT NULL,
    image_path TEXT,
    avatar_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);