import { IHomeState } from '../../../../interfaces/home';
import { CREATED_QUIZZES_SELECTED } from './types';

const initialState: IHomeState = {
  createdQuizList: [],
  attemptedQuizList: [],
  quizTypeSelected: CREATED_QUIZZES_SELECTED
};

export default initialState;
