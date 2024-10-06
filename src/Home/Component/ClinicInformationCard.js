import {
    Col,
    Rate,
    Row
} from "antd";
import React from 'react';
import CallBold from "../Assets/call-contact-info.png";
import clinicInfoLogo from "../Assets/clinicInfoLogo.png";
import ClockBold from "../Assets/clock-contact-profile.png";
import LocationBold from "../Assets/location-contact-profile.png";


const ClinicInformationCard = (props) => {
    return (

        <Row type="flex"
            className='clinic-info-container'
        >
            <Col span={props.windowDimensions.width > 958 ? 13 : 24} >
                <div className="fullHeight">
                    <Row type="flex" justify="space-between" className="fullHeight">
                        <div className="clinic-infoCard-logo fullHeight">
                            <img
                                src={
                                    props.clinic && props.clinic.logo ?
                                        props.clinic.logo
                                        :
                                        clinicInfoLogo
                                }
                                alt="clinic" width={120} />
                        </div>
                        <div className="clinic-card-name-container fullHeight">
                            <div className="clinic-infoCard-name">
                                {props.clinic && props.clinic.logo ? props.clinic.name : "-"}
                                <br />
                                <div className='clinic-infoCard-service'>
                                    {
                                        props.clinic && props.clinic.services && (
                                            props.clinic.services.map((item) => (
                                                <span>{item.name + ", "}</span>
                                            ))
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </Col>
            {
                props.windowDimensions.width > 958 ?
                    <>
                        <Col
                            span={4}
                            className="rating-clinic-container"
                        >
                            <Row type='flex' justify='space-between' style={{ height: "100%", alignItems: "center" }}>
                                <div className='clinic-infoCard-rating'>
                                    <Col>
                                        <Row type='flex' justify='center' style={{ textAlign: "center" }}>
                                            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                                                <span style={{ fontSize: "36px", lineHeight: "1" }}>
                                                    {
                                                        props.clinic && props.clinic.rating ? eval(props.clinic.rating).toFixed(1) : "0"
                                                    }
                                                </span>   / 5
                                            </span>
                                        </Row>
                                        <Row type='flex' justify='center' style={{ textAlign: "center" }}>
                                            <span className="rate-parent">
                                                <Rate disabled defaultValue={5} />
                                            </span>
                                        </Row>
                                        <Row type='flex' justify='center' style={{ textAlign: "center" }}>
                                            <span style={{ fontSize: "10px", color: "#898989" }}>
                                                {
                                                    props.clinic && props.clinic.number_of_reviews ? props.clinic.number_of_reviews + " " : "0 "
                                                        + " "
                                                }
                                                Reviews</span>
                                        </Row>
                                    </Col>
                                </div>
                            </Row>
                        </Col>
                        <Col
                            span={7}
                            className="clinic-contact-info"
                        >
                            <Row type='flex' justify='space-between' style={{ height: "100%", alignItems: "center", width: "100%" }}>
                                <div className='clinic-infoCard-info'>
                                    <Col>
                                        <Row className="card-contact-info">
                                            <Col>
                                                <img src={ClockBold} style={{ marginRight: "14px" }} width={16} alt="call" /> <span> Closed | Closed</span>
                                            </Col>
                                            <Col style={{ marginTop: "5px" }}>
                                                <img src={LocationBold} style={{ marginRight: "14px" }} width={16} alt="call" /> <span>
                                                    {
                                                        props.clinic && props.clinic.address ? props.clinic.address : "-"
                                                    }
                                                </span>
                                            </Col>
                                            <Col style={{ marginTop: "5px", paddingLeft: "2px" }}>
                                                <img src={CallBold} style={{ marginRight: "12px" }} width={16} alt="call" /> <span>
                                                    {
                                                        props.clinic && props.clinic.phone ? props.clinic.phone : "-"
                                                    }
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </div>
                            </Row>
                        </Col>
                    </>
                    :
                    <></>
            }

        </Row>
    )
}

export default ClinicInformationCard;