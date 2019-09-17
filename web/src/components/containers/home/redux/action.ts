import { FIRST_ACTION, Payload } from './types';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../../store/store';
import { AnyAction } from 'redux';

export const simpleAction = (
  payload: Payload
): ThunkAction<void, AppState, void, AnyAction> => dispatch => {
  dispatch({
    type: FIRST_ACTION,
    payload: payload
  });
};
