import { IAttemptedQuiz } from '../../../../interfaces/quiz-create-summary';

export const SET_QUIZ = 'SET_QUIZ';

export interface ISetQuizAction {
  type: typeof SET_QUIZ;
  payload: IAttemptedQuiz;
}

export type IQuizAttemptReviewActionTypes =
  | ISetQuizAction;
