import { IQuizCreateSummaryState } from '../../../../interfaces/quiz-create-summary';
import initialState from './initialState';
import {
  IQuizCreateSummaryActionTypes,
  SET_QUIZ
} from './types';

export default function quizCreateSummaryReducer(
  state = initialState,
  action: IQuizCreateSummaryActionTypes
): IQuizCreateSummaryState {
  switch (action.type) {
    case SET_QUIZ:
      return action.payload;

    default:
      return state;
  }
}
