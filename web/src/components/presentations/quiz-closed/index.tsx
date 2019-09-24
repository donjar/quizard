import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Owl } from '../../../svg/owl-closed.svg';
import { history } from '../../../utils/history';
import BigDarkButton from '../common/buttons/BigDarkButton';
import FullScreenModal from '../common/FullScreenModal';

const StyledOwl = styled(Owl)`
  height: 170px;
`;

const handleReturnToHomeClick = () => {
  history.push('/');
};

const QuizClosed: React.FC = () => {
  return (
    <FullScreenModal wide={true}>
      <StyledOwl />
      <h1>Sorry, the quiz you are looking for has closed</h1>
      <p>
        Ohno! Do take note of your deadlines next time so you do not miss out on your next quizzes!
      </p>
      <BigDarkButton onClick={handleReturnToHomeClick} >Return to Home</BigDarkButton>
    </FullScreenModal>
  );
};

export default QuizClosed;
