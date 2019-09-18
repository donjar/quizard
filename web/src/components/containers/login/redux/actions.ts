import { CHANGE_EMAIL, CHANGE_PASSWORD, IAccessToken, ILoginActionTypes, SET_ACCESS_TOKEN, SET_ERROR } from './types';

export const changeEmail = (newEmail: string): ILoginActionTypes => {
  return {
    payload: newEmail,
    type: CHANGE_EMAIL
  };
};

export const changePassword = (newPassword: string): ILoginActionTypes => {
  return {
    payload: newPassword,
    type: CHANGE_PASSWORD
  };
};

export const setAccessToken = (newAccessToken: IAccessToken): ILoginActionTypes => {
  return {
    payload: newAccessToken,
    type: SET_ACCESS_TOKEN
  };
};

export const setError = (error: string): ILoginActionTypes => {
  return {
    payload: error,
    type: SET_ERROR
  };
};
