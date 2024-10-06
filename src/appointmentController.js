import config from "./config";

const office_services = async (office_id) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });

  const req = new Request(
    config.apiGateway.URL +
    "/booking/get-appointment-type/?office=" +
    office_id + "&page=0",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const office_providers = async (office_id, appointment_type_id) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/get-provider/?office=" +
    office_id +
    "&appointment_type=" +
    appointment_type_id.split(" ")[0],
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const get_appointment_times = async (
  office_id,
  appointment_type_id,
  provider_id,
  days
) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  var date = days + "";
  const appointmentId = appointment_type_id.split(" ")[0];
  const date2 = date.split("T")[0];
  const req = new Request(
    config.apiGateway.URL +
    "/clinics/providerschedule/?appointment_type=" +
    appointmentId +
    "&date=" +
    date2 +
    "&provider=" +
    provider_id,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const get_appointment_times2 = async (days) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  var date = days + "";
  const date2 = date.split("T")[0];
  const req = new Request(
    config.apiGateway.URL +
    "/clinics/providerschedule/?appointment_type=" +
    "1" +
    "&date=" +
    date2 +
    "&provider=" +
    "1",
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const add_appointment_patient = async (
  office_id,
  firstName,
  lastName,
  birthDay,
  email,
  phone,
  provider_id
) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const raw = JSON.stringify({
    office: office_id,
    first_name: firstName,
    last_name: lastName,
    birth_date: birthDay,
    email: email,
    phone: phone,
    provider: provider_id,
  });
  const req = new Request(
    config.apiGateway.URL + "/clinics/appointmentpatient/",
    {
      method: "POST",
      body: raw,
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;
  return json;
};

const set_appointment = async (
  office_id,
  appointment_type,
  appointment_datetime,
  time,
  provider,
  patient,
  comment,
  payment_metode
) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const raw = JSON.stringify({
    office: office_id,
    appointment_type: appointment_type,
    appointment_datetime: appointment_datetime,
    time: time,
    provider: provider,
    patient: patient,
    comment: comment,
    payment_method: payment_metode,
  });
  const req = new Request(
    config.apiGateway.URL + "/booking/create-appointment/",
    {
      method: "POST",
      body: raw,
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  json.status = response.status;
  return json;
};

const get_logo = async (office_id) => {
  const myHeaders = Object.assign({ "Content-Type": "application/json" });

  const req = new Request(
    config.apiGateway.URL + "/clinics/officelogo/?office=" + office_id,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

export const appointmentController = {
  office_services,
  office_providers,
  get_appointment_times,
  add_appointment_patient,
  set_appointment,
  get_logo,
  get_appointment_times2,
};
