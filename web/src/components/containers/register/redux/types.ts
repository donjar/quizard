export const SET_EMAIL_ERROR = 'SET_EMAIL_ERROR_REGISTER';
export const SET_FULL_NAME_ERROR = 'SET_FULL_NAME_ERROR_REGISTER';
export const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR_REGISTER';
export const CHANGE_FULL_NAME = 'CHANGE_FULL_NAME';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const PERFORM_REGISTER = 'PERFORM_REGISTER';

export interface ISetEmailErrorAction {
  type: typeof SET_EMAIL_ERROR;
  payload?: string;
}

export interface ISetFullNameErrorAction {
  type: typeof SET_FULL_NAME_ERROR;
  payload?: string;
}

export interface ISetPasswordErrorAction {
  type: typeof SET_PASSWORD_ERROR;
  payload?: string;
}

export interface IChangeFullNameAction {
  type: typeof CHANGE_FULL_NAME;
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

export interface IPerformRegisterAction {
  type: typeof PERFORM_REGISTER;
}

export type IRegisterActionTypes =
  | ISetEmailErrorAction
  | ISetFullNameErrorAction
  | ISetPasswordErrorAction
  | IChangeFullNameAction
  | IChangeEmailAction
  | IChangePasswordAction
  | IPerformRegisterAction;
