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
  setError
} from './redux/actions';

interface ILoginContainerProps {
  email: string;
  password: string;
  error?: string;
  loggedIn: boolean;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  setError: (error: string) => void;
  performLogin: () => void;
}

const onLogin = async (props: any, email: any, password: any) => {
  const data = await login(email, password);
  const { location: { state: { prevLocation = '/' } = {} } = {} } = props;

  if ('error' in data) {
    props.setError(JSON.stringify(data.error));
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
  error,
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
      error={error}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onLogin={() => onLogin(props, email, password)}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  email: state.login.email,
  password: state.login.password,
  error: state.login.error,
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
    setError: (error: string) => {
      dispatch(setError(error));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
