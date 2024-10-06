import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd"
import oralExamIcon from "../assets/icon/menu-board.png"
import regularCleaning from "../assets/icon/broom.png"
const MaintainHealth = () => {
    return (
        <div>
            <Row className="maintain-health-card" type="flex" justify={"space-between"} align={"middle"}>
                <Col>
                    <Row type={"flex"} align={"middle"}>
                        <div className="red-circle"></div>
                        <img src={oralExamIcon} alt="oral-exam" width={38} className="ml8" />


                    </Row>

                </Col>
                <Col className="maintain-health-card-right-part">
                    <Row justify={"space-between"} type={"flex"} align={"middle"} >
                        <Col>
                            <span className="maintain-health-card-title">Complete Oral Exam</span>
                            <span className="maintain-health-card-subtitle">
                                Your Annual checkup is Due.
                            </span>
                        </Col>
                        <Button
                            className="left-card-book-button"
                        >
                            Book Now
                        </Button>
                    </Row>

                </Col>

            </Row>
            <Row className="maintain-health-card mt20" type="flex" justify={"space-between"} align={"middle"}>
                <Col>
                    <Row type={"flex"} align={"middle"}>
                        <div className="green-circle"></div>
                        <img src={regularCleaning} alt="oral-exam" width={38} className="ml8" />


                    </Row>

                </Col>
                <Col className="maintain-health-card-right-part">
                    <Row justify={"space-between"} type={"flex"} align={"middle"} >
                        <Col>
                            <span className="maintain-health-card-title">Regular Cleaning</span>
                            <span className="maintain-health-card-subtitle">
                                Next Appointment on 2023/12/12 , 11:00 AM
                            </span>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </div>
    )
}

export default MaintainHealth;