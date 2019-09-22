from quizard_backend.models import QuizAnswer
from quizard_backend.utils.query import get_many_with_count_and_group_by
from quizard_backend.utils.views.quiz_question import extract_quiz_questions_from_quiz


async def extract_stats_from_quiz(quiz_id, requester):
    question_ids, questions_dict, questions = await extract_quiz_questions_from_quiz(
        quiz_id, requester, allow_readonly=True
    )

    question_answer_counts = await get_many_with_count_and_group_by(
        QuizAnswer,
        columns=["question_id", "selected_option"],
        in_column="question_id",
        in_values=question_ids,
    )

    # Get the count
    stats = {}
    for ques_ans_count in question_answer_counts:
        question_id, _selected_option, _count = ques_ans_count

        # Default stats for each question
        num_options = len(questions_dict[question_id]["options"])
        cur_question_stats = [0] * num_options

        # Update the option's count
        stats.setdefault(question_id, {}).setdefault("count", cur_question_stats)[
            _selected_option
        ] = _count

    # Convert count to percentage
    for question_id, stats_value in stats.items():
        stats_count = stats_value["count"]
        total_count = sum(stats_count)
        stats[question_id]["percentage"] = [
            round(float(val) / total_count * 100, 2) for val in stats_count
        ]

    # Inject stats to `questions`
    for question in questions:
        # Store default values of 0, instead of leaving `stats` to be empty
        if question["id"] not in stats:
            zero_list = [0] * len(question["options"])
            question["stats"] = {"count": zero_list, "percentage": zero_list}
            continue

        question["stats"] = stats.get(question["id"], {})

    return questions
