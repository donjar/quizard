import { IQuiz } from '../../../../interfaces/home';

export const CREATED_QUIZZES_SELECTED = 'CREATED_QUIZZES_SELECTED';
export const ATTEMPTED_QUIZZES_SELECTED = 'ATTEMPTED_QUIZZES_SELECTED';
export const ONGOING_QUIZZES_SELECTED = 'ONGOING_QUIZZES_SELECTED';
export const TOGGLE_QUIZ_TYPE = 'TOGGLE_QUIZ_TYPE';
export const SET_CREATED_QUIZZES_TYPE = 'SET_CREATED_QUIZZES_TYPE';
export const SET_ATTEMPTED_QUIZZES_TYPE = 'SET_ATTEMPTED_QUIZZES_TYPE';
export const SET_ONGOING_QUIZZES_TYPE = 'SET_ONGOING_QUIZZES_TYPE';

export interface IToggleQuizTypePayload {
  quizTypeSelected: string;
}

export interface ISetCreatedQuizzesAction {
  type: typeof SET_CREATED_QUIZZES_TYPE;
  payload: IQuiz[];
}

export interface ISetAttemptedQuizzesAction {
  type: typeof SET_ATTEMPTED_QUIZZES_TYPE;
  payload: IQuiz[];
}

export interface ISetOngoingQuizzesAction {
  type: typeof SET_ONGOING_QUIZZES_TYPE;
  payload: IQuiz[];
}

export interface IToggleQuizTypeAction {
  type: typeof TOGGLE_QUIZ_TYPE;
  payload: IToggleQuizTypePayload;
}

export type IHomeActionTypes =
  | ISetCreatedQuizzesAction
  | ISetAttemptedQuizzesAction
  | ISetOngoingQuizzesAction
  | IToggleQuizTypeAction;
