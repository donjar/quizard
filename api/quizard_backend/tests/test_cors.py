async def test_check_cors_is_working(client, quizzes, token_user):
    res = await client.get(
        "/quizzes/{}".format(quizzes[2]["id"]), headers={"Authorization": token_user}
    )
    assert res.status == 200
    assert "access-control-allow-origin" in res.headers
    assert res.headers["access-control-allow-origin"] == "*"
