import {
    Col,
    Row
} from "antd";
import React from "react";
import CallBold from "../Assets/call-contact-info.png";
import LocationBold from "../Assets/location-contact-profile.png";
import OfficeSlider from "./OfficeSlider";
import ProviderMembershipPart from "./ProviderMembershipPart";
const ProviderClinic = (props) => {
    return (
        <div className="provider-clinic-container">
            <Row type="flex" justify="space-between">
                <div>
                    <span className="provider-office-name">{props.data.office && props.data.office.name ? props.data.office.name : "-"}</span>
                </div>
                <div className='distanceCard'>
                    <span>{props.data.office && props.data.office.distance ? props.data.office.distance : "-"} km</span>
                </div>
            </Row>
            <Row>
                <div className='serviceDentalCard ' style={{ marginTop: "1%" }}>
                    {
                        props.data && props.data.office && props.data.office.appointment_types && props.data.office.appointment_types.length > 0 ?
                            props.data.office.appointment_types.map((service) => (
                                <>{service.service + ","}</>
                            ))
                            :
                            "-"
                    }
                </div>
            </Row>
            <Row className="provider-clinic-contact card-contact-info mt5p">
                <Col>
                    <img src={LocationBold} style={{ marginRight: "14px" }} width={18} alt="call" /> <span>
                        {
                            props.data.office && props.data.office.address ? props.data.office.address : "-"
                        }
                    </span>
                </Col>
                <Col style={{ marginTop: "5px", paddingLeft: "2px" }}>
                    <img src={CallBold} style={{ marginRight: "12px" }} width={18} alt="call" /> <span>
                        {
                            props.data.office && props.data.office.phone ? props.data.office.phone : "-"
                        }
                    </span>
                </Col>
            </Row>
            <div className="mt5p">
                <OfficeSlider data={props.data} />
            </div>
            <div className="mt5p">
                <ProviderMembershipPart />
            </div>
        </div>
    )
}

export default ProviderClinic;