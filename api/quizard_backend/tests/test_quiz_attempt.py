from quizard_backend.models import QuizAnswer
from quizard_backend.tests import (
    profile_created_from_origin,
    get_access_token_for_user,
    get_wrong_option,
)


async def test_invalid_get_answer(client, quizzes, token_user):
    res = await client.get("/quizzes/{}/attempt".format(quizzes[3]["id"]))
    assert res.status == 401

    # Not found quiz
    res = await client.get(
        "/quizzes/{}/attempt".format("9" * 32), headers={"Authorization": token_user}
    )
    assert res.status == 404


async def test_invalid_create_answer(client, questions, quizzes, token_user):
    quiz_index = 5
    question_index = 3

    # Without Token
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={"selected_option": 2},
    )
    assert res.status == 401

    # Invalid selected_option
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={"selected_option": "yay"},
        headers={"Authorization": token_user},
    )
    assert res.status == 400


async def test_answer_attempt_from_answers(client, questions, quizzes, token_user):
    quiz_index = 5

    ## CREATE AN ANSWER FOR QUESTION 3
    question_index = 3
    selected_option_3 = get_wrong_option(questions[quiz_index][question_index])
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={"selected_option": selected_option_3},
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_correct": False,
        "correct_option": questions[quiz_index][question_index]["correct_option"],
    }
    assert len(await QuizAnswer.query.gino.all()) == 1

    # Check if getting an attempt still point to first question
    res = await client.get(
        "/quizzes/{}/attempt".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_finished": False,
        "answers": {questions[quiz_index][question_index]["id"]: selected_option_3},
        "continue_from": questions[quiz_index][0]["id"],
    }

    ## CREATE AN ANSWER FOR QUESTION 2
    question_index = 2
    selected_option_2 = questions[quiz_index][question_index]["correct_option"]
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={"selected_option": selected_option_2},
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_correct": True,
        "correct_option": questions[quiz_index][question_index]["correct_option"],
    }
    assert len(await QuizAnswer.query.gino.all()) == 2

    ## CREAT AN ANSWER FOR QUESTION 0
    question_index = 0
    selected_option_0 = get_wrong_option(questions[quiz_index][question_index])
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={"selected_option": selected_option_0},
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_correct": False,
        "correct_option": questions[quiz_index][question_index]["correct_option"],
    }
    assert len(await QuizAnswer.query.gino.all()) == 3

    # Retrieve the newest attempt, and check if `continue_from` point to question with index 1
    res = await client.get(
        "/quizzes/{}/attempt".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_finished": False,
        "answers": {
            questions[quiz_index][question_index]["id"]: selected_option_0,
            questions[quiz_index][2]["id"]: selected_option_2,
            questions[quiz_index][3]["id"]: selected_option_3,
        },
        "continue_from": questions[quiz_index][1]["id"],
    }

    #####

    ## CREAT AN ANSWER FOR QUESTION 1
    question_index = 1
    selected_option_1 = questions[quiz_index][question_index]["correct_option"]
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={"selected_option": selected_option_1},
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_correct": True,
        "correct_option": questions[quiz_index][question_index]["correct_option"],
    }
    assert len(await QuizAnswer.query.gino.all()) == 4

    # Retrieve the newest attempt, and check if `continue_from` point to question with index 4
    res = await client.get(
        "/quizzes/{}/attempt".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_finished": False,
        "answers": {
            questions[quiz_index][0]["id"]: selected_option_0,
            questions[quiz_index][1]["id"]: selected_option_1,
            questions[quiz_index][2]["id"]: selected_option_2,
            questions[quiz_index][3]["id"]: selected_option_3,
        },
        "continue_from": questions[quiz_index][4]["id"],
    }

    # Check if `num_attempts` in `Quiz` is 1
    # As there is only 1 user to answer the quiz
    res = await client.get(
        "/quizzes/{}".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert body["data"]["num_attempts"] == 1


async def test_create_attempt_for_2_users(client, users, questions, quizzes, app):
    token_1 = await get_access_token_for_user(users[5], app=app)
    token_2 = await get_access_token_for_user(users[10], app=app)
    quiz_index = 5

    # Create 2 answers using token_1
    question_index = 3
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={
            "selected_option": get_wrong_option(questions[quiz_index][question_index])
        },
        headers={"Authorization": token_1},
    )
    assert res.status == 200

    question_index = 2
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={
            "selected_option": questions[quiz_index][question_index]["correct_option"]
        },
        headers={"Authorization": token_1},
    )
    assert res.status == 200

    # Check if `num_attempts` in `Quiz` is 1
    # As there is only 1 user to answer the quiz
    res = await client.get(
        "/quizzes/{}".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_2},
    )
    assert res.status == 200
    body = await res.json()
    assert body["data"]["num_attempts"] == 1

    # Create another answer using token_2
    question_index = 3
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
        ),
        json={
            "selected_option": get_wrong_option(questions[quiz_index][question_index])
        },
        headers={"Authorization": token_2},
    )
    assert res.status == 200

    # Check if `num_attempts` in `Quiz` has increased to 2
    res = await client.get(
        "/quizzes/{}".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_1},
    )
    assert res.status == 200
    body = await res.json()
    assert body["data"]["num_attempts"] == 2


async def test_get_attempt_with_fully_answered_questions(
    client, users, questions, quizzes, token_user
):
    quiz_index = 6
    correct_answers = 7
    user_answers = []
    for index, question in enumerate(questions[quiz_index]):
        selected_option = (
            question["correct_option"]
            if index < correct_answers
            else get_wrong_option(question)
        )
        user_answers.append((question["id"], selected_option))
        res = await client.post(
            "/quizzes/{}/questions/{}/answers".format(
                quizzes[quiz_index]["id"], question["id"]
            ),
            json={"selected_option": selected_option},
            headers={"Authorization": token_user},
        )
        assert res.status == 200

    # Retrieve the attempt, and check if the score is correct and is_finished is True
    res = await client.get(
        "/quizzes/{}/attempt".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_finished": True,
        "answers": {question_id: option for question_id, option in user_answers},
        "score": correct_answers,
    }

    # Check if `num_attempts` in `Quiz` is 1
    # As there is only 1 user to answer the quiz
    res = await client.get(
        "/quizzes/{}".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert body["data"]["num_attempts"] == 1

    # Create a new attempt to reset the progress
    res = await client.post(
        "/quizzes/{}/attempt".format(quizzes[2]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    # Validate that the attempt quiz has been reset
    res = await client.get("/users/{}/quizzes/attempted".format(users[0]["id"]))
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 1
    assert not body["data"][0]["is_finished"]


async def test_create_attempt(client, questions, quizzes, token_user):
    res = await client.post(
        "/quizzes/{}/attempt".format(quizzes[2]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert not body["data"]["is_finished"]
    assert body["data"]["score"] is None

    # Without token
    res = await client.post("/quizzes/{}/attempt".format(quizzes[2]["id"]))
    assert res.status == 401

    # NotFound quiz
    res = await client.post(
        "/quizzes/{}/attempt".format("9" * 32), headers={"Authorization": token_user}
    )
    assert res.status == 404


async def test_create_answer_attempt_from_answers_with_invalid_args(
    client, questions, quizzes, token_user
):
    # quiz doesnt exist
    quiz_index = 5
    question_index = 5
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            "9" * 32, questions[quiz_index][question_index]["id"]
        ),
        json={
            "selected_option": get_wrong_option(questions[quiz_index][question_index])
        },
        headers={"Authorization": token_user},
    )
    assert res.status == 404

    # question doesnt exist
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(quizzes[quiz_index]["id"], "9" * 32),
        json={
            "selected_option": questions[quiz_index][question_index]["correct_option"]
        },
        headers={"Authorization": token_user},
    )
    assert res.status == 404

    # Check if `num_attempts` in `Quiz` is 1
    # As there is only 1 user to answer the quiz
    res = await client.get(
        "/quizzes/{}".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert body["data"]["num_attempts"] == 1
