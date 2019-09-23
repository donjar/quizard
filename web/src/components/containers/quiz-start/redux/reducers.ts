import { IQuizStartState } from '../../../../interfaces/quiz-start';
import initialState from './initialState';
import {
  IQuizStartActionTypes,
  SET_QUIZ_START_STATE
} from './types';

export default function quizStartReducer(
  state = initialState,
  action: IQuizStartActionTypes
): IQuizStartState {
  switch (action.type) {
    case SET_QUIZ_START_STATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
