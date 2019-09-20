import { IQuizCreateSummaryState } from '../../../../interfaces/quiz-create-summary';

const initialState: IQuizCreateSummaryState = {
  name: '',
  description: '',
  numAttempts: 0,
  questions: []
};

export default initialState;
