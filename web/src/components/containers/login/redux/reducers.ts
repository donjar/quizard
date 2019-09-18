import { ILoginState } from '../../../../interfaces/login';
import initialState from './initialState';
import { CHANGE_EMAIL, CHANGE_PASSWORD, ILoginActionTypes, SET_ACCESS_TOKEN, SET_ERROR } from './types';

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
    case SET_ACCESS_TOKEN:
      const { accessToken, refreshToken } = action.payload;
      return {
        email: state.email,
        password: state.password,
        accessToken,
        refreshToken,
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
