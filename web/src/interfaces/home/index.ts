export interface IHomeContentProps {
  quizTypeSelected: string;
  quizList: IQuizCard[];
}

export interface IQuizCard {
  title: string;
  description: string;
  numAttempted: number;
  dateCreated: number;
}

export interface IHomeState {
  quizTypeSelected: string;
  createdQuizList: IQuizCard[];
  attemptedQuizList: IQuizCard[];
}

export interface IHomeContainerProps {
  quizTypeSelected: string;
  createdQuizList: IQuizCard[];
  attemptedQuizList: IQuizCard[];
}

export interface IRowRendererProps {
  key: any;
  index: number;
  style: any;
}
