export interface IQuiz {
  quizId?: string;
  name: string;
  description: string;
  isFinished: boolean;
  continueFrom: number;
  userQuizAnswers: object;
  score?: any;
}

export interface IQuizStartProps {
  quiz: IQuiz;
  isNewQuiz: boolean;
  onStartClick: () => void;
}

export interface IQuizStartState extends IQuiz {

}
