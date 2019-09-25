import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ILoginProps } from '../../../interfaces/login/index';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import DarkButton from '../common/buttons/DarkButton';
import { CenteredDiv } from '../common/CenteredDiv';
import FullScreenModal from '../common/FullScreenModal';
import InputField from '../common/InputField';

const StyledLogin = styled.div`
  width: 100%;

  & > * {
    margin: 10px 0;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > * {
    margin: 10px 0;
  }
`;

const StyledOwl = styled(Owl)`
  height: 170px;
`;

const Login: React.FC<ILoginProps> = ({
  email,
  password,
  loggedIn,
  error,
  onChangeEmail,
  onChangePassword,
  onLogin
}) => {
  const onLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <FullScreenModal>
      <StyledLogin>
        <CenteredDiv>
          <StyledOwl />
          <Quizard />
        </CenteredDiv>
        <LoginForm onSubmit={onLoginFormSubmit}>
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
          <DarkButton type="submit">Login</DarkButton>
        </LoginForm>
        <CenteredDiv>
          <p style={{ fontSize: '18px' }}>Don't have an account?</p>
          <Link to="/register" style={{ fontSize: '18px' }}>
            Sign up now!
          </Link>
        </CenteredDiv>
        {error && (<div>Error: {error}</div>)}
      </StyledLogin>
    </FullScreenModal>
  );
};

export default Login;
