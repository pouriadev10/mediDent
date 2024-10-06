import {
    Button,
    Card,
    Col,
    Row
} from "antd";
import React, { useEffect, useState } from 'react';
import Archive from "../Assets/archive-book.png";
import Cert from "../Assets/certify.png";
import Dr2 from "../Assets/dr2.png";
import Star from "../Assets/star.png";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


const PatientReviews = (props) => {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="clinic-infoCard" style={{
            padding: "30px", backgroundColor: "#F8F8F8"

        }}>
            <Col style={{ lineHeight: "15px" }}>
                <p style={{ fontWeight: "bold" }}>Providers</p>
                <span style={{ color: "#ccc", fontSize: "12px" }}>All providers have official documents that can be presented, which is approved by our team.</span>
            </Col>

            <Row type="flex" justify="space-between" style={{ lineHeight: "20px", marginTop: "20px" }}>
                <Col style={{ width: windowDimensions.width > 1230 ? "auto" : "100%", marginTop: "20px" }} >
                    <Card >

                        <Row type='flex' justify="space-between" style={{ alignItems: "center" }}>
                            <Col>
                                <Row type='flex' justify='space-between' style={{ alignItems: "center" }}>
                                    <Col>
                                        <img src={Dr2} alt="dr" />
                                    </Col>

                                    <Col style={{ marginLeft: "15px" }}>
                                        <p style={{ padding: "0px", fontWeight: "bold", fontSize: "18px" }}>Dr. Sophia</p>
                                        <img src={Star} alt="star" /> <span style={{ color: "#ccc" }}>4.5</span>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>
                                <Row type={"flex"} style={{ alignItems: "center", marginLeft: "25px", justifyContent: "flex-start" }}>
                                    <Col style={{ marginRight: "15px" }}>
                                        <img src={Cert} alt="CERTIFICATION" />
                                    </Col>
                                    <Col>
                                        <span style={{ display: "flex", fontWeight: "bold" }}>CERTIFICATION</span>
                                        <span style={{ display: "flex" }}>Dental Board of California<br />Sep 14, 2015</span>
                                    </Col>
                                </Row>
                                <Row type={"flex"} justify="space-between" style={{ alignItems: "center", justifyContent: "flex-start", marginLeft: "25px", marginTop: "15px" }}>
                                    <Col style={{ marginRight: "15px" }}>
                                        <img src={Archive} alt="CERTIFICATION" />
                                    </Col>
                                    <Col>
                                        <span style={{ display: "flex", fontWeight: "bold" }}>EDUCATION</span>
                                        <span style={{ display: "flex" }}>DDS<br />Loma Linda University</span>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>



                    </Card>
                </Col>
                <Col style={{ width: windowDimensions.width > 1230 ? "auto" : "100%", marginTop: "20px" }}>
                    <Card >

                        <Row type='flex' justify="space-between" style={{ alignItems: "center" }}>
                            <Col>
                                <Row type='flex' justify='space-between' style={{ alignItems: "center" }}>
                                    <Col>
                                        <img src={Dr2} alt="dr" />
                                    </Col>

                                    <Col style={{ marginLeft: "15px" }}>
                                        <p style={{ padding: "0px", fontWeight: "bold", fontSize: "18px" }}>Dr. Sophia</p>
                                        <img src={Star} alt="star" /> <span style={{ color: "#ccc" }}>4.5</span>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>
                                <Row type={"flex"} style={{ alignItems: "center", marginLeft: "25px", justifyContent: "flex-start" }}>
                                    <Col style={{ marginRight: "15px" }}>
                                        <img src={Cert} alt="CERTIFICATION" />
                                    </Col>
                                    <Col>
                                        <span style={{ display: "flex", fontWeight: "bold" }}>CERTIFICATION</span>
                                        <span style={{ display: "flex" }}>Dental Board of California<br />Sep 14, 2015</span>
                                    </Col>
                                </Row>
                                <Row type={"flex"} justify="space-between" style={{ alignItems: "center", justifyContent: "flex-start", marginLeft: "25px", marginTop: "15px" }}>
                                    <Col style={{ marginRight: "15px" }}>
                                        <img src={Archive} alt="CERTIFICATION" />
                                    </Col>
                                    <Col>
                                        <span style={{ display: "flex", fontWeight: "bold" }}>EDUCATION</span>
                                        <span style={{ display: "flex" }}>DDS<br />Loma Linda University</span>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>



                    </Card>
                </Col>

            </Row>
            <Row type="flex" justify="space-between" style={{ lineHeight: "20px", marginTop: "20px" }}>
                <Col style={{ width: windowDimensions.width > 1230 ? "auto" : "100%"}} >
                    <Card >

                        <Row type='flex' justify="space-between" style={{ alignItems: "center" }}>
                            <Col>
                                <Row type='flex' justify='space-between' style={{ alignItems: "center" }}>
                                    <Col>
                                        <img src={Dr2} alt="dr" />
                                    </Col>

                                    <Col style={{ marginLeft: "15px" }}>
                                        <p style={{ padding: "0px", fontWeight: "bold", fontSize: "18px" }}>Dr. Sophia</p>
                                        <img src={Star} alt="star" /> <span style={{ color: "#ccc" }}>4.5</span>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>
                                <Row type={"flex"} style={{ alignItems: "center", marginLeft: "25px", justifyContent: "flex-start" }}>
                                    <Col style={{ marginRight: "15px" }}>
                                        <img src={Cert} alt="CERTIFICATION" />
                                    </Col>
                                    <Col>
                                        <span style={{ display: "flex", fontWeight: "bold" }}>CERTIFICATION</span>
                                        <span style={{ display: "flex" }}>Dental Board of California<br />Sep 14, 2015</span>
                                    </Col>
                                </Row>
                                <Row type={"flex"} justify="space-between" style={{ alignItems: "center", justifyContent: "flex-start", marginLeft: "25px", marginTop: "15px" }}>
                                    <Col style={{ marginRight: "15px" }}>
                                        <img src={Archive} alt="CERTIFICATION" />
                                    </Col>
                                    <Col>
                                        <span style={{ display: "flex", fontWeight: "bold" }}>EDUCATION</span>
                                        <span style={{ display: "flex" }}>DDS<br />Loma Linda University</span>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>



                    </Card>
                </Col>
                <Col style={{ width: windowDimensions.width > 1230 ? "auto" : "100%", marginTop: "20px" }}>
                    <Card >

                        <Row type='flex' justify="space-between" style={{ alignItems: "center" }}>
                            <Col>
                                <Row type='flex' justify='space-between' style={{ alignItems: "center" }}>
                                    <Col>
                                        <img src={Dr2} alt="dr" />
                                    </Col>

                                    <Col style={{ marginLeft: "15px" }}>
                                        <p style={{ padding: "0px", fontWeight: "bold", fontSize: "18px" }}>Dr. Sophia</p>
                                        <img src={Star} alt="star" /> <span style={{ color: "#ccc" }}>4.5</span>
                                    </Col>
                                </Row>

                            </Col>
                            <Col>
                                <Row type={"flex"} style={{ alignItems: "center", marginLeft: "25px", justifyContent: "flex-start" }}>
                                    <Col style={{ marginRight: "15px" }}>
                                        <img src={Cert} alt="CERTIFICATION" />
                                    </Col>
                                    <Col>
                                        <span style={{ display: "flex", fontWeight: "bold" }}>CERTIFICATION</span>
                                        <span style={{ display: "flex" }}>Dental Board of California<br />Sep 14, 2015</span>
                                    </Col>
                                </Row>
                                <Row type={"flex"} justify="space-between" style={{ alignItems: "center", justifyContent: "flex-start", marginLeft: "25px", marginTop: "15px" }}>
                                    <Col style={{ marginRight: "15px" }}>
                                        <img src={Archive} alt="CERTIFICATION" />
                                    </Col>
                                    <Col>
                                        <span style={{ display: "flex", fontWeight: "bold" }}>EDUCATION</span>
                                        <span style={{ display: "flex" }}>DDS<br />Loma Linda University</span>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>



                    </Card>
                </Col>

            </Row>
            <Row type='flex' justify='center' style={{ marginTop: "25px" }}>
                <Button style={{ backgroundColor: "#1376F8", color: "white" }}>
                    View More
                </Button>
            </Row>


        </div>
    )
}

export default PatientReviews;