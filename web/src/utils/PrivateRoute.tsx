import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('accessToken') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
                state: { prevLocation: props.location }
            }}
          />
        )
      }
    />
  );
};
