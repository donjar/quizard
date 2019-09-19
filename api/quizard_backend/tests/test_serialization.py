from quizard_backend.tests import get_fake_user, get_fake_quiz, get_fake_quiz_questions


async def test_get_internal_id_success_quizzes(client, quizzes, token_user):
    """Check the responses doesnt contain `internal_id`"""
    # Many
    res = await client.get("/quizzes", headers={"Authorization": token_user})
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)

    for item in body["data"]:
        assert "internal_id" not in item

    # Many with args
    res = await client.get(
        "/quizzes?id={}".format(quizzes[2]["id"]), headers={"Authorization": token_user}
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)

    for item in body["data"]:
        assert "internal_id" not in item

    # Single
    res = await client.get(
        "/quizzes/{}".format(quizzes[2]["id"]), headers={"Authorization": token_user}
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert "internal_id" not in body["data"]


async def test_get_internal_id_failure_quizzes(client, users):
    """Check the responses doesnt contain `internal_id`"""
    # Many
    res = await client.get("/users")
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)

    for item in body["data"]:
        assert "internal_id" not in item

    # Many with args
    res = await client.get("/users?id={}".format(users[2]["id"]))
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)

    for item in body["data"]:
        assert "internal_id" not in item

    # Single
    res = await client.get("/users/{}".format(users[2]["id"]))
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert "internal_id" not in body["data"]


async def test_create_internal_id_quizzes(client, quizzes, token_user):
    """Ensure that `internal_id` cannot be created"""
    fake_quiz = get_fake_quiz()
    fake_quiz.pop("creator_id")
    new_quiz = {
        **fake_quiz,
        "questions": get_fake_quiz_questions(has_id=False),
        "internal_id": 12,
    }
    new_quiz.pop("id", None)

    res = await client.post(
        "/quizzes", json=new_quiz, headers={"Authorization": token_user}
    )
    assert res.status == 400


async def test_create_internal_id_users(client, users):
    """Ensure that `internal_id` cannot be created"""
    new_user = get_fake_user()
    new_user.pop("id")

    res = await client.post("/users", json={**new_user, "internal_id": 3})
    assert res.status == 400


async def test_update_internal_id_users(client, users, token_user):
    """Ensure that `internal_id` cannot be updated"""
    res = await client.patch(
        "/users/{}".format(users[0]["id"]),
        json={"internal_id": 22},
        headers={"Authorization": token_user},
    )
    assert res.status == 400
