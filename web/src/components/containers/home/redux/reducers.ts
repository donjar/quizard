import { IHomeState } from '../../../../interfaces/home';
import initialState from './initialState';
import { IHomeActionTypes, SET_ATTEMPTED_QUIZZES_TYPE, SET_CREATED_QUIZZES_TYPE, TOGGLE_QUIZ_TYPE } from './types';

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
    case SET_ATTEMPTED_QUIZZES_TYPE:
      return {
        ...state,
        attemptedQuizList: action.payload
      };
    case SET_CREATED_QUIZZES_TYPE:
      return {
        ...state,
        createdQuizList: action.payload
      };
    default:
      return state;
  }
}
