from quizard_backend.models import QuizAnswer
from quizard_backend.tests import profile_created_from_origin


def get_wrong_option(question):
    correct_option = question["correct_option"]
    for index in range(len(question["options"])):
        if index != correct_option:
            return index

    return -1


async def test_invalid_get_answer(client, quizzes, token_user):
    res = await client.get("/quizzes/{}/attempt".format(quizzes[3]["uuid"]))
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
            quizzes[quiz_index]["uuid"], questions[quiz_index][question_index]["uuid"]
        ),
        json={"selected_option": 2},
    )
    assert res.status == 401

    # Invalid selected_option
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["uuid"], questions[quiz_index][question_index]["uuid"]
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
            quizzes[quiz_index]["uuid"], questions[quiz_index][question_index]["uuid"]
        ),
        json={"selected_option": selected_option_3},
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {"is_correct": False}
    assert len(await QuizAnswer.query.gino.all()) == 1

    # Check if getting an attempt still point to first question
    res = await client.get(
        "/quizzes/{}/attempt".format(quizzes[quiz_index]["uuid"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_finished": False,
        "answers": {questions[quiz_index][question_index]["uuid"]: selected_option_3},
        "continue_from": questions[quiz_index][0]["uuid"],
    }

    ## CREATE AN ANSWER FOR QUESTION 2
    question_index = 2
    selected_option_2 = questions[quiz_index][question_index]["correct_option"]
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["uuid"], questions[quiz_index][question_index]["uuid"]
        ),
        json={"selected_option": selected_option_2},
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {"is_correct": True}
    assert len(await QuizAnswer.query.gino.all()) == 2

    ## CREAT AN ANSWER FOR QUESTION 0
    question_index = 0
    selected_option_0 = get_wrong_option(questions[quiz_index][question_index])
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["uuid"], questions[quiz_index][question_index]["uuid"]
        ),
        json={"selected_option": selected_option_0},
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {"is_correct": False}
    assert len(await QuizAnswer.query.gino.all()) == 3

    # Retrieve the newest attempt, and check if `continue_from` point to question with index 1
    res = await client.get(
        "/quizzes/{}/attempt".format(quizzes[quiz_index]["uuid"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_finished": False,
        "answers": {
            questions[quiz_index][question_index]["uuid"]: selected_option_0,
            questions[quiz_index][2]["uuid"]: selected_option_2,
            questions[quiz_index][3]["uuid"]: selected_option_3,
        },
        "continue_from": questions[quiz_index][1]["uuid"],
    }

    #####

    ## CREAT AN ANSWER FOR QUESTION 1
    question_index = 1
    selected_option_1 = questions[quiz_index][question_index]["correct_option"]
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["uuid"], questions[quiz_index][question_index]["uuid"]
        ),
        json={"selected_option": selected_option_1},
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {"is_correct": True}
    assert len(await QuizAnswer.query.gino.all()) == 4

    # Retrieve the newest attempt, and check if `continue_from` point to question with index 4
    res = await client.get(
        "/quizzes/{}/attempt".format(quizzes[quiz_index]["uuid"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert body["data"] == {
        "is_finished": False,
        "answers": {
            questions[quiz_index][0]["uuid"]: selected_option_0,
            questions[quiz_index][1]["uuid"]: selected_option_1,
            questions[quiz_index][2]["uuid"]: selected_option_2,
            questions[quiz_index][3]["uuid"]: selected_option_3,
        },
        "continue_from": questions[quiz_index][4]["uuid"],
    }


async def test_get_attempt_with_fully_answered_questions(
    client, questions, quizzes, token_user
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
        user_answers.append((question["uuid"], selected_option))
        res = await client.post(
            "/quizzes/{}/questions/{}/answers".format(
                quizzes[quiz_index]["uuid"], question["uuid"]
            ),
            json={"selected_option": selected_option},
            headers={"Authorization": token_user},
        )
        assert res.status == 200

    # Retrieve the attempt, and check if the score is correct and is_finish is True
    res = await client.get(
        "/quizzes/{}/attempt".format(quizzes[quiz_index]["uuid"]),
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

async def test_create_attempt(client, questions, quizzes, token_user):
    res = await client.post(
        "/quizzes/{}/attempt".format(quizzes[2]["uuid"]),
        headers={"Authorization": token_user},
    )
    print('hello', await res.json())
    assert res.status == 200

    # Without token
    res = await client.post(
        "/quizzes/{}/attempt".format(quizzes[2]["uuid"]),
    )
    assert res.status == 401

    # NotFound quiz
    res = await client.post(
        "/quizzes/{}/attempt".format("9" * 32),
        headers={"Authorization": token_user},
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
            "9" * 32, questions[quiz_index][question_index]["uuid"]
        ),
        json={
            "selected_option": get_wrong_option(questions[quiz_index][question_index])
        },
        headers={"Authorization": token_user},
    )
    assert res.status == 404

    # question doesnt exist
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["uuid"], "9" * 32
        ),
        json={
            "selected_option": questions[quiz_index][question_index]["correct_option"]
        },
        headers={"Authorization": token_user},
    )
    assert res.status == 404
