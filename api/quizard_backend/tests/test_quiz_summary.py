from quizard_backend.models import Quiz, User
from quizard_backend.tests import get_access_token_for_user


async def create_fake_answers_for_summary(
    quiz_index, app, client, users, questions, quizzes
):
    token_1 = await get_access_token_for_user(users[5], app=app)
    token_2 = await get_access_token_for_user(users[10], app=app)

    ## CREATE AN ANSWER FOR QUESTION 3
    selected_option_3 = 2
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][3]["id"]
        ),
        json={"selected_option": selected_option_3},
        headers={"Authorization": token_1},
    )
    assert res.status == 200

    ## CREATE AN ANSWER FOR QUESTION 2
    selected_option_2 = 2
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][2]["id"]
        ),
        json={"selected_option": selected_option_2},
        headers={"Authorization": token_1},
    )
    assert res.status == 200

    ## CREAT AN ANSWER FOR QUESTION 0
    selected_option_0 = 0
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][0]["id"]
        ),
        json={"selected_option": selected_option_0},
        headers={"Authorization": token_1},
    )
    assert res.status == 200

    ## CREAT AN ANSWER FOR QUESTION 1
    selected_option_1 = 3
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][1]["id"]
        ),
        json={"selected_option": selected_option_1},
        headers={"Authorization": token_1},
    )
    assert res.status == 200

    ## CREATE AND ANSWER USING TOKEN 2
    selected_option_3_token_2 = 1
    res = await client.post(
        "/quizzes/{}/questions/{}/answers".format(
            quizzes[quiz_index]["id"], questions[quiz_index][3]["id"]
        ),
        json={"selected_option": selected_option_3_token_2},
        headers={"Authorization": token_2},
    )
    assert res.status == 200

    return {
        questions[quiz_index][0]["id"]: [1, 0, 0, 0],
        questions[quiz_index][1]["id"]: [0, 0, 0, 1],
        questions[quiz_index][2]["id"]: [0, 0, 1, 0],
        questions[quiz_index][3]["id"]: [0, 1, 1, 0],
    }


async def test_get_summary_of_quiz(app, client, users, questions, quizzes):
    quiz_index = 12
    quiz_creator_id = (await Quiz.get(id=quizzes[quiz_index]["id"]))["creator_id"]
    quiz_creator = await User.get(id=quiz_creator_id)
    creator_token = await get_access_token_for_user(quiz_creator, app=app)

    # Create mockup answers
    answers_stats = await create_fake_answers_for_summary(
        quiz_index, app, client, users, questions, quizzes
    )

    # Without token
    res = await client.get("/quizzes/{}/summary".format(quizzes[quiz_index]["id"]))
    assert res.status == 401

    # Non-creator user
    non_creator_id = ""
    for user in users:
        if user["id"] != quiz_creator_id:
            non_creator_id = user["id"]
            break
    non_creator = await User.get(id=non_creator_id)
    non_creator_token = await get_access_token_for_user(non_creator, app=app)

    res = await client.get(
        "/quizzes/{}/summary".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": non_creator_token},
    )
    assert res.status == 403

    # Valid user
    res = await client.get(
        "/quizzes/{}/summary".format(quizzes[quiz_index]["id"]),
        headers={"Authorization": creator_token},
    )
    assert res.status == 200
    body = await res.json()
    assert "data" in body
    assert isinstance(body["data"], list)
    for question in body["data"]:
        assert (
            answers_stats.get(question["id"], [0, 0, 0, 0])
            == question["stats"]["count"]
        )
