import {
    Avatar,
    Button,
    Col,
    Drawer,
    Dropdown,
    Menu,
    Row
} from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import ClinicLogo from "../Assets/ClinicLogo.png";
import AdminLogo from "../Assets/AdminLogo.png"
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


const dropdownProfile = () => (
    <Menu>
        <Menu.Item>Alireza Sadeqi</Menu.Item>
    </Menu>
)

const Header = (props) => {
    const [open, setOpen] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="head-profile" style={{ backgroundColor: props.home ? "" : "" }}>
            <Row type="flex" justify="space-between" style={{ height: "auto", alignItems: "center", padding: "10px" }} >
                <Col>
                    <img src={ClinicLogo} alt="logo" />
                </Col>
                {
                    windowDimensions.width < 947 ?
                        <MenuOutlined onClick={showDrawer} />
                        :
                        <>
                            <Col>
                                <div>
                                    <span style={{ fontWeight: window.location.href.toLowerCase().search("home") != -1 ? "bold" : "" }} className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"} > Home</span>
                                    <span className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"}>Services</span>
                                    <span className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"}>Blogs</span>
                                    <span className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"}>About</span>
                                    <span className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"}>Contact</span>
                                </div>
                            </Col>
                            <Col>
                                <Dropdown overlay={dropdownProfile}>
                                    <span>
                                        <Avatar size="large" src={AdminLogo} />
                                        <DownOutlined />
                                    </span>

                                </Dropdown>

                                <Button
                                    className="header-button"
                                >
                                    Book Now
                                </Button>
                            </Col>
                        </>

                }


            </Row>

            <Drawer
                title="Menu"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={open}
                style={{ height: "100%" }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "90%"
                    }}
                >
                    <div>
                        <p className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"} > Home</p>
                        <p className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"}>Services</p>
                        <p className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"}>Blogs</p>
                        <p className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"}>About</p>
                        <p className={windowDimensions.width < 1050 ? "mr-2 pointerClick" : "mr-5 pointerClick"}>Contact</p>
                    </div>
                    <Button
                        style={{ backgroundColor: "#6B43B5", borderRadius: "8px", color: "white", width: "100%", height: "35px" }}
                    >
                        Book Now
                    </Button>
                </div>

            </Drawer>

        </div >
    )
}

export default Header;