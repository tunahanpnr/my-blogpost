# My Blogposts - Rust & React Application

## Installation

Make sure you have docker compose installed. Can find the
documentation [here](https://docs.docker.com/compose/install/).

## Running the App

To run the application using Docker Compose, follow these steps:

1. **Ensure Docker and Docker Compose are installed** on your machine.

2. **Clone the repository** (if you haven’t already):
    ```bash
    git clone https://github.com/tunahanpnr/my-blogposts.git
    cd my-blogposts
    ```

3. **Start the application** using Docker Compose:
    ```bash
    docker-compose up -d
    ```

   This command will build and start all necessary containers defined in the `docker-compose.yml` file.


4. **Access the application**:
    - Visit [http://localhost:8080](http://localhost:8080) to access the frontend.
    - Also, backend will run on [http://localhost:3000](http://localhost:3000).

5. **Stopping the application**:
    - Press `Ctrl+C` in the terminal running Docker Compose.
    - Alternatively, run:
      ```bash
      docker-compose down
      ```

   This will stop and remove the containers.
