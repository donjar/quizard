from quizard_backend.tests import (
    profile_created_from_origin,
    get_fake_quiz,
    get_fake_quiz_questions,
    get_fake_user,
    get_access_token_for_user,
)


async def test_get_own_created_quiz(app, client, users, questions, quizzes):
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
    res = await client.get("/users/{}/quizzes".format(new_user_id))
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert "created" in body["data"] and "attempt" in body["data"]

    # Created
    for created, retrieve in zip(created_quizzes, body["data"]["created"]):
        assert profile_created_from_origin(
            retrieve, created, ignore={"questions", "updated_at"}
        )

    # Attempted
    for index in range(3, 7):
        assert profile_created_from_origin(
            attempted_quizzes[index - 3],
            quizzes[index],
            ignore={"questions", "updated_at"},
        )
