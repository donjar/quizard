import {
  IAnswerOption,
  IQuizQuestionActionTypes,
  SELECT_QUESTION_OPTION
} from './types';

export const selectOption = (
  selectedAnswerOption: IAnswerOption
): IQuizQuestionActionTypes => {
  return {
    payload: selectedAnswerOption,
    type: SELECT_QUESTION_OPTION
  };
};
