import { CHANGE_EMAIL, CHANGE_PASSWORD, ILoginActionTypes, PERFORM_LOGIN, SET_ERROR } from './types';

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

export const performLogin = (): ILoginActionTypes => {
  return {
    type: PERFORM_LOGIN
  };
};

export const setError = (error: string): ILoginActionTypes => {
  return {
    payload: error,
    type: SET_ERROR
  };
};
