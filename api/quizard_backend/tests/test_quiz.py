from quizard_backend.models import Quiz
from quizard_backend.tests import (
    profile_created_from_origin,
    get_fake_quiz,
    get_fake_quiz_questions,
)


async def test_get_one_quiz(client, quizzes):
    # Get one quiz with id
    res = await client.get("/quizzes/{}".format(quizzes[2]["uuid"]))
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert profile_created_from_origin(quizzes[2], body["data"])

    # quiz doesnt exist
    res = await client.get("/quizzes/{}".format("9" * 32))
    assert res.status == 404

    res = await client.get("/quizzes/3")
    assert res.status == 404


async def test_get_all_quizzes(client, quizzes):
    res = await client.get("/quizzes")
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15  # Default offset for quiz is 15
    assert all(
        profile_created_from_origin(origin, created)
        for origin, created in zip(quizzes, body["data"])
    )

    # GET request will have its body ignored.
    res = await client.get("/quizzes", json={"category_id": 3})
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15  # Default offset for quiz is 15

    # Get one quiz by id with many=True
    res = await client.get("/quizzes?id={}".format(quizzes[2]["uuid"]))
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 1
    assert profile_created_from_origin(quizzes[2], body["data"][0])

    ## LIMIT ##
    # No quizzes
    res = await client.get("/quizzes?limit=0")
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert not body["data"]

    # 10 quizzes
    res = await client.get("/quizzes?limit=10")
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 10
    assert all(
        profile_created_from_origin(origin, created)
        for origin, created in zip(quizzes[:10], body["data"])
    )

    # -1 quizzes
    res = await client.get("/quizzes?limit=-1")
    assert res.status == 400


async def test_get_quizzes_with_last_id(client, quizzes):
    # Use last_id in query parameter.
    res = await client.get("/quizzes?last_id={}".format(quizzes[2]["uuid"]))
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15  # Default offset for quiz is 15

    # Check if all profiles match from id 4 to 19
    assert all(
        profile_created_from_origin(origin, created)
        for origin, created in zip(quizzes[3:20], body["data"])
    )

    # Invalid last_id
    res = await client.get("/quizzes?last_id=3")
    assert res.status == 400

    res = await client.get("/quizzes?last_id=")
    assert res.status == 400


## CREATE ##


async def test_create_quiz(client, users, quizzes, token_user):
    new_quiz = {
        **get_fake_quiz(),
        "questions": get_fake_quiz_questions(has_uuid=False),
        "creator_id": users[0]["uuid"],
    }
    new_quiz.pop("uuid", None)

    # Cannot create an quiz without token
    res = await client.post("/quizzes", json=new_quiz)
    assert res.status == 401

    # Create a quiz with valid args
    res = await client.post(
        "/quizzes", json=new_quiz, headers={"Authorization": token_user}
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)

    all_quizzes = await Quiz.query.gino.all()
    assert len(all_quizzes) == len(quizzes) + 1
    assert profile_created_from_origin(
        new_quiz, all_quizzes[-1].to_dict(), ignore={"questions"}
    )


async def test_create_quiz_with_invalid_args(client, quizzes, token_user):
    res = await client.post("/quizzes", json={}, headers={"Authorization": token_user})
    assert res.status == 400

    res = await client.post(
        "/quizzes", json={"id": 4}, headers={"Authorization": token_user}
    )
    assert res.status == 400

    res = await client.post(
        "/quizzes", json={"title": ""}, headers={"Authorization": token_user}
    )
    assert res.status == 400

    res = await client.post(
        "/quizzes",
        json={"title": "", "category_id": 2},
        headers={"Authorization": token_user},
    )
    assert res.status == 400

    res = await client.post(
        "/quizzes",
        json={"title": "Josh", "category_id": 2, "unknown_field": ""},
        headers={"Authorization": token_user},
    )
    assert res.status == 400

    res = await client.post(
        "/quizzes", json={"created_at": 2}, headers={"Authorization": token_user}
    )
    assert res.status == 400

    res = await client.post(
        "/quizzes", json={"updated_at": 2}, headers={"Authorization": token_user}
    )
    assert res.status == 400

    # Assert no new quizzes are created
    all_quizzes = await Quiz.query.gino.all()
    assert len(all_quizzes) == len(quizzes)


## UPDATE ##


# async def test_update_one_quiz_admin(client, quizzes, token_admin, token_mod):
#     # Cannot update quiz without token
#     new_changes = {"title": "this name surely doesnt exist"}
#     res = await client.put("/quizzes?id=5", json=new_changes)
#     assert res.status == 401
#
#     # With id
#     new_changes = {"title": "this name surely doesnt exist"}
#     res = await client.put(
#         "/quizzes?id=5", json=new_changes, headers={"Authorization": token_admin}
#     )
#     assert res.status == 200
#
#     body = await res.json()
#     assert "data" in body
#     assert isinstance(body["data"], dict)
#     assert profile_created_from_origin({**quizzes[4], **new_changes}, body["data"])
#
#     # As mod
#     new_changes = {"title": "this name surely doesnt exist"}
#     res = await client.put(
#         "/quizzes?id=5", json=new_changes, headers={"Authorization": token_mod}
#     )
#     assert res.status == 200
#
#     # With title and description
#     new_changes = {"title": "another new name for my friend"}
#     res = await client.put(
#         "/quizzes?title={}&description={}".format(
#             quizzes[6]["title"], quizzes[6]["description"]
#         ),
#         json=new_changes,
#         headers={"Authorization": token_admin},
#     )
#     assert res.status == 400
#
#     # quiz doesnt exist
#     res = await client.put(
#         "/quizzes?title={}&description={}".format("oi oi oiqwe", "geors"),
#         json=new_changes,
#         headers={"Authorization": token_admin},
#     )
#     assert res.status == 400
#
#     # Too many quizzes to update
#     category_id = quizzes[10]["category_id"]
#     res = await client.put(
#         "/quizzes?category_id={}".format(category_id),
#         json=new_changes,
#         headers={"Authorization": token_admin},
#     )
#     assert res.status == 400
#
#
# async def test_update_quiz_as_mod_and_user(client, token_mod, token_user):
#     # User cannot update an quiz they dont create
#     new_changes = {"title": "this name surely doesnt exist"}
#     res = await client.put(
#         "/quizzes?id=5", json=new_changes, headers={"Authorization": token_user}
#     )
#     assert res.status == 401
#
#     # Update quizzes they create
#     for token, user_id in zip([token_mod, token_user], [22, 23]):
#         new_quiz = get_fake_quiz(creator_id=user_id)
#         res = await client.post(
#             "/quizzes", json=new_quiz, headers={"Authorization": token}
#         )
#         assert res.status == 200
#
#         # Update the created quiz
#         all_quizzes = await Quiz.query.gino.all()
#         created_quiz = all_quizzes[-1].to_dict()
#         new_changes = {"title": "oh boi new update"}
#         res = await client.put(
#             "/quizzes?id={}".format(created_quiz["id"]),
#             json=new_changes,
#             headers={"Authorization": token},
#         )
#         assert res.status == 200
#
#         all_quizzes = await Quiz.query.gino.all()
#         created_quiz = all_quizzes[-1].to_dict()
#         body = await res.json()
#         assert "data" in body
#         assert isinstance(body["data"], dict)
#         assert profile_created_from_origin({**new_quiz, **new_changes}, created_quiz)
#
#


## DELETE ##


async def test_delete_quiz(client, users, quizzes, token_user):
    # Create a dummy quiz
    new_quiz = {
        **get_fake_quiz(),
        "questions": get_fake_quiz_questions(has_uuid=False),
        "creator_id": users[0]["uuid"],
    }
    new_quiz.pop("uuid", None)

    res = await client.post(
        "/quizzes", json=new_quiz, headers={"Authorization": token_user}
    )
    assert res.status == 200
    created_quiz_id = (await res.json()).get("data", {})["id"]

    # Without token
    res = await client.delete("/quizzes/{}".format(created_quiz_id))
    assert res.status == 401

    # Delete your own quiz
    res = await client.delete(
        "/quizzes/{}".format(created_quiz_id), headers={"Authorization": token_user}
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert body["data"] is None

    all_quizzes = await Quiz.query.gino.all()
    assert len(all_quizzes) == len(quizzes)
    assert all(quiz.to_dict()["id"] != created_quiz_id for quiz in all_quizzes)

    # Delete a deleted quiz
    res = await client.delete(
        "/quizzes/{}".format(created_quiz_id), headers={"Authorization": token_user}
    )
    assert res.status == 404
