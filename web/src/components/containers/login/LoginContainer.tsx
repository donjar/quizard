import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login } from '../../../api';
import { AppState } from '../../../store/store';
import { history } from '../../../utils/history';
import Login from '../../presentations/login/index';
import {
  changeEmail,
  changePassword,
  performLogin,
  setEmailError,
  setPasswordError
} from './redux/actions';

interface ILoginContainerProps {
  email: string;
  password: string;
  emailError?: string;
  passwordError?: string;
  loggedIn: boolean;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  setEmailError: (error?: string) => void;
  setPasswordError: (error?: string) => void;
  performLogin: () => void;
}

const onLogin = async (props: any, email: any, password: any) => {
  props.setEmailError(undefined);
  props.setPasswordError(undefined);

  const data = await login(email, password);
  const { location: { state: { prevLocation = '/' } = {} } = {} } = props;

  if ('error' in data) {
    const err = data.error;

    if ('email' in err) {
      props.setEmailError(err.email.join('; '));
    }
    if ('password' in err) {
      props.setPasswordError(err.password.join('; '));
    }
    if ('msg' in err) {
      alert(err.msg.join('; '));
    }
  } else {
    props.performLogin();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
  }

  history.push(prevLocation);
};

const LoginContainer: React.FC<ILoginContainerProps> = ({
  email,
  password,
  emailError,
  passwordError,
  loggedIn,
  onChangeEmail,
  onChangePassword,
  ...props
}) => {
  return (
    <Login
      email={email}
      password={password}
      loggedIn={loggedIn}
      emailError={emailError}
      passwordError={passwordError}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onLogin={() => onLogin(props, email, password)}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  email: state.login.email,
  password: state.login.password,
  emailError: state.login.emailError,
  passwordError: state.login.passwordError,
  loggedIn: state.login.loggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeEmail: (newEmail: string) => {
      dispatch(changeEmail(newEmail));
    },
    onChangePassword: (newPassword: string) => {
      dispatch(changePassword(newPassword));
    },
    performLogin: () => {
      dispatch(performLogin());
    },
    setEmailError: (error?: string) => {
      dispatch(setEmailError(error));
    },
    setPasswordError: (error?: string) => {
      dispatch(setPasswordError(error));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
