export interface IQuiz {
  id: string;
  title: string;
  description: string;
  numAttempted: number;
  dateCreated: number;
}

export interface IHomeContentProps {
  quizTypeSelected: string;
  quizList: IQuizCard[];
}

export interface IQuizCard extends IQuiz {
}

export interface IHomeState {
  quizTypeSelected: string;
  createdQuizList: IQuizCard[];
  attemptedQuizList: IQuizCard[];
}

export interface IHomeContainerProps extends IHomeState {
  hasLoaded: boolean;
  setCreatedQuizzes: (questions: IQuiz[]) => void;
  setAttemptedQuizzes: (questions: IQuiz[]) => void;
  setLoadingComplete: (hasLoaded: boolean) => void;
  resetQuizCreate: () => void;
}

export interface IHomeNavBarProps {
  onLogout: () => void;
}

export interface IHomeProps extends IHomeNavBarProps {
}
