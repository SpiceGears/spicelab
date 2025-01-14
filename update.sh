#!/bin/bash

cd /home/ubuntu/spicelab

# Perform git pull and capture output
GIT_OUTPUT=$(git pull)

CURRENT_DATETIME=$(date '+%Y-%m-%d %H:%M:%S')

# Check if there are updates (if output does not contain 'Already up to date.')
if [[ "$GIT_OUTPUT" != *"Already up to date."* ]]; then
    echo "[$CURRENT_DATETIME] Changes pulled from repository. Rebuilding and restarting Docker containers..." >> update.log

    # Build Docker containers
    docker compose -f docker-compose.prod.yml build

    # Stop running containers
    docker compose -f docker-compose.prod.yml stop

    # Start containers
    docker compose -f docker-compose.prod.yml up -d
else
    echo "[$CURRENT_DATETIME] No updates were pulled. Docker containers are not restarted." >> update.log
fi
