#!/bin/bash

./stop.sh

echo "Starting the container..."
docker-compose build
docker-compose up -d