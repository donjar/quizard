import { IQuiz } from '../../../../interfaces/quiz-create-summary';

export const SET_QUIZ_CREATE_SUMMARY = 'SET_QUIZ_CREATE_SUMMARY';

export interface ISetQuizAction {
  type: typeof SET_QUIZ_CREATE_SUMMARY;
  payload: IQuiz;
}

export type IQuizCreateSummaryActionTypes =
  | ISetQuizAction;
