import config from "../../../config";

function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        if (user.key ) {
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

const TotalMembers = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    const req = new Request(config.apiGateway.URL + '/membership_plans/clinic-total-members/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetAllMembership = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-plan-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetMembershipServices = async ({ id }) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/member-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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

}



const GetCustomersSearch = async (page, member) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/patient-list/?page=' + page + "&office_id=" + localStorage.getItem("selectedOffice") +
        "&search=" + member, {
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

}

const GetCustomers = async (page) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/patient-list/?page=' + page + "&office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetMRR = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/monthly-recurring-revenue/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const RecentlyActiveMembers = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/recently-active-members/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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

}

const MembershipExpire = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-expire-soon/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
   
}

const GetTotalMember = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/plan-total-members/' + { id } + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetMOM = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/monthly-growth/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetDashboardBarChart = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/barchart-data/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetDashboardPyChart = async (period) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/piechart-data/?period=' + period + "&office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetMembershipDetail = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/member-ship-plan-detail/' + id + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetServicesofPlan = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/msplan-services-list/' + id + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetMembersOfPlan = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/msplan-members-list/' + id + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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

}

const GetMemberDetail = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/patient-detail/' + id + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetSubscriptions = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/member-memberships/?member=' + id + "&office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetAllSubscriptions = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/np-member-memberships/?member=' + id + "&office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const FailedPayments = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/billpay/list-repay-paymentrequests/', {
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
}

const GetMemberPayment = async (memberId, memberPlan) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-payments/?member_id=' + memberId + '&plan_id=' + memberPlan + "&office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetAllMember = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/np-member-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetAllPlans = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/np-plan-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const GetAllServices = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/np-plan-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const CreateCustomMembership = async (input) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(input)

    const req = new Request(config.apiGateway.URL + '/membership_plans/create-custom-membership/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
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
}

const CreateMembershipnPreDefined = async (memberShip) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(memberShip)

    const req = new Request(config.apiGateway.URL + '/membership_plans/create-membership/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
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
}

const CreatePlan = async (plan) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(plan)

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-plan-create/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
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
}

const CreateOffice = async (office) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(office)

    const req = new Request(config.apiGateway.URL + '/clinics/create-office/', {
        body: raw,
        method: 'POST',
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
}

const CreateBusiness = async (business) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(business)

    const req = new Request(config.apiGateway.URL + '/clinics/create-business/', {
        body: raw,
        method: 'POST',
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
}

const serviceUsage = async (visit) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(visit)

    const req = new Request(config.apiGateway.URL + '/membership_plans/create-member-usage/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
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
}

const GetServiceNP = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    const req = new Request(config.apiGateway.URL + '/membership_plans/services-list-create/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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
}

const CreateServiceList = async (Sservice) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(Sservice)

    const req = new Request(config.apiGateway.URL + '/membership_plans/services-list-create/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
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
}


const getAllCategoryBusiness = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/clinics/list-business-categories/", {
        method: 'Get',
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
}


const getOnboardingStage = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    const res = {
        json: {},
        status: 200,
        message: "success",
    }

    return res;

}

const GetFinishOnBoarding = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/clinics/finish-office-create/", {
        method: 'Get',
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

}

const getServicesOfMembership = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/membership_plans/np-membership-service-info/" + id + "/" + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'Get',
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
}
const getAllVisit = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/membership_plans/service-usage-list/" + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'Get',
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
}

const createNewMember = async (newMember) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/create-member/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: JSON.stringify(newMember),
        method: 'POST',
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
}


const GetMembershipHistory = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membershipplan-history/' + id + '/', {
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
}

const getTreatmentPlans = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/list-treatment-by-patient/?office_id=" + localStorage.getItem("selectedOffice"),
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

const getScore = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/treatment-plan-score/?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice"),
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

const getBarTreatment = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/top-treatment-plans/?office_id=" + localStorage.getItem("selectedOffice"),
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


const getImpact = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const req = new Request(
        config.apiGateway.URL + "/clinics/preventive-treatment-impact/?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice"),
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


export  const Controller = {
    getImpact,
    getBarTreatment,
    getScore,
    getTreatmentPlans,
    TotalMembers,
    GetCustomers,
    GetCustomersSearch,
    GetAllMembership,
    GetMembershipServices,
    GetMRR,
    RecentlyActiveMembers,
    MembershipExpire,
    GetTotalMember,
    GetMOM,
    GetDashboardBarChart,
    GetDashboardPyChart,
    GetMembershipDetail,
    GetServicesofPlan,
    GetMembersOfPlan,
    GetMemberDetail,
    GetSubscriptions,
    GetMemberPayment,
    GetAllMember,
    GetAllPlans,
    GetAllServices,
    serviceUsage,
    getAllVisit,
    GetAllSubscriptions,
    createNewMember,
    CreateServiceList,
    GetServiceNP,
    CreateBusiness,
    getAllCategoryBusiness,
    getOnboardingStage,
    CreateOffice,
    GetFinishOnBoarding,
    getServicesOfMembership,
    CreatePlan,
    CreateMembershipnPreDefined,
    CreateCustomMembership,
    GetMembershipHistory,
    FailedPayments
}