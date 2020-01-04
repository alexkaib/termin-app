const initialState = {
  name: '',
  email: '',
  password: '',
  offeredSlots: '',
  authLoading: false,
  authError: null,
  token: '',
  userId: ''
};

const ptReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_LOGIN':
      return {
        ...state,
        email: action.email,
        password: action.password,
        authLoading: true
      };
      break;
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        authError: null,
        authLoading: false
      };
      break;
    case 'AUTH_FAIL':
      return {
        ...state,
        authError: action.error,
        authLoading: false
      }
    default:
      return state;
  }
};

export default ptReducer;
