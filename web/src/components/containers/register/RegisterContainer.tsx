import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { register } from '../../../api';
import { AppState } from '../../../store/store';
import Register from '../../presentations/register/index';
import {
  changeEmail,
  changeFullName,
  changePassword,
  performRegister,
  setError
} from './redux/actions';

interface IRegisterContainerProps {
  fullName: string;
  email: string;
  password: string;
  error?: string;
  registered: boolean;
  onChangeFullName: (newName: string) => void;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  setError: (error: string) => void;
  performRegister: () => void;
}

const LoginContainer: React.FC<IRegisterContainerProps> = ({
  fullName,
  email,
  password,
  error,
  registered,
  onChangeFullName,
  onChangeEmail,
  onChangePassword,
  ...props
}) => {
  const onRegister = async () => {
    const data = await register(fullName, email, password);
    if ('error' in data) {
      props.setError(JSON.stringify(data.error));
    } else {
      props.performRegister();
      alert('Register successful! Please login');
    }
  };

  return (
    <Register
      fullName={fullName}
      email={email}
      password={password}
      error={error}
      registered={registered}
      onChangeFullName={onChangeFullName}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onRegister={onRegister}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  fullName: state.register.fullName,
  email: state.register.email,
  password: state.register.password,
  error: state.register.error,
  registered: state.register.registered
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeFullName: (newName: string) => {
      dispatch(changeFullName(newName));
    },
    onChangeEmail: (newEmail: string) => {
      dispatch(changeEmail(newEmail));
    },
    onChangePassword: (newPassword: string) => {
      dispatch(changePassword(newPassword));
    },
    performRegister: () => {
      dispatch(performRegister());
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
