import React from 'react';
import styled from 'styled-components';
import { ILoginProps } from '../../../interfaces/login/index';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import DarkButton from '../common/buttons/DarkButton';
import { CenteredDiv } from '../common/CenteredDiv';
import WholeScreenCard from '../common/WholeScreenCard';
import InputField from './InputField';

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--dark-blue);
  height: 100vh;
`;

const StyledLoginCard = styled(WholeScreenCard)`
  position: relative;
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 15px 0;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 10px 0;
  }
`;

const Login: React.FC<ILoginProps> = ({
  email,
  password,
  error,
  onChangeEmail,
  onChangePassword,
  onClickLogin
}) => {
  return (
    <StyledLogin>
      <StyledLoginCard>
        <CenteredDiv>
          <img
            src={'./owl.png'}
            style={{ width: '195px', height: '170px' }}
            alt={'Quizard logo'}
          />
          <Quizard />
        </CenteredDiv>
        <LoginForm>
          <InputField
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => onChangeEmail(event.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => onChangePassword(event.target.value)}
          />
        </LoginForm>
        <DarkButton onClick={onClickLogin}>Login</DarkButton>
        <CenteredDiv>
          <div style={{ fontSize: '18px', textDecoration: 'underline' }}>
            Don't have an account?
          </div>
          <div style={{ fontSize: '18px', textDecoration: 'underline' }}>
            Sign up now!
          </div>
        </CenteredDiv>
        {error && (<div>Error: {error}</div>)}
      </StyledLoginCard>
    </StyledLogin>
  );
};

export default Login;
