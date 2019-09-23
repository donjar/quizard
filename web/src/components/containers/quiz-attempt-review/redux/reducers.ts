import { IQuizAttemptReviewState } from '../../../../interfaces/quiz-create-summary';
import initialState from './initialState';
import {
  IQuizAttemptReviewActionTypes,
  SET_QUIZ
} from './types';

export default function quizAttemptReviewReducer(
  state = initialState,
  action: IQuizAttemptReviewActionTypes
): IQuizAttemptReviewState {
  switch (action.type) {
    case SET_QUIZ:
      return action.payload;

    default:
      return state;
  }
}
