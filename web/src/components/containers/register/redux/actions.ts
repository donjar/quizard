import { CHANGE_EMAIL, CHANGE_FULL_NAME, CHANGE_PASSWORD, IRegisterActionTypes, PERFORM_REGISTER, SET_ERROR } from './types';

export const changeFullName = (newName: string): IRegisterActionTypes => {
  return {
    payload: newName,
    type: CHANGE_FULL_NAME
  };
};

export const changeEmail = (newEmail: string): IRegisterActionTypes => {
  return {
    payload: newEmail,
    type: CHANGE_EMAIL
  };
};

export const changePassword = (newPassword: string): IRegisterActionTypes => {
  return {
    payload: newPassword,
    type: CHANGE_PASSWORD
  };
};

export const performRegister = (): IRegisterActionTypes => {
  return {
    type: PERFORM_REGISTER
  };
};

export const setError = (error: string): IRegisterActionTypes => {
  return {
    payload: error,
    type: SET_ERROR
  };
};
