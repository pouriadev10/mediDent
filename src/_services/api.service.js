import Axios from 'axios';

import config from '../config';
import store from "../store/configureStore";
import { authenticationActions } from '../actions';

export const apiService = {
  get,
  post,
  del,
  create_payment,
  getOfficeData
};

function call(type, resource, parameters, form_has_upload = false) {
  switch (type) {
    case 'post':
      return post(resource, parameters)
    case 'get':
      return get(resource)
    case 'del':
      return del(resource)
    case 'create_payment':
      return create_payment(resource, parameters)
    default:
      return Promise.reject(`unsupported call type: ${type}`)
  }
}
function getOfficeData(resource, parameters) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  return Axios.get(`${config.apiGateway.URL}${resource}?office=` + eval(parameters), { headers })
    .then(handleApiResponse)
    .catch(err => handleApiError(err.response, 'get', resource))
}
function post(resource, parameters) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, authHeader());
  const url = `${config.apiGateway.URL}${resource}`
  return Axios.post(url, parameters, { headers })
    .then(handleApiResponse)
    .catch(err => handleApiError(err.response, 'post', resource, parameters))
}
function create_payment(resource, formData) {
  const headers = Object.assign(authHeader());
  const url = `${config.apiGateway.URL}${resource}`

  return Axios.post(url, formData, { headers })
    .then(handleApiResponse)
    .catch(err => handleApiError(err.response, 'create_payment', resource, formData))
}
function get(resource) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  return Axios.get(`${config.apiGateway.URL}${resource}`, { headers })
    .then(handleApiResponse)
    .catch(err => handleApiError(err.response, 'get', resource))
}

function del(resource) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  return Axios.delete(`${config.apiGateway.URL}${resource}`, { headers })
    .then(handleApiResponse)
    .catch(err => handleApiError(err.response, 'get', resource))
}

function handleApiError(response, ...args) {
  if (!response) {
    return Promise.reject({ message: "server is unavailable" })
  }
  const data = response.data
  let error = { message: "", data: data }
  if (data) {
    if (data.message && typeof data.message !== "string") {
      error.message = "Please enter the required fields"
      error.fields = data.message
    }
    if (data.non_field_errors && data.non_field_errors.length) {
      data.non_field_errors.forEach(err => {
        error.message = ((error.message) ? error.message + "\n" : "") + err
      })
    }
    if (typeof data.message === "string") {
      error.message = data.message
    }
    if (data.short_message) {
      error.short_message = data.short_message
    }
    if (!error.message) {
      error.message = response.statusText
    }

    if (response.status === 401) {
      return refreshAuthToken_forUnauthorizedAPICall(response, ...args)
    }
  }
  return Promise.reject(error);
}
var unauthorized_request_queue = []
var is_refreshing_token = false
window.refreshAuthToken_forUnauthorizedAPICall = refreshAuthToken_forUnauthorizedAPICall
function refreshAuthToken_forUnauthorizedAPICall(response, ...args) {
  let user = JSON.parse(localStorage.getItem('user'));

  let refresh_token = (user && user.tokens && user.tokens.refresh && user.tokens.refresh.token) ? user.tokens.refresh.token : null
  if (!refresh_token)
    return Promise.reject("Refresh token missing. Unable to refresh auth token.");

  if (is_refreshing_token) {
    let newPromise = new Promise((res, rej) => {
      unauthorized_request_queue.push({ res, rej, args })
    })
    return newPromise
  }
  is_refreshing_token = true

  Axios.post(
    `${config.apiGateway.URL}/auth/token/refresh/`,
    { refresh_token },
    { headers: { 'Content-Type': 'application/json' } }
  )
    .then(response => {
      user.tokens.access = response.data.access
      localStorage.setItem('user', JSON.stringify(user))

      console.debug(`refreshed token for ${unauthorized_request_queue.length} unauthed calls`)
      unauthorized_request_queue.forEach(req => {
        let resolver = req.res
        let rejecter = req.rej
        call(...(req.args)).then(result => {
          resolver(result)
        }).catch(er => {
          rejecter(er)
        })
      })
      unauthorized_request_queue = []
    }).catch(err => {
      if (err.response && err.response.status === 401) {
        console.debug('refreh token expired. logging user out.')
        store.dispatch(authenticationActions.logout());
      }
      unauthorized_request_queue.forEach(req => {
        req.rej(err)
      })
      unauthorized_request_queue = []
    })

  return handleApiError(response, ...args)
}

function handleApiResponse(response) {
  return response.data
}

function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    if (user.key ) {
      return { 'Authorization': 'Token  ' + user.key };
    }
    else {
      return {};
    }
  }
  else {
    return {};
  }
}