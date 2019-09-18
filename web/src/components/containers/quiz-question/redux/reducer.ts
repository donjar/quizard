import produce from 'immer';
import { IQuizState, OPTION_CORRECT, QuestionOptionState } from '../../../../interfaces/quiz-question';
import initialState from './initialState';
import { IQuizQuestionActionTypes, SELECT_QUESTION_OPTION } from './types';

export default function quizQuestionReducer(
  state = initialState,
  action: IQuizQuestionActionTypes
): IQuizState {
  switch (action.type) {
    case SELECT_QUESTION_OPTION:
      const { questionIdx, optionIdx } = action.payload;
      return produce(state, (draft) => {
        draft
          .questions[questionIdx]
          .options[optionIdx]
          .displayState = OPTION_CORRECT;
      });

    default:
      return state;
  }
}
