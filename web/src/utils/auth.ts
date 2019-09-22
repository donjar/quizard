import jwt from 'jsonwebtoken';

export const isLoggedIn = () => {
  return (localStorage.getItem('accessToken') !== null) && (localStorage.getItem('refreshToken') !== null);
};

export const getUser = () => {
  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = accessToken && jwt.decode(accessToken);
  if (decodedToken && typeof decodedToken === 'object') {
    return decodedToken.identity;
  }
};
