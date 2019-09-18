import { IQuizCreateState } from '../../../../interfaces/quiz-create';

const initialState: IQuizCreateState = {
  name: '',
  questions: [
    // test data to be removed
    {
      correctOption: 2,
      options: ['a', 'b', 'c'],
      text: 'Abcd'
    }
  ]
};

export default initialState;
