import React from 'react';

export interface IInputFieldProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ILoginProps {
  email: string;
  password: string;
  error?: string;
  loggedIn: boolean;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  onClickLogin: () => void;
}

export interface ILoginState {
  email: string;
  password: string;
  loggedIn: boolean;
  error?: string;
}
