import {
    Col,
    Rate,
    Row
} from "antd";
import React from 'react';
import CallBold from "../Assets/call-bold.png";
import ClockBold from "../Assets/clock-bold.png";
import LocationBold from "../Assets/location-bold.png";


const ClinicInformationCardRightMobile = (props) => {
    return (

        <Row type="flex"
            style={{ marginTop: "25px", width: "100%" }}
            className='clinic-info-container'
        >

            <>
                <Col
                    span={10}
                >
                    <Row type='flex' justify='space-between' style={{ height: "100%", alignItems: "center" }}>
                        <div className='clinic-infoCard-rating' style={{ maxHeight: "150px" }}>
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
                                    <span>
                                        <Rate disabled defaultValue={5} />

                                    </span>
                                </Row>
                                <Row type='flex' justify='center' style={{ textAlign: "center" }}>
                                    <span style={{ color: "#ccc", fontSize: "10px" }}>
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
                    span={14}
                    style={{ paddingLeft: "15px" }}
                >
                    <Row type='flex' justify='space-between' style={{ height: "100%", alignItems: "center", width: "100%" }}>

                        <div className='clinic-infoCard-info' style={{ maxHeight: "150px" }}>
                            <Col>
                                <Row style={{ fontSize: "10px", lineHeight: "30px" }}>
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
                                    <Col style={{ marginTop: "5px" }}>
                                        <img src={CallBold} style={{ marginRight: "14px" }} width={16} alt="call" /> <span>
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


        </Row>
    )
}

export default ClinicInformationCardRightMobile;