import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login } from '../../../api';
import { AppState } from '../../../store/store';
import Login from '../../presentations/login/index';
import {
  changeEmail,
  changePassword,
  setAccessToken,
  setError
} from './redux/actions';
import { IAccessToken } from './redux/types';

interface ILoginContainerProps {
  email: string;
  password: string;
  error?: string;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  setError: (error: string) => void;
  setAccessToken: (token: IAccessToken) => void;
}

const LoginContainer: React.FC<ILoginContainerProps> = ({
  email,
  password,
  error,
  onChangeEmail,
  onChangePassword,
  ...props
}) => {
  const onClickLogin = async () => {
    const data = await login(email, password);
    if ('error' in data) {
      props.setError(JSON.stringify(data.error));
    } else {
      props.setAccessToken({accessToken: data.access_token, refreshToken: data.refresh_token});
      window.location.assign('/home');
    }
  };

  return (
    <Login
      email={email}
      password={password}
      error={error}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onClickLogin={onClickLogin}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  email: state.login.email,
  password: state.login.password,
  error: state.login.error
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeEmail: (newEmail: string) => {
      dispatch(changeEmail(newEmail));
    },
    onChangePassword: (newPassword: string) => {
      dispatch(changePassword(newPassword));
    },
    setAccessToken: (token: IAccessToken) => {
      dispatch(setAccessToken(token));
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
