export interface ILoginProps {
  email: string;
  password: string;
  error?: string;
  loggedIn: boolean;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  onLogin: () => void;
}

export interface ILoginState {
  email: string;
  password: string;
  loggedIn: boolean;
  error?: string;
}
