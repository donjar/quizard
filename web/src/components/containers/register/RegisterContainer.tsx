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
  setEmailError,
  setFullNameError,
  setPasswordError
} from './redux/actions';

interface IRegisterContainerProps {
  fullName: string;
  email: string;
  password: string;
  fullNameError?: string;
  emailError?: string;
  passwordError?: string;
  registered: boolean;
  onChangeFullName: (newName: string) => void;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  setFullNameError: (error?: string) => void;
  setEmailError: (error?: string) => void;
  setPasswordError: (error?: string) => void;
  performRegister: () => void;
}

const LoginContainer: React.FC<IRegisterContainerProps> = ({
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
  ...props
}) => {
  const onRegister = async () => {
    props.setEmailError(undefined);
    props.setPasswordError(undefined);
    props.setFullNameError(undefined);

    const data = await register(fullName, email, password);
    if ('error' in data) {
      const err = data.error;

      if ('full_name' in err) {
        props.setFullNameError(err.full_name.join('; '));
      }
      if ('email' in err) {
        props.setEmailError(err.email.join('; '));
      }
      if ('password' in err) {
        props.setPasswordError(err.password.join('; '));
      }
    } else {
      props.performRegister();
      alert('Register successful! Please login.');
    }
  };

  return (
    <Register
      fullName={fullName}
      email={email}
      password={password}
      fullNameError={fullNameError}
      emailError={emailError}
      passwordError={passwordError}
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
  fullNameError: state.register.fullNameError,
  emailError: state.register.emailError,
  passwordError: state.register.passwordError,
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
    setFullNameError: (error?: string) => {
      dispatch(setFullNameError(error));
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
