use std::{fs::File, io::{copy, Cursor}};
use anyhow::Result;

pub async fn download_image(url: &str, file_name: &str) -> Result<()> {
    // Send an HTTP GET request to the URL
    let response = reqwest::get(url).await?;
    // Create a new file to write the downloaded image to
    let mut file = File::create(file_name)?;

    // Create a cursor that wraps the response body
    let mut content =  Cursor::new(response.bytes().await?);
    // Copy the content from the cursor to the file
    copy(&mut content, &mut file)?;

    Ok(())
}