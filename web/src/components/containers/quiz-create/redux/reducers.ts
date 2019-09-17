import { IQuizCreateState } from '../../../../interfaces/quiz-create';
import initialState from './initialState';
import {
  ADD_ANSWER_OPTION,
  ADD_QUESTION,
  CHANGE_ANSWER_OPTION,
  DELETE_ANSWER_OPTION,
  DELETE_QUESTION,
  IQuizCreateActionTypes,
  SET_CORRECT_ANSWER
} from './types';

// TODO: split into smaller reducers
// TODO: make modifiers to abstract out logic of reduction
export default function quizCreateReducer(
  state = initialState,
  action: IQuizCreateActionTypes
): IQuizCreateState {
  const newQuestions = [...state.questions];

  switch (action.type) {
    case ADD_QUESTION:
      return {
        questions: [...state.questions, action.payload]
      };
    case DELETE_QUESTION:
      newQuestions.splice(action.payload, 1);
      return {
        questions: newQuestions
      };
    case ADD_ANSWER_OPTION:
      newQuestions[action.payload].options.push('');
      return {
        questions: newQuestions
      };
    case DELETE_ANSWER_OPTION:
      const newQuestion = { ...state.questions[action.payload.questionIdx] };
      newQuestion.options.splice(action.payload.optionIdx, 1);
      if (
        newQuestion.options.length > 0 &&
        newQuestion.correctOption >= newQuestion.options.length
      ) {
        newQuestion.correctOption = newQuestion.options.length - 1;
      }

      newQuestions[action.payload.questionIdx] = newQuestion;
      return { questions: newQuestions };

    case CHANGE_ANSWER_OPTION:
      newQuestions[action.payload.questionIdx].options[
        action.payload.optionIdx
      ] = action.payload.newAnswerOption;
      return { questions: newQuestions };

    case SET_CORRECT_ANSWER:
      newQuestions[action.payload.questionIdx].correctOption =
        action.payload.optionIdx;
      return { questions: newQuestions };

    default:
      return state;
  }
}
