export interface IRegisterState {
  fullName: string;
  email: string;
  password: string;
  error?: string;
  registered: boolean;
}

export interface IRegisterProps extends IRegisterState {
  onChangeFullName: (newName: string) => void;
  onChangeEmail: (newEmail: string) => void;
  onChangePassword: (newPassword: string) => void;
  onRegister: () => void;
}
