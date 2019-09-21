export const SET_ERROR = 'SET_ERROR_REGISTER';
export const CHANGE_FULL_NAME = 'CHANGE_FULL_NAME';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const PERFORM_REGISTER = 'PERFORM_REGISTER';

export interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
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
  | ISetErrorAction
  | IChangeFullNameAction
  | IChangeEmailAction
  | IChangePasswordAction
  | IPerformRegisterAction;
