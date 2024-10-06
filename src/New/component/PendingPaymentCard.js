import React from "react";
import "./style.css";
import { Row, Col, Button } from "antd";

// images 
import calendarIcon from "../assets/icon/calendar-2.png";
import dollorIcon from "../assets/icon/dollar-circle.png";

const PendingPaymentCard = (props) => {
    return (
        <div className="new-cards payment-plan-card" style={{padding:"15px 25px 20px 25px"}}>

            <Row>
                <p className="pending-payment-plan-title">{props.title}</p>
            </Row>
            <Row type="flex" justify={"space-between"}>

                <Col>
                    <Row type="flex" align={"middle"}>
                        <img width={13} src={calendarIcon} alt="calander" />
                        <span className="pending-payment-card-title">
                            Start date
                        </span>
                    </Row>
                    <Row>
                        <span className="pending-payment-card-subtitle">
                            {props.startDate}
                        </span>
                    </Row>
                </Col>
                <Col>
                    <Row type="flex" align={"middle"}>
                        <img width={13} src={calendarIcon} alt="calander" />
                        <span className="pending-payment-card-title">
                            End date
                        </span>
                    </Row>
                    <Row>
                        <span className="pending-payment-card-subtitle">
                            {props.endDate}
                        </span>
                    </Row>
                </Col>
                <Col>
                    <Row type="flex" align={"middle"}>
                        <img width={13} src={dollorIcon} alt="calander" />
                        <span className="pending-payment-card-title">
                            Amount
                        </span>
                    </Row>
                    <Row>
                        <span className="pending-payment-card-subtitle-amount">
                            {props.amount}
                        </span>
                    </Row>
                </Col>
                <Col>
                    <Button
                        className="active-button-payment-plan"
                    >
                        Activate
                    </Button>
                </Col>

            </Row>

        </div>
    )
}

export default PendingPaymentCard;