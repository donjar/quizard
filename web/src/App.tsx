import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const HomeContainer = lazy(() => import('./components/containers/home/HomeContainer'));
const LoginContainer = lazy(() => import('./components/containers/login/LoginContainer'));
const QuizCompleteContainer = lazy(() => import('./components/containers/quiz-complete/QuizCompleteContainer'));
const QuizCreateContainer = lazy(() => import('./components/containers/quiz-create/QuizCreateContainer'));
const QuizQuestionContainer = lazy(() => import('./components/containers/quiz-question/QuizQuestionContainer'));
const QuizStartContainer = lazy(() => import('./components/containers/quiz-start/QuizStartContainer'));

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" exact={true} component={LoginContainer} />
          <Route path="/home" component={HomeContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/quiz" component={QuizQuestionContainer} />
          <Route path="/quiz-create" component={QuizCreateContainer} />
          <Route path="/quiz-complete" component={QuizCompleteContainer} />
          <Route path="/quiz-start" component={QuizStartContainer} />
        </Suspense>
      </Router>
    </>
  );
};

export default App;
