import { IQuestion } from '../../../../interfaces/quiz-create';

export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const ADD_ANSWER_OPTION = 'ADD_ANSWER_OPTION';
export const DELETE_ANSWER_OPTION = 'DELETE_ANSWER_OPTION';
export const CHANGE_ANSWER_OPTION = 'CHANGE_ANSWER_OPTION';
export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_QUESTION_TEXT = 'CHANGE_QUESTION_TEXT';
export const SET_ERROR = 'SET_ERROR';

// TODO: Shift common interfaces into interfaces folder
export interface IAnswerOption {
  questionIdx: number;
  optionIdx: number;
}

export interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export interface IChangeAnswerOption extends IAnswerOption {
  newAnswerOption: string;
}

export interface IChangeQuestionText {
  questionIdx: number;
  newText: string;
}

export interface IAddQuestionAction {
  type: typeof ADD_QUESTION;
  payload: IQuestion;
}

export interface IDeleteQuestionAction {
  type: typeof DELETE_QUESTION;
  payload: number;
}

export interface IAddAnswerOptionAction {
  type: typeof ADD_ANSWER_OPTION;
  payload: number;
}

export interface IDeleteAnswerOptionAction {
  type: typeof DELETE_ANSWER_OPTION;
  payload: IAnswerOption;
}

export interface IChangeAnswerOptionAction {
  type: typeof CHANGE_ANSWER_OPTION;
  payload: IChangeAnswerOption;
}

export interface ISetCorrectAnswerAction {
  type: typeof SET_CORRECT_ANSWER;
  payload: IAnswerOption;
}

export interface IChangeNameAction {
  type: typeof CHANGE_NAME;
  payload: string;
}

export interface IChangeQuestionTextAction {
  type: typeof CHANGE_QUESTION_TEXT;
  payload: IChangeQuestionText;
}

export type IQuizCreateActionTypes =
  | IAddQuestionAction
  | IDeleteQuestionAction
  | IAddAnswerOptionAction
  | IDeleteAnswerOptionAction
  | IChangeAnswerOptionAction
  | ISetCorrectAnswerAction
  | IChangeNameAction
  | IChangeQuestionTextAction
  | ISetErrorAction;
