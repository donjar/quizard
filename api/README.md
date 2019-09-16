# Back-end

> Written in Python 3.7

## Installation

### 1. Install Python 3.7 (and pip)
Install Python 3.7 from `Anaconda` is recommended: https://www.anaconda.com/distribution/

### 2. Install the dependencies for Python

```
# Install pipenv
pip install pipenv

# Install the dependencies
pipenv install
```

### 3. Install Docker
https://docs.docker.com/install/

> You will need to register a Docker account, to download Docker.


## Usage

### 1. Run the server locally for development:

```
./scripts/dev.sh
```

### 2. Run the tests locally:

On the first run, it will be a bit slow, as the script creates a `Docker` container for a testing `PostgreSQL` database.

```
./scripts/test_dev.sh
```

#### Run a specific test

Edit the `pipenv run pytest` line inside `./scripts/test_dev.sh` to run the test you want. An example is commented out in the file.

### 3. Setup fake DB content + Update dev database schema:

> Requires the `dev` instance to be running
```
./scripts/setup_dev_db.sh
```

### 4. Pipenv to requirements.txt

In case you would like to get `requirements.txt`, run:
```
./scripts/lock_pipenv.sh
```

And the 2 `requirements.txt` for `test` and `main` will be created in folder `requirements`.

### 5. Code style

Before committing your changes, it is recommended to run:
```
black .
```

which will format the code styles all Python files


## Rules

1. Only 4 HTTP methods are used

- `GET`: Retrieve a resource(s).
- `POST`: Create a resource.
- `PUT`: Replace a resource.
- `PATCH`: Update a resource.
- `DELETE`: Delete a resource. (*WIP*)


## Query parameters

 - `GET` and `DELETE` requests will ignore the request's body.
 - `POST` requests will ignore the request's query parameters.
 - `PUT` and `PATCH` requests use the request's query parameters to retrieve the resources, and use the request's body to update them.

### 1. GET
- limit (`int`): the maximum number of rows to return(Min=0, Max=100). Default: 15.
- last_id (`int`): The returned rows will have their IDs starting from `last_id` (exclusive) (Keyset pagination). Default: 0.


## Common HTTP codes of responses
- `400`: Missing field `email` and/or `password` in the request's body, or incorrect format of `email` and/or `password`.
- `401`: Invalid `email` or `password`.
- `404`: Resource is not found.
- `422`: The token has expired or is invalid.

## Endpoints

The supported endpoints are listed here.

> If there are any endpoints you are interested in and they aren't here, either it is not implemented yet, or the we just forgot to update this docs.

### 1. `/users`:

> Support `GET`, `POST`, `PUT` methods

Example:
```
# Only 1 user
GET /users/<uuid>

# Multiple users
GET /users
GET /users?limit=5&last_id=<uuid>
```

### 2. `/quizzes`

> Support `GET`, `POST`, `PUT` methods

Example:
```
# Only 1 user
GET /quizzes/<uuid>

# Multiple users
GET /quizzes
GET /quizzes?limit=5&last_id=<uuid>

# Create a quiz
POST /quizzes
body={
  "questions": [
  {
    "text": "This is question 1",
    "options": ["Option 1", "Option 2", "Option 3"],
    "correct_option": 0,
  },
  {
    "text": "This is question 2",
    "options": ["Option 1a", "Option 2a", "Option 3a"],
    "correct_option": 2,
  }
  ]
}
```

### 3. `/login`
> Support `POST` method only

Return an access token and refresh token to the client.

```
An access token is a short-life token used for sending authorized requests.
A refresh token is a long-life token used to generate new access tokens. In this application, refresh tokens don't expire.
```

#### Process flow
1. The client sends a request with fields `email` and  `password` in the request's body.
2. The server returns an access token and refresh token.
3. The client stores both `access_token` and `refresh_token` to its browser.
4. The client uses the `access_token` to authorize the user's requests, by adding it to the headers of the requests.
5. When the `access_token` expires, the client sends the `refresh_token` to endpoint `/refresh` to get a new `access_token`.
6. Repeat from step 4.

#### Example

```
# Logging in
POST json={"email": "user", "password": "random_pwd"} /login

# Using an access token to authorize requests
GET headers={"Authorization": "Bearer <access_token>"} /users

```


### 4. `/refresh`
> Support `POST` method only

As mentioned in endpoint `/login`, this endpoint is for creating a new access token.

```
POST headers={"Authorization": "Bearer <refresh_token>"} /login
```
