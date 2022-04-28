import jwt_decode from 'jwt-decode';

export const isLogged = (): boolean => {
  return localStorage.getItem('token') ? true : false;
};

export const parseJwt = () => {
  return jwt_decode(localStorage.getItem('token')!);
};
