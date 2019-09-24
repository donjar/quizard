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

> Requires the `dev` instance from part 1 to be running

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

## Workflow (for front-end)

### Do a quiz

1. Upon the start quiz page, check if there are any previous attempts:
```
GET /quizzes/<quiz_id>/attempt
```
2. If there is a finished attempt, show the score and ask if the user wants to re-do it. And if the user wants to re-do the quiz, send a request to create a new attempt:
```
POST /quizzes/<quiz_id>/attempt
```

- If there are no finished attempt, send a request to retrieve all the questions for the quiz:
```
GET /quizzes/<quiz_id>/questions
```
3. Show the questions on front-end.
4. When the user chooses an option, send a request to submit the answer, and retrieve the correctness of the answer:
```
POST /quizzes/<quizzes_id>/questions/<question_id>/answers
body = {
  "selected_option": <answer_index>,
}
```

5. Continue step 4 until all questions are answered.
6. At the result page, send a request to get the score:
```
GET /quizzes/<quiz_id>/attempt
```

### Login
```
An access token is a short-life token used for sending authorized requests.
A refresh token is a long-life token used to generate new access tokens. In this application, refresh tokens don't expire.
```

1. The client sends a request with fields `email` and  `password` in the request's body.
2. The server returns an access token and refresh token.
3. The client stores both `access_token` and `refresh_token` to its browser.
4. The client uses the `access_token` to authorize the user's requests, by adding it to the headers of the requests.
5. When the `access_token` expires, the client sends the `refresh_token` to endpoint `/refresh` to get a new `access_token`.
6. Replace the expired `access_token` with the freshly retrieved one in the browser.
6. Repeat from step 4.

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
- after_id (`int`): The returned rows will have their IDs starting from `after_id` (exclusive) (Keyset pagination). Default: 0.

## Pagination

Responses that support getting multiple rows will have a key called `links` (apart from `data`) for clients to directly call and retrieve the next page of rows of the resource.

*Example*

Note that the hostname of `127.0.0.1:8000` will be automatically changed to the hostname of the running server.

So you don't have to worry and could use the URL directly without issues.

```
{
    "data": [
        {
            "created_at": 1569140236,
            "description": null,
            "title": "Popular song would century already professional picture.",
            "num_attempts": 1,
            "category_id": null,
            "questions": [
                "ca9c90f0441d4a2bb28d94fac3cc879a",
                "1549cb69514b448581876047e80905d7",
                "ecbb2138d819463591a4b99f21849797",
                "2e2c7deffe654638b164c5b69f8a9e6f",
                "71efe1dc670a4bd3a679071def80c550",
                "f582a2551ce349a28666f4723749383a",
                "e08f452cb42540b7ac0b371221af07a2",
                "77168993561143d1a09cbd6da70656e3",
                "a0042cedf3c64dc0aabab76f2a103053",
                "1e3c157bd58b4b4cb1d3bf045d256cd6"
            ],
            "creator_id": "9539538fff894799a12bfc7bd270fe44",
            "type_id": null,
            "id": "abc2989dea294e9aa815462aae6fe152",
            "updated_at": 1569222798,
            "animation_id": null
        },
        ...
    ],
    "links": {
        "next": "http://127.0.0.1:8000/quizzes?after_id=db4510e134b44a73afeb7e7b8da59561"
    }
}
```


## Common HTTP codes of responses
- `400`: Missing field `email` and/or `password` in the request's body, or incorrect format of `email` and/or `password`.
- `401`:
    - Login: Invalid `email` or `password`.
    - The access token has expired, invalid or missing.
- `403`: The request failed for an authenticated user, who does not have authorization to access the requested resource.
- `404`: Resource is not found.
- `405`: HTTP method is not allowed for the endpoint.
- `422`: The token is in wrong format.

## Endpoints

The supported endpoints are listed here.

> If there are any endpoints you are interested in and they aren't here, either it is not implemented yet, or the we just forgot to update this docs.

### 1. Users

> Support `GET`, `POST`, `PUT` and `PATCH` methods

#### Retrieve
```
# Only 1 user
GET /users/<uuid>

# Multiple users
GET /users
GET /users?limit=5&after_id=<uuid>
```

#### Create
Minimum requirements for password:
- Minimum length: 8 characters
- Maximum length: 128 characters
- Has at least 1 number

```
POST /users
body={
  "full_name": <str>,
  "email": <str>,
  "password": <str>,
}
```

#### Edit
> Only the user himself can modify

```
PATCH /users/<user_id>
body={
  "email": <str>,
}
headers={
  "Authorization": "Bearer ...",
}
```

#### Replace
> Only the user himself can modify

```
POST /users/<user_id>
body={
  "full_name": <str>,
  "email": <str>,
  "password": <str>,
}
headers={
  "Authorization": "Bearer ...",
}
```

### 2. Login
> Support `POST` method only

Return an access token and refresh token to the client.

```
An access token is a short-life token used for sending authorized requests.
A refresh token is a long-life token used to generate new access tokens. In this application, refresh tokens don't expire.
```

#### Example

```
# Logging in
POST json={"email": "user", "password": "random_pwd"} /login

# Using an access token to authorize requests
GET headers={"Authorization": "Bearer <access_token>"} /users
```

#### Refresh the access token with `/refresh`

> Support `POST` method only

As mentioned above, this endpoint is for creating a new access token.

```
POST headers={"Authorization": "Bearer <refresh_token>"} /login
```


### 3. Quizzes

> Support `GET`, `POST` and `DELETE` methods

#### Retrieve

```
# Only 1 quiz
GET /quizzes/<uuid>

# Multiple quizzes
GET /quizzes
GET /quizzes?limit=5&after_id=<uuid>
```

#### Create

```
POST /quizzes
body={
  "title": "Sample quiz",
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

#### Delete

> Only the quiz owner himself can modify

```
DELETE /quizzes/<uuid>
```

### 4. Quiz Questions

#### GET all questions for a quiz

```
GET /quizzes/<quiz_id>/questions
```

**Response**:
```
# Example
{
  "data": [
    {
        "options": [
            "Impact film event despite political its appear so seat.",
            "Than way item middle of tend expert level fire central senior foreign.",
            "Same month article condition unit dinner discuss mother feeling usually we.",
            "Hotel find real during head report west."
        ],
        "updated_at": null,
        "text": "Such camera director baby democratic need but affect Mrs here.",
        "created_at": 1568782579,
        "id": "ff4023731a8e4f3aa3339a136abfdb75",
        "quiz_id": "efe78f6975aa4a2b84be2d1113fda7eb"
    },
    {
      "options": [
          "Wide research early old specific heavy paper better.",
          "Black doctor rich enjoy seven matter job red war training interesting.",
          "Seem heavy avoid alone door some boy the often.",
          "Health animal assume identify office through wall structure."
      ],
      "updated_at": null,
      "text": "Couple yeah education friend effect along voice yes per event majority.",
      "created_at": 1568782579,
      "id": "3851be7efc7b42e88cd4b19b899c58c7",
      "quiz_id": "efe78f6975aa4a2b84be2d1113fda7eb"
    },
    ...
  ],
}
```

### 5. Quiz Attempt

#### Create an attempt

```
POST /quizzes/<quiz_id>/attempt
```

**When to call**: After an user has already finished a quiz, and he/she chooses to do another attempt

#### GET the latest attempt for the quiz of the user

```
GET /quizzes/<quiz_id>/attempt
```

**When to call**: Before any quizzes starts, to check if the user has any unfinished attempt to the quiz.

**Back-end behavior**: Get the latest attempt, and check if all the questions have been answered. If yes, return the answers and score; otherwise, return the finished answers and the id of the question to continue from.

**Response**:
```
# All questions finished
{
  "data": {
    "score": <score_number>,
    "is_finished": True,
    "answers": {
      <question_id>: <selected_option>,  // selected_option is an index for question.options
    },
  }
}

# Not finished
{
  "data": {
    "is_finished": False,
    "answers": {
      <question_id>: <selected_option>,  // selected_option is an index for question.options
    },
    "continue_from": <question_id>,
  }
}
```

### 6. Quiz Answer

#### Submit an user's answer

```
POST /quizzes/<quizzes_id>/questions/<question_id>/answers
body = {
  "selected_option": <answer_index>,
}
```

**When to call**: The user presses on an option for a question in the quiz. Check if the chosen option is the correct answer.


**Back-end behavior**: Upon receiving the answer, the back-end will check if the selected question has been answered in the latest attempt. If yes, raise an `422` error; otherwise, create the answer.

**Response**:
```
# The chosen answer is correct
{
  "data": {
    "is_correct": True,
  }
}

# The chosen answer is wrong
{
  "data": {
    "is_correct": False,
  }
}
```

### 6. Quiz Summary (Statistics)

Return the questions in the quiz, along with fields `correct_option` and `stats` for each question.

For questions that have no answers, the default value for `stats` is an empty object `{}`.

> *stats* has 2 fields: `count` and `percentage`.
- `count` is an array showing how many chosen options for each option in the question.


```
GET /quizzes/<quiz_id>/summary
```

*Example Response*

```
[{'correct_option': 3,
  'created_at': 1569058960,
  'id': '0f641b160ac84e5293fce9b7ae999281',
  'options': ['Charge power computer effort accept move do job push serve.',
              'And present nice recently benefit itself network American.',
              'Talk technology the challenge current might discover send pick '
              'town success rather add.',
              'Four listen election person realize language think.'],
  'quiz_id': '5619ee7eed2c4c1f8380476bc6b070cd',
  'stats': {'count': [1, 0, 0, 0], 'percentage': [100.0, 0.0, 0.0, 0.0]},
  'text': 'Pattern leave rise environmental describe long share beat.',
  'updated_at': None},
 {'correct_option': 3,
  'created_at': 1569058960,
  'id': '75e8f20e7bcd4a62b75a5df2e6c93b32',
  'options': ['Health sell best room list help street guy success down.',
              'Behavior pass discover safe wide simple too always player.',
              'Listen voice against billion clear attack father college try why.',
              'Firm throughout fund work individual share president plant.'],
  'quiz_id': '5619ee7eed2c4c1f8380476bc6b070cd',
  'stats': {'count': [0, 1, 1, 0], 'percentage': [0.0, 50.0, 50.0, 0.0]},
  'text': 'Participant pull toward hundred hold society.',
  'updated_at': None},
 {'correct_option': 3,
  'created_at': 1569058960,
  'id': '39445d02b1694be8a2ff66faada624e5',
  'options': ['Yes home table arm society safe plant form will item though.',
              'Order pull help others phone enough cost right smile industry,',
              'Article radio help factor small run improve tree they our beat',
              'Budget PM marriage country special prepare.'],
  'quiz_id': '5619ee7eed2c4c1f8380476bc6b070cd',
  'stats': {},
  'text': 'Show peace community throughout fund cold.',
  'updated_at': None},
  ...
]
```

### 7. Users' Quizzes

Get an user's created and attempted quizzes.

Query parameters: *To be used to reduce the response's payload (Optional)*
- *created* (`bool`): If `True`, the response includes the created quizzes of the user. Default: `True`.
- *attempted* (`bool`): If `True`, the response includes the attemped quizzes of the user. Default: `True`.


```
GET /users/<user_id>/quizzes
```
