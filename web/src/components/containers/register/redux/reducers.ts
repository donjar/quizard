import { IRegisterState } from '../../../../interfaces/register';
import initialState from './initialState';
import {
  CHANGE_EMAIL,
  CHANGE_FULL_NAME,
  CHANGE_PASSWORD,
  IRegisterActionTypes,
  PERFORM_REGISTER,
  SET_EMAIL_ERROR,
  SET_FULL_NAME_ERROR,
  SET_PASSWORD_ERROR
} from './types';

export default function loginReducer(
  state = initialState,
  action: IRegisterActionTypes
): IRegisterState {
  switch (action.type) {
    case CHANGE_FULL_NAME:
      return {
        ...state,
        fullName: action.payload,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case PERFORM_REGISTER:
      return {
        ...state,
        registered: true
      };
    case SET_EMAIL_ERROR:
      return {
        ...state,
        emailError: action.payload,
      };
    case SET_FULL_NAME_ERROR:
      return {
        ...state,
        fullNameError: action.payload,
      };
    case SET_PASSWORD_ERROR:
      return {
        ...state,
       passwordError: action.payload,
      };

    default:
      return state;
  }
}
