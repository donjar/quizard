#!/bin/bash

set -e
export MODE=development
export PYTHONPATH=.

echo "INFO: Clearing all tables..."
docker exec -it dev_postgres_cs3216_a3 psql -U postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;"

echo "INFO: Adding test rows..."
pipenv run python quizard_backend/tests/setup_dev_db.py
