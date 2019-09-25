import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IQuestion } from '../../../interfaces/quiz-question';
import { AppState } from '../../../store/store';
import QuizQuestion from '../../presentations/quiz-question/index';
import {
  checkSelectedOption,
  fetchQuestions,
  gotoNextQuestion,
  setQuestions
} from './redux/action';

interface IQuizQuestionContainerProps {
  match: any;
  question: IQuestion;
  numQuestions: number;
  questionNumber: number;
  disableSelection: boolean;
  showNext: boolean;
  onSelectOption: (
    quizId: string,
    questionId: string,
    questionIdx: number,
    optionIdx: number
  ) => void;
  onClickNext: ({ questionNumber, numQuestions }: any) => void;
  getQuestions: (quizId: string) => void;
}

const QuizQuestionContainer: React.FC<IQuizQuestionContainerProps> = ({
  match,
  question,
  numQuestions,
  questionNumber,
  disableSelection,
  showNext,
  onSelectOption,
  onClickNext,
  getQuestions
}) => {
  const quizId = match.params.id;
  useEffect(() => {
    getQuestions(quizId);
  }, []);

  const handleSelectedOption = async (optionIdx: number) => {
    onSelectOption(quizId, question.questionId, questionNumber - 1, optionIdx);
  };

  const handleLeaveQuiz = () => {
    // TODO: Implement
    // tslint:disable-next-line:no-console
    console.log('LEAVE');
  };

  return (
    <QuizQuestion
      questionNumber={questionNumber}
      numQuestions={numQuestions}
      question={question.text}
      options={question.options}
      disableSelection={disableSelection}
      showNext={showNext}
      onSelectOption={handleSelectedOption}
      onCloseQuiz={handleLeaveQuiz}
      onClickNext={() => onClickNext({ numQuestions, questionNumber })}
    />
  );
};

const mapStateToProps = (state: AppState) => {
  const { questions, currQuestionIdx, disableSelection, showNext } = state.quizQuestion;
  return {
    numQuestions: questions.length,
    questionNumber: currQuestionIdx + 1,
    question: questions[currQuestionIdx],
    disableSelection,
    showNext
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    onSelectOption: (
      quizId: string,
      questionId: string,
      questionIdx: number,
      optionIdx: number
    ) => {
      dispatch(
        checkSelectedOption(questionId, {
          quizId,
          questionIdx,
          optionIdx
        })
      );
    },
    onClickNext: ({ questionNumber, numQuestions }: any) => {
      if (questionNumber >= numQuestions) {
        window.location.reload();
      } else {
        dispatch(gotoNextQuestion());
      }
    },
    getQuestions: (quizId: string) => {
      fetchQuestions(quizId).then(({ payload }) =>
        dispatch(setQuestions(payload))
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizQuestionContainer);
