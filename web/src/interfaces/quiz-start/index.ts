export interface IQuiz {
  name: string;
  dueDate: number;
  description: string;
  type: number;
}

export interface IQuizStartProps {
  quiz: IQuiz;
}
