import { IQuizCreateSummaryState } from '../../../../interfaces/quiz-create-summary';
import initialState from './initialState';
import {
  IQuizCreateSummaryActionTypes,
  SET_QUIZ_CREATE_SUMMARY
} from './types';

export default function quizCreateSummaryReducer(
  state = initialState,
  action: IQuizCreateSummaryActionTypes
): IQuizCreateSummaryState {
  switch (action.type) {
    case SET_QUIZ_CREATE_SUMMARY:
      return action.payload;

    default:
      return state;
  }
}
