#!/bin/bash

# Tenta ligar o container se ele já existir. Se não existir, cria um novo.
docker start mongo-biblioteca || docker run -d --name mongo-biblioteca --restart unless-stopped -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senha_dev_123 mongo:latest