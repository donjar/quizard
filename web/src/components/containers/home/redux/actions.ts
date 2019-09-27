import { IQuiz } from '../../../../interfaces/home';
import {
  IHomeActionTypes,
  SET_ATTEMPTED_QUIZZES_TYPE,
  SET_CREATED_QUIZZES_TYPE,
  SET_ONGOING_QUIZZES_TYPE,
  TOGGLE_QUIZ_TYPE
} from './types';

export const toggleQuizType = (quizTypeSelected: string): IHomeActionTypes => ({
  payload: { quizTypeSelected },
  type: TOGGLE_QUIZ_TYPE
});

export const setCreatedQuizzes = (questions: IQuiz[]): IHomeActionTypes => ({
  payload: questions,
  type: SET_CREATED_QUIZZES_TYPE
});

export const setAttemptedQuizzes = (questions: IQuiz[]): IHomeActionTypes => ({
  payload: questions,
  type: SET_ATTEMPTED_QUIZZES_TYPE
});

export const setOngoingQuizzes = (questions: IQuiz[]): IHomeActionTypes => ({
  payload: questions,
  type: SET_ONGOING_QUIZZES_TYPE
});
