export interface IQuiz {
  name: string;
  description: string;
}

export interface IQuizStartProps {
  quiz: IQuiz;
}

export interface IQuizStartState extends IQuiz {}
