import {
  LOGIN_EMAIL_BEGIN,
  LOGIN_EMAIL_SUCCESS,
  LOGIN_EMAIL_FAILURE,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  PASS_RESET_EMAIL_BEGIN,
  PASS_RESET_EMAIL_SUCCESS,
  PASS_RESET_EMAIL_FAILURE,
  SET_PASS_BEGIN,
  SET_PASS_SUCCESS,
  SET_PASS_FAILURE
} from '../actions/authentication'
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
  loggedIn: true,
  user
} : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case PASS_RESET_EMAIL_BEGIN:
      return {
        sendingPasswordResetEmail: true,
      };
    case PASS_RESET_EMAIL_SUCCESS:
      return {
        passwordResetEmailSent: true,
        user: {email: action.email}
      };
    case PASS_RESET_EMAIL_FAILURE:
      return {
        error: action.error
      };
    case SET_PASS_BEGIN:
      return {
        settingPassword: true,
      };
    case SET_PASS_SUCCESS:
      return {
        user: action.user
      };
    case SET_PASS_FAILURE:
      return {
        error: action.error
      };
    case LOGIN_EMAIL_BEGIN:
	  const loginEmailSent = action.isResendPin? true : false;
      return {
        ...state,
        error: null,
        loginEmailSent,
        sendingLoginEmail: true,
        user: {email: action.email}
      };
    case LOGIN_EMAIL_SUCCESS:
      return {
        ...state,
        sendingLoginEmail: false,
        loginEmailSent: true,
        user: {email: action.email}
      };
    case LOGIN_EMAIL_FAILURE:
      return {
        error: action.error
      };
    case LOGIN_BEGIN:
      return {
        ...state,
        error: null,
        loggedIn: false,
        loggingIn: true,
        user: action.user
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        loginEmailSent: state.loginEmailSent,
        error: action.error
      };
    case LOGOUT:
      return {};
    default:
      return state
  }
}