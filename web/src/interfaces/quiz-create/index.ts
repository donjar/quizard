export interface IQuestion {
  text: string;
  options: string[];
  correctOption: number;
}

export interface IQuizCreateProps {
}

export interface IQuizCreateState {
  questions: IQuestion[];
}
