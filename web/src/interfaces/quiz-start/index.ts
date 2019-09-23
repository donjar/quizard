export interface IQuiz {
  name: string;
  description: string;
  isFinished: any;
  continueFrom: any;
  userQuizAnswers: any;
}

export interface IQuizStartProps {
  quiz: IQuiz;
  isNewQuiz: boolean;
  onStartClick: () => void;
}

export interface IQuizStartState extends IQuiz {

}
