import { IQuiz } from '../../../../interfaces/quiz-create-summary';
import { IQuizCreateSummaryActionTypes, SET_QUIZ_CREATE_SUMMARY } from './types';

export const setQuizCreateSummary = (quiz: IQuiz): IQuizCreateSummaryActionTypes => {
  return {
    payload: quiz,
    type: SET_QUIZ_CREATE_SUMMARY
  };
};
