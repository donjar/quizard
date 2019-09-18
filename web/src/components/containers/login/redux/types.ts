export const SET_ERROR = 'SET_ERROR';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const PERFORM_LOGIN = 'PERFORM_LOGIN';

export interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export interface IChangeEmailAction {
  type: typeof CHANGE_EMAIL;
  payload: string;
}

export interface IChangePasswordAction {
  type: typeof CHANGE_PASSWORD;
  payload: string;
}

export interface IPerformLoginAction {
  type: typeof PERFORM_LOGIN;
}

export type ILoginActionTypes =
  | ISetErrorAction
  | IChangeEmailAction
  | IChangePasswordAction
  | IPerformLoginAction;
