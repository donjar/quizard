import { IQuiz } from '../../../../interfaces/quiz-start';
import { IQuizStartActionTypes, SET_QUIZ } from './types';

export const setQuiz = (quiz: IQuiz): IQuizStartActionTypes => {
  return {
    payload: quiz,
    type: SET_QUIZ
  };
};
