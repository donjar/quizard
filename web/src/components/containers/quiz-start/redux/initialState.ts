import { IQuizStartState } from '../../../../interfaces/quiz-start';

const initialState: IQuizStartState = {
  name: '',
  description: '',
  isFinished: false,
  continueFrom: -1,
  userQuizAnswers: {},
  score: 0,
};

export default initialState;
