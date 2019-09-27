import React from 'react';
import styled from 'styled-components';
import { IQuizStartProps } from '../../../interfaces/quiz-start';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import { mdMax } from '../../../utils/media';
import { BodyAfterNavBarWithPadding } from '../common/BodyAfterNavBarWithPadding';
import BigDarkButton from '../common/buttons/BigDarkButton';
import { CenteredDiv } from '../common/CenteredDiv';
import { NavBarWithBack } from '../common/NavBarWithBack';
import { NavBarWithCenteredBrand } from '../common/NavBarWithCenteredBrand';

const StyledBody = styled(BodyAfterNavBarWithPadding)`
  * {
    margin: 20px 0;
  }
`;

const BottomRightOwl = styled(Owl)`
  position: fixed;
  bottom: calc(-9vh - 3vw);
  right: calc(-9vh - 3vw);
  width: calc(30vh + 10vw);

  @media (max-width: ${mdMax}) {
    display: none;
  }
`;

class QuizStart extends React.Component<IQuizStartProps> {
  public render() {
    const { quiz, isNewQuiz, onStartClick } = this.props;
    const { name, description } = quiz;

    return (
      <>
        {
          this.props.location.state && this.props.location.state.cameFromHome
          ? <NavBarWithBack />
          : <NavBarWithCenteredBrand />
        }
        <StyledBody>
          <h1>{name}</h1>
          <p>{description}</p>
          <p>
            <strong>Quiz rules:</strong> Questions will be in MCQ format.
            The first option you select will be recorded as your answer.
          </p>
          <CenteredDiv>
            {isNewQuiz ? (
              <BigDarkButton onClick={onStartClick}>Start</BigDarkButton>
            ) : (
              <BigDarkButton onClick={onStartClick}>Continue</BigDarkButton>
            )}
          </CenteredDiv>
        </StyledBody>
        <BottomRightOwl />
      </>
    );
  }
}

export default QuizStart;
