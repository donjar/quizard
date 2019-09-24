import { IQuizCreateState } from '../../../../interfaces/quiz-create';

const initialState: IQuizCreateState = {
  name: '',
  description: '',
  questions: [
    {
      correctOption: 0,
      options: ['', ''],
      text: ''
    }
  ]
};

export default initialState;
