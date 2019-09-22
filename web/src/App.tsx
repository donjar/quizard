import { createBrowserHistory } from 'history';
import React, { lazy, Suspense } from 'react';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';

const HomeContainer = lazy(() =>
  import('./components/containers/home/HomeContainer')
);
const LoginContainer = lazy(() =>
  import('./components/containers/login/LoginContainer')
);
const QuizCompleteContainer = lazy(() =>
  import('./components/containers/quiz-complete/QuizCompleteContainer')
);
const QuizCreateContainer = lazy(() =>
  import('./components/containers/quiz-create/QuizCreateContainer')
);
const QuizCreateSummaryContainer = lazy(() =>
  import(
    './components/containers/quiz-create-summary/QuizCreateSummaryContainer'
  )
);
const QuizQuestionContainer = lazy(() =>
  import('./components/containers/quiz-question/QuizQuestionContainer')
);
const QuizStartContainer = lazy(() =>
  import('./components/containers/quiz-start/QuizStartContainer')
);
const RegisterContainer = lazy(() =>
  import('./components/containers/register/RegisterContainer')
);

export const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <>
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <PrivateRoute path="/" exact={true} component={HomeContainer} />
          <PrivateRoute path="/home" component={HomeContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
          <PrivateRoute path="/quiz" component={QuizQuestionContainer} />
          <PrivateRoute path="/quiz-create" component={QuizCreateContainer} />
          <PrivateRoute
            path="/quiz-create-summary/:id"
            component={QuizCreateSummaryContainer}
          />
          <Route path="/quiz-complete" component={QuizCompleteContainer} />
          <PrivateRoute
            path="/quiz-start/:id"
            component={QuizStartContainer}
          />
        </Suspense>
      </Router>
    </>
  );
};

export default App;
