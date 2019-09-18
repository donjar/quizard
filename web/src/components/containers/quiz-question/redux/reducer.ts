import { IQuizState, OPTION_CORRECT } from '../../../../interfaces/quiz-question';
import initialState from './initialState';
import { IQuizQuestionActionTypes, SELECT_QUESTION_OPTION } from './types';

// TODO: split into smaller reducers
// TODO: make modifiers to abstract out logic of reduction
export default function quizQuestionReducer(
  state = initialState,
  action: IQuizQuestionActionTypes
): IQuizState {
  const newQuestions = [...state.questions];

  switch (action.type) {
    case SELECT_QUESTION_OPTION:
      const { questionIdx, optionIdx } = action.payload;
      newQuestions[questionIdx]
        .options[optionIdx]
        .displayState = OPTION_CORRECT;
      return {
        ...state,
        questions: newQuestions
      };

    default:
      return state;
  }
}
