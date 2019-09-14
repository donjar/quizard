FROM python:alpine3.7

RUN apk update \
    && apk add build-base

# These libs are required to install psycopg2 or psycopg2-binary
RUN apk add postgresql-dev gcc python3-dev musl-dev


RUN mkdir /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app
ENV PYTHONPATH /usr/src/app

RUN pip3 install -r requirements/main.txt


EXPOSE 8000
CMD hypercorn --bind 0.0.0.0:8000 --keep-alive 10 --worker-class uvloop --workers 3 app:app
# CMD gunicorn --daemon --bind 0.0.0.0:8000 --keep-alive 10 --worker-class sanic.worker.GunicornWorker app:app
# CMD python app.py
