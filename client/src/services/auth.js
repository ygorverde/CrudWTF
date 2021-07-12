export const userKey = 'wtf_user';

// export const isAuthenticated = () => localStorage.getItem(userKey) !== null;
export const isAuthenticated = () =>  {
  if (localStorage.getItem('wtf_user')) {
      return true
  } else {
      return false
  }
}

export const getToken = () => JSON.parse(localStorage.getItem(userKey));

export const login = token => {
    localStorage.setItem(userKey, JSON.stringify(token.data));
  }