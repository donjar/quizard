#!/bin/bash

set -e
export MODE=development

# Create a PostgreSQL container
docker create --name dev_postgres_cs3216_a3 -v dev_cs3216_a3_dbdata:/var/lib/postgresql/data -p 54320:5432 postgres:11

# Start a Postgres container
# docker run --name my_postgres -v my_dbdata:/var/lib/postgresql/data -p 54320:5432 postgres:11 || docker start -a my_postgres
docker start -a dev_postgres_cs3216_a3 &

# Also, run the Python app
pipenv run python app.py &
# pipenv run hypercorn --keep-alive 10 --workers 3 --bind 127.0.0.1:8000 app:app

# Allow both the Postgres container and Python app
# to run in parallel
wait
