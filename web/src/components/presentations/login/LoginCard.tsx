import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import { LoginButton } from '../common/buttons/LoginButton';
import { smMax } from '../../../utils/media';
import InputField from './InputField';

const StyledLoginCard = styled.div`
  position: relative;
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fffcf3;
  box-shadow: 6px 6px 0px #dcd9cf;
  border-radius: 25px;

  @media (max-width: ${smMax}) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
  }

  & > * {
    margin: 15px 0;
  }
`;

const SeparatedDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 10px 0;
  }
`;

const LoginCard: React.FC = () => {
  return (
    <StyledLoginCard>
      <SeparatedDiv>
        <img src={'./owl.png'} style={{ width: '195px', height: '170px' }} alt={'Quizard logo'} />
        <Quizard />
      </SeparatedDiv>
      <LoginForm>
        <InputField type="text" placeholder="Email" />
        <InputField type="password" placeholder="Password" />
      </LoginForm>
      <LoginButton />
      <SeparatedDiv>
        <div style={{ fontSize: '18px', textDecoration: 'underline' }}>
          Don't have an account?
        </div>
        <div style={{ fontSize: '18px', textDecoration: 'underline' }}>
          Sign up now!
        </div>
      </SeparatedDiv>
    </StyledLoginCard>
  );
};

export default LoginCard;
