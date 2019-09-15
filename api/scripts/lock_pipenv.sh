#!/bin/bash

set -e

pipenv lock -r -d > requirements/test.txt
pipenv lock -r > requirements/main.txt
