import { IQuizAttemptReviewState } from '../../../../interfaces/quiz-create-summary';

const initialState: IQuizAttemptReviewState = {
  name: '',
  description: '',
  score: 0,
  questions: []
};

export default initialState;
