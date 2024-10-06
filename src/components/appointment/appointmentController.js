import config from "../../config";

const office_services = async (office_id) => {
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" }
  );

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
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" }
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/get-provider/?office=" +
    office_id +
    "&appointment_type=" +
    appointment_type_id,
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
  const myHeaders = Object.assign(
    { "Content-Type": "application/json" }
  );

  const req = new Request(
    config.apiGateway.URL +
    "/clinics/providerschedule/?appointment_type=" +
    appointment_type_id +
    "&days_ahead=" +
    days +
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

export const appointmentController = {
  office_services,
  office_providers,
  get_appointment_times,
};
