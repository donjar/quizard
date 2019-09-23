import React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { IRegisterProps } from '../../../interfaces/register';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import DarkButton from '../common/buttons/DarkButton';
import { CenteredDiv } from '../common/CenteredDiv';
import InputField from '../common/InputField';
import WholeScreenCard from '../common/WholeScreenCard';
import { ReactComponent as Owl } from '../../../svg/owl.svg';

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

const StyledOwl = styled(Owl)`
  height: 170px;
`;

const Register: React.FC<IRegisterProps> = ({
  fullName,
  email,
  password,
  error,
  registered,
  onChangeFullName,
  onChangeEmail,
  onChangePassword,
  onRegister
}) => {
  if (registered) {
    return (
      <Redirect to="/" />
    );
  }

  const onRegisterFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <StyledLogin>
      <StyledLoginCard>
        <CenteredDiv>
          <StyledOwl />
          <Quizard />
        </CenteredDiv>
        <LoginForm onSubmit={onRegisterFormSubmit}>
          <InputField
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(event) => onChangeFullName(event.target.value)}
          />
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
          <DarkButton type="submit">Register</DarkButton>
        </LoginForm>
        {error && (<div>Error: {error}</div>)}
      </StyledLoginCard>
    </StyledLogin>
  );
};

export default Register;
