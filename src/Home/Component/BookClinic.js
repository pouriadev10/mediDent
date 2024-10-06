import {
    Button,
    Calendar,
    Col,
    Divider,
    Row
} from "antd";
import React, { useEffect, useState } from 'react';
import SelectProviderCard from "./SelectProviderCard";


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const BookClinic = (props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const onPanelChange = (value, mode) => {
    }
    useEffect(() => {

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="clinic-infoCard">
            <div style={{ padding: "28px" }}>
                <Row>
                    <Col style={{ lineHeight: "15px" }}>
                        <p className="boldText">Book an appointment for free</p>
                        <span style={{ fontSize: "12px", color: "gray" }}>In the first step, you can choose the type of service you need, and in the next step, you can choose the date and time you want to visit from among the available times.</span>
                    </Col>

                </Row>
                <Row type='flex' justify="space-between" style={{ marginTop: "25px" }}>
                    <Col span={windowDimensions.width > 900 ? 11 : 24}>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                    </Col>
                    {windowDimensions.width > 900 ? <Divider type='vertical' style={{ height: "auto" }} />
                        : <></>}
                    <Col span={windowDimensions.width > 900 ? 11 : 24}
                        style={{
                            marginTop: windowDimensions.width < 900 ? "20px" : "0px",
                            marginBottom: windowDimensions.width < 900 ? "20px" : "0px",
                        }}
                    >

                        <SelectProviderCard />
                        <SelectProviderCard />

                    </Col>
                </Row>
                <Row type='flex' justify="end">
                    <Button className="appointment-card-button">
                        Next
                    </Button>
                </Row>
                <Row type={"flex"} justify='center' style={{ marginTop: "25px" }}>
                    <span style={{ color: "#838383", fontSize: "12px" }}>
                        Have a question or need help booking an appointment? Call
                        {" "} <span style={{ color: "#006EFF" }}>855-962-3621</span>
                    </span>
                </Row>
            </div>

        </div>
    )
}

export default BookClinic;