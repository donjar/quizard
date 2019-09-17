import React from 'react';

import { IQuizCreateProps, IQuizCreateState } from '../../../interfaces/quiz-create/index';
import { BeigeBackground } from '../common/BeigeBackground';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import DarkButton from '../common/buttons/DarkButton';
import CreateQuestionCard from './CreateQuestionCard';
import { QuizCreateNavBar } from './QuizCreateNavBar';

class QuizCreate extends React.Component<IQuizCreateProps, IQuizCreateState> {
  constructor(props: IQuizCreateProps) {
    super(props);

    this.state = {
      questions: [
        {
          correctOption: 2,
          options: ['a', 'b', 'c'],
          text: 'Abcd',
        }
      ]
    };
  }

  public render() {
    const onChangeOption = (questionIdx: number, optionIdx: number, newOption: string) => {
      const newQuestions = this.state.questions;
      newQuestions[questionIdx].options[optionIdx] = newOption;
      this.setState({questions: newQuestions});
    };

    const onNewOption = (questionIdx: number) => {
      const newQuestions = this.state.questions;
      newQuestions[questionIdx].options.push('');
      this.setState({questions: newQuestions});
    };

    const onEraseOption = (questionIdx: number, optionIdx: number) => {
      const newQuestions = this.state.questions;
      newQuestions[questionIdx].options.splice(optionIdx, 1);
      this.setState({questions: newQuestions});
    };

    const onSetCorrectAnswer = (questionIdx: number, optionIdx: number) => {
      const newQuestions = this.state.questions;
      newQuestions[questionIdx].correctOption = optionIdx;
      this.setState({questions: newQuestions});
    };

    const onAddQuestion = () => {
      const newQuestions = this.state.questions;
      newQuestions.push({
        correctOption: 0,
        options: [''],
        text: '',
      });
      this.setState({questions: newQuestions});
    };

    const onEraseQuestion = (questionIdx: number) => {
      const newQuestions = this.state.questions;
      newQuestions.splice(questionIdx, 1);
      this.setState({questions: newQuestions});
    };

    const questionCards = this.state.questions.map((question, questionIdx) => (
      <CreateQuestionCard
        key={questionIdx}
        questionNumber={questionIdx + 1}
        text={question.text}
        options={question.options}
        correctOption={question.correctOption}
        onEraseQuestion={() => onEraseQuestion(questionIdx)}
        onChangeOption={(optionIdx, newOption) => onChangeOption(questionIdx, optionIdx, newOption)}
        onNewOption={() => onNewOption(questionIdx)}
        onEraseOption={(optionIdx) => onEraseOption(questionIdx, optionIdx)}
        onSetCorrectAnswer={(optionIdx) => onSetCorrectAnswer(questionIdx, optionIdx)} />
    ));

    return (
      <BeigeBackground>
        <QuizCreateNavBar />
        <BodyAfterNavBarWithPadding>
          <input type="text" name="name" placeholder="Quiz Name" required />
          <input type="text" name="description" placeholder="Quiz Description" required />
          <h3>Questions ({this.state.questions.length})</h3>
          <DarkButton onClick={onAddQuestion}>Add Question</DarkButton>
          {questionCards}
        </BodyAfterNavBarWithPadding>
      </BeigeBackground>
    );
  }
}

export default QuizCreate;
