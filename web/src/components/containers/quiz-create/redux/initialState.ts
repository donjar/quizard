import { IQuizCreateState } from '../../../../interfaces/quiz-create';

const initialQuestion = {
  correctOption: 0,
  options: ['', ''],
  text: ''
};

const initialState: IQuizCreateState = {
  name: '',
  description: '',
  questions: [{
    correctOption: 0,
    options: ['', ''],
    text: ''
  }]
};

export default initialState;
