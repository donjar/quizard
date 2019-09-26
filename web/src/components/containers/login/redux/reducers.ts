import { ILoginState } from '../../../../interfaces/login';
import initialState from './initialState';
import { CHANGE_EMAIL, CHANGE_PASSWORD, ILoginActionTypes, PERFORM_LOGIN, SET_EMAIL_ERROR, SET_PASSWORD_ERROR } from './types';

export default function loginReducer(
  state = initialState,
  action: ILoginActionTypes
): ILoginState {
  switch (action.type) {
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
    case PERFORM_LOGIN:
      return {
        email: state.email,
        password: state.password,
        loggedIn: true
      };
    case SET_EMAIL_ERROR:
      return {
        ...state,
        emailError: action.payload,
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
