export interface IQuizCompleteCardProps {
  score: number;
  maxScore: number;
  quizName: string;
  match?: any;
}

export interface IQuizCompleteProps extends IQuizCompleteCardProps {
}

export interface IQuizRedoButtonProps {
  quizId: string;
}
