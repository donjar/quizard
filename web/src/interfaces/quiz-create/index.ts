export interface IQuestion {
  text: string;
  options: string[];
  correctOption: number;
}

export interface IQuizCreateNavBarProps {
  onCreateQuiz: () => void;
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
  onChangeText: (newText: string) => void;
}

export interface IQuizCreateProps {
  name: string;
  error?: string;
  numQuestions: number;
  onAddQuestion: () => void;
  onChangeName: (newName: string) => void;
  onCreateQuiz: () => void;
}

export interface IQuizCreateState {
  name: string;
  questions: IQuestion[];
  error?: string;
}

export interface IQuestionApi {
  text: string;
  options: string[];
  correct_option: number;
}

export interface IQuizCreateApi {
  title: string;
  questions: IQuestionApi[];
}
