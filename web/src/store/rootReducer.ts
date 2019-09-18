import { combineReducers } from 'redux';
import homeReducer from '../components/containers/home/redux/reducer';
import loginReducer from '../components/containers/login/redux/reducers';
import quizCreateReducer from '../components/containers/quiz-create/redux/reducers';

export default combineReducers({
  home: homeReducer,
  quizCreate: quizCreateReducer,
  login: loginReducer
});
