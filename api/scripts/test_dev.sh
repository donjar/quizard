#!/bin/bash

set -e
export MODE=testing

# Create a PostgreSQL container
echo 'Starting the test container...'
docker create --name test_postgres_cs3216_a3 -v test_cs3216_a3_dbdata:/var/lib/postgresql/data -p 54321:5432 postgres:11 &> /dev/null || true

# Start the test container
docker start test_postgres_cs3216_a3 &> /dev/null

# Clear all tables
echo "Setting up the test DB..."
docker exec -it test_postgres_cs3216_a3 psql -U postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;" &> /dev/null

# Run the actual tests
pipenv run pytest --loop uvloop
# pipenv run pytest --loop uvloop quizard_backend/tests/test_user.py::test_update_user_self

# Stop the container after running
echo 'Shutting down the test container...'
docker stop test_postgres_cs3216_a3 &> /dev/null
