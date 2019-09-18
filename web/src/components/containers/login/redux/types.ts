export const SET_ERROR = 'SET_ERROR';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export interface IAccessToken {
  accessToken: string;
  refreshToken: string;
}

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

export interface ISetAccessTokenAction {
  type: typeof SET_ACCESS_TOKEN;
  payload: IAccessToken;
}

export type ILoginActionTypes =
  | ISetErrorAction
  | IChangeEmailAction
  | IChangePasswordAction
  | ISetAccessTokenAction;
