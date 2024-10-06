import { apiService } from './api.service';
import Axios from 'axios'
import config from '../config';


export const authenticationService = {
  sendLoginEmail,
  login,
  logout,
  sendPasswordResetEmail,
  setPassword
}

function sendPasswordResetEmail(email) {
  return apiService.get(`/accounts/password/reset/?email=${email}`)
    .then(resp => {
      return resp.email;
    });
}

function setPassword(token, password) {
  return apiService.post(`/accounts/password/reset/${token}`, { password })
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      return user
    });
}

function sendLoginEmail(email, password) {
  return apiService.post('/auth/token/', { email, password })
    .then(resp => {
      return resp.email;
    });
}
const getData = async () => {
  const Config = {
    headers: {
      Authorization: localStorage.getItem("user") ? "Token " + JSON.parse(localStorage.getItem("user")).key : "",
    }
  }

  const response = await Axios.get(config.apiGateway.URL + `/clinics/selectoffice/`, Config);

  localStorage.setItem("office_ids", JSON.stringify(response.data))
  localStorage.setItem("selectedOffice", eval(JSON.stringify(response.data[0].id)))
  localStorage.setItem("selectedOfficeName", eval(JSON.stringify(response.data[0].office_name)))
  return response

}
function login(email, password) {
  return apiService.post('/dj-rest-auth/login/', { email, password })
    .then(async user => {
      localStorage.setItem('user', JSON.stringify(user));

      const res = await getData();
      return user;
    });
}


function logout() {
  localStorage.removeItem('user');
  return apiService.get('/api-auth/logout/')
    .then(async user => {
      return user;
    });
}