
import { statusHandeling } from "../../../statusHandeling";
import config from '../../../config';


const SelectFinanceType = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    var url = ""
    url = config.apiGateway.URL + '/care-options/select-finance-type/'

    const req = new Request(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);

    var json1 = await response.json();
    var json = {};
    json.data = json1;
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)
    return json;

};

const createPatient = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    var url = ""
    url = config.apiGateway.URL + '/care-options/patient-info/'

    const req = new Request(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);

    var json1 = await response.json();
    var json = {};
    json.data = json1;
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)
    return json;

};

const getFinanceType = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    var url = ""
    url = config.apiGateway.URL + '/care-options/get-finance-type/'
    const req = new Request(url, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    var json1 = await response.json();
    var json = {};
    json.data = json1;
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)
    return json;

};

const getFinancePlans = async (patient_id, finance_type) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    var url = ""
    url = config.apiGateway.URL + '/care-options/finance-plans/?patient_id=' + { patient_id } + '5&finance_type=' + { finance_type }

    const req = new Request(url, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    var json1 = await response.json();
    var json = {};
    json.data = json1;
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)
    return json;

};

const getServiceList = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    var url = ""
    url = config.apiGateway.URL + '/care-options/service-list/'

    const req = new Request(url, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    var json1 = await response.json();
    var json = {};
    json.data = json1;
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)
    return json;

};

const getFinanceOptions = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
    var url = ""
    url = config.apiGateway.URL + '/care-options/finance-options/?finance_type=' + localStorage.getItem("finance_type")
    const req = new Request(url, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    var json1 = await response.json();
    var json = {};
    json.data = json1;
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)
    return json;

};



export const FinanaceController = {
    getServiceList,
    getFinanceType,
    createPatient,
    SelectFinanceType,
    getFinancePlans,
    getFinanceOptions
}