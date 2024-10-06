import config from "./config";
import { statusHandeling } from "./statusHandeling";
function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (user.key) {
      return { Authorization: "Token  " + user.key };
    } else {
      return {};
    }
  } else {
    return {};
  }
}

const EditHealthCategory = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  data["office_id"] = localStorage.getItem("selectedOffice")
  const raw = JSON.stringify(data)

  const req = new Request(
    config.apiGateway.URL + "/clinics/health-category/" + data.id + "/?office_id=" + localStorage.getItem("selectedOffice"),
    {
      body: raw,
      method: "PUT",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const createNewMainProcedure = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  //data["office"] = localStorage.getItem("selectedOffice")
  const raw = JSON.stringify(data)

  const req = new Request(
    config.apiGateway.URL + "/clinics/procedure-lc/?office_id=" + localStorage.getItem("selectedOffice"),
    {
      body: raw,
      method: "post",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const EditProcedureImpact = async (data, id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  data["office"] = localStorage.getItem("selectedOffice")
  data["health_category"] = data["health_category"] + ""
  const raw = JSON.stringify(data)

  const req = new Request(
    config.apiGateway.URL + "/clinics/procedure-impact-rud/" + id +
    "/?office_id=" + localStorage.getItem("selectedOffice")
    ,
    {
      body: raw,
      method: "PATCH",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const CreateNewProcedure = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  data["office"] = localStorage.getItem("selectedOffice")
  const raw = JSON.stringify(data)

  const req = new Request(
    config.apiGateway.URL + "/clinics/procedure-impact/",
    {
      body: raw,
      method: "post",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const CreateNewHealthCategory = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  data["office"] = localStorage.getItem("selectedOffice")
  const raw = JSON.stringify(data)

  const req = new Request(
    config.apiGateway.URL + "/clinics/health-category/",
    {
      body: raw,
      method: "post",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const cancelPayment = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/billpay/cancel-payment-request/?id=" + id,
    {
      method: "post",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const checkBusinessOnBoarding = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/payment/check-business-onboarding/" + localStorage.getItem("selectedOffice")
    + "/" + id + "/",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getProviderDetail = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/provider-detail/" + id + "/",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getProviderList = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/list-office-providers/?page=" +
    1 +
    "&office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getSubcriptionDetail = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/membership_plans/membership-detail/" + id + "/",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getCardData = async () => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/total-ar-amounts/?office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getMaxAmountAR = async () => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/max-ar-amount/?office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getReasonsList = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/billpay/payment-reason-list/",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getIntervalsForPayment = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/billpay/pr-available-intervals/?id=" + id,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getAvailableIntervals = async () => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/billpay/payment-interval-list/",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const searchGuarantor = async (search) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/guarantor-lc/?page=0&search=" +
    search +
    "&office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getGuarantor = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/guarantor-lc/?page=0&office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getGuarantor2 = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/patient-guarantors-list/?office_id=" +
    localStorage.getItem("selectedOffice") + "&patient_id=" + id,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getPatient = async (search) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/patient-list/?page=0&office_id=" +
    localStorage.getItem("selectedOffice") + "&search=" + search,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getPatient2 = async (search) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/patient-list/?page=0&office_id=" +
    localStorage.getItem("selectedOffice") ,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getStripeKey = async (data) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });

  const req = new Request(
    config.apiGateway.URL + "/clinics/get-stripe-public_key/",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getARDetail = async (data, page) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  const req = new Request(
    config.apiGateway.URL +
    "/clinics/ar-detail/" +
    data.split("?id=")[1] +
    "/?page=" +
    page,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const updateGetAR = async (
  provider,
  guarantor,
  practice_id,
  min_date,
  max_date,
  entry_id,
  min_amount,
  max_amount
) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  var url =
    "/clinics/ar-list/?office_id=" + localStorage.getItem("selectedOffice");
  if (entry_id && entry_id.length > 0) url += "&entry_id=" + entry_id;

  if (provider && provider > -1) url += "&provider_id=" + provider;

  if (guarantor && guarantor > -1) url += "&guarantor=" + guarantor;

  if (practice_id && practice_id > -1) url += "&practice_id=" + practice_id;

  if (min_date && min_date.length > 0) url += "&min_date=" + min_date;

  if (max_date && max_date.length > 0) url += "&max_date=" + max_date;

  if (min_amount && min_amount > 0) url += "&min_amount=" + min_amount;

  if (max_amount && max_amount > -1) url += "&max_amount=" + max_amount;

  const req = new Request(config.apiGateway.URL + url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const updateGetAR2 = async (
  guarantor,
  practice_id,
  min_date,
  max_date,
  entry_id,
  min_amount,
  max_amount,
  dueDate,
  page
) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  var url =
    "/clinics/ar-list/?office_id=" + localStorage.getItem("selectedOffice");
  if (guarantor && guarantor > -1) url += "&guarantor=" + guarantor;

  if (practice_id && practice_id > -1) url += "&practice_id=" + practice_id;

  if (min_date && min_date.length > 0) url += "&min_date=" + min_date;

  if (max_date && max_date.length > 0) url += "&max_date=" + max_date;

  if (min_amount && min_amount > 0) url += "&min_amount=" + min_amount;

  if (max_amount && max_amount > -1) url += "&max_amount=" + max_amount;
  url += "&amounts_between=" + dueDate;

  url += "&page=" + page;

  const req = new Request(config.apiGateway.URL + url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getAR = async (page) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/ar-list/?page=" +
    page +
    "&office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const office_services = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/booking/get-appointment-type/?office=" + data + "&page=0",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const officeprofile = async (data) => {
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
  statusHandeling.statusCodeHandeling(response.status);
  const json = await response.json();
  json.status = response.status;
  localStorage.setItem("officeLogo", JSON.stringify(json));
  return json;
};

const get_patient_search = async (data, search) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/patient/?office=" +
    data +
    "&search=" +
    search,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(req);
  if (response.status != 204) {
    const json = await response.json();

    return json;
  } else {
    return { data: {} };
  }
};

const get_guarantor_search = async (data, search) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/guarantor-lc/?page=0&office_id=" +
    data +
    "&search=" +
    search,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(req);
  if (response.status != 204) {
    const json = await response.json();

    return json;
  } else {
    return { data: {} };
  }
};

const get_patient = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/clinics/patient/?office=" + data,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(req);
  if (response.status != 204) {
    const json = await response.json();

    return json;
  } else {
    return { data: {} };
  }
};

const get_payment_requests = async (page_size, page, search_term, office, repay) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    `/billpay/paymentrequests/?page=${page}&page_size=${page_size}&search=${search_term}&office_id=${office}&has_repay=${repay}`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const get_payment_requests2 = async (page_size, page, search_term, office, repay, id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    `/billpay/paymentrequests/?page=${page}&page_size=${page_size}&search=${search_term}&office_id=${office}&has_repay=${repay}&guarantor_id=${id}`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const declineAppointment = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  const raw = JSON.stringify({
    approved: false,
  });
  const req = new Request(
    config.apiGateway.URL + "/booking/approve-appointment/" + id + "/",
    {
      body: raw,
      method: "POST",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const getUserOffices = async () => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(config.apiGateway.URL + "/clinics/practice-users/", {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const createUser = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  const raw = JSON.stringify({
    email: data.email,
    username: data.username,
    phone_number: data.phone_number,
  });
  const req = new Request(config.apiGateway.URL + "/clinics/create-user/", {
    body: raw,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const setOfficeAdmin = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  const raw = JSON.stringify({
    username: data.username,
    office: data.office_id,
  });
  const req = new Request(
    config.apiGateway.URL + "/clinics/set-office-access/",
    {
      body: raw,
      method: "POST",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const approveAppointment = async (time, id, approve) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  const raw = JSON.stringify({
    approved: approve,
    appointment_datetime: time,
  });
  const req = new Request(
    config.apiGateway.URL + "/booking/approve-appointment/" + id + "/",
    {
      body: raw,
      method: "POST",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const createGuarantor = async (
  first_name,
  last_name,
  email,
  phone_number,
  city,
  birth_date,
  address,
  patient_state,
  Zipcode
) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  const raw = JSON.stringify({
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone_number,
    city: city,
    birth_date: birth_date,
    address: address,
    zip_code: Zipcode,
    state: patient_state,
    office: localStorage.getItem("selectedOffice"),
  });
  const req = new Request(
    config.apiGateway.URL +
    "/clinics/create-patient/?office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      body: raw,
      method: "POST",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const createGuarantor2 = async (id, first_name, last_name, email, phone_number,address,state,zipcode ) => {
  const myHeaders = {
    "Content-Type": "application/json",
    ...authHeader()
  };

  const raw = JSON.stringify({
    firstname: first_name,
    lastname: last_name,
    email: email,
    cell: phone_number,
    address_line1: address,
    state: state,
    zipcode: zipcode
  });

  const req = new Request(
    `${config.apiGateway.URL}/clinics/create-guarantor-for-patient/?office_id=${localStorage.getItem("selectedOffice")}&patient_id=${id}`,
    {
      body: raw,
      method: "POST",
      headers: myHeaders,
    }
  );

  try {
    const response = await fetch(req);
    const json = await response.json();
    statusHandeling.statusCodeHandeling(response.status);
    json.status = response.status;
    return json;
  } catch (error) {
    console.error('Error creating guarantor:', error);
    throw error;
  }
};


const createPatient = async (
  first_name,
  last_name,
  email,
  phone_number,
  city,
  birth_date,
  address
) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  const raw = JSON.stringify({
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone_number,
    city: city,
    birth_date: birth_date,
    address: address,
    office: localStorage.getItem("selectedOffice"),
  });
  const req = new Request(config.apiGateway.URL + "/clinics/patient/", {
    body: raw,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const createPayReqAR = async (formData) => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(config.apiGateway.URL + "/billpay/paymentrequest/", {
    body: formData,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const createPayReq = async (formData) => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(config.apiGateway.URL + "/billpay/paymentrequest/", {
    body: formData,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const resetConfirm = async (password1, password2, uid, token) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const raw = JSON.stringify({
    new_password1: password1,
    new_password2: password2,
    uid: uid,
    token: token,
  });
  const req = new Request(config.apiGateway.URL + "/password/reset/confirm/", {
    body: raw,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json = await response.json();
  json.status = response.status;
  return json;
};
const passwordReset = async (email) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const raw = JSON.stringify({
    email: email,
  });
  const req = new Request(config.apiGateway.URL + "/password/reset/", {
    body: raw,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const upload_pdf_file = async (formData) => {
  const myHeaders = Object.assign(authHeader());
  const req = new Request(config.apiGateway.URL + "/clinics/file/", {
    body: formData,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const add_provider = async (data) => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(config.apiGateway.URL + "/clinics/create-provider/", {
    body: data,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status);
  json.status = response.status;
  return json;
};

const getBadge = async (page) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/billpay/new-objects-count/?office_id=" +
    localStorage.getItem("selectedOffice");
  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  return json;
};

const unApprovedAppointment = async (page) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/booking/unapproved-appointments-list/?office_id=" +
    localStorage.getItem("selectedOffice") +
    "&page=" +
    page;
  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  return json;
};

const get_provider = async (office, appointment_type) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  if (appointment_type) {
    url =
      config.apiGateway.URL +
      "/clinics/get-provider/?office=" +
      office +
      "&appointment_type=" +
      appointment_type;
  } else {
    url = config.apiGateway.URL + "/clinics/get-provider/?office=" + office;
  }
  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status);

  return json;
};

const add_provider_times = async (weekday, start, end, provider) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });
  var url = "";

  url = config.apiGateway.URL + "/clinics/providerschedules/";

  const raw = JSON.stringify({
    weekday,
    start,
    end,
    provider,
  });

  const req = new Request(url, {
    body: raw,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;

  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const getLogo = async () => {
  const myHeaders = Object.assign(authHeader());
  var url = "";

  url = config.apiGateway.URL + "/clinics/get-smilin-logo/";

  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status);
  localStorage.setItem("smilepassLogo", JSON.stringify(json));
  return json;
};

const get_provider_times = async (id) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";

  url = config.apiGateway.URL + "/clinics/providerschedules/?provider=" + id;

  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const getPracticeOffices = async () => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url = config.apiGateway.URL + "/clinics/get-practice-offices/";

  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const EditService = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const raw = JSON.stringify(data);

  const req = new Request(
    config.apiGateway.URL +
    "/membership_plans/services-update-delete/" +
    data.id +
    "/",
    {
      body: raw,
      method: "PUT",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  statusHandeling.statusCodeHandeling(res.status);
  return res;
};

const removeProcedure = async (id) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/clinics/procedure-impact/" +
    id +
    "/?office_id=" + localStorage.getItem("selectedOffice");

  const req = new Request(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  const response = await fetch(req);

  if (response.status > 250) {
    const json = await response.json();
    const res = {
      json: json,
      status: response.status,
      message: response.message,
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  } else {
    const res = {
      json: { message: "succssfull" },
      status: 204,
      message: "Service deleted successfully",
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  }
};

const DeleteHealthCategory = async (id) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/clinics/health-category/" +
    id +
    "/?office_id=" + localStorage.getItem("selectedOffice");

  const req = new Request(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  const response = await fetch(req);

  if (response.status > 250) {
    const json = await response.json();
    const res = {
      json: json,
      status: response.status,
      message: response.message,
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  } else {
    const res = {
      json: { message: "succssfull" },
      status: 204,
      message: "Service deleted successfully",
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  }
};

const DeletePlan = async (id) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/membership_plans/membership-plan-delete/" +
    id +
    "/";

  const req = new Request(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  const response = await fetch(req);

  if (response.status > 250) {
    const json = await response.json();
    const res = {
      json: json,
      status: response.status,
      message: response.message,
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  } else {
    const res = {
      json: { message: "succssfull" },
      status: 204,
      message: "Service deleted successfully",
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  }
};

const deleteService = async (id) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/membership_plans/services-update-delete/" +
    id +
    "/";

  const req = new Request(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  const response = await fetch(req);

  if (response.status > 250) {
    const json = await response.json();
    const res = {
      json: json,
      status: response.status,
      message: response.message,
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  } else {
    const res = {
      json: { message: "succssfull" },
      status: 204,
      message: "Service deleted successfully",
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  }
};

const getServiceList = async (page) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/membership_plans/services-list-create/?page=" +
    page +
    "&office_id=" +
    localStorage.getItem("selectedOffice");

  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;

  return json;
};

const CreateServiceList = async (Sservice) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const raw = JSON.stringify(Sservice);

  const req = new Request(
    config.apiGateway.URL +
    "/membership_plans/services-list-create/" +
    "?office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      body: raw,
      method: "POST",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };
  return res;
};

const GetTransactionSearch = async (value, state, page) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/billpay/transaction-state-list/?search=" +
    value +
    "&state=" +
    state +
    "&page=" +
    page +
    "&office_id=" +
    localStorage.getItem("selectedOffice");

  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const GetTransaction = async (state, page) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/billpay/transaction-state-list/?state=" +
    state +
    "&page=" +
    page +
    "&office_id=" +
    localStorage.getItem("selectedOffice");

  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const checkPracticeAdmin = async () => {
  const myHeaders = Object.assign(authHeader());
  var url = "";

  url = config.apiGateway.URL + "/clinics/check-practice-admin/";

  const req = new Request(url, {
    method: "GET",
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const editProviderActive = async (status, id) => {
  const myHeaders = Object.assign(authHeader(), {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  var data = JSON.stringify({
    "status": status
  })
  const req = new Request(
    config.apiGateway.URL + "/clinics/provider-update/" + id + "/?office_id=" + localStorage.getItem("selectedOffice"),
    {
      body: data,
      method: "PATCH",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;

  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const changeOfficeLog = async (data, officeId) => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(
    config.apiGateway.URL + "/clinics/update-office-profile/" + officeId + "/",
    {
      body: data,
      method: "PATCH",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;

  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const UpdateTransactionState = async (state, id) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const raw = JSON.stringify({
    state: state,
  });
  const req = new Request(
    config.apiGateway.URL + "/billpay/update-transaction-state/" + id + "/",
    {
      body: raw,
      method: "PUT",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;

  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const Login = async (email, pass) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const raw = JSON.stringify({
    email: email,
    password: pass,
  });

  const req = new Request(config.apiGateway.URL + "/dj-rest-auth/login/", {
    body: raw,
    method: "POST",
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const FailedPayments = async (page) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/billpay/list-repay-paymentrequests/?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const GetAllMembership = async () => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    "/membership_plans/membership-plan-list/" +
    "?office_id=" +
    localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();

  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};
const EditOfficeProfile = async (office) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  let value = office;
  delete value.logo;
  const raw = JSON.stringify(value);

  const req = new Request(
    config.apiGateway.URL + `/clinics/update-office-profile/${office.id}/`,
    {
      body: raw,
      method: "PATCH",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};
const UpdateReviewFeature = async (item) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const raw = JSON.stringify({ featured: !item.featured });

  const req = new Request(
    config.apiGateway.URL + `/clinics/update-review/${item.id}/`,
    {
      body: raw,
      method: "PATCH",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const SetReview = async (token, rate, image, review) => {
  const formData = new FormData();
  formData.append("score", rate);
  formData.append("note", review);
  formData.append("image", image);

  const response = await fetch(
    config.apiGateway.URL + `/clinics/create-review/${token}/`,
    {
      method: "POST",
      body: formData,
    }
  );

  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const removeAppointmentType = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/booking/appointment-type-detail/" + id + "/",
    {
      method: "delete",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  if (response.status > 250) {
    const json = await response.json();
    const res = {
      json: json,
      status: response.status,
      message: response.message,
    };
    return res;
  } else {
    const res = {
      json: { message: "succssfull" },
      status: 204,
      message: "Appointment type deleted successfully",
    };


    return res;
  }

};

const listOfProviderForCreateAppointment = async () => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + "/clinics/get-provider/?office=" + localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const EditAppointmentType = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + `/booking/appointment-type-detail/` + data.id + '/',
    {
      body: JSON.stringify(data),
      method: "PATCH",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const createNewAppointmentType = async (data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  data["office"] = localStorage.getItem("selectedOffice")

  const req = new Request(
    config.apiGateway.URL + `/booking/create-appointment-type/`,
    {
      body: JSON.stringify(data),
      method: "POST",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const getListOfAppointmentTypes = async (page) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + `/booking/get-appointment-type/?office=` + localStorage.getItem("selectedOffice") + "&page=" + page,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const getProcedureList = async (page) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + `/clinics/procedure-list-impact/?page=` + page + "&office_id=" + localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }

  );
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const getHealthCategory = async (page) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + `/clinics/health-category/?page=` + page + "&office_id=" + localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }

  );
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const GetProviderDetail = async (token) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + `/clinics/appointment-detail/${token}/`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const UpdateReviewState = async (item, data) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const raw = JSON.stringify({ state: data });

  const req = new Request(
    config.apiGateway.URL + `/clinics/update-review/${item.id}/`,
    {
      body: raw,
      method: "PATCH",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};
const getOfficeProfile = async () => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    `/clinics/get-office-profile/${localStorage.getItem("selectedOffice")}/`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(req);
  const json = await response.json();

  const res = {
    data: json,
    status: response.status,
    message: response.message,
  };

  return res;
};
const getOfficeDetail = async () => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL +
    `/clinics/get-office-detail/${localStorage.getItem("selectedOffice")}/`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(req);
  const json = await response.json();

  const res = {
    data: json,
    status: response.status,
    message: response.message,
  };

  return res;
};
const GetReview = async (search, pageNumber) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );
  if (search === "featured") {
    const req = new Request(
      config.apiGateway.URL +
      `/clinics/reviews/?office_id=${localStorage.getItem("selectedOffice")}&featured=true&page=${pageNumber}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const response = await fetch(req);
    const json = await response.json();

    const res = {
      data: json,
      status: response.status,
      message: response.message,
    };

    return res;
  } else {
    const req = new Request(
      config.apiGateway.URL +
      `/clinics/reviews/?office_id=${localStorage.getItem("selectedOffice")}&search=${search}&page=${pageNumber}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const response = await fetch(req);
    const json = await response.json();

    const res = {
      data: json,
      status: response.status,
      message: response.message,
    };

    return res;
  }
};


const deleteProcedureRUD = async (id) => {
  const myHeaders = Object.assign(authHeader());
  var url = "";
  url =
    config.apiGateway.URL +
    "/clinics/procedure-rud/" +
    id +
    "/?office_id=" + localStorage.getItem("selectedOffice");

  const req = new Request(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  const response = await fetch(req);

  if (response.status > 250) {
    const json = await response.json();
    const res = {
      json: json,
      status: response.status,
      message: response.message,
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  } else {
    const res = {
      json: { message: "succssfull" },
      status: 204,
      message: "Service deleted successfully",
    };

    statusHandeling.statusCodeHandeling(res.status);
    return res;
  }
};


const editProcedureRUD = async (data, id) => {
  const myHeaders = Object.assign(authHeader(), {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  var raw = JSON.stringify(data)
  const req = new Request(
    config.apiGateway.URL + "/clinics/procedure-rud/" + id + "/?office_id=" + localStorage.getItem("selectedOffice"),
    {
      body: raw,
      method: "PATCH",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;

  statusHandeling.statusCodeHandeling(response.status);
  return json;
};

const getProgressStatus = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + `/billpay/transaction-retreive/` + id + "/?office_id=" + localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }

  );
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const getProgressStatusFaild = async (id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" },
    authHeader()
  );

  const req = new Request(
    config.apiGateway.URL + `/billpay/payment-request-retreive/` + id + "/?office_id=" + localStorage.getItem("selectedOffice"),
    {
      method: "GET",
      headers: myHeaders,
    }

  );
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

export const controller = {
  getBadge,
  getPatient,
  getPatient2,
  getGuarantor2,
  getProgressStatusFaild,
  getProgressStatus,
  declineAppointment,
  approveAppointment,
  unApprovedAppointment,
  getStripeKey,
  getLogo,
  officeprofile,
  office_services,
  get_patient,
  createPatient,
  get_payment_requests,
  upload_pdf_file,
  add_provider,
  passwordReset,
  resetConfirm,
  changeOfficeLog,
  get_provider,
  createPayReq,
  createPayReqAR,
  Login,
  get_provider_times,
  add_provider_times,
  get_patient_search,
  updateGetAR2,
  checkPracticeAdmin,
  getOfficeDetail,
  getPracticeOffices,
  createUser,
  getUserOffices,
  setOfficeAdmin,
  GetReview,
  getOfficeProfile,
  EditOfficeProfile,
  UpdateReviewFeature,
  UpdateReviewState,
  createGuarantor2,
  get_payment_requests2,

  updateGetAR,
  getAR,
  getARDetail,

  createGuarantor,
  getGuarantor,
  searchGuarantor,
  get_guarantor_search,

  GetTransaction,
  UpdateTransactionState,

  getAvailableIntervals,
  getIntervalsForPayment,

  getReasonsList,

  getMaxAmountAR,
  getCardData,

  FailedPayments,

  getSubcriptionDetail,

  getServiceList,
  deleteService,
  CreateServiceList,
  EditService,

  GetAllMembership,
  DeletePlan,
  GetTransactionSearch,
  getProviderList,
  cancelPayment,
  authHeader,
  SetReview,
  GetProviderDetail,

  // appointmenttypes
  getListOfAppointmentTypes,
  removeAppointmentType,
  createNewAppointmentType,
  listOfProviderForCreateAppointment,
  EditAppointmentType,

  editProviderActive,
  getProviderDetail,


  getHealthCategory,
  CreateNewHealthCategory,
  DeleteHealthCategory,
  EditHealthCategory,

  getProcedureList,
  CreateNewProcedure,
  removeProcedure,

  checkBusinessOnBoarding,

  createNewMainProcedure,
  deleteProcedureRUD,
  editProcedureRUD,
  EditProcedureImpact
};
