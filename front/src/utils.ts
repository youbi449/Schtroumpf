export const isLogged = (): boolean => {
  return localStorage.getItem('token') ? true : false;
};
