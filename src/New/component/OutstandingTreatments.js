import React from "react";
import {
    Row,
    Col
} from "antd";

// images 
import teethIcon from "../assets/icon/teeth.png"

const OutstandingTreatments = () => {
    return (
        <div>
            <Row className="maintain-health-card" type="flex" justify={"space-between"} align={"middle"}>
                <Col>
                    <img src={teethIcon} alt="teeth" width={40} />
                </Col>
                <Col span={20}>
                    <Row type="flex" justify={"space-between"} style={{ marginBottom: "5px" }}>
                        <Col>
                            <b>
                                Crown Tooth 15
                            </b>
                        </Col>
                        <Col>
                            <span style={{ fontSize: "12px" }}>
                                Procedure Code: 123456
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <span className="maintain-health-card-subtitle">
                            You need to visit us for your root canal as soon as possible.
                        </span>
                    </Row>
                </Col>
            </Row>
            <Row className="mt15 maintain-health-card" type="flex" justify={"space-between"} align={"middle"}>
                <Col>
                    <img src={teethIcon} alt="teeth" width={40} />
                </Col>
                <Col span={20}>
                    <Row type="flex" justify={"space-between"} style={{ marginBottom: "5px" }}>
                        <Col>
                            <b>
                                Crown Tooth 15
                            </b>
                        </Col>
                        <Col>
                            <span style={{ fontSize: "12px" }}>

                                Procedure Code: 123456
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <span className="maintain-health-card-subtitle">
                            You need to visit us for your root canal as soon as possible.
                        </span>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default OutstandingTreatments;