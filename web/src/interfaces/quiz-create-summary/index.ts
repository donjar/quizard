export interface IQuestion {
  questionNumber: number;
  text: string;
  options: string[];
  correctOption: number;
}

export interface IQuiz {
  name: string;
  description: string;
  numAttempts: number;
  questions: IQuestion[];
}

export interface IQuizCreateSummaryProps extends IQuiz {}

export interface IQuizCreateSummaryState extends IQuiz {}

export interface IQuestionSectionProps extends IQuestion {}
