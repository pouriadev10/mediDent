import {
    Col,
    Row
} from "antd";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Clinic2 from "../Assets/clinic2.png";
import Clinic3 from "../Assets/clinic3.png";
import Clinic4 from "../Assets/clinic4.png";
import Clinic5 from "../Assets/clinic5.png";
import locationIcon from '../Assets/location-new.png';
function LeafletMap(props) {
    const [position, setPosition] = useState([51.505, -0.09]);
    const customIcon = new L.Icon({
        iconUrl: locationIcon,
        iconSize: [25, 25],
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32],
    });

    useEffect(() => {
        if (props && props.clinic && props.clinic.longitude && props.clinic.latitude) {
            setPosition([props.clinic.latitude, props.clinic.longitude])
        }
    }, [props])

    return (
        <Map center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
                    attribution="Google Maps"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <Marker position={position} icon={customIcon}>
            </Marker>
        </Map>
    );
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
const position = [51.505, -0.09]
const ClinicPhotos = (props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="clinic-infoCard" style={{ backgroundColor: "#F8F8F8" }}>
            <Col style={{ lineHeight: "15px" }}>
                <p style={{ fontWeight: "bold" }}>Clinic Photos</p>
                <span style={{ color: "#ccc", fontSize: "12px" }}>All the photos are from inside the clinic and all the devices and equipment are modern and up-to-date.</span>
            </Col>
            <Row type='flex' justify='space-between' style={{ marginTop: "25px", alignItems: "center" }}>
                <Col span={13}>


                    <Row type="flex" justify='space-between' >

                        <Col >

                            <Row type='flex' justify="space-between">
                                <Col style={{ marginRight: "20px" }}>
                                    <img src={Clinic2} alt="clinic" />
                                </Col>
                                <Col>
                                    <img src={Clinic3} alt="clinic" />
                                </Col>

                            </Row>
                            <Row type='flex' justify="space-between" style={{ marginTop: "20px" }}>
                                <Col style={{ marginRight: "20px" }}>
                                    <img src={Clinic4} alt="clinic" />
                                </Col>
                                <Col>
                                    <img src={Clinic5} alt="clinic" />
                                </Col>

                            </Row>


                        </Col>

                    </Row>
                </Col>
                <Col span={11}>
                    <div>
                        <LeafletMap clinic={props.clinic} />
                    </div>

                </Col>
            </Row>


        </div >
    )
}

export default ClinicPhotos;