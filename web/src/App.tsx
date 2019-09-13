import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeContainer from './components/containers/HomeContainer';
import LoginContainer from './components/containers/LoginContainer';
import QuizQuestionContainer from './components/containers/QuizQuestionContainer';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Route path="/" exact={true} component={LoginContainer} />
        <Route path="/home" component={HomeContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/quiz" component={QuizQuestionContainer} />
      </Router>
    </>
  );
};

export default App;
