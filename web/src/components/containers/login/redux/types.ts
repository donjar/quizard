export const SET_EMAIL_ERROR = 'SET_EMAIL_ERROR_LOGIN';
export const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR_LOGIN';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const PERFORM_LOGIN = 'PERFORM_LOGIN';

export interface ISetEmailErrorAction {
  type: typeof SET_EMAIL_ERROR;
  payload: string;
}

export interface ISetPasswordErrorAction {
  type: typeof SET_PASSWORD_ERROR;
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
  | ISetEmailErrorAction
  | ISetPasswordErrorAction
  | IChangeEmailAction
  | IChangePasswordAction
  | IPerformLoginAction;
