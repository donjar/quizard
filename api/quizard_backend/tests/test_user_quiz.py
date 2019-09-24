from quizard_backend.models import QuizAttempt
from quizard_backend.tests import (
    profile_created_from_origin,
    get_fake_quiz,
    get_fake_quiz_questions,
    get_fake_user,
    get_access_token_for_user,
)


async def test_get_own_created_and_attempted_quizzes(
    app, client, users, questions, quizzes
):
    # Create a fresh user
    new_user = get_fake_user()
    new_user.pop("id")

    res = await client.post("/users", json=new_user)
    assert res.status == 200
    body = await res.json()
    new_user_id = body["data"]["id"]
    new_user_token = await get_access_token_for_user(body["data"], app)

    # Create a few quizzes
    created_quizzes = []
    for _ in range(8):
        fake_quiz = get_fake_quiz()
        fake_quiz.pop("creator_id")
        new_quiz = {**fake_quiz, "questions": get_fake_quiz_questions(has_id=False)}
        new_quiz.pop("id", None)

        # Cannot create an quiz without token
        res = await client.post("/quizzes", json=new_quiz)
        assert res.status == 401

        # Create a quiz with valid args
        res = await client.post(
            "/quizzes", json=new_quiz, headers={"Authorization": new_user_token}
        )
        assert res.status == 200
        body = await res.json()
        created_quizzes.append(body["data"])

    # Attempt to do a few quizzes as well
    attempted_quizzes = []
    for quiz_index in range(3, 7):
        question_index = 3
        selected_option_3 = 1
        res = await client.post(
            "/quizzes/{}/questions/{}/answers".format(
                quizzes[quiz_index]["id"], questions[quiz_index][question_index]["id"]
            ),
            json={"selected_option": selected_option_3},
            headers={"Authorization": new_user_token},
        )
        assert res.status == 200
        body = await res.json()
        attempted_quizzes.append(quizzes[quiz_index])

    # Check if the attempted and created quizzes are correct
    res = await client.get("/users/{}/quizzes/created".format(new_user_id))
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)

    # Check if the created quizzes are correct
    for created, retrieve in zip(created_quizzes, body["data"]):
        assert profile_created_from_origin(
            retrieve, created, ignore={"questions", "updated_at"}
        )

    # Check if the attempted quizzes are correct
    res = await client.get("/users/{}/quizzes/attempted".format(new_user_id))
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)

    for expected_quiz, actual_quiz in zip(attempted_quizzes[::-1], body["data"]):
        assert profile_created_from_origin(
            expected_quiz, actual_quiz, ignore={"questions", "updated_at"}
        )


async def test_pagination_created_attempted_quizzes(
    app, client, users, questions, quizzes, token_user
):
    # Create a fresh user, as the created user already has some previously created quizzes
    new_user = get_fake_user()
    new_user.pop("id")

    res = await client.post("/users", json=new_user)
    assert res.status == 200
    body = await res.json()
    new_user_id = body["data"]["id"]
    new_user_token = await get_access_token_for_user(body["data"], app)

    # Create a few quizzes
    created_quizzes = []
    for _ in range(35):
        fake_quiz = get_fake_quiz()
        fake_quiz.pop("creator_id")
        new_quiz = {**fake_quiz, "questions": get_fake_quiz_questions(has_id=False)}
        new_quiz.pop("id", None)

        # Create a quiz with valid args
        res = await client.post(
            "/quizzes", json=new_quiz, headers={"Authorization": new_user_token}
        )
        assert res.status == 200
        body = await res.json()
        created_quizzes.append(body["data"])

    # Check pagination
    res = await client.get("/users/{}/quizzes/created".format(new_user_id))
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15

    for created, retrieve in zip(created_quizzes[:15], body["data"]):
        assert profile_created_from_origin(
            retrieve, created, ignore={"questions", "updated_at"}
        )

    # Check second page
    res = await client.get(
        "/users/{}/quizzes/created?after_id={}".format(
            new_user_id, body["data"][-1]["id"]
        )
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15

    for created, retrieve in zip(created_quizzes[15:30], body["data"]):
        assert profile_created_from_origin(
            retrieve, created, ignore={"questions", "updated_at"}
        )

    # Check last page
    res = await client.get(
        "/users/{}/quizzes/created?after_id={}".format(
            new_user_id, body["data"][-1]["id"]
        )
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 5

    for created, retrieve in zip(created_quizzes[30:], body["data"]):
        assert profile_created_from_origin(
            retrieve, created, ignore={"questions", "updated_at"}
        )

    ## ATTEMPTED
    # Attempt to do a few quizzes as well
    attempt_user_id = users[0]["id"]
    attempted_quizzes = created_quizzes[::-1]
    for quiz in created_quizzes:
        question_index = 5
        selected_option = 3
        res = await client.post(
            "/quizzes/{}/questions/{}/answers".format(
                quiz["id"], quiz["questions"][question_index]
            ),
            json={"selected_option": selected_option},
            headers={"Authorization": token_user},
        )
        assert res.status == 200
        body = await res.json()

    # Check pagination
    res = await client.get("/users/{}/quizzes/attempted".format(attempt_user_id))
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15

    for created, retrieve in zip(attempted_quizzes[:15], body["data"]):
        assert profile_created_from_origin(
            retrieve, {**created, "num_attempts": 1}, ignore={"questions", "updated_at"}
        )

    # Check second page
    res = await client.get(
        "/users/{}/quizzes/attempted?after_id={}".format(
            attempt_user_id, body["data"][-1]["id"]
        )
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15

    for created, retrieve in zip(attempted_quizzes[15:30], body["data"]):
        assert profile_created_from_origin(
            retrieve, {**created, "num_attempts": 1}, ignore={"questions", "updated_at"}
        )

    # Check last page
    res = await client.get(
        "/users/{}/quizzes/attempted?after_id={}".format(
            attempt_user_id, body["data"][-1]["id"]
        )
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 5

    for created, retrieve in zip(attempted_quizzes[30:], body["data"]):
        assert profile_created_from_origin(
            retrieve, {**created, "num_attempts": 1}, ignore={"questions", "updated_at"}
        )
