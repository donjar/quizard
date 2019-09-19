export const SELECT_QUESTION_OPTION = 'SELECT_QUESTION_OPTION';

// TODO: Shift common interfaces into interfaces folder
export interface IAnswerOption {
  questionIdx: number;
  optionIdx: number;
}

export interface ISelectOptionAction {
  type: typeof SELECT_QUESTION_OPTION;
  payload: IAnswerOption;
}

export type IQuizQuestionActionTypes =
  | ISelectOptionAction;
