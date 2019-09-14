import React from 'react';
import styled from 'styled-components';
import { LoginButton } from '../common/buttons/LoginButton';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';

const StyledLoginCard = styled.div`
  width: 500px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fffcf3;
  box-shadow: 6px 6px 0px #dcd9cf;
  border-radius: 25px;
`;

const LoginCard: React.FC = () => {
  return (
    <StyledLoginCard>
      <Owl />
      <Quizard />
      <div>email shit here</div>
      <div>some password shit here</div>
      <LoginButton />
      <div>Don't have an account?</div>
      <div>Sign up now!</div>
    </StyledLoginCard>
  );
};

export default LoginCard;
