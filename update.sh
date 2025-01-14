#!/bin/bash

# Perform git pull and capture output
GIT_OUTPUT=$(git pull)

# Check if there are updates (if output does not contain 'Already up to date.')
if [[ "$GIT_OUTPUT" != *"Already up to date."* ]]; then
    echo "Changes pulled from repository. Rebuilding and restarting Docker containers..."

    # Build Docker containers
    docker compose -f docker-compose.prod.yml build

    # Stop running containers
    docker compose -f docker-compose.prod.yml stop

    # Start containers
    docker compose -f docker-compose.prod.yml up -d
else
    echo "No updates were pulled. Docker containers are not restarted."
fi
