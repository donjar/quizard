export const FIRST_ACTION = 'FIRST_ACTION';
export const CREATED_QUIZZES_SELECTED = 'CREATED_QUIZZES_SELECTED';
export const ATTEMPTED_QUIZZES_SELECTED = 'ATTEMPTED_QUIZZES_SELECTED';
export const TOGGLE_QUIZ_TYPE = 'TOGGLE_QUIZ_TYPE';

export interface IPayload {
  data: string;
}

export interface IFirstAction {
  type: typeof FIRST_ACTION;
  payload: IPayload;
}

export interface IToggleQuizTypePayload {
  quizTypeSelected: string;
}

export interface IToggleQuizTypeAction {
  type: typeof TOGGLE_QUIZ_TYPE;
  payload: IToggleQuizTypePayload;
}

export type IHomeActionTypes = IToggleQuizTypeAction;
