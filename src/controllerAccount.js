import config from './config';
import { statusHandeling } from "./statusHandeling";
function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    if (user.key) {
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

const createPaymentBusiness = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify(data)

  const req = new Request(config.apiGateway.URL + '/payment/api/create-business/', {
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

const createFundingSourceBusiness = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify(data)

  const req = new Request(config.apiGateway.URL + '/payment/api/manually-create-funding-source/?card_payment=false&business_id='+localStorage.getItem('selectedOffice'), {
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

const accountlink = async (
  account_id
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    "account_id": account_id,

  })

  const req = new Request(config.apiGateway.URL + '/billpay/accountlink/?account_id=' + account_id, {
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

const add_bank_account = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    "office": data.office,
    "name": data.name,
    "stripe_bank_id": data.stripe_bank_id,
    "stripe_account_id": data.stripe_account_id,
    "account_number": data.account_number,
    "routing_number": data.routing_number,
    "account_holder_name": data.account_holder_name,
    "account_holder_type": data.account_holder_type,
    "country": data.country,
    "description": data.description,
  })

  const req = new Request(config.apiGateway.URL + '/billpay/bankaccount/', {
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

const active_cart_bank_new = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())



  const req = new Request(config.apiGateway.URL + '/billpay/activate-bank/?bank_id=' + data.bank_id + "&office_id=" + data.office_id, {

    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const active_cart_bank = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    "office": data.office,
    "id": data.id,
  })

  const req = new Request(config.apiGateway.URL + '/billpay/connectedaccount/activate/', {
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

const add_connected_account = async (
  office,
  email,
  accountType,
  country,
  name,
  description
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    "office": office,
    "type": accountType,
    "country": country,
    "email": email,
    "name": name,
    "description": description
  })

  const req = new Request(config.apiGateway.URL + '/billpay/connectedaccount/', {
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

const get_connected_account = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/billpay/connectedaccount/?office=' + localStorage.getItem("selectedOffice"), {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json = await response.json();

  json.status = response.status;
  return json;
};

const getListBanks = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/billpay/list-banks/?office_id=' + localStorage.getItem("selectedOffice"), {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json = await response.json();

  json.status = response.status;
  return json;
};

const view_bank_account = async (id) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/billpay/bankaccount/?id=' + id, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json = await response.json();

  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const isenableaccount = async (
  office_id,
  account_id
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/billpay/isenableaccount/?office='
    + office_id +
    "&account_id=" + account_id,
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

const checkConnectedAccounts = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/billpay/check-connected-account/?office_id=' + localStorage.getItem("selectedOffice"),
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

const checkEnableAccount = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/billpay/check-business-status/?office_id=' + localStorage.getItem("selectedOffice"),
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


const EnableAccount = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/payment/api/generate-add-bank-link/?business_id=' + localStorage.getItem("selectedOffice"),
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


const officeprofile = async () => {
  const myHeaders = Object.assign(
      { "Content-Type": "application/json" },
      authHeader()
  );

  const req = new Request(
      config.apiGateway.URL + "/clinics/get-office-profile/" + localStorage.getItem("selectedOffice") + "/",
      {
          method: "GET",
          headers: myHeaders,
      }
  );

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  return json;
};

export const controllerAccount = {
  add_connected_account,
  get_connected_account,
  view_bank_account,
  add_bank_account,
  active_cart_bank,
  isenableaccount,
  accountlink,
  checkConnectedAccounts,
  checkEnableAccount,
  EnableAccount,
  getListBanks,
  active_cart_bank_new,
  createFundingSourceBusiness,
  createPaymentBusiness,
  officeprofile
};


