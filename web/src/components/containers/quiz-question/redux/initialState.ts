import {
  IQuestion,
  IQuestionOption,
  IQuizState,
  OPTION_UNSELECTED
} from '../../../../interfaces/quiz-question';

// TODO: Replace with real data
const optionArray: IQuestionOption[] = [];
for (let i = 0; i < 4; i++) {
  optionArray.push({
    displayState: OPTION_UNSELECTED,
    text: ''
  });
}

const questionArray: IQuestion[] = [];
for (let i = 0; i < 10; i++) {
  questionArray.push({
    questionId: '',
    text: '',
    options: optionArray
  });
}

const initialState: IQuizState = {
  questions: questionArray,
  currQuestionIdx: 0,
  disableSelection: false,
  showNext: false,
};

export default initialState;
