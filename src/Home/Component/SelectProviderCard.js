import {
    Checkbox,
    Col,
    Row
} from "antd";
import React from 'react';
import config from "../../config";
import Clock from "../Assets/clock-tp.png";
import Star from "../Assets/star.png";


const SelectProviderCard = (props) => {
    const handleCheck = (e) => {
        props.handleCheckProvider(props.provider)
    }

    return (
        props.provider ?
            <div className='provider-clinic' onClick={() => { handleCheck(props.provider) }}>
                <Row type="flex" justify="space-between" style={{ padding: "0px 10px", alignItems: "center" }}>
                    <Col>
                        <Row type="flex" justify="start" align="middle" className="provider-clinic-card-font">
                            <Col style={{ padding: "15px 0px" }}>


                                <Checkbox style={{ marginRight: "15px", marginLeft: "5px", fontSize:"16px" }} onChange={() => handleCheck(props.provider)}
                                    checked={
                                        props.check &&
                                            props.check == props.provider.provider_id &&
                                            props.checkTime == props.provider.date_time
                                            ? true : false} />
                                <img width={60} height={60} style={{ borderRadius: "50%" }} className="provider-clinic-card-font" size={"large"} src={config.apiGateway.URL + props.provider.provider_image} alt="Dr" />

                            </Col>
                            <Col style={{ marginLeft: "10px" }}>
                                <Row className="provider-clinic-card-font">
                                    <img width={16} height={16} src={Star} alt="star" /> <span style={{ color: "#ccc", marginRight: "2px", marginLeft: "2px" }}>
                                        {props.provider.provider_rating && props.provider.provider_rating}

                                    </span> <span className="provider-clinic-card-font">Dr. {props.provider.provider_name && props.provider.provider_name}</span>

                                </Row>
                                <Row style={{ marginTop: "10px" }}>
                                    <img width={16} height={16} src={Clock} alt="star" /> <span className="provider-clinic-card-font" style={{ marginLeft: "2px" }}>
                                        {props.provider.date_time && (props.provider.date_time.split("T")[1].split("Z")[0]).split(":").slice(0, 2).join(":")}
                                    </span>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                    {
                        props.provider.discount && props.provider.discount != "0%" && (
                            <Col>
                                <div className='lastmin-text'>Last minute Deal <b>{props.provider.discount}</b></div>
                            </Col>
                        )
                    }


                </Row>
            </div>
            :
            <></>
    )
}

export default SelectProviderCard;