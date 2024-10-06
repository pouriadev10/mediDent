import React from "react";
import "./style.css";
import DonutChart from "./DonutChart";
import dollorIcon from "../assets/img/icon-wrapper-64px.png"
import {
    Row,
    Col
} from "antd";
import {
    RightOutlined
} from "@ant-design/icons";
const DashboardCardPercent = (props) => {
    return (
        <div className="dashboard-card">
            <Col>
                <Row type="flex" align={"middle"} justify={"space-between"}>
                    <Col>
                        <img src={dollorIcon} alt="dollor" />
                    </Col>
                    <Col span={14}>
                        <Row type="flex" justify={"center"} style={{ flexDirection: "column", width: "100%" }}>
                            <p className='dollorCardTextTitle'>{props.title}</p>
                            <p className='dollorCardTextSubTitle'>
                                {props.subTitle}
                            </p>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <p className='donutCardFooterText'>
                        {props.footerText}
                        <span className='ml5'><RightOutlined /></span>
                    </p>
                </Row>
            </Col>
        </div>
    )
}

export default DashboardCardPercent;