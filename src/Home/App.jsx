import React, { useContext } from "react"
import { DataContext, } from './Store/DataContext';
import { useState, useEffect } from "react";
import Map from "./Component/Map"
import Header from "./Component/Header"
import "./app.css"
import ClinicCard from "./Component/ClinicCard";
import {
    Row,
    Col,
    Skeleton,
    Spin
} from "antd";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const App = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const clinics = useContext(DataContext)
    const [hoveredClinicId, setHoveredClinicId] = useState(-1)
    const selectedClinic = (id) => {
        setHoveredClinicId(id)
    }

    useEffect(() => {

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="search-page">
            <Row>
                <Header windowDimensions={windowDimensions} />
            </Row>
            <Row type="flex" justify="space-between"
                style={{ flexDirection: windowDimensions.width < 854 ? "column-reverse" : "row" }}
            >
                {
                    clinics == "loading" ?
                        <>
                            <Col span={windowDimensions.width < 854 ? 24 : 13} style={{ width: windowDimensions.width < 854 ? "100%" : "57%", marginTop: windowDimensions.width < 854 ? "10px" : "100px" }} className="mb- 3" >
                                <div
                                    className='clinicCard'
                                >
                                    <div >
                                        <Skeleton />
                                    </div>
                                </div>
                            </Col>
                            <Col span={windowDimensions.width < 854 ? 24 : 10} style={{ marginTop: "100px", textAlign: "center", minHeight: "40vh" }}>
                                <Spin className="spin-loading" />
                            </Col>
                        </>
                        :
                        <>
                            <Col span={windowDimensions.width < 854 ? 24 : 13} style={{ width: windowDimensions.width < 854 ? "100%" : "57%", marginTop: windowDimensions.width < 854 ? "10px" : "100px" }} className="mb- 3" >
                                {
                                    clinics && clinics.map((clinic) => (
                                        <div className="clinic-cards-container" >
                                            <ClinicCard windowDimensions={windowDimensions} clinic={clinic} selectedClinic={selectedClinic} />
                                        </div>
                                    ))
                                }
                            </Col>
                            <Col span={windowDimensions.width < 854 ? 24 : 10} style={{ marginTop: windowDimensions.width < 854 ? "85px" : "100px" }}>
                                <Map windowDimensions={windowDimensions} clinics={clinics} hoveredClinicId={hoveredClinicId} />
                            </Col>
                        </>
                }
            </Row>
        </div >
    )
}

export default App;