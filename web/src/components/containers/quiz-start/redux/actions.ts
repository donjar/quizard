import { IQuiz } from '../../../../interfaces/quiz-start';
import { IQuizStartActionTypes, SET_QUIZ_START_STATE } from './types';

export const setQuiz = (quiz: IQuiz): IQuizStartActionTypes => {
  return {
    payload: quiz,
    type: SET_QUIZ_START_STATE
  };
};
