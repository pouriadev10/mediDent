import config from "../../config";

const getAllClinics = async (
    data
) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    var params = ""
    if (data.order_by) {
        params += "&order_by=" + data.order_by
    }
    if (data.user_lat) {
        params += "&user_lat=" + data.user_lat
    }
    if (data.user_long) {
        params += "&user_long=" + data.user_long
    }
    if (data.distance && data.user_long && data.user_lat) {
        params += "&distance=" + data.distance
    }
    if (data.city) {
        params += "&city=" + data.city
    }
    if (data.state) {
        params += "&state=" + data.state
    }
    if (data.address) {
        params += "&address=" + data.address
    }
    if (data.appointment_type) {
        params += "&appointment_type=" + data.appointment_type
    }
    if (data.services) {
        params += "&services=" + data.services
    }
    if (data.language) {
        params += "&language=" + data.language
    }
    if (data.categories) {
        params += "&categories=" + data.categories
    }

    const req = new Request(config.apiGateway.URL + '/clinics/filter-office/?page=0' + params, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const getCategory = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

    const req = new Request(config.apiGateway.URL + '/membership_plans/services-list/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const getCategoryList = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

    const req = new Request(config.apiGateway.URL + '/clinics/category-list/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const getLangList = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

    const req = new Request(config.apiGateway.URL + '/clinics/language-list/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const getClinicData = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

    const req = new Request(config.apiGateway.URL + '/clinics/get-office-detail/' + id + "/", {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const getListofAppointment = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

    const req = new Request(config.apiGateway.URL + '/booking/get-appointment-type/?office=' + id + "&page=0", {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const getProviderList = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

    const req = new Request(config.apiGateway.URL + '/clinics/providerschedule/?appointment_type=' + data.appointment_type +
        '&office_id=' + data.office_id + '&date=' + data.date, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }
    return res;
};


const add_appointment_patient = async (
    office_id,
    firstName,
    lastName,
    birthDay,
    email,
    phone,
    provider_id,
) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    const raw = JSON.stringify({
        "office": office_id,
        "first_name": firstName,
        "last_name": lastName,
        "birth_date": birthDay,
        "email": email,
        "phone": phone,
        "provider": provider_id,
    });
    const req = new Request(config.apiGateway.URL + '/clinics/appointmentpatient/', {
        method: 'POST',
        body: raw,
        headers: myHeaders,
    });

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

    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    const raw = JSON.stringify({
        "office": office_id,
        "appointment_type": appointment_type,
        "appointment_datetime": appointment_datetime,
        "time": appointment_datetime && appointment_datetime.split("T")[1] && appointment_datetime.split("T")[1].split("Z") && appointment_datetime.split("T")[1].split("Z")[0] ? appointment_datetime.split("T")[1].split("Z")[0] : "",
        "provider": provider,
        "patient": patient,
        "comment": comment,
        "payment_method": payment_metode,

    });
    const req = new Request(config.apiGateway.URL + '/booking/create-appointment/', {
        method: 'POST',
        body: raw,
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    json.status = response.status;
    return json;
};


export const Controller = {
    getAllClinics,
    getCategory,
    getCategoryList,
    getLangList,
    getClinicData,
    getListofAppointment,
    getProviderList,
    add_appointment_patient,
    set_appointment
};

