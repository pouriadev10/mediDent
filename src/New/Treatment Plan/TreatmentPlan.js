import React from "react";
import {
    Row,
    Col,
    Card,
    Button,
    Typography
} from "antd";
import NewDashboardLayout from "../component/NewDashboardLayout";
import TreatmentPlanTable from "./TreatmentPlanTable";
import TreatmentPlanFile from "./TreatmentPlanFile";
import "./style.css";
import infoCircleIcon from "../assets/icon/info-circle.png";
import ToothImage from "./ToothImage";
import DoctorNote from "./DoctorNote";
import SimulatorTooth from "./SimulatorTooth";
import { controller } from "../controller";
import PoweredBy from '../../components/CommonUi/PoweredBy'
import call from '../../assets/icons/call.svg'
import loc from '../../assets/icons/location.svg'

const TreatmentPlan = () => {
    const [data, setData] = React.useState([]);

    const handleGetData = async () => {
        var url = window.location.href;
        const urlParams = new URLSearchParams(url.slice(url.indexOf('?')));
        const patientId = urlParams.get('patient_id');
        const response = await controller.getTreatmentPlan(patientId);
        const jsonData = await response.json; // Correctly parsing JSON from the response
        setData(jsonData);
        console.log(data)
    };

    React.useEffect(() => {
        handleGetData();
    }, []);

    return (
        <div style={{ background: 'white', height: '100%' }}>
            {data && data.length > 0 && (
                <div className="new-cards mt10 mb10">
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

                        <div style={{ width: '100%' }}>
                            <p style={{ marginBottom: 10, fontSize: 24, fontWeight: 600 }}>{data[0] && data[0].office && data[0].office.name ? data[0].office.name : "-"}</p>
                            <div style={{ width: '100%', display: 'flex' }} className="resp-div">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <img src={call} alt="" style={{ width: 20, height: 20, marginRight: 5 }} />
                                    <p style={{ marginTop: 18, fontSize: 20 }}>{data[0] && data[0].office && data[0].office.phone ? data[0].office.phone : "-"}</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }} className="resp-logo">
                                    <img src={data[0] && data[0].office && data[0].office.office_logo ? data[0].office.office_logo : infoCircleIcon} alt="" style={{ width: 110, height: 110, borderRadius: '50%' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <img src={loc} alt="" style={{ width: 20, height: 20, marginRight: 5 }} />
                                <p style={{ marginTop: 18, fontSize: 20 }}>{data[0] && data[0].office && data[0].office.street_address1 ? data[0].office.street_address1 : "-"}</p>
                            </div>
                        </div>
                    </div>
                    <p style={{ fontSize: 32, fontWeight: 600 }}>Treatment Plan</p>
                    <p style={{ fontSize: 20, fontWeight: 400, marginBottom: 50 }}>Hello, {data[0] && data[0].patient && data[0].patient.first_name ? data[0].patient.first_name + " " + data[0].patient.last_name : '-'}</p>
                    <Card>
                        {/* <div className="inner-border-new-cards"> */}
                        <div style={{ paddingTop: "25px", paddingLeft: "10px" }}>
                            <DoctorNote doctor_note={data && data[0] && data[0].note} />
                        </div>
                        {/* <Typography style={{ fontWeight: 600, fontSize: '16px', paddingTop: "25px", paddingLeft: "20px" }}>
                            Treatment Simulator
                        </Typography> */}
                        {/* <div style={{ padding: "25px 50px" }}>
                            <SimulatorTooth />
                        </div> */}
                        <div style={{ padding: "25px 30px", border: '1px solid #F0F0F0', borderRadius: 8, }}>
                            <p style={{ fontSize: 16, fontWeight: 600 }}>Recommended Treatments</p>
                            <TreatmentPlanTable data={data} />
                        </div>
                        <div style={{ padding: "55px 50px" }}>
                            <TreatmentPlanFile data={data} />
                        </div>
                        {/* <div className="tooth-image-container">
                            <ToothImage />
                        </div> */}
                        {/* </div> */}
                    </Card>
                </div>
            )}
            <PoweredBy />
        </div>
    );

}

export default TreatmentPlan;