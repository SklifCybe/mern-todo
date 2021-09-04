const userData = JSON.parse(localStorage.getItem('userData'));

const initialState = {
  email: '',
  password: '',
  errMessage: '',
  token: userData && userData.token,
  userId: userData && userData.userId,
  isAuthenticated: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FORM':
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password
      }
    case 'SET_ERR_MESSAGE':
      return {
        ...state,
        errMessage: action.payload
      }
    case 'LOGIN':
      localStorage.setItem('userData', JSON.stringify({
        token: action.payload.token, userId: action.payload.userId
      }));
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthenticated: true
      }
    case 'LOGOUT':
      localStorage.removeItem('userData');
      return {
        ...state,
        token: '',
        userId: '',
        isAuthenticated: false
      }
    default:
      return state;
  }
}