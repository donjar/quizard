export interface ILoginProps {
  email: string;
  password: string;
  emailError?: string;
  passwordError?: string;
  loggedIn: boolean;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  onLogin: () => void;
}

export interface ILoginState {
  email: string;
  password: string;
  loggedIn: boolean;
  emailError?: string;
  passwordError?: string;
}
