import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface IPrivateRouteProps {
  component: any;
}

export const PrivateRoute = ({
  component: Component,
  ...rest
}: IPrivateRouteProps) => (
  <Route
    {...rest}
    render={(props) =>
      // need to change login to be stored in localstorage instead
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);
