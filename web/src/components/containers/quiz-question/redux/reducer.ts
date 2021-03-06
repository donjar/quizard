import produce from 'immer';
import { IQuizState, OPTION_CORRECT, OPTION_INCORRECT } from '../../../../interfaces/quiz-question';
import initialState from './initialState';
import {
  GOTO_NEXT_QUESTION,
  IQuizQuestionActionTypes,
  SELECT_CORRECT_QUESTION_OPTION,
  SELECT_INCORRECT_QUESTION_OPTION,
  SELECT_QUESTION_OPTION,
  SET_OWL_EMOTION,
  SET_QUESTIONS,
  START_QUIZ
} from './types';

export default function quizQuestionReducer(
  state = initialState,
  action: IQuizQuestionActionTypes
): IQuizState {
  switch (action.type) {
    case SELECT_QUESTION_OPTION:
      return produce(state, (draft) => {
        draft.disableSelection = true;
      });

    case SELECT_CORRECT_QUESTION_OPTION:
      return produce(state, (draft) => {
        draft
          .questions[action.payload.questionIdx]
          .options[action.payload.optionIdx]
          .displayState = OPTION_CORRECT;
        draft.showNext = true;
      });

    case SELECT_INCORRECT_QUESTION_OPTION:
      return produce(state, (draft) => {
        draft
          .questions[action.payload.questionIdx]
          .options[action.payload.incorrectOptionIdx]
          .displayState = OPTION_INCORRECT;
        draft
          .questions[action.payload.questionIdx]
          .options[action.payload.correctOptionIdx]
          .displayState = OPTION_CORRECT;
        draft.showNext = true;
      });

    case GOTO_NEXT_QUESTION:
      return produce(state, (draft) => {
        draft.currQuestionIdx++;
        draft.disableSelection = false;
        draft.showNext = false;
        draft.happyOwl = true;
      });

    case SET_QUESTIONS:
      return produce(state, (draft) => {
        draft.questions = action.payload.questions;
      });

    case START_QUIZ:
      return { ...state, currQuestionIdx: action.payload.currentQuestionIdx };

    case SET_OWL_EMOTION:
      return { ...state, happyOwl: action.payload };

    default:
      return state;
  }
}
