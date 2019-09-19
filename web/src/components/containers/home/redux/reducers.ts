import { IHomeState } from '../../../../interfaces/home';
import initialState from './initialState';
import { IHomeActionTypes, TOGGLE_QUIZ_TYPE } from './types';

export default function reducer(
  state = initialState,
  action: IHomeActionTypes
): IHomeState {
  switch (action.type) {
    case TOGGLE_QUIZ_TYPE:
      return {
        ...state,
        quizTypeSelected: action.payload.quizTypeSelected
      };
    default:
      return state;
  }
}
