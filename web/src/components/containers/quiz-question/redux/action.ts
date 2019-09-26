import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { checkQuizQuestionAnswer, getQuestionsByQuizId } from '../../../../api';
import {
  IAnswerOptionPayload,
  ICheckAnswerData,
  IIncorrectAnswerOptionPayload,
  IQuestionData,
  IQuestionsPayload,
  OPTION_UNSELECTED
} from '../../../../interfaces/quiz-question';
import {
  FETCH_QUESTIONS,
  GOTO_NEXT_QUESTION,
  IFetchQuestionsAction,
  IGotoNextQuestionAction,
  ISelectCorrectOptionAction,
  ISelectIncorrectOptionAction,
  ISelectOptionAction,
  ISetOwlEmotion,
  ISetQuestionsAction,
  IStartQuizAction,
  SELECT_CORRECT_QUESTION_OPTION,
  SELECT_INCORRECT_QUESTION_OPTION,
  SELECT_QUESTION_OPTION,
  SET_OWL_EMOTION,
  SET_QUESTIONS,
  START_QUIZ
} from './types';

export const checkSelectedOption: ActionCreator<
  ThunkAction<
    Promise<ISelectCorrectOptionAction | ISelectIncorrectOptionAction>,
    IAnswerOptionPayload | IIncorrectAnswerOptionPayload,
    null,
    ISelectOptionAction | ISelectCorrectOptionAction | ISelectIncorrectOptionAction | ISetOwlEmotion
  >
> = (
  questionId: string,
  selectedAnswerOption: IAnswerOptionPayload
) => {
  return async (dispatch) => {
    dispatch(selectOption());

    const { quizId, optionIdx } = selectedAnswerOption;
    const checkAnswerData: ICheckAnswerData = (
      await checkQuizQuestionAnswer(quizId, questionId, optionIdx)
    ).data;

    const isCorrect = checkAnswerData.is_correct;
    dispatch(setOwlEmotion(isCorrect));

    if (checkAnswerData.is_correct) {
      return dispatch(selectCorrectOption(selectedAnswerOption));
    } else {
      return dispatch(selectIncorrectOption(
        selectedAnswerOption,
        checkAnswerData.correct_option || -1
      ));
    }
  };
};

export const selectOption = (): ISelectOptionAction => {
  return {
    type: SELECT_QUESTION_OPTION
  };
};

export const selectCorrectOption = (
  selectedAnswerOption: IAnswerOptionPayload
): ISelectCorrectOptionAction => {
  return {
    type: SELECT_CORRECT_QUESTION_OPTION,
    payload: selectedAnswerOption
  };
};

export const selectIncorrectOption = (
  selectedAnswerOption: IAnswerOptionPayload,
  correctAnswerOptionIdx: number
): ISelectIncorrectOptionAction => {
  const { quizId, questionIdx, optionIdx: incorrectOptionIdx } = selectedAnswerOption;
  return {
    type: SELECT_INCORRECT_QUESTION_OPTION,
    payload: {
      quizId,
      questionIdx,
      incorrectOptionIdx,
      correctOptionIdx: correctAnswerOptionIdx
    }
  };
};

export const gotoNextQuestion = (): IGotoNextQuestionAction => {
  return {
    type: GOTO_NEXT_QUESTION,
    payload: {}
  };
};

export const setQuestions = (
  questions: IQuestionsPayload
): ISetQuestionsAction => {
  return {
    type: SET_QUESTIONS,
    payload: questions
  };
};

export const fetchQuestions = async (
  quizId: string
): Promise<IFetchQuestionsAction> => {
  const questionsData = (await getQuestionsByQuizId(quizId)).data;
  const questions = questionsData.map((questionData: IQuestionData) => {
    const options = questionData.options.map((option: string) => ({
      displayState: OPTION_UNSELECTED,
      text: option
    }));
    return {
      questionId: questionData.id,
      text: questionData.text,
      options
    };
  });
  return {
    type: FETCH_QUESTIONS,
    payload: {
      questions
    }
  };
};

export const startQuiz = (newQuestionIdx: number): IStartQuizAction => {
  return {
    type: START_QUIZ,
    payload: { currentQuestionIdx: newQuestionIdx }
  };
};

export const setOwlEmotion = (happy: boolean): ISetOwlEmotion => {
  return {
    type: SET_OWL_EMOTION,
    payload: happy
  };
};
