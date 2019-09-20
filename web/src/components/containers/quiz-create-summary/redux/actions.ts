import { IQuiz } from '../../../../interfaces/quiz-create-summary';
import { IQuizCreateSummaryActionTypes, SET_QUIZ } from './types';

export const setQuiz = (quiz: IQuiz): IQuizCreateSummaryActionTypes => {
  return {
    payload: quiz,
    type: SET_QUIZ
  };
};
