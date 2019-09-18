export interface IQuestion {
  text: string;
  options: IQuestionOption[];
}

export interface IQuestionOption {
  text: string;
  displayState: QuestionOptionState;
}

export type QuestionOptionState = 'unselected' | 'correct' | 'incorrect';
export const OPTION_UNSELECTED: QuestionOptionState = 'unselected';
export const OPTION_CORRECT: QuestionOptionState = 'correct';
export const OPTION_INCORRECT: QuestionOptionState = 'incorrect';

export interface IQuizState {
  currQuestionIdx: number;
  questions: IQuestion[];
}
