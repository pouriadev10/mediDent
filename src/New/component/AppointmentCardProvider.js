import React from "react";
import "./style.css";
import { Avatar, Row, Col } from "antd";

// images
import starIcon from "../assets/icon/star.png";
import calendarIcon from "../assets/icon/calendar-2.png";
import locationIcon from "../assets/icon/location-2.png";

const AppointmentCardProvider = (props) => {
    return (
        <div className="appoinment-card-dashboard">



            <Row type="flex" align={"middle"}>
                <Avatar src={props.img} size={70} />
                <Row type="flex" justify={"space-between"} align={"bottom"} style={{ width: "60%" }}>
                    <Col className="ml15">
                        <Row>
                            <span className="provider-name-dashboard">{props.provderName}</span>
                            <span className="provider-rating-card">
                                <img src={starIcon} alt="rate" width={16} className="mr5" />
                                {props.providerRating}
                            </span>
                        </Row>
                        <Row>
                            <span className="provider-subname-dashboard">
                                Appointment for: {props.appointmentType}
                            </span>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Row type="flex" align={"middle"}>
                                <img src={calendarIcon} alt="rate" width={16} className="mr5" />
                                {props.day}
                            </Row>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Row type="flex" align={"middle"}>
                                <img src={locationIcon} alt="rate" width={16} className="mr5" />
                                {props.location}
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Row>

        </div>
    )
}

export default AppointmentCardProvider;