import {ActionTypes} from '../constants/Actions';
import {LOGGED_IN, LOGGED_OUT, LOGIN_CANCELLED, LOGIN_ERROR} from '../constants/statusType';

const initialState = {
  loginInfo: {
    user: null,
    token: null,
    status: 'logged out'
  },
  loginError: null
};

const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS: {
      newState = {...state, loginInfo: {...state.loginInfo, status: LOGGED_IN}};
      return newState;
    }
    case ActionTypes.SAVE_TOKEN: {
      newState = {...state, loginInfo: {...state.loginInfo, token: action.payload.token, user: action.payload.user}};
      localStorage.setItem('login_token', action.payload.token);
      localStorage.setItem('userLoggedIn', JSON.stringify(action.payload.user));
      return newState;
    }
    case ActionTypes.DELETE_TOKEN: {
      newState = {...state, loginInfo: {...state.loginInfo, token: null}, loginError: null};
      localStorage.removeItem('login_token');
      localStorage.removeItem('userLoggedIn');
      newState.token = null;
      return newState;
    }
    case ActionTypes.LOGOUT: {
      newState = {...state, loginInfo: {...state.loginInfo, status: LOGGED_OUT, user: null}, loginError: null};
      return newState;
    }
    case ActionTypes.LOGIN_ERROR: {
      newState = {
        ...state,
        loginInfo: {status: LOGIN_ERROR, user: null},
        loginError: 'Invalid username/password',
      };
      return newState;
    }
    case ActionTypes.LOGIN_CANCELLED:
      newState = {...state, status: LOGIN_CANCELLED};
      return newState;
    default:
      return state;
  }
};

export default userReducer;