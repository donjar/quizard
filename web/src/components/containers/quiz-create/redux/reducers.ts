import { IQuizCreateState } from '../../../../interfaces/quiz-create';
import initialState from './initialState';
import {
  ADD_ANSWER_OPTION,
  ADD_QUESTION,
  CHANGE_ANSWER_OPTION,
  CHANGE_NAME,
  CHANGE_QUESTION_TEXT,
  DELETE_ANSWER_OPTION,
  DELETE_QUESTION,
  IQuizCreateActionTypes,
  QUIZ_CREATED,
  SET_CORRECT_ANSWER,
  SET_ERROR,
  CHANGE_DESCRIPTION
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
        ...state,
        questions: [...state.questions, action.payload]
      };
    case DELETE_QUESTION:
      newQuestions.splice(action.payload, 1);
      return {
        ...state,
        questions: newQuestions
      };
    case ADD_ANSWER_OPTION:
      newQuestions[action.payload].options.push('');
      return {
        ...state,
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
      return { ...state, questions: newQuestions };

    case CHANGE_ANSWER_OPTION:
      newQuestions[action.payload.questionIdx].options[
        action.payload.optionIdx
      ] = action.payload.newAnswerOption;
      return { ...state, questions: newQuestions };

    case SET_CORRECT_ANSWER:
      newQuestions[action.payload.questionIdx].correctOption =
        action.payload.optionIdx;
      return { ...state, questions: newQuestions };

    case CHANGE_NAME:
      return { ...state, name: action.payload };

    case CHANGE_DESCRIPTION:
        return { ...state, description: action.payload };

    case CHANGE_QUESTION_TEXT:
      newQuestions[action.payload.questionIdx].text =
        action.payload.newText;
      return { ...state, questions: newQuestions };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case QUIZ_CREATED:
      return {
        ...state,
        createdQuizId: action.payload
      };

    default:
      return state;
  }
}
