import {
    Avatar,
    Col,
    Row,
    Select
} from "antd";
import React, { useEffect, useState } from "react";
import { controller } from "../controller";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import ProviderReview from "./Component/ProviderReview";
import ProviderInformation from "./Component/ProviderInformation";
import ProviderClinic from "./Component/ProviderClinic";
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const { Option } = Select;

const Provider = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [data, setData] = useState({})

    const getProviderDetail = async () => {
        if (
            window.location.href.split("/") &&
            window.location.href.split("/")[window.location.href.split("/").length - 1]
        ) {
            const response = await controller.getProviderDetail(window.location.href.split("/")[window.location.href.split("/").length - 1]);

            setData(response)
        }

    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        getProviderDetail();
    }, [])

    return (
        <div className="discovery-layout">
            <div className={windowDimensions.width > 958 ? "main-clinic-profile " : "main-clinic-profile-small"}>
                <div className="container-clinic Header-landing">
                    <Header />
                </div>
                <Row type="flex" justify="space-between" className="mt5p">
                    <Col span={13}>
                        <ProviderInformation data={data} />
                    </Col>
                    <Col span={10}>
                        <ProviderClinic data={data} />
                    </Col>
                </Row>
                <div>
                    <ProviderReview data={data} />
                </div>
            </div>
            <div className="footer-home">
                <Footer />
            </div>
        </div>
    )
}

export default Provider;