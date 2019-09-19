from quizard_backend.tests import profile_created_from_origin


async def test_get_questions(client, questions, quizzes):
    # Get one quiz with id
    res = await client.get("/quizzes/{}/questions".format(quizzes[2]["id"]))
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
    res = await client.get("/quizzes/{}/questions".format("9" * 32))
    assert res.status == 404

    res = await client.get("/quizzes/3/questions")
    assert res.status == 404
