import { combineReducers } from 'redux';
import homeReducer from '../components/containers/home/redux/reducers';
import loginReducer from '../components/containers/login/redux/reducers';
import quizCreateReducer from '../components/containers/quiz-create/redux/reducers';
import quizQuestionReducer from '../components/containers/quiz-question/redux/reducer';

export default combineReducers({
  home: homeReducer,
  quizCreate: quizCreateReducer,
  login: loginReducer,
  quizQuestion: quizQuestionReducer
});
