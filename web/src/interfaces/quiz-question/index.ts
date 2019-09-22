export interface IQuestion {
  questionId: string;
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
  disableSelection: boolean;
  showNext: boolean;
  showDone: boolean;
}

export interface IAnswerOptionPayload {
  quizId: string;
  questionIdx: number;
  optionIdx: number;
}

export interface IIncorrectAnswerOptionPayload {
  quizId: string;
  questionIdx: number;
  incorrectOptionIdx: number;
  correctOptionIdx: number;
}

export interface IQuestionsPayload {
  questions: IQuestion[];
}

export interface IQuestionData {
  id: string;
  text: string;
  options: string[];
}

export interface ICheckAnswerData {
  is_correct: boolean;
  correct_option?: number;
}
