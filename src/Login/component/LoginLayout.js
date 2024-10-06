import { Layout } from "antd";
import React from "react";
import "../style.css";
import {
    Row,
    Col
} from "antd"

// images
import loginImage from "../assets/img/LoginImage.png"
import smpassLogo from "../assets/img/logoSmpass.png"

const LoginLayout = ({ children }) => {
    return (
        <Layout className="mh100v" style={{backgroundColor:"#EEECFC"}}>
            <Layout>
                <Row className="login-container" justify={"space-between"} style={{backgroundColor:"#EEECFC"}}>
                    <Col span={12}>
                        <div className="login-content" style={{backgroundColor:"#EEECFC"}}>
                            <img alt="logo" src={smpassLogo} width={280}  style={{marginBottom: 30}}/>
                            <div className="mt8p">
                                {children}
                            </div>

                        </div>
                    </Col>
                    <Col span={12}>
                        <img className="sider-cover-image" src={loginImage} alt="dentist" />
                    </Col>
                </Row>



            </Layout>
        </Layout>
    )
}

export default LoginLayout;