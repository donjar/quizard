import React from 'react';
import { Link } from 'react-router-dom';
import DarkButton from '../common/buttons/DarkButton';

const LoginButton: React.FC = () => {
  return (
    <>
      <Link to="/home">
        <DarkButton> Login </DarkButton>
      </Link>
    </>
  );
};

const Login: React.FC = () => {
  return (
    <>
      <div className="Login">Login</div>
      <LoginButton />
    </>
  );
};

export default Login;
