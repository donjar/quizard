import { IQuiz } from '../../../../interfaces/quiz-create-summary';

export const SET_QUIZ = 'SET_QUIZ';

export interface ISetQuizAction {
  type: typeof SET_QUIZ;
  payload: IQuiz;
}

export type IQuizCreateSummaryActionTypes =
  | ISetQuizAction;
