import { IQuiz } from '../../../../interfaces/quiz-start';

export const SET_QUIZ = 'SET_QUIZ';

export interface ISetQuizAction {
  type: typeof SET_QUIZ;
  payload: IQuiz;
}

export type IQuizStartActionTypes =
  | ISetQuizAction;
