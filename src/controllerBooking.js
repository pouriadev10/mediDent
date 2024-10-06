import config from './config';
import { statusHandeling } from "./statusHandeling";
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

const createDiscountRule = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify(data)


  const req = new Request(config.apiGateway.URL + '/booking/discount-rules-lc/',
    {
      body: raw,
      method: 'POST',
      headers: myHeaders,
    });

  const response = await fetch(req);

  var json = await response.json();

  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const UpdateDiscount = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    ...data,
    office: data.office.id
  })


  const req = new Request(config.apiGateway.URL + '/booking/discount-rules-ru/' + data.id + "/",
    {
      body: raw,
      method: 'PUT',
      headers: myHeaders,
    });

  const response = await fetch(req);

  var json = await response.json();

  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const ListOfDiscount = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/booking/discount-rules-lc/',
    {
      method: 'GET',
      headers: myHeaders,
    });

  const response = await fetch(req);

  var json = await response.json();

  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

export const controllerBooking = {
  ListOfDiscount,
  UpdateDiscount,
  createDiscountRule
};


