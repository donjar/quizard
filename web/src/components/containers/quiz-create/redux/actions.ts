import { IQuestion } from '../../../../interfaces/quiz-create';
import {
  ADD_ANSWER_OPTION,
  ADD_QUESTION,
  CHANGE_ANSWER_OPTION,
  CHANGE_DESCRIPTION,
  CHANGE_NAME,
  CHANGE_QUESTION_TEXT,
  DELETE_ANSWER_OPTION,
  DELETE_QUESTION,
  IAnswerOption,
  IChangeAnswerOption,
  IChangeQuestionText,
  IQuizCreateActionTypes,
  QUIZ_CREATED,
  SET_CORRECT_ANSWER,
  SET_ERROR
} from './types';

export const addQuestion = (newQuestion: IQuestion): IQuizCreateActionTypes => {
  return {
    payload: newQuestion,
    type: ADD_QUESTION
  };
};

export const deleteQuestion = (questionIdx: number): IQuizCreateActionTypes => {
  return {
    payload: questionIdx,
    type: DELETE_QUESTION
  };
};

export const addAnswerOption = (
  questionIdx: number
): IQuizCreateActionTypes => {
  return {
    payload: questionIdx,
    type: ADD_ANSWER_OPTION
  };
};

export const deleteAnswerOption = (
  answerOption: IAnswerOption
): IQuizCreateActionTypes => {
  return {
    payload: answerOption,
    type: DELETE_ANSWER_OPTION
  };
};

export const changeAnswerOption = (
  newAnswerOption: IChangeAnswerOption
): IQuizCreateActionTypes => {
  return {
    payload: newAnswerOption,
    type: CHANGE_ANSWER_OPTION
  };
};

export const setCorrectAnswer = (
  correctAnswerOption: IAnswerOption
): IQuizCreateActionTypes => {
  return {
    payload: correctAnswerOption,
    type: SET_CORRECT_ANSWER
  };
};

export const changeName = (
  newName: string
): IQuizCreateActionTypes => {
  return {
    payload: newName,
    type: CHANGE_NAME
  };
};

export const changeDescription = (
  newDesc: string
): IQuizCreateActionTypes => {
  return {
    payload: newDesc,
    type: CHANGE_DESCRIPTION
  };
};

export const changeQuestionText = (
  payload: IChangeQuestionText,
): IQuizCreateActionTypes => {
  return {
    payload,
    type: CHANGE_QUESTION_TEXT
  };
};

export const setError = (error: any): IQuizCreateActionTypes => {
  return {
    payload: error,
    type: SET_ERROR
  };
};

export const quizCreated = (quizId: string): IQuizCreateActionTypes => {
  return {
    payload: quizId,
    type: QUIZ_CREATED
  };
};
