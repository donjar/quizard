export interface IQuestion {
  text: string;
  options: string[];
  correctOption: number;
}

export interface IQuizCreateQuestionCardProps {
  questionNumber: number;
  text: string;
  options: string[];
  correctOption: number;
  onEraseQuestion: () => void;
  onChangeOption: (idx: number, newOption: string) => void;
  onNewOption: () => void;
  onEraseOption: (idx: number) => void;
  onSetCorrectAnswer: (idx: number) => void;
}

export interface IQuizCreateProps {
  numQuestions: number;
  onAddQuestion: () => void;
}

export interface IQuizCreateState {
  questions: IQuestion[];
}
