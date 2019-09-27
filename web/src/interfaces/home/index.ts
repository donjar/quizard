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

export interface IQuizLists {
  createdQuizList: IQuizCard[];
  attemptedQuizList: IQuizCard[];
  ongoingQuizList: IQuizCard[];
}

export interface IHomeState extends IQuizLists {
  quizTypeSelected: string;
}

export interface IHomeContainerProps extends IHomeState {
  hasLoaded: boolean;
  setCreatedQuizzes: (questions: IQuiz[]) => void;
  setAttemptedQuizzes: (questions: IQuiz[]) => void;
  setOngoingQuizzes: (questions: IQuiz[]) => void;
  setLoadingComplete: (hasLoaded: boolean) => void;
}

export interface IHomeNavBarProps {
  onLogout: () => void;
}

export interface IHomeProps extends IHomeNavBarProps {
}
