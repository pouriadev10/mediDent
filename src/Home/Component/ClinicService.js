import {
    Card,
    Col
} from "antd";
import React from 'react';

const ClinicService = (props) => {
    return (
        <div className="clinic-infoCard" style={{ padding: "15px 0px", backgroundColor: "#F8F8F8" }}>
            <Col style={{ lineHeight: "15px" }}>
                <p style={{ fontWeight: "bold" }}>Clinic Services</p>
                <span style={{ color: "#ccc", fontSize: "12px" }}>You can view the service information of your choice by clicking on the tag you want.</span>
            </Col>
            <Card style={{ border: "0px", marginTop: "25px" }}>
                <p style={{ Color: "#696969" }}>
                    {
                        props.services && props.services.length > 0 ?
                            props.services.map((service) => (
                                <span>{service.name + " - "}</span>
                            ))
                            :
                            <>There isn't any services...</>
                    }
                </p>
            </Card>
        </div>
    )
}

export default ClinicService;