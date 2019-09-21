import { IRegisterState } from '../../../../interfaces/register';
import initialState from './initialState';
import { CHANGE_EMAIL, CHANGE_FULL_NAME, CHANGE_PASSWORD, IRegisterActionTypes, PERFORM_REGISTER, SET_ERROR } from './types';

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
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
