import { IHomeState, IQuizCard } from '../../../../interfaces/home';
import { CREATED_QUIZZES_SELECTED } from './types';

// temp data for quizlist
const createdQuizArray: IQuizCard[] = [];
for (let i = 0; i < 100; i++) {
  createdQuizArray.push({
    title: 'Quiz Title ' + i,
    description: i + ' This quiz is about lorem ipsum dolor',
    numAttempted: 50 + i,
    dateCreated: i
  });
}

const attemptedQuizArray: IQuizCard[] = [];
for (let i = 0; i < 4; i++) {
  attemptedQuizArray.push({
    title: 'Attempted Quiz Title ' + i,
    description: i + ' This quiz is about lorem ipsum dolor',
    numAttempted: 3 + i,
    dateCreated: 20 + i
  });
}

const initialState: IHomeState = {
  createdQuizList: createdQuizArray,
  attemptedQuizList: attemptedQuizArray,
  quizTypeSelected: CREATED_QUIZZES_SELECTED
};

export default initialState;
