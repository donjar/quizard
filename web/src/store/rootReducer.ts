import { combineReducers } from 'redux';
import homeReducer from '../components/containers/home/redux/reducers';
import loginReducer from '../components/containers/login/redux/reducers';
import quizCreateSummaryReducer from '../components/containers/quiz-create-summary/redux/reducers';
import quizCreateReducer from '../components/containers/quiz-create/redux/reducers';
import quizQuestionReducer from '../components/containers/quiz-question/redux/reducer';
import quizStartReducer from '../components/containers/quiz-start/redux/reducers';
import registerReducer from '../components/containers/register/redux/reducers';
import quizAttemptReviewReducer from '../components/containers/quiz-attempt-review/redux/reducers';

export default combineReducers({
  home: homeReducer,
  quizCreate: quizCreateReducer,
  quizStart: quizStartReducer,
  login: loginReducer,
  register: registerReducer,
  quizQuestion: quizQuestionReducer,
  quizCreateSummary: quizCreateSummaryReducer,
  quizAttemptReview: quizAttemptReviewReducer
});
