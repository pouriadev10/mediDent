import {
    Col,
    Divider,
    Menu,
    Row,
    Select
} from "antd";
import {
    AlignCenterOutlined,
    EnvironmentOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import WomanHome from "./Assets/woman-home.png";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import { Controller } from "./Controller/Controller";
import PlaceSearch from "./Component/PlaceSearch";
import TypeDoctor from "./Assets/TypeDoctor.png"
import LocationEnv from "./Assets/location-environment.png"
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const { Option } = Select;

const LandingPage = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [category, setCategory] = useState([])
    const [providerType, setProviderType] = useState(undefined)

    const readCategory = async () => {
        const response = await Controller.getCategory()
        setCategory(response)
    }

    useEffect(() => {
        readCategory()
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        getLocation();
        if (localStorage.getItem("locationData"))
            localStorage.removeItem("locationData")
        if (localStorage.getItem("selectedService"))
            localStorage.removeItem("selectedService")
    }, [])

    const getLocation = (e) => {
        localStorage.setItem("locationData", JSON.stringify(e))
    }

    const handleSearch = () => {
        window.location.href = "#/search-result"
    }

    const handleChangeProviderType = (e) => {
        setProviderType(e)
        localStorage.setItem("selectedService", e)
    }

    return (
        <div className="discovery-layout">
            <div className={windowDimensions.width > 958 ? "main-clinic-profile " : "main-clinic-profile-small"}>
                <div className="container-clinic Header-landing">
                    <Header />
                </div>
                <div>
                    <Row type="flex" style={{ marginTop: "100px" }} justify={windowDimensions.width > 958 ? "space-between" : "center"} align="bottom">
                        <p
                            className="text-header-home"
                            style={{
                                marginBottom: "150px"
                            }}
                        >Helping You Bring Back Your <br />
                            <span style={{ fontSize: "55px" }}>Happy Smile</span></p>
                        <img src={WomanHome} alt="home" width={450} style={{ marginRight: "8%", zIndex: "+10", marginBottom: "-2px" }} />
                    </Row>
                    <div className="search-box-home">
                        <Row
                            style={{
                                boxShadow: "0px 4px 50px rgba(0, 60, 179, 0.16)"
                            }}
                        >
                            <Col span={22} style={{ padding: "15px" }}>
                                <Row type="flex" justify="space-between">
                                    <Col span={11}>
                                        <Row type="flex" justify="space-between" align="middle">

                                            <Col span={22} style={{ display: "flex", marginLeft: "5%", alignItems: "center" }}>
                                                {
                                                    windowDimensions.width > 620 &&
                                                    <div className="start-self-algin">
                                                        <img src={TypeDoctor} alt="doctor-type" />
                                                    </div>


                                                }
                                                <Select
                                                    className="select-filter0"
                                                    placeholder={"Type of Doctor"}
                                                    style={{ width: "100%" }}
                                                    showSearch
                                                    onChange={handleChangeProviderType}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    value={providerType ? providerType : undefined}
                                                    optionFilterProp="children"
                                                >
                                                    {
                                                        category && category.length > 0 && (
                                                            category.map((item) => (
                                                                <Option
                                                                    key={item.id}>{item.name}</Option>
                                                            ))
                                                        )
                                                    }

                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Divider type="vertical" style={{ height: "100%" }} />
                                    </Col>
                                    <Col span={11}>
                                        <Row style={{ height: "100%" }} className="fullHeight" type="flex" justify="space-between" align="middle">

                                            <Col span={22} style={{ display: "flex", alignItems: "center" }}>
                                                {
                                                    windowDimensions.width > 620 &&
                                                    <div
                                                        className="start-self-algin"
                                                        style={{ marginRight: "10px" }}>
                                                        <img src={LocationEnv} alt="location" />
                                                    </div>
                                                }
                                                <PlaceSearch getLocation={getLocation} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2}>
                                <div className="search-button-box" onClick={handleSearch}>
                                    <SearchOutlined
                                        style={{
                                            fontSize: windowDimensions.width > 800 ? "25px" : "18px",
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className="footer-home">
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage;