async def test_login_user(client, users):
    for user in users[-1:-4]:
        res = await client.post(
            "/login", json={"email": user["email"], "password": user["password"]}
        )
        assert res.status == 200

        body = await res.json()
        assert "data" in body
        assert isinstance(body["data"], dict)
        assert "access_token" in body and "refresh_token" in body

    # Login with wrong password
    user = users[-1]
    res = await client.post(
        "/login", json={"email": user["email"], "password": "qkwlemk123l1kn"}
    )
    assert res.status == 401

    # Login with weak password
    user = users[-1]
    res = await client.post("/login", json={"email": user["email"], "password": "0"})
    assert res.status == 400

    # Login with missing password
    user = users[-1]
    res = await client.post("/login", json={"email": user["email"]})
    assert res.status == 400

    # Login with missing email
    user = users[-1]
    res = await client.post("/login", json={"password": user["password"]})
    assert res.status == 400
