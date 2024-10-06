import config from "../config"
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



const getPMSData = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const req = new Request(
        config.apiGateway.URL +
        "/clinics/list-pms-offices/", // change to page = 0
        {
            method: "GET",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const checkUserStatus = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const req = new Request(
        config.apiGateway.URL +
        "/payment/api/user-customer-status/", // change to page = 0
        {
            method: "GET",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const skipOnBoarding = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const req = new Request(
        config.apiGateway.URL +
        "/clinics/skip-onboarding-step/", // change to page = 0
        {
            method: "GET",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const addNewOfficeQuestion = async (answer) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const req = new Request(
        config.apiGateway.URL +
        "/clinics/add-another-office/?more_offices=" + answer,
        {
            method: "GET",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const LicencesList = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const req = new Request(
        config.apiGateway.URL +
        "/accounts/list-subscription-tier/?page=0", // change to page = 0
        {
            method: "GET",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const invitedUserList = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const req = new Request(
        config.apiGateway.URL +
        "/accounts/list-user-invites/?page=0&branch_id=" + localStorage.getItem("selectedOffice"), // change to page = 0
        {
            method: "GET",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const getOnboardingSteps = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const req = new Request(
        config.apiGateway.URL +
        "/accounts/check-user-onboarding/", // change to page = 0
        {
            method: "GET",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return json;
};

const getAllInvitedUser = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    const req = new Request(
        config.apiGateway.URL +
        "/accounts/list-user-invites/?page=0", // change to page = 0
        {
            method: "GET",
            headers: myHeaders,
        }
    );

    const response = await fetch(req);
    const json = await response.json();
    return json;
};


const checkIsMultiple = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );


    const req = new Request(config.apiGateway.URL + "/clinics/is-multiple-office/", {

        method: "GET",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const sendPMS = async (data) => {
    const myHeaders = Object.assign(
        authHeader(),
        { "Content-Type": "application/json" }
    );

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + "/clinics/claim-office/", {
        body: raw,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const PassResetConfirm = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }
    );

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + "/accounts/password-reset-confirm/" + data.uid + "/" + data.token + "/", {
        body: raw,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const forgotPass = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }
        //authHeader()
    );

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + "/accounts/account-password-reset/", {
        body: raw,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const inviteMembership = async (data) => {
    const myHeaders = Object.assign(

        authHeader()
    );


    const req = new Request(config.apiGateway.URL + "/accounts/invite-membership/", {
        body: data,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const createPlatformCustomer = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(config.apiGateway.URL + "/payment/api/create-platform-customer/", {
        body: raw,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};


const setMultipleOffice = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(config.apiGateway.URL + "/clinics/multiple-offices/", {
        body: raw,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const inviteUser = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(config.apiGateway.URL + "/accounts/create-invite/", {
        body: raw,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const SignUp = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(config.apiGateway.URL + "/accounts/user-sign-up/", {
        body: raw,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const createOfficePractice = async (data) => {
    const myHeaders = Object.assign(
        authHeader()
    );

    const req = new Request(config.apiGateway.URL + "/clinics/create-office-practice/", {
        body: data,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const createPractice = async (data) => {
    const myHeaders = Object.assign(
        authHeader()
    );

    const req = new Request(config.apiGateway.URL + "/clinics/create-practice/", {
        body: data,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const updateOffice = async (data, office_id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data)
    const req = new Request(config.apiGateway.URL + "/clinics/update-office-flow/" + office_id + "/", {
        body: raw,
        method: "PUT",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const createOffice = async (data, id) => {
    const myHeaders = Object.assign(
        authHeader()
    );

    const req = new Request(config.apiGateway.URL + "/clinics/create-office/?practice_id=" + id, {
        body: data,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const updateOfficePractice = async (data, id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + "/clinics/update-office-practice/" + id + "/", {
        body: raw,
        method: "PUT",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const updatePractice = async (data, id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + "/clinics/update-practice/" + id + "/", {
        body: raw,
        method: "PUT",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};

const Login = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(config.apiGateway.URL + "/accounts/account-login/", {
        body: raw,
        method: "POST",
        headers: myHeaders,
    });

    const response = await fetch(req);
    var json = await response.json();
    json.status = response.status;
    return json;
};


const deleteInvitedUser = async (id) => {
    const myHeaders = Object.assign(authHeader());
    var url = "";
    url =
        config.apiGateway.URL +
        "/accounts/delete-user-invite/" +
        id + "/";

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

        return res;
    } else {
        const res = {
            json: { message: "succssfull" },
            status: 204,
            message: "Service deleted successfully",
        };

        return res;
    }
};


const getHelcimToken = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );


    const req = new Request(config.apiGateway.URL + '/accounts/get-helcim-js-token/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    json.status = response.status;

    return json;
};

const helcimPayMulti = async (
    cardtoken
) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );
    var payload = {
        'payment_method_token': cardtoken,
    }

    const raw = JSON.stringify(payload)

    const req = new Request(config.apiGateway.URL + "/accounts/attach-payment-method/", {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    json.status = response.status;

    return json;
};


const generateAccountBank = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    const req = new Request(config.apiGateway.URL + '/payment/api/generate-add-bank-link/?business_id=' + localStorage.getItem("selectedOffice"),
        {
            method: 'GET',
            headers: myHeaders,
        });

    const response = await fetch(req);

    var json = await response.json();

    json.status = response.status;
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

export const controller = {
    Login,
    SignUp,

    createOfficePractice,
    updateOfficePractice,

    createPractice,
    updatePractice,

    createOffice,
    updateOffice,

    LicencesList,
    inviteUser,
    invitedUserList,
    deleteInvitedUser,
    getAllInvitedUser,
    getOnboardingSteps,
    setMultipleOffice,
    skipOnBoarding,

    addNewOfficeQuestion,

    checkUserStatus,
    createPlatformCustomer,
    getHelcimToken,
    inviteMembership,
    helcimPayMulti,
    forgotPass,
    PassResetConfirm,
    checkIsMultiple,

    generateAccountBank,

    getPMSData,
    sendPMS,

    officeprofile
};