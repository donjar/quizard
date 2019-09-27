import { CHANGE_EMAIL, CHANGE_PASSWORD, ILoginActionTypes, PERFORM_LOGIN, SET_EMAIL_ERROR, SET_PASSWORD_ERROR } from './types';

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

export const setEmailError = (error?: string): ILoginActionTypes => {
  return {
    payload: error,
    type: SET_EMAIL_ERROR
  };
};

export const setPasswordError = (error?: string): ILoginActionTypes => {
  return {
    payload: error,
    type: SET_PASSWORD_ERROR
  };
};
