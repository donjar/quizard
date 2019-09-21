export const isLoggedIn = () => {
  return (localStorage.getItem('accessToken') !== null) && (localStorage.getItem('refreshToken') !== null);
};
