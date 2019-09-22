import produce from 'immer';
import { IQuizState, OPTION_CORRECT, OPTION_INCORRECT } from '../../../../interfaces/quiz-question';
import initialState from './initialState';
import {
  GOTO_NEXT_QUESTION,
  IQuizQuestionActionTypes,
  SELECT_CORRECT_QUESTION_OPTION,
  SELECT_INCORRECT_QUESTION_OPTION,
  SELECT_QUESTION_OPTION,
  SET_QUESTIONS
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
        if (draft.currQuestionIdx >= draft.questions.length) {
          action.payload.history.push(`/quiz-complete`);
        }
        draft.disableSelection = false;
        draft.showNext = false;
      });

    case SET_QUESTIONS:
      return produce(state, (draft) => {
        draft.questions = action.payload.questions;
      });

    default:
      return state;
  }
}
