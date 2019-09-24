export interface IQuizCompleteCardProps {
  score: number;
  maxScore: number;
  quizName: string;
}

export interface IQuizCompleteProps extends IQuizCompleteCardProps {
}

export interface IQuizRedoButtonProps {
  quizId: string;
}