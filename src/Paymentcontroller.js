import React from "react";
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

const getHelcimToken = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/billpay/get-helcim-js-token/?id=' + data, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const getPaymentProvider = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/payment/api/get-provider/', {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};
const get_payment_wizard_data = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/get-guarantor-by-paymentrequest/?payment_request_id=' + data, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const getPatientId = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/get-guarantor-by-paymentrequest/?payment_request_id=' + data, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const get_priceproductOld = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/billpay/priceproduct/?id=' + data + '&p_interval_id=' + localStorage.getItem("wizard_recurring_interval_count"), {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const get_priceproduct = async (paymentRequestId, intervalId) => {
  const myHeaders = new Headers({ 'Content-Type': 'application/json' });
  const queryParameters = new URLSearchParams({
    payment_request_id: paymentRequestId,
    interval_id: intervalId || ''  // Ensure it falls back to an empty string if null
  }).toString();

  const url = `${config.apiGateway.URL}/billpay/price-product-2/?${queryParameters}`;
  const req = new Request(url, {
    method: 'GET',
    headers: myHeaders,
  });

  try {
    const response = await fetch(req);
    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status);
    return json;
  } catch (error) {
    console.error("Failed to fetch price product:", error);
    throw error;  // Re-throw the error if you need to handle it in the calling component
  }
};


const get_payment_data = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/billpay/payment/?id=' + data, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  // json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const send_customer_data = async (
  first_name,
  last_name,
  email,
  phone,
  address,
  id,
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const raw = JSON.stringify({
    "first_name": first_name,
    "last_name": last_name,
    "email": email,
    "phone": phone,
    "guarantor": id
  })

  const req = new Request(config.apiGateway.URL + '/billpay/customer/', {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const send_payment_method = async (
  card_cvc,
  card_number,
  card_exp_month,
  card_exp_year,
  customer,

) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
  const raw = JSON.stringify({
    "card_cvc": card_cvc,
    "card_number": card_number,
    "card_exp_month": card_exp_month,
    "card_exp_year": card_exp_year,
    "customer": customer,
  })

  const req = new Request(config.apiGateway.URL + '/billpay/paymentmethod/', {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const sendPaymentIntentId = async (
  data,
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
  const raw = JSON.stringify(data)
  const req = new Request(config.apiGateway.URL + '/billpay/attach-payment-method/', {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  //statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const helcimPayMulti = async (
  id, cardtoken, ip, response2
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
  var payload = {
    'payment_request_id': id,
    'payment_method_token': cardtoken ? cardtoken : "",
    'ip-address': ip,
    "helcimResponse": response2
  }

  const raw = JSON.stringify(payload)

  const req = new Request(config.apiGateway.URL + "/billpay/attach-payment-method/", {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  //statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const helcimPay = async (
  id, cardtoken, ip, response2
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
  var payload = {
    'card-token': cardtoken ? cardtoken : "",
    'ip-address': ip,
    "helcimResponse": response2
  }

  const raw = JSON.stringify(payload)

  const req = new Request(config.apiGateway.URL + '/billpay/pay/?id=' + id, {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  //statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const paySinglePayment = async (
  id,
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/billpay/pay/?id=' + id, {
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  //statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const createInstallment = async (interval_count, payment_request) => {
  // Convert interval_count to an integer to ensure proper type handling
  const intervalCount = parseInt(interval_count, 10);
  if (isNaN(intervalCount)) {
      console.error('Interval count must be a valid number');
      return { error: "Interval count must be a valid number" };
  }

  const myHeaders = new Headers({
      "Content-Type": "application/json"
  });

  // Construct the body using an object and stringify it in the fetch call
  const requestBody = {
      payment_request: payment_request
  };
  requestBody.interval_count = intervalCount;

  try {
      const response = await fetch(config.apiGateway.URL + '/billpay/create-installment/', {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(requestBody) // Stringify the requestBody here for clarity and to align with common practices
      });
      const json = await response.json();
      json.status = response.status; // Attach status to json for uniform error handling
      statusHandeling.statusCodeHandeling(response.status);
      return json;
  } catch (error) {
      console.error('Error creating installment:', error);
      return { error: error.message };
  }
};


const createTreatmentPlans = async (data) => {
    const { name, patient, description, priority, procedure } = data
    const myHeaders = {
        "Content-Type": "application/json",
        ...authHeader()
    };

    const stringifiedFields = JSON.stringify({
        name,
        patient,
        description,
        priority,
    });

    const requestBody = JSON.parse(stringifiedFields);
    requestBody.procedure = procedure;

    const response = await fetch(config.apiGateway.URL + "/clinics/create-treatmentplan/?office_id=" + localStorage.getItem("selectedOffice"), {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestBody)
    });
    const json = await response.json();
    return {
        json: json,
        status: response.status,
        message: "Success"
    };

};



const send_clinics_subscription = async (
  customer,
  price,
  payment_request,
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const raw = JSON.stringify({
    "customer": customer,
    "price": price,
    "payment_request": payment_request,
  })

  const req = new Request(config.apiGateway.URL + '/billpay/subscription/', {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const createBillingCustomer = async (
  data,
  id
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const raw = JSON.stringify(data)

  const req = new Request(config.apiGateway.URL + '/billpay/create-guarantor-billing/?payment_request_id=' + id, {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const createFundingSource = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const raw = JSON.stringify(data)

  const req = new Request(config.apiGateway.URL + '/payment/api/manually-create-funding-source/?card_payment=true&business_id=' + localStorage.getItem('selectedOffice'), {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const get_clinics_subscription_data = async (
  id
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const raw = JSON.stringify({
    "id": id,
  })

  const req = new Request(config.apiGateway.URL + '/billpay/subscription/?id=' + id, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const payment_detail = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/billpay/paymentdetail/?id=' + data, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)

  return json;
};

const checkPayment = async (id) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/billpay/payment-status/' + id + '/', {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)

  return json;
};

const checkMultiPaymentDone = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/billpay/installment-status/?payment_request_id=' + data, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status1 = response.status;
  statusHandeling.statusCodeHandeling(response.status)

  return json;
};

const failedPaymentOfPaymentNew2 = async (data, page) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/transaction-list/' +
    '?office_id=' + localStorage.getItem('selectedOffice') + '&payment_request_id=' + data + '&page=' + page + "&status=failed"
    , {
      //mode: 'cors',
      //credentials: 'include',
      method: 'GET',
      headers: myHeaders,
    });

  const response = await fetch(req);
  //statusHandeling.statusCodeHandeling(response.status)
  const json = await response.json();
  json.status1 = response.status;
  //statusHandeling.statusCodeHandeling(response.status)

  return json;
};

const failedPaymentOfPaymentNew = async (data, page) => {
  {/* not used */ }
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/failed-payment-requests/' +
    '?payment_id=' + data + '&page=' + page
    , {
      method: 'GET',
      headers: myHeaders,
    });

  const response = await fetch(req);
  const json = await response.json();
  json.status1 = response.status;
  return json;
};

const failedPaymentOfPayment = async (data, page) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/payment-request-failed-transactions/' +
    '?office_id=' + localStorage.getItem('selectedOffice') + '&payment_request_id=' + data + '&page=' + page
    , {
      method: 'GET',
      headers: myHeaders,
    });

  const response = await fetch(req);
  const json = await response.json();
  json.status1 = response.status;
  return json;
};

const transactionOfPaymentNew = async (data, page) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/transaction-list/' +
    '?office_id=' + localStorage.getItem('selectedOffice') + '&payment_request_id=' + data + '&page=' + page + "&status=paid"
    , {
      //mode: 'cors',
      //credentials: 'include',
      method: 'GET',
      headers: myHeaders,
    });

  const response = await fetch(req);
  //statusHandeling.statusCodeHandeling(response.status)
  const json = await response.json();
  json.status1 = response.status;
  //statusHandeling.statusCodeHandeling(response.status)

  return json;
};

const transactionOfPayment = async (data, page) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/list-payment-request-transactions/' +
    '?office_id=' + localStorage.getItem('selectedOffice') + '&payment_request_id=' + data + '&page=' + page
    , {
      method: 'GET',
      headers: myHeaders,
    });

  const response = await fetch(req);
  const json = await response.json();
  json.status1 = response.status;

  return json;
};

const officeprofile = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/clinics/officelogo/?office=' + data, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)

  return json;
};

export const Paymentcontroller = {
  get_payment_data,
  get_payment_wizard_data,
  getPatientId,
  send_customer_data,
  get_priceproduct,
  send_payment_method,
  send_clinics_subscription,
  get_clinics_subscription_data,
  officeprofile,
  payment_detail,

  paySinglePayment,
  createFundingSource,
  checkPayment,
  createInstallment,
  checkMultiPaymentDone,

  createBillingCustomer,
  sendPaymentIntentId,
  transactionOfPayment,
  failedPaymentOfPayment,
  failedPaymentOfPaymentNew,
  transactionOfPaymentNew,
  failedPaymentOfPaymentNew2,

  // Helcim :
  getPaymentProvider,
  getHelcimToken,
  helcimPay,
  helcimPayMulti
};


