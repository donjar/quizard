import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IRegisterProps } from '../../../interfaces/register';
import { ReactComponent as Owl } from '../../../svg/owl.svg';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import DarkButton from '../common/buttons/DarkButton';
import { CenteredDiv } from '../common/CenteredDiv';
import FullScreenModal from '../common/FullScreenModal';
import InputField from '../common/InputField';

const StyledRegister = styled.div`
  width: 100%;

  & > * {
    margin: 10px 0;
  }
`;

const RegisterForm = styled.form`
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

const Register: React.FC<IRegisterProps> = ({
  fullName,
  email,
  password,
  fullNameError,
  emailError,
  passwordError,
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
    <FullScreenModal>
      <StyledRegister>
        <CenteredDiv>
          <StyledOwl />
          <Quizard />
        </CenteredDiv>
        <RegisterForm onSubmit={onRegisterFormSubmit}>
          <InputField
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(event) => onChangeFullName(event.target.value)}
            error={fullNameError}
          />
          <InputField
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => onChangeEmail(event.target.value)}
            error={emailError}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => onChangePassword(event.target.value)}
            error={passwordError}
          />
          <DarkButton type="submit">Register</DarkButton>
          <Link to="/login" style={{ fontSize: '18px' }}>
            Back to Login
          </Link>
        </RegisterForm>
      </StyledRegister>
    </FullScreenModal>
  );
};

export default Register;
