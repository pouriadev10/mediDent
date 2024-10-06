import {
    Checkbox,
    Col,
    Row
} from "antd";
import React from 'react';
import config from "../../config";
import Clock from "../Assets/clock-tp.png";
import Star from "../Assets/star.png";


const SelectProviderCardModal = (props) => {
    const handleCheck = (e) => {
        props.handleCheckProvider(props.provider)
    }

    return (
        props.provider ?
            <div className='provider-clinic' onClick={() => { handleCheck(props.provider) }}>
                <Row type="flex" justify="space-between" style={{ padding: "0px 10px", alignItems: "center" }}>
                    <Col>
                        <Row type="flex" justify="start" align="middle" className="clinic-card-font">
                            <Col style={{ padding: "10px 0px" }}>
                                <Checkbox style={{ marginRight: "5px" }} onChange={() => handleCheck(props.provider)}
                                    checked={
                                        props.check &&
                                            props.check == props.provider.provider_id &&
                                            props.checkTime == props.provider.date_time
                                            ? true : false} />
                                <img width={43} height={43} style={{ borderRadius: "50%" }} className="clinic-card-font" size={"large"} src={config.apiGateway.URL + props.provider.provider_image} alt="Dr" />
                            </Col>
                            <Col style={{ marginLeft: "10px" }}>
                                <Row className="clinic-card-font">
                                    <img width={11} height={11} src={Star} alt="star" /> <span style={{ color: "#ccc", marginRight: "2px", marginLeft: "2px" }}>
                                        {props.provider.provider_rating && props.provider.provider_rating}

                                    </span> <span className="clinic-card-font" style={{ fontWeight: "bold" }}>Dr. {props.provider.provider_name && props.provider.provider_name}</span>

                                </Row>
                                <Row style={{ marginTop: "10px" }}>
                                    <img width={11} height={11} src={Clock} alt="star" /> <span className="clinic-card-font" style={{ fontWeight: "bold", marginLeft: "2px" }}>
                                        {props.provider.date_time && (props.provider.date_time.split("T")[1].split("Z")[0]).split(":").slice(0, 2).join(":")}
                                    </span>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                    {
                        props.provider.discount && props.provider.discount != "0%" && (
                            <Col>
                                <div className='lastmin-text' style={{ textAlign: "center" }}>Last minute Deal<b>{props.provider.discount ? " " + props.provider.discount.replace(".00", "") : "-"}</b></div>
                            </Col>
                        )
                    }


                </Row>
            </div>
            :
            <></>
    )
}

export default SelectProviderCardModal;