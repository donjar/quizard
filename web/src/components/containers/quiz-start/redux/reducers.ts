import { IQuizStartState } from '../../../../interfaces/quiz-start';
import initialState from './initialState';
import {
  IQuizStartActionTypes,
  SET_QUIZ
} from './types';

export default function quizStartReducer(
  state = initialState,
  action: IQuizStartActionTypes
): IQuizStartState {
  switch (action.type) {
    case SET_QUIZ:
      return action.payload;

    default:
      return state;
  }
}
