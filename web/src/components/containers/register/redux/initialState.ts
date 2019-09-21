import { IRegisterState } from '../../../../interfaces/register';

const initialState: IRegisterState = {
  fullName: '',
  email: '',
  password: '',
  registered: false
};

export default initialState;
