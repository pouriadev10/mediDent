import config from "../../config";

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

const getCampaignsList = async (queryParams) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const url = new URL(config.apiGateway.URL + "/clinics/campaign-lc/");
    url.searchParams.append("office_id", localStorage.getItem("selectedOffice"));

    if (typeof queryParams === 'string') {
        queryParams = new URLSearchParams(queryParams);
    }
    queryParams.forEach((value, key) => url.searchParams.append(key, value));

    const req = new Request(url, {
        method: "GET",
        headers: myHeaders
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,
    };

    return res;
};

const getStatusList = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/campaign-status/?office_id=" + localStorage.getItem("selectedOffice"),
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

const getCategoryList = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/campaign-categories/?office_id=" + localStorage.getItem("selectedOffice"),
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

const getPatientList = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/list-patient-selectors/?office_id=" + localStorage.getItem("selectedOffice"),
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

const createCampaigns = async (data) => {
    const { campaign_name, start_date, end_date, patient_selectors } = data
    const myHeaders = {
        "Content-Type": "application/json",
        ...authHeader()
    };

    const stringifiedFields = JSON.stringify({
        campaign_name,
        start_date,
        end_date,
    });

    const requestBody = JSON.parse(stringifiedFields);
    requestBody.patient_selectors = patient_selectors;

    const response = await fetch(config.apiGateway.URL + "/clinics/campaign-lc/?office_id=" + localStorage.getItem("selectedOffice"), {
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

const getPatientListWithId = async (page, id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/list-patient-selectors/?office_id=" + localStorage.getItem("selectedOffice") + "&campaign_id=" + id,
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

const postAudienceGroup = async (data, id) => {
    const { title, method_type, criteria_item } = data;

    const myHeaders = {
        "Content-Type": "application/json",
        ...authHeader(),
    };

    const stringifiedFields = JSON.stringify({
        title,
        method_type,
    });

    const requestBody = JSON.parse(stringifiedFields);
    requestBody.criteria_item = criteria_item;

    const response = await fetch(config.apiGateway.URL + "/clinics/patient-selector/create/?office_id=" + localStorage.getItem("selectedOffice") + "&campaign_id=" + id,
        {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(requestBody),
        }
    );

    const json = await response.json();

    return {
        json: json,
        status: response.status,
        message: response.ok ? "Success" : "Error",
    };
}

const postEmailSms = async (data, id) => {
    const {email_template, sms_template} = data;

    const myHeaders = {
        "Content-Type": "application/json",
        ...authHeader(),
    };

    const stringifiedFields = JSON.stringify({
        email_template,
        sms_template,
    });

    const requestBody = JSON.parse(stringifiedFields);

    const response = await fetch(config.apiGateway.URL + "/clinics/multi-notifys-lc/?office_id=" + localStorage.getItem("selectedOffice")  + "&campaign_id=" + id,

        {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(requestBody),
        }
    );

    const json = await response.json();

    return {
        json: json,
        status: response.status,
        message: response.ok ? "Success" : "Error",
    };
}

const getProcedure = async (page, procedureCode) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    let url = config.apiGateway.URL + "/clinics/procedure-lc/?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice");

    if (procedureCode) {
        url += "&procedure_code=" + procedureCode;
    }

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

const updateAudience = async (id, data) => {
    const { patient_selectors, campaign_type } = data
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );


    const requestBody = {};
    if (patient_selectors) {
        requestBody.patient_selectors = patient_selectors;
    }
    if (campaign_type) {
        requestBody.campaign_type = campaign_type;
    }


    const officeId = localStorage.getItem("selectedOffice");
    const req = new Request(
        `${config.apiGateway.URL}/clinics/campaign/update/${id}/?office_id=${officeId}`,
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

const updateEmailId = async (id, data) => {
    const { action } = data
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );


    const requestBody = {};
    if (action) {
        requestBody.action = action;
    }

    const officeId = localStorage.getItem("selectedOffice");
    const req = new Request(
        `${config.apiGateway.URL}/clinics/campaign/update/${id}/?office_id=${officeId}`,

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

const activeCampaign = async (id, data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const requestBody = {
        campaign_name: data.campaign_name,
        campaign_type: data.campaign_type,
        category: data.category,
        status: data.status,
        start_date: data.start_date,
        end_date: data.end_date,
        action: data.action,
        action_trigger: data.action_trigger,
        patient_selectors: data.patient_selectors
    };

    const officeId = localStorage.getItem("selectedOffice");
    const req = new Request(
        `${config.apiGateway.URL}/clinics/campaign/update/${id}/?office_id=${officeId}`,
        {
            body: JSON.stringify(requestBody),
            method: "PATCH",
            headers: myHeaders,
        }
    );

    // Execute the request and wait for the response
    const response = await fetch(req);
    // Parse the JSON response
    const json = await response.json();
    // Create a result object containing the json data, status, and any message
    const res = {
        json: json,
        status: response.status,
        message: response.statusText,  // Changed 'message' to 'statusText' for correct API usage
    };

    // Return the result object
    return res;
};




const updateCampaigns = async (id, data) => {
    const { category, action, action_trigger } = data;
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const requestBody = {};
    if (category) requestBody.category = category;
    if (action) requestBody.action = action;
    if (action_trigger) requestBody.action_trigger = action_trigger;

    const officeId = localStorage.getItem("selectedOffice");
    const req = new Request(
        `${config.apiGateway.URL}/clinics/update-campaign/${id}/?office_id=${officeId}`,
        {
            body: JSON.stringify(requestBody),
            method: "PUT",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.statusText,
    };

    return res;
};

const getEmailList = async (page, id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/campaign-action-lc/?office_id=" + localStorage.getItem("selectedOffice") + "&campaign_id=" + id,
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

const getCampaignsInfo = async (page, id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const officeId = localStorage.getItem("selectedOffice");
    const req = new Request(
        `${config.apiGateway.URL}/clinics/campaign/retrieve/${id}/?office_id=${officeId}`,
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
    getCampaignsList,
    getStatusList,
    getCategoryList,
    getPatientList,
    createCampaigns,
    getPatientListWithId,
    postAudienceGroup,
    getProcedure,
    updateAudience,
    updateCampaigns,
    getEmailList,
    postEmailSms,
    updateEmailId,
    getCampaignsInfo,
    activeCampaign
}