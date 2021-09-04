export const setForm = (email, password) => ({
  type: 'SET_FORM',
  payload: {
    email,
    password
  }
});

export const setAuthErrMessage = (message) => ({
  type: 'SET_ERR_MESSAGE',
  payload: message
});

export const login = (token, userId) => ({
  type: 'LOGIN',
  payload: {
    token,
    userId
  }
});

export const logout = () => ({
  type: 'LOGOUT'
});