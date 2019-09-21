from quizard_backend.tests import (
    profile_created_from_origin,
    get_fake_quiz,
    get_fake_quiz_questions,
)


async def test_get_questions_after_create(client, questions, quizzes, token_user):
    fake_quiz = get_fake_quiz()
    fake_quiz.pop("creator_id")
    quiz_questions = get_fake_quiz_questions(has_id=False)
    new_quiz = {**fake_quiz, "questions": quiz_questions}
    new_quiz.pop("id", None)

    # Create a quiz with valid args
    res = await client.post(
        "/quizzes", json=new_quiz, headers={"Authorization": token_user}
    )
    assert res.status == 200
    body = await res.json()
    quiz_id = body["data"]["id"]

    # Get the created questions
    res = await client.get(
        "/quizzes/{}/questions".format(quiz_id), headers={"Authorization": token_user}
    )
    assert res.status == 200
    body = await res.json()
    created_questions = body["data"]
    for question_origin, question_retrieved in zip(quiz_questions, created_questions):
        assert "correct_option" not in question_retrieved
        assert all(
            key in question_retrieved for key in ["text", "quiz_id", "id", "options"]
        )
        assert profile_created_from_origin(
            question_origin, question_retrieved, ignore={"correct_option"}
        )

    # If created quiz has the correct questions' IDs
    res = await client.get(
        "/quizzes/{}".format(quiz_id), headers={"Authorization": token_user}
    )
    assert res.status == 200
    body = await res.json()
    assert len(quiz_questions) == len(body["data"]["questions"])
    assert all(
        quiz_question_id == created_question["id"]
        for quiz_question_id, created_question in zip(
            body["data"]["questions"], created_questions
        )
    )


async def test_get_questions(client, questions, quizzes, token_user):
    # Without token
    res = await client.get("/quizzes/{}/questions".format(quizzes[2]["id"]))
    assert res.status == 401

    # Get one quiz with id
    res = await client.get(
        "/quizzes/{}/questions".format(quizzes[2]["id"]),
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    for question_origin, question_retrieved in zip(questions[2], body["data"]):
        assert "correct_option" not in question_retrieved
        assert all(
            key in question_retrieved for key in ["text", "quiz_id", "id", "options"]
        )
        assert profile_created_from_origin(
            question_origin, question_retrieved, ignore={"correct_option"}
        )

    # quiz doesnt exist
    res = await client.get(
        "/quizzes/{}/questions".format("9" * 32), headers={"Authorization": token_user}
    )
    assert res.status == 404

    res = await client.get(
        "/quizzes/3/questions", headers={"Authorization": token_user}
    )
    assert res.status == 404
