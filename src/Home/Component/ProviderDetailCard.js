import {
    Avatar,
    Col,
    Row
} from "antd";
import React from 'react';
import config from '../../config';
import Archive from "../Assets/edj-provider.png";
import Cert from "../Assets/certificate-provider.png";
import Dr2 from "../Assets/dr2.png";
import Star from "../Assets/star.png";
import { push } from "react-router-redux";

const ProviderDetailCard = (props) => {

    const handleGoToProviderPage = () => {
        window.location.href = "#/provider/" + props.provider.id
    }

    return (
        <div
            onClick={handleGoToProviderPage}
            className='card-membership provider-card-discovery'
        >

            <Row type='flex' justify="space-between" style={{ alignItems: "center" }}>
                <Col>
                    <Row type='flex' justify='space-between' style={{ alignItems: "center" }}>
                        <Col>
                            <Avatar src={props.provider && props.provider.image ? props.provider.image : Dr2} size={100} alt="dr" />
                        </Col>

                        <Col style={{ marginLeft: "15px" }}>
                            <Row type="flex" align="middle">
                                <p style={{ padding: "0px", fontWeight: "bold", fontSize: "18px" }}>Dr. {props.provider && props.provider.name ? props.provider.name : "-"}</p>
                            </Row>
                            <Row type="flex" align="middle">
                                <div>
                                    <img src={Star} alt="star" width={24} />
                                </div>

                                <div style={{ color: "#ccc" }} className="ml5">{props.provider && props.provider.rating ? props.provider.rating : "-"}</div>
                            </Row>


                        </Col>
                    </Row>

                </Col>
                <Col>
                    <Row type={"flex"} style={{ alignItems: "center", marginLeft: "25px", justifyContent: "flex-start" }}>
                        <Col style={{ marginRight: "15px" }}>
                            <Row type="flex" align="middle">
                                <div>
                                    <img src={Cert} alt="CERTIFICATION" />
                                </div>
                                <div className="ml10">
                                    <span style={{ display: "flex", fontWeight: "bold" }}>CERTIFICATION</span>
                                </div>
                            </Row>
                            <Row type="flex" align="middle" className="mt10">
                                <div>
                                    <span>
                                        <span className="strongBoldText">Dental Board of California</span>
                                        <br />
                                        Sep 14, 2015
                                    </span>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify="space-between" style={{ alignItems: "center", justifyContent: "flex-start", marginLeft: "25px", marginTop: "15px" }}>
                        <Col style={{ marginRight: "15px" }}>
                            <Row type="flex" align="middle">
                                <div>
                                    <img src={Archive} alt="CERTIFICATION" />
                                </div>
                                <div className="ml10">
                                    <span style={{ display: "flex", fontWeight: "bold" }}>EDUCATION</span>
                                </div>
                            </Row>
                            <Row type="flex" align="middle" className="mt10">
                                <div>
                                    <span>
                                        <span className="strongBoldText">{props.provider && props.provider.education ? props.provider.education : "-"}</span>
                                        <br />Loma Linda University</span>
                                </div>
                            </Row>
                        </Col>

                    </Row>
                </Col>
            </Row>

        </div>
    )
}

export default ProviderDetailCard;