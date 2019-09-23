import { IQuiz } from '../../../../interfaces/quiz-start';

export const SET_QUIZ_START_STATE = 'SET_QUIZ_START_STATE';

export interface ISetQuizAction {
  type: typeof SET_QUIZ_START_STATE;
  payload: IQuiz;
}

export type IQuizStartActionTypes =
  | ISetQuizAction;
