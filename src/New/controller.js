import config from "../config";


const getTreatmentPlan = async (id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
    );

    const req = new Request(
        config.apiGateway.URL + "/patient-portal/patient-approved-tp-list/?patient_id=" + id + "&page=0",
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

const getTreatmentPlanDetail = async (id, patientId) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
    );

    const req = new Request(
        config.apiGateway.URL + "/patient-portal/get-treatment-detail/" + id + "/?patient_id=" + patientId  ,
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
    getTreatmentPlan,
    getTreatmentPlanDetail
}