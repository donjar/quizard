import React, { lazy, Suspense } from 'react';
import { Redirect, Router, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Loading from './components/presentations/common/Loading';
import { history } from './utils/history';
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
const QuizAttemptReviewContainer = lazy(() =>
  import(
    './components/containers/quiz-attempt-review/QuizAttemptReviewContainer'
  )
);
const QuizClosedContainer = lazy(() =>
  import('./components/containers/quiz-closed/QuizClosedContainer')
);
const QuizStartContainer = lazy(() =>
  import('./components/containers/quiz-start/QuizStartContainer')
);
const RegisterContainer = lazy(() =>
  import('./components/containers/register/RegisterContainer')
);

const App: React.FC = () => {
  return (
    <>
      <Router history={history}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <PrivateRoute path="/" exact={true} component={HomeContainer} />
            <PrivateRoute path="/home" component={HomeContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterContainer} />
            <PrivateRoute path="/quiz-create" component={QuizCreateContainer} />
            <PrivateRoute
              path="/quiz-create-summary/:id"
              component={QuizCreateSummaryContainer}
            />
            <PrivateRoute
              path="/quiz-review/:id"
              component={QuizAttemptReviewContainer}
            />
            <PrivateRoute path="/quiz-complete" component={QuizCompleteContainer} />
            <PrivateRoute
              path="/quiz/:id"
              component={QuizStartContainer}
            />
            <PrivateRoute path="/quiz-closed" component={QuizClosedContainer} />
            {/* Catch for invalid paths */}
            <Route render={() => <Redirect to={{ pathname: '/' }} />} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
