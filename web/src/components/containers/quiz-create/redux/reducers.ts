import produce from 'immer';
import { IQuizCreateState } from '../../../../interfaces/quiz-create';
import initialState from './initialState';
import {
  ADD_ANSWER_OPTION,
  ADD_QUESTION,
  CHANGE_ANSWER_OPTION,
  CHANGE_DESCRIPTION,
  CHANGE_NAME,
  CHANGE_QUESTION_TEXT,
  DELETE_ANSWER_OPTION,
  DELETE_QUESTION,
  IQuizCreateActionTypes,
  QUIZ_CREATE_RESET,
  QUIZ_CREATED,
  SET_CORRECT_ANSWER,
  SET_ERROR
} from './types';

// TODO: split into smaller reducers
// TODO: make modifiers to abstract out logic of reduction
export default function quizCreateReducer(
  state = initialState,
  action: IQuizCreateActionTypes
): IQuizCreateState {
  switch (action.type) {
    case ADD_QUESTION:
      return produce(state, (draft) => {
        draft.questions.push(action.payload);
      });

    case DELETE_QUESTION:
      return produce(state, (draft) => {
        draft.questions.splice(action.payload, 1);
      });

    case ADD_ANSWER_OPTION:
      return produce(state, (draft) => {
        draft.questions[action.payload].options.push('');
      });

    case DELETE_ANSWER_OPTION:
      return produce(state, (draft) => {
        const newQuestion = draft.questions[action.payload.questionIdx];
        newQuestion
          .options
          .splice(action.payload.optionIdx, 1);
        if (
          newQuestion.options.length > 0 &&
          newQuestion.correctOption >= newQuestion.options.length
        ) {
          newQuestion.correctOption = newQuestion.options.length - 1;
        }
      });

    case CHANGE_ANSWER_OPTION:
      return produce(state, (draft) => {
        draft
          .questions[action.payload.questionIdx]
          .options[
            action.payload.optionIdx
          ] = action.payload.newAnswerOption;
      });

    case SET_CORRECT_ANSWER:
      return produce(state, (draft) => {
        draft
          .questions[action.payload.questionIdx]
          .correctOption = action.payload.optionIdx;
      });

    case CHANGE_NAME:
      return produce(state, (draft) => {
        draft.name = action.payload;
      });

    case CHANGE_DESCRIPTION:
      return produce(state, (draft) => {
        draft.description = action.payload;
      });

    case CHANGE_QUESTION_TEXT:
      return produce(state, (draft) => {
        draft
          .questions[action.payload.questionIdx]
          .text = action.payload.newText;
      });

    case SET_ERROR:
      return produce(state, (draft) => {
        draft.error = action.payload;
      });

    case QUIZ_CREATED:
      return produce(state, (draft) => {
        draft.createdQuizId = action.payload;
      });

    case QUIZ_CREATE_RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
