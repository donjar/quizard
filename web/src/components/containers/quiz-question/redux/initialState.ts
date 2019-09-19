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
    text: `Answer Option ${i + 1}`
  });
}

const questionArray: IQuestion[] = [];
for (let i = 0; i < 10; i++) {
  questionArray.push({
    text: 'Question here lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    options: optionArray
  });
}

const initialState: IQuizState = {
  questions: questionArray,
  currQuestionIdx: 0
};

export default initialState;
