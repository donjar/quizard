import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeContainer from './components/containers/home/HomeContainer';
import LoginContainer from './components/containers/login/LoginContainer';
import QuizCompleteContainer from './components/containers/quiz-complete/QuizCompleteContainer';
import QuizCreateContainer from './components/containers/quiz-create/QuizCreateContainer';
import QuizQuestionContainer from './components/containers/quiz-question/QuizQuestionContainer';
import QuizStartContainer from './components/containers/quiz-start/QuizStartContainer';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Route path="/" exact={true} component={LoginContainer} />
        <Route path="/home" component={HomeContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/quiz" component={QuizQuestionContainer} />
        <Route path="/quiz-create" component={QuizCreateContainer} />
        <Route path="/quiz-complete" component={QuizCompleteContainer} />
        <Route path="/quiz-start" component={QuizStartContainer} />
      </Router>
    </>
  );
};

export default App;
