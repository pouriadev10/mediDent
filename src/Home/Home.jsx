import {
    Col,
    Divider,
    Row,
    Select,
    Skeleton, Spin
} from "antd";
import {
    AlignCenterOutlined,
    EnvironmentOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ClinicCard from "./Component/ClinicCard";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Map from "./Component/Map";
import PlaceSearch from "./Component/PlaceSearch";
import { Controller } from "./Controller/Controller";
import filterResult from "./Assets/filter-search.png"
import sortResult from "./Assets/sort.png"
import TypeDoctor from "./Assets/TypeDoctor.png"
import LocationEnv from "./Assets/location-environment.png"
const { Option } = Select

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}



const Home = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [category, setCategory] = useState([])
    const [clinics, setClinics] = useState([])
    const [catList, setCatList] = useState([])
    const [lang, setLang] = useState([])
    const [loadingClinic, setLoadingClinic] = useState(false)
    const [countResult, setCountResult] = useState(0)
    const [selectedDistance, setSelectedDistance] = useState("")
    const [selectedLang, setSelectedLang] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedSort, setSelectedSort] = useState("rating")
    const [hoveredClinicId, setHoveredClinicId] = useState(-1)
    const [providerType, setProviderType] = useState(localStorage.getItem("selectedService") ? localStorage.getItem("selectedService") : undefined)

    const selectedClinic = (id) => {
        setHoveredClinicId(id)
    }

    const handleChangeProviderType = (e) => {
        setProviderType(e)
        localStorage.setItem("selectedService", e)
    }

    const getLocation = (e) => {
        localStorage.setItem("locationData", JSON.stringify(e))
    }

    const handleSearch = () => {
        if (window.location.href.search("/search-result") == -1)
            window.location.href = "#/search-result"
        else {
            handleGetClinics()
        }
    }

    const readCategory = async () => {
        const response = await Controller.getCategory()
        setCategory(response)
    }

    const handleGetClinics = async () => {
        setLoadingClinic(true)
        const data = {
            user_lat: localStorage.getItem("locationData") && JSON.parse(localStorage.getItem("locationData")).lat ? JSON.parse(localStorage.getItem("locationData")).lat : "",
            user_long: localStorage.getItem("locationData") && JSON.parse(localStorage.getItem("locationData")).long ? JSON.parse(localStorage.getItem("locationData")).long : "",
            distance: selectedDistance ? selectedDistance : "500",
            city: "",
            state: "",
            address: "",
            appointment_type: "",
            services: localStorage.getItem("selectedService") ? localStorage.getItem("selectedService") : "",
            language: selectedLang,
            categories: selectedCategory,
            order_by: selectedSort
        }
        const response = await Controller.getAllClinics(data)
        setCountResult(response.length)
        setClinics(response)
        setLoadingClinic(false)
    }

    const readCategoryList = async () => {
        const response = await Controller.getCategoryList();
        setCatList(response)
    }

    const readLang = async () => {
        const response = await Controller.getLangList();
        setLang(response)
    }

    useEffect(() => {
        handleGetClinics()
    }, [selectedDistance])
    useEffect(() => {
        handleGetClinics()
    }, [selectedLang])
    useEffect(() => {
        handleGetClinics()
    }, [selectedCategory])
    useEffect(() => {
        handleGetClinics()
    }, [selectedSort])

    useEffect(() => {
        readCategory()
        readLang()
        readCategoryList()
        handleGetClinics()
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (localStorage.getItem("locationData"))
            if (localStorage.getItem("selectedService"))
                localStorage.removeItem("selectedService")
    }, [])
    return (
        <React.Fragment>
            <div className={windowDimensions.width > 958 ? "main-clinic-profile" : "main-clinic-profile-small"}>
                <div className="container-clinic" style={{ marginLeft: "10px" }}>
                    <Header home={true} />
                </div>
                <Col style={{ display: "flex" }}>
                    <div className="search-box-clinic-list" style={{ margin: "5px 2px 35px 10px" }} >
                        <Row>
                            <Col span={22} className="top-search-clinic-container">
                                <Row type="flex" justify="space-between">
                                    <Col span={11}>
                                        <Row type="flex" justify="space-between" align="middle">

                                            <Col span={22} style={{ display: "flex", marginLeft: "4%", alignItems: "center" }}>
                                                {
                                                    windowDimensions.width > 620 &&
                                                    <div>
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
                                        <Row type="flex" justify="space-between" align="middle" className="fullHeight">

                                            <Col span={22} style={{ display: "flex", alignItems: "center" }} className="fullHeight">
                                                {
                                                    windowDimensions.width > 620 &&
                                                    <div className="start-self-algin" style={{ marginRight: "10px" }}>
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
                                <div style={{ backgroundColor: "#EEEDF9" }} className="search-button-box" onClick={handleSearch}>

                                    <SearchOutlined
                                        style={{
                                            fontSize: windowDimensions.width > 800 ? "25px" : "18px",
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>

                </Col>

                <Row type="flex" justify="space-between" style={{ marginLeft: "10px" }}>
                    <Col style={{ width: windowDimensions.width < 854 ? "100%" : "68%" }} >
                        <Row type="flex" justify="space-between">
                            <Col >
                                <Row type="flex" align="middle">
                                    <Col className="mr7" >
                                        <Row type="flex" justify="center" align="middle" className="p-bottom-2">
                                            <img src={filterResult} alt="filter" className="mr5" />
                                            Filter
                                        </Row>

                                    </Col>
                                    <Col className="mr7">
                                        <Select
                                            value={selectedDistance ? selectedDistance : undefined}
                                            onChange={(e) => { setSelectedDistance(e) }}
                                            className="select-filter antd-custom" placeholder="Distance" allowClear>
                                            <Option key="5">5 KM</Option>
                                            <Option key="10">10 KM</Option>
                                            <Option key="25">25 KM</Option>
                                            <Option key="50">50 KM</Option>
                                            <Option key="100">100 KM</Option>
                                        </Select>
                                    </Col>
                                    <Col className="mr7">
                                        <Select className="select-filter"
                                            value={selectedCategory ? selectedCategory : undefined}
                                            onChange={(e) => { setSelectedCategory(e) }}
                                            placeholder="Category" allowClear>
                                            {
                                                catList && catList.map((item) => (
                                                    <Option key={item.id}>{item.title}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col className="mr7">
                                        <Select className="select-filter" placeholder="Language"
                                            allowClear
                                            value={selectedLang ? selectedLang : undefined}
                                            onChange={(e) => { setSelectedLang(e) }}
                                        >
                                            {
                                                lang && lang.map((item) => (
                                                    <Option key={item.id}>{item.language}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                            <Col style={{ marginTop: windowDimensions.width > 1100 ? "" : "10px" }}>
                                <Row type="flex">
                                    <Col className="mr7" style={{ display: "flex", alignItems: "center" }}>
                                        <img className="mr5" src={sortResult} alt="sort" />Sort
                                    </Col>
                                    <Col style={{ display: "flex" }}>
                                        <Select className="select-filter" placeholder="Sort"
                                            value={selectedSort ? selectedSort : undefined}
                                            onChange={(e) => { setSelectedSort(e) }}
                                        >
                                            <Option key="rating">Rating</Option>
                                            <Option key="distance">Distance</Option>
                                            <Option key="discount">Discounts</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col type="flex" justify="center" style={{ width: windowDimensions.width < 854 ? "100%" : "30%", textAlign: "center" }}>
                        <Col style={{ marginTop: windowDimensions.width < 854 ? "15px" : "", fontSize: "16px", fontWeight: "bold" }}>
                            {countResult ? countResult : ""} Clinics Found
                        </Col>
                        <Col>
                            Results near {
                                localStorage.getItem("locationData") &&
                                    JSON.stringify(localStorage.getItem("locationData")) &&
                                    JSON.stringify(localStorage.getItem("locationData")).name ?
                                    JSON.stringify(localStorage.getItem("locationData")).length > 15 ?
                                        JSON.stringify(localStorage.getItem("locationData")).name.slice(0, 15) &&
                                        JSON.stringify(localStorage.getItem("locationData")).name.slice(0, 15) + "..."
                                        :
                                        JSON.stringify(localStorage.getItem("locationData")).name
                                    :
                                    "Selected Location"
                            }
                        </Col>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between"
                    style={{
                        flexDirection: windowDimensions.width < 854 ? "column-reverse" : "row",
                        marginBottom: "45px"
                    }}
                >
                    {
                        clinics == "loading" ?
                            <>
                                <Col span={windowDimensions.width < 854 ? 24 : 13} style={{ width: windowDimensions.width < 854 ? "100%" : "68%" }} className="mb- 3" >
                                    <div
                                        className='clinicCard'
                                    >
                                        <div >
                                            <Skeleton />
                                        </div>
                                    </div>
                                </Col>
                                <Col span={windowDimensions.width < 854 ? 24 : 10} style={{ marginTop: "100px", textAlign: "center", minHeight: "25vh" }}>
                                    <Spin style={{ marginTop: "5%" }} />
                                </Col>
                            </>
                            :
                            <>
                                <Col
                                    id="custom-scrollbar"
                                    style={{
                                        paddingBottom: "4px",
                                        paddingTop: "4px",
                                        width: windowDimensions.width < 854 ? "100%" : "68%", marginTop: windowDimensions.width < 854 ? "10px" : "10px",
                                        maxHeight: "100vh",
                                        overflow: "auto"
                                    }}
                                    className="mb- 3" >
                                    {
                                        loadingClinic ?
                                            <Row type="flex" justify="center" className="mt-5">
                                                <Spin />
                                            </Row>
                                            :
                                            clinics && clinics.map((clinic, index) => (
                                                <div style={{
                                                    marginTop: index == 0 ? "0px" : "30px", display: "flex",
                                                    justifyContent: "center"
                                                }} >
                                                    <ClinicCard windowDimensions={windowDimensions} clinic={clinic} selectedClinic={selectedClinic} />
                                                </div>
                                            ))
                                    }
                                </Col>
                                <Col className="search-map-container" span={windowDimensions.width < 854 ? 24 : 7} >
                                    <Map windowDimensions={windowDimensions} clinics={clinics} hoveredClinicId={hoveredClinicId} />
                                </Col>
                            </>
                    }
                </Row>
            </div>
            <div>
                <Footer />
            </div>
        </React.Fragment >
    )
}


export default Home;