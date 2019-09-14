#!/bin/bash

export PYTHONPATH=.

pipenv run alembic revision --autogenerate --head head
pipenv run alembic upgrade head
