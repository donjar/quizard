import { ILoginState } from '../../../../interfaces/login';

const initialState: ILoginState = {
  email: '',
  password: '',
  loggedIn: false
};

export default initialState;
