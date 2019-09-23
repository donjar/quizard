import {
  IAnswerOptionPayload,
  IIncorrectAnswerOptionPayload,
  IQuestionsPayload,
  IStartQuizPayload
} from '../../../../interfaces/quiz-question';

export const SELECT_QUESTION_OPTION = 'SELECT_QUESTION_OPTION';
export const SELECT_CORRECT_QUESTION_OPTION = 'SELECT_CORRECT_QUESTION_OPTION';
export const SELECT_INCORRECT_QUESTION_OPTION = 'SELECT_INCORRECT_QUESTION_OPTION';
export const GOTO_NEXT_QUESTION = 'GOTO_NEXT_QUESTION';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const START_QUIZ = 'START_QUIZ';

export interface ISelectOptionAction {
  type: typeof SELECT_QUESTION_OPTION;
}

export interface ISelectCorrectOptionAction {
  type: typeof SELECT_CORRECT_QUESTION_OPTION;
  payload: IAnswerOptionPayload;
}

export interface ISelectIncorrectOptionAction {
  type: typeof SELECT_INCORRECT_QUESTION_OPTION;
  payload: IIncorrectAnswerOptionPayload;
}

export interface IGotoNextQuestionAction {
  type: typeof GOTO_NEXT_QUESTION;
  payload: any;
}

export interface IFetchQuestionsAction {
  type: typeof FETCH_QUESTIONS;
  payload: IQuestionsPayload;
}

export interface ISetQuestionsAction {
  type: typeof SET_QUESTIONS;
  payload: IQuestionsPayload;
}

export interface IStartQuizAction {
  type: typeof START_QUIZ;
  payload: IStartQuizPayload;
}

export type IQuizQuestionActionTypes =
  | ISelectOptionAction
  | ISelectCorrectOptionAction
  | ISelectIncorrectOptionAction
  | IGotoNextQuestionAction
  | IFetchQuestionsAction
  | ISetQuestionsAction
  | IStartQuizAction;
