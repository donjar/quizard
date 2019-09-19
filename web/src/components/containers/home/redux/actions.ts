import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../../store/store';
import {
  FIRST_ACTION,
  IHomeActionTypes,
  IPayload,
  TOGGLE_QUIZ_TYPE
} from './types';

export const simpleAction = (
  payload: IPayload
): ThunkAction<void, AppState, void, AnyAction> => (dispatch) => {
  dispatch({
    payload,
    type: FIRST_ACTION
  });
};

export const toggleQuizType = (quizTypeSelected: string): IHomeActionTypes => ({
  payload: { quizTypeSelected },
  type: TOGGLE_QUIZ_TYPE
});
