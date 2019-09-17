import React from 'react';
import styled from 'styled-components';
import LoginCard from './LoginCard';

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--dark-blue);
  height: 100vh;
`;

const QuizComplete: React.FC = () => {
  return (
    <StyledLogin>
      <LoginCard />
    </StyledLogin>
  );
};

export default QuizComplete;
