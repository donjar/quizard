export interface IQuiz {
  name: string;
  description: string;
  isFinished: boolean;
  continueFrom: number;
  userQuizAnswers: object;
}

export interface IQuizStartProps {
  quiz: IQuiz;
  isNewQuiz: boolean;
  onStartClick: () => void;
}

export interface IQuizStartState extends IQuiz {

}
