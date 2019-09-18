import { IQuestion } from '../../../../interfaces/quiz-create';
import {
  ADD_ANSWER_OPTION,
  ADD_QUESTION,
  CHANGE_ANSWER_OPTION,
  DELETE_ANSWER_OPTION,
  DELETE_QUESTION,
  IAnswerOption,
  IChangeAnswerOption,
  IQuizCreateActionTypes,
  SET_CORRECT_ANSWER
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
