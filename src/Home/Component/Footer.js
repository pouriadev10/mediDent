import {
    Button,
    Col,
    Input,
    Row
} from "antd";
import React, { useEffect, useState } from 'react';
import { HomeOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const Footer = (props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Row type={"flex"} justify="space-between" className='footer-1'>
                <Col>
                    <span className='footer-1-title'>Helpfull Link</span>
                    <Col className='footer-1-items'>
                        <div>Privacy Policy</div>
                        <div>Support</div>
                        <div>FAQ</div>
                        <div>Terms & Conditions</div>
                    </Col>
                </Col>
                <Col>
                    <span className='footer-1-title'>Support</span>
                    <Col className='footer-1-items'>
                        <div>Privacy Policy</div>
                        <div>Support</div>
                        <div>FAQ</div>
                        <div>Terms & Conditions</div>
                    </Col>
                </Col>
                <Col style={{ marginTop: windowDimensions.width < 839 ? "25px" : "" }}>
                    <span className='footer-1-title'>Sign UP</span>
                    <div className='footer-1-items'>


                        <div>
                            <label>Email</label>
                            <Row type='flex'>
                                <Col>
                                    <Input

                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="example@email.com"
                                        prefix={<MailOutlined className="placeholder-color" />}

                                    />
                                </Col>
                                <Col>
                                    <Button className='footer-signup' type="primary">
                                        Sign UP
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col style={{ marginTop: windowDimensions.width < 839 ? "25px" : "" }}>
                    <span className='footer-1-title'>Contact Us</span>
                    <div className='footer-1-items'>

                        <Row type="flex" align="middle">
                            <PhoneOutlined className="white-color" />
                            <span className='ml10'> +1 (888) 225 0134</span>
                        </Row>

                        <Row type="flex" align="middle">
                            <HomeOutlined className="white-color" />
                            <span className='ml10'>Amherst, 46 Robert Angus Dr</span>
                        </Row>

                    </div>
                </Col>
            </Row>
            <Row type='flex' justify="space-between" className='footer-2'>
                <span>Dental</span>
                <span>Copyright © 2023. All rights reserved</span>
            </Row>
        </div>

    )
}

export default Footer;