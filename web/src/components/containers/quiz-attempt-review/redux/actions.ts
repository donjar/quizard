import { IAttemptedQuiz } from '../../../../interfaces/quiz-create-summary';
import { IQuizAttemptReviewActionTypes, SET_QUIZ } from './types';

export const setQuiz = (quiz: IAttemptedQuiz): IQuizAttemptReviewActionTypes => {
  return {
    payload: quiz,
    type: SET_QUIZ
  };
};
