export interface IOptionSummary {
  option: string;
  percentage: number;
}

export interface IQuestion {
  questionNumber: number;
  text: string;
  options: string[];
  correctOption: number;
}

export interface IAttemptedQuestion extends IQuestion {
  selectedOption: number;
}

interface IQuizBase {
  name: string;
  description: string;
  questions: IQuestion[];
}

export interface IQuiz extends IQuizBase {
  numAttempts: number;
}

export interface IQuizCreateSummaryContainerProps extends IQuiz {
  match: any;
  hasLoaded: boolean;
  setQuiz: (quiz: IQuiz) => void;
  setLoadingComplete: (hasLoaded: boolean) => void;
}

export interface IAttemptedQuiz extends IQuizBase {
  score: number;
  questions: IAttemptedQuestion[];
}

export interface IQuizCreateSummaryProps extends IQuiz {
  sharableLink: string;
}
export interface IQuizAttemptReviewProps extends IAttemptedQuiz {}

export interface IQuizCreateSummaryState extends IQuiz {}
export interface IQuizAttemptReviewState extends IAttemptedQuiz {}

export interface IQuestionSectionProps {
  selectedOption?: number;
  questionNumber: number;
  text: string;
  options: Array<string | IOptionSummary>;
  correctOption: number;
}
