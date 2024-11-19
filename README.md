## Running with Environment-Specific Docker Compose Files

# Development (includes the database for local testing):

- sudo docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Production (connects to an external database):

- sudo docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
