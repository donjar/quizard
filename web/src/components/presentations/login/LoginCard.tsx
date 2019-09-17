import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Quizard } from '../../../svg/quizard.svg';
import { smMax } from '../../../utils/media';
import DarkButton from '../common/buttons/DarkButton';
import { CenteredDiv } from '../common/CenteredDiv';
import InputField from './InputField';
import { login } from '../../../api';

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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 10px 0;
  }
`;

export interface ILoginCardProps {
}

export interface ILoginCardState {
  email: string;
  password: string;
}

class LoginCard extends React.Component<ILoginCardProps, ILoginCardState> {
  constructor(props: ILoginCardProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    const onChangeEmail = (newEmail: string) => {
      this.setState({ email: newEmail });
    };

    const onChangePassword = (newPassword: string) => {
      this.setState({ password: newPassword });
    };

    return (
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
          <InputField type="text" placeholder="Email" value={this.state.email} onChange={(event) => onChangeEmail(event.target.value)} />
          <InputField type="password" placeholder="Password" value={this.state.password} onChange={(event) => onChangePassword(event.target.value)} />
        </LoginForm>
        <DarkButton onClick={() => login(this.state.email, this.state.password)}>Login</DarkButton>
        <CenteredDiv>
          <div style={{ fontSize: '18px', textDecoration: 'underline' }}>
            Don't have an account?
          </div>
          <div style={{ fontSize: '18px', textDecoration: 'underline' }}>
            Sign up now!
          </div>
        </CenteredDiv>
      </StyledLoginCard>
    );
  }
}

export default LoginCard;
