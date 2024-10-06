import { authenticationService } from '../_services'
import { history } from '../_helpers';
import { push } from 'react-router-redux'

export const LOGIN_EMAIL_BEGIN = 'AUTH_LOGIN_EMAIL_BEGIN'
export const LOGIN_EMAIL_SUCCESS = 'AUTH_LOGIN_EMAIL_SUCCESS'
export const LOGIN_EMAIL_FAILURE = 'AUTH_LOGIN_EMAIL_FAILURE'
export const LOGIN_BEGIN = 'AUTH_LOGIN_BEGIN'
export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const LOGOUT = 'AUTH_LOGOUT'
export const PASS_RESET_EMAIL_BEGIN = 'AUTH_PASS_RESET_EMAIL_BEGIN'
export const PASS_RESET_EMAIL_SUCCESS = 'AUTH_PASS_RESET_EMAIL_SUCCESS'
export const PASS_RESET_EMAIL_FAILURE = 'AUTH_PASS_RESET_EMAIL_FAILURE'
export const SET_PASS_BEGIN = 'AUTH_SET_PASS_BEGIN'
export const SET_PASS_SUCCESS = 'AUTH_SET_PASS_SUCCESS'
export const SET_PASS_FAILURE = 'AUTH_SET_PASS_FAILURE'


export const authenticationActions = {
  sendLoginEmail,
  login,
  logout,

  sendPasswordResetEmail,
  setPassword
};

function sendLoginEmail(email, password, isResendPin = false) {
  const begin = user => ({
    type: LOGIN_EMAIL_BEGIN,
    user,
    isResendPin
  })
  const success = user => ({
    type: LOGIN_EMAIL_SUCCESS,
    user
  })
  const failure = error => ({
    type: LOGIN_EMAIL_FAILURE,
    error
  })
  return dispatch => {
    dispatch(begin({ email }));

    authenticationService.sendLoginEmail(email, password)
      .then(
        (_email) => {
          dispatch(success({ _email }));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };
}

function login(email, password) {
  const begin = user => ({
    type: LOGIN_BEGIN,
    user
  })
  const success = user => ({
    type: LOGIN_SUCCESS,
    user
  })
  const failure = error => ({
    type: LOGIN_FAILURE,
    error
  })
  return dispatch => {
    dispatch(begin({ email }));

    authenticationService.login(email, password)
      .then(
        user => {
          dispatch(success({ user }));
          window.location.href = "/"
        },
        error => {
          console.error(error)
          dispatch(failure(error));
        }
      );
  };
}

function logout() {
  localStorage.removeItem('user');
  return { type: LOGOUT };
}

function sendPasswordResetEmail(email) {
  const begin = user => ({
    type: PASS_RESET_EMAIL_BEGIN,
    user
  })
  const success = user => ({
    type: PASS_RESET_EMAIL_SUCCESS,
    user
  })
  const failure = error => ({
    type: PASS_RESET_EMAIL_FAILURE,
    error
  })
  return dispatch => {
    dispatch(begin({ email }));

    authenticationService.sendPasswordResetEmail(email)
      .then(
        (_email) => {
          dispatch(success({ _email }));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };
}

function setPassword(token, password) {
  const begin = user => ({
    type: SET_PASS_BEGIN,
    user
  })
  const success = user => ({
    type: SET_PASS_SUCCESS,
    user
  })
  const failure = error => ({
    type: SET_PASS_FAILURE,
    error
  })
  return dispatch => {
    dispatch(begin({ token }));

    authenticationService.setPassword(token, password)
      .then(
        user => {
          dispatch(success({ user }));
          dispatch(push(`/`))
        },
        error => {
          dispatch(failure(error));
        }
      );
  };
}

