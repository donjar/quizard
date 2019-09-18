# Response's type:
# <aiohttp.client_reqrep.ClientResponse>
# Client: aiohttp
# https://docs.aiohttp.org/en/stable/client_quickstart.html#json-request

from quizard_backend.models import User
from quizard_backend.tests import get_fake_user, profile_created_from_origin
from quizard_backend.utils.query import get_one
from quizard_backend.utils.crypto import hash_password

## GET ##


async def test_get_one_user(client, users):
    res = await client.get("/users/{}".format(users[0]["uuid"]))
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    assert profile_created_from_origin(users[0], body["data"])

    # User doesnt exist
    res = await client.get("/users/{}".format("9" * 32))
    assert res.status == 404

    res = await client.get("/users/true")
    assert res.status == 404

    # Invalid query
    res = await client.get("/users?id=")
    assert res.status == 400


async def test_get_all_users(client, users):
    res = await client.get("/users")
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15  # Default offset for User is 15
    assert all(
        profile_created_from_origin(origin, created)
        for origin, created in zip(users, body["data"])
    )

    # GET request will have its body ignored.
    res = await client.get("/users", json={"id": 3})
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15  # Default offset for User is 15

    # Get one user by id
    res = await client.get("/users?id={}".format(users[2]["uuid"]))
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 1
    assert profile_created_from_origin(users[2], body["data"][0])

    ## LIMIT ##
    # No users
    res = await client.get("/users?limit=0")
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert not body["data"]

    # 10 users
    res = await client.get("/users?limit=10")
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 10
    assert all(
        profile_created_from_origin(origin, created)
        for origin, created in zip(users[:10], body["data"])
    )

    # -1 users
    res = await client.get("/users?limit=-1")
    assert res.status == 400


async def test_get_users_with_last_id(client, users):
    # Use last_id in query parameter.
    res = await client.get("/users?last_id={}".format(users[2]["uuid"]))
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 15  # Default offset for User is 15

    # Check if all profiles match from id 4 to 19
    assert all(
        profile_created_from_origin(origin, created)
        for origin, created in zip(users[3:20], body["data"])
    )

    # Invalid last_id
    res = await client.get("/users?last_id=2")
    assert res.status == 400

    res = await client.get("/users?last_id=")
    assert res.status == 400


## CREATE ##


async def test_create_user(client, users):
    new_user = get_fake_user()
    new_user.pop("uuid")

    res = await client.post("/users", json=new_user)
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)

    all_users = await User.query.gino.all()
    assert len(all_users) == len(users) + 1
    assert profile_created_from_origin(new_user, all_users[-1].to_dict())

    # Ignore param args
    # POST request will have its query parameter (args) ignored.
    new_user = get_fake_user()
    new_user.pop("uuid")
    res = await client.post("/users", json=new_user)
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)

    all_users = await User.query.gino.all()
    assert len(all_users) == len(users) + 2
    assert profile_created_from_origin(new_user, all_users[-1].to_dict())


async def test_create_user_with_invalid_args(client, users):
    res = await client.post("/users", json={})
    assert res.status == 400

    res = await client.post("/users", json={"id": 4})
    assert res.status == 400

    res = await client.post("/users", json={"full_name": ""})
    assert res.status == 400

    res = await client.post("/users", json={"full_name": ""})
    assert res.status == 400

    res = await client.post("/users", json={"full_name": "Josh", "password": ""})
    assert res.status == 400

    res = await client.post("/users", json={"email": ""})
    assert res.status == 400

    res = await client.post("/users", json={"location": 2})
    assert res.status == 400

    res = await client.post("/users", json={"created_at": 2})
    assert res.status == 400

    res = await client.post("/users", json={"updated_at": 2})
    assert res.status == 400

    # Invalid or weak password
    res = await client.post("/users", json={"full_name": "Josh", "password": "mmmw"})
    assert res.status == 400

    res = await client.post(
        "/users", json={"full_name": "Josh", "password": "qweon@qweqweklasl"}
    )
    assert res.status == 400

    # Assert no new users are created
    all_users = await User.query.gino.all()
    assert len(all_users) == len(users)


## UPDATE ##


async def test_update_one_user(client, users, token_user):
    new_changes = {
        "full_name": "this name surely doesnt exist",
        "password": "strong_password_123",
    }

    # Without token
    res = await client.patch("/users/{}".format(users[0]["uuid"]), json=new_changes)
    assert res.status == 401

    # An user cannot update another user
    res = await client.patch(
        "/users/{}".format(users[3]["uuid"]),
        json=new_changes,
        headers={"Authorization": token_user},
    )
    assert res.status == 401

    # With id
    res = await client.patch(
        "/users/{}".format(users[0]["uuid"]),
        json=new_changes,
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)
    updated_user = await get_one(User, id=1)
    updated_user = updated_user.to_dict()
    updated_user["id"] = updated_user.pop("uuid")

    ## Assert the new password has been updated
    assert profile_created_from_origin(
        {**body["data"], "password": hash_password(new_changes["password"])},
        updated_user,
        ignore=["updated_at"],
    )

    # User doesnt exist
    res = await client.patch(
        "/users/{}".format("9" * 32),
        json=new_changes,
        headers={"Authorization": token_user},
    )
    assert res.status == 404

    # Update to a weak password
    new_changes = {"password": "mmmk"}
    res = await client.patch(
        "/users/{}".format(users[1]["uuid"]),
        json=new_changes,
        headers={"Authorization": token_user},
    )
    assert res.status == 400


## REPLACE USER ##


async def test_replace_user(client, users, token_user):
    new_user = get_fake_user()
    new_user.pop("uuid")

    # Missing token
    res = await client.put("/users/{}".format(users[0]["uuid"]), json=new_user)
    assert res.status == 401

    # Valid request
    res = await client.put(
        "/users/{}".format(users[0]["uuid"]),
        json=new_user,
        headers={"Authorization": token_user},
    )
    assert res.status == 200

    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], dict)

    updated_user = await get_one(User, id=1)
    updated_user = updated_user.to_dict()
    updated_user["id"] = updated_user.pop("uuid")
    assert profile_created_from_origin(new_user, updated_user)


async def test_replace_user_with_invalid_args(client, users):
    res = await client.put("/users/{}".format(users[0]["uuid"]), json={})
    assert res.status == 400

    res = await client.put("/users/{}".format(users[0]["uuid"]), json={"id": 4})
    assert res.status == 400

    res = await client.put("/users/{}".format(users[0]["uuid"]), json={"full_name": ""})
    assert res.status == 400

    res = await client.put("/users/{}".format(users[0]["uuid"]), json={"full_name": ""})
    assert res.status == 400

    res = await client.put(
        "/users/{}".format(users[0]["uuid"]), json={"full_name": "Josh", "password": ""}
    )
    assert res.status == 400

    res = await client.put("/users/{}".format(users[0]["uuid"]), json={"email": ""})
    assert res.status == 400

    res = await client.put("/users/{}".format(users[0]["uuid"]), json={"location": 2})
    assert res.status == 400

    res = await client.put("/users/{}".format(users[0]["uuid"]), json={"created_at": 2})
    assert res.status == 400

    res = await client.put("/users/{}".format(users[0]["uuid"]), json={"updated_at": 2})
    assert res.status == 400

    # Invalid or weak password
    res = await client.put(
        "/users/{}".format(users[0]["uuid"]),
        json={"full_name": "Josh", "password": "mmmw"},
    )
    assert res.status == 400

    res = await client.put(
        "/users/{}".format(users[0]["uuid"]),
        json={"full_name": "Josh", "password": "qweon@qweqweklasl"},
    )
    assert res.status == 400

    # Assert no new users are created
    all_users = await User.query.gino.all()
    assert len(all_users) == len(users)
    updated_user = await get_one(User, id=1)
    updated_user = updated_user.to_dict()
    updated_user["id"] = updated_user.pop("uuid")
    assert profile_created_from_origin(users[0], updated_user)


## DELETE ##


# async def test_delete_user(client, users, token_admin, token_mod, token_user):
#     # As admin
#     res = await client.delete("/users?id=7", headers={"Authorization": token_admin})
#     assert res.status == 200
#
#     body = await res.json()
#     assert "data" in body
#     assert body["data"] is None
#
#     all_users = await User.query.gino.all()
#     assert len(all_users) == len(users)
#     disabled_users_count = 0
#     for user in all_users:
#         if user.to_dict()["disabled"]:
#             disabled_users_count += 1
#     assert disabled_users_count == 1
#
#     # Without token
#     res = await client.delete("/users?id=7")
#     assert res.status == 401
#
#     # As mod
#     res = await client.delete("/users?id=7", headers={"Authorization": token_mod})
#     assert res.status == 401
#
#     # As user
#     res = await client.delete("/users?id=7", headers={"Authorization": token_user})
#     assert res.status == 401
#
#     # No new users are "deleted"
#     all_users = await User.query.gino.all()
#     assert len(all_users) == len(users)
#     disabled_users_count = 0
#     for user in all_users:
#         if user.to_dict()["disabled"]:
#             disabled_users_count += 1
#     assert disabled_users_count == 1


# async def test_delete_user_self(client, users, token_user):
#     # User can only "delete" himself/herself
#     res = await client.delete("/users?id=23", headers={"Authorization": token_user})
#     assert res.status == 200
#
#     # No new users are "deleted"
#     all_users = await User.query.gino.all()
#     assert len(all_users) == len(users)
#
#     deleted_user = await User.get(id=23)
#     assert deleted_user["disabled"]
#
#     # Ensure only 1 user is "deleted"
#     disabled_users_count = 0
#     for user in all_users:
#         if user.to_dict()["disabled"]:
#             disabled_users_count += 1
#     assert disabled_users_count == 1
