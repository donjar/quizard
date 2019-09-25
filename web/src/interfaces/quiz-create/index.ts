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
  description: string;
  error?: string;
  numQuestions: number;
  createdQuizId?: string;
  onAddQuestion: () => void;
  onChangeName: (newName: string) => void;
  onChangeDescription: (newDesc: string) => void;
  onCreateQuiz: () => void;
}

export interface IQuizCreateState {
  name: string;
  description: string;
  questions: IQuestion[];
  error?: string;
  createdQuizId?: string;
}

export interface IQuestionApi {
  text: string;
  options: string[];
  correct_option: number;
}

export interface IQuizCreateApi {
  title: string;
  description: string;
  questions: IQuestionApi[];
}
