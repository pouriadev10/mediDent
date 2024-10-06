import config from "../../config";
import { statusHandeling } from "../../statusHandeling";

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


const getMemberList = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/patient-list/?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice"),
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


const getMemberList2 = async (page, search) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/patient-list/?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice") + "&search=" + search,
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



const getData = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/treatment-info/?office_id=" + localStorage.getItem("selectedOffice"),
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



const postNoteAndImage = async (formData, state) => {
    const myHeaders = {
        ...authHeader(),
    };

    const req = new Request(
        config.apiGateway.URL + "/clinics/doctor-note-lc/?office_id=" + localStorage.getItem("selectedOffice") + "&status=" + state,
        {
            method: "POST",
            headers: myHeaders,
            body: formData
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return {
        json: json,
        status: response.status,
        message: response.message,
    };
};


const createTreatmentPlans = async (data) => {
    const { name, patient, description, priority, procedure, estimated_cost, insurance_coverage } = data
    const myHeaders = {
        "Content-Type": "application/json",
        ...authHeader()
    };

    const stringifiedFields = JSON.stringify({
        name,
        patient,
        description,
        priority,
        estimated_cost,
        insurance_coverage
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

const createTreatmentPlans2 = async (data) => {
    const { 
        name, 
        patient, 
        tooth_from, 
        treatment_procedure_data 
    } = data;


    const myHeaders = {
        "Content-Type": "application/json",
        ...authHeader()  // Assuming this is a custom authorization header function
    };

    const stringifiedFields = JSON.stringify({
        name,
        patient,
        tooth_from,
        treatment_procedure_data,
    });
    const requestBody = JSON.parse(stringifiedFields);


    const response = await fetch(config.apiGateway.URL + "/clinics/create-first-treatment/?office_id=" + localStorage.getItem("selectedOffice"), {
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



const createProcedures = async (data) => {
    const { 
        procedure_code,
        treatment,
        tooth,
        discount,  
        insurance_estimate, 
        estimated_cost, 
        
    } = data;

    const myHeaders = {
        "Content-Type": "application/json",
        ...authHeader()  // Assuming this is a custom authorization header function
    };

    const stringifiedFields = JSON.stringify({
        procedure_code,
        treatment,
        tooth,
        discount,
        insurance_estimate,
        estimated_cost,
    });
    const requestBody = JSON.parse(stringifiedFields);


    const response = await fetch(config.apiGateway.URL + "/clinics/treatment-procedure-lc/?office_id=" + localStorage.getItem("selectedOffice") , {
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


const createEducational = async (formData) => {
    const myHeaders = {
        ...authHeader()  // Assuming this is a custom authorization header function
    };

    const response = await fetch(config.apiGateway.URL + "/clinics/video-file-lc/?office_id=" + localStorage.getItem("selectedOffice"), {
        method: "POST",
        headers: myHeaders, // Do not set Content-Type, as it's automatically set for FormData
        body: formData // Directly pass the FormData object
    });

    const json = await response.json();
    return {
        json: json,
        status: response.status,
        message: "Success"
    };
};




const getTreatmentPlans = async (ApprovStatus, search, page, startDate, endDate, procedure) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/list-treatment-by-patient/?office_id=" + localStorage.getItem("selectedOffice") + "&filtering=" + ApprovStatus + "&page=" + page + "&search=" + search + "&start_date=" + startDate + "&end_date=" + endDate + "&procedure=" + procedure,
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

const getTreatmentPlans2 = async (ApprovStatus, search, page, startDate, endDate, procedure, id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/list-treatment-by-patient/?office_id=" + localStorage.getItem("selectedOffice") + "&patient_id=" + id + "&filtering=" + ApprovStatus + "&page=" + page + "&search=" + search + "&start_date=" + startDate + "&end_date=" + endDate + "&procedure=" + procedure,
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

const getEducatinal = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/video-file-lc/?office_id=" + localStorage.getItem("selectedOffice") ,
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


const getTreatmentModal = async (patient_id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/list-treatment-by-patient/?office_id=" + localStorage.getItem("selectedOffice") + "&patient_id=" + patient_id  ,
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

const getDoctorNote = async (patient_id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/doctor-note-lc/?office_id=" + localStorage.getItem("selectedOffice") + "&patient_id=" + patient_id  ,
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


const getEduByPatient = async (id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/treatment-rud/" + id +"/?office_id=" + localStorage.getItem("selectedOffice") ,
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




const UpdateTreatmentPlans = async (id, data) => {
    const { description, priority, name, estimated_cost, insurance_coverage, tooth_from } = data
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const stringifiedFields = JSON.stringify({
        description,
        priority,
        name,
        estimated_cost,
        insurance_coverage,
        tooth_from
    });

    const requestBody = JSON.parse(stringifiedFields);
    requestBody.procedure = priority;
    const officeId = localStorage.getItem("selectedOffice");
    const req = new Request(
        `${config.apiGateway.URL}/clinics/treatment-rud/${id}/?office_id=${officeId}`,
        {
            body: JSON.stringify(requestBody),
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

const UpdateProcedures = async (id, data) => {
    const { procedure_code, treatment, tooth, estimated_cost, discount, insurance_estimate } = data
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const stringifiedFields = JSON.stringify({
        procedure_code,
        treatment,
        tooth,
        discount,
        insurance_estimate,
        estimated_cost
    });

    const requestBody = JSON.parse(stringifiedFields);
    const officeId = localStorage.getItem("selectedOffice");
    const req = new Request(
        `${config.apiGateway.URL}/clinics/treatment-procedure-rud/${id}/?office_id=${officeId}`,
        {
            body: JSON.stringify(requestBody),
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

const visibleTreatmentPlans = async (id, data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const requestBody = JSON.stringify({
        visible_to_patient: data.visible_to_patient,
    });

    const officeId = localStorage.getItem("selectedOffice");
    const req = new Request(
        `${config.apiGateway.URL}/clinics/treatmentplan-rud/${id}/?office_id=${officeId}`,
        {
            body: requestBody,
            method: "PATCH",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json;
};

const RemoveTreatmentPlans = async (id) => {
    const myHeaders = Object.assign(authHeader());
    var url = "";
    url =
        config.apiGateway.URL +
        "/clinics/treatment-rud/" +
        id + "/"  + "?office_id=" + localStorage.getItem("selectedOffice") 

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
            message: "Treatment plan deleted successfully",
        };

        statusHandeling.statusCodeHandeling(res.status);
        return res;
    }
};

const RemoveProcedures = async (id) => {
    const myHeaders = Object.assign(authHeader());
    var url = "";
    url =
        config.apiGateway.URL +
        "/clinics/treatment-procedure-rud/" +
        id + "/"  + "?office_id=" + localStorage.getItem("selectedOffice") 

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
            message: "Treatment plan deleted successfully",
        };

        statusHandeling.statusCodeHandeling(res.status);
        return res;
    }
};

const removeImages = async (id) => {
    const myHeaders = Object.assign(authHeader());
    var url = "";
    url =
        config.apiGateway.URL +
        "/clinics/remove-image/" +
        id + "/"  + "?office_id=" + localStorage.getItem("selectedOffice") 

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
            message: "Image deleted successfully",
        };

        statusHandeling.statusCodeHandeling(res.status);
        return res;
    }
};

const getProcedure = async (page, search) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    let url = config.apiGateway.URL + "/clinics/procedure-code-lc/?search=" + search + "&page=" + page + "&office_id=" + localStorage.getItem("selectedOffice");

  

    const req = new Request(
        url,
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


const UpdateDoctorNote = async (formData, id) => {
    const myHeaders = {
        ...authHeader(),
    };

    const req = new Request(
        config.apiGateway.URL + "/clinics/doctor-note-rud/" + id + "/?office_id=" + localStorage.getItem("selectedOffice"),
        {
            method: "PATCH",
            headers: myHeaders,
            body: formData
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return {
        json: json,
        status: response.status,
        message: response.message,
    };
};


const UpdateEducational = async (formData) => {
    const myHeaders = {
        ...authHeader(),
    };

    const req = new Request(
        config.apiGateway.URL + "/clinics/educational-content-lc/?office_id=" + localStorage.getItem("selectedOffice"),
        {
            method: "POST",
            headers: myHeaders,
            body: formData
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return {
        json: json,
        status: response.status,
        message: response.message,
    };
};

const UpdateEducational2 = async (id, formData) => {
    const myHeaders = {
        ...authHeader(),
    };

    const req = new Request(
        config.apiGateway.URL + "/clinics/educational-content-rud/" + id + "/?office_id=" + localStorage.getItem("selectedOffice"),
        {
            method: "PATCH",
            headers: myHeaders,
            body: formData
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return {
        json: json,
        status: response.status,
        message: response.message,
    };
};


export const controller = {
    getTreatmentPlans,
    createTreatmentPlans,
    createTreatmentPlans2,
    UpdateTreatmentPlans,
    RemoveTreatmentPlans,
    visibleTreatmentPlans,
    getDoctorNote,
    UpdateDoctorNote,
    getProcedure,
    postNoteAndImage,
    getMemberList,
    getTreatmentModal,
    removeImages,
    createProcedures,
    getEducatinal,
    createEducational,
    RemoveProcedures,
    UpdateEducational,
    getTreatmentPlans2,
    getEduByPatient,
    UpdateEducational2,
    UpdateProcedures,
    getMemberList2,
    getData
};
