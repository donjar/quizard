import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
  path,
  component: Component,
  ...rest
}: any) => (
  <Route path={path}
    {...rest}
    render={(props) =>
      localStorage.getItem('accessToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { prevLocation: path } }} />
      )
    }
  />
  );
