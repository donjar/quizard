export interface IQuestion {
  title: string;
  description: string;
  numAttempted: number;
  dateCreated: number;
}

export interface IHomeContentProps {
  quizTypeSelected: string;
  quizList: IQuizCard[];
}

export interface IQuizCard extends IQuestion {
}

export interface IHomeState {
  quizTypeSelected: string;
  createdQuizList: IQuizCard[];
  attemptedQuizList: IQuizCard[];
}

export interface IHomeContainerProps extends IHomeState {
  setCreatedQuizzes: (questions: IQuestion[]) => void;
  setAttemptedQuizzes: (questions: IQuestion[]) => void;
}

export interface IRowRendererProps {
  key: any;
  index: number;
  style: any;
}

export interface IHomeNavBarProps {
  onLogout: () => void;
}

export interface IHomeProps extends IHomeNavBarProps {
}
