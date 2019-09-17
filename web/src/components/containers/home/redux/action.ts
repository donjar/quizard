import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../../store/store';
import { FIRST_ACTION, IPayload } from './types';

export const simpleAction = (
  payload: IPayload
): ThunkAction<void, AppState, void, AnyAction> => (dispatch) => {
  dispatch({
    payload,
    type: FIRST_ACTION
  });
};
