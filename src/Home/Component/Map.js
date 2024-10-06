import { Col, Rate, Row } from 'antd';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import callWhite from '../Assets/callWhite.png';
import ClinicPhoto from "../Assets/clinic1.png";
import clockWhite from '../Assets/clockWhite.png';
import locationIcon from '../Assets/location-new.png';
import locationWhite from '../Assets/locationWhite.png';
import translateWhite from '../Assets/translateWhite.png';
import userLocationIcon from '../Assets/userLocation.png';


function isOpen(openingHour, closingHour) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    const currentTimeInSeconds = (currentHour * 60 * 60) + (currentMinute * 60) + currentSecond;
    const openingTimeInSeconds = convertTimeToSeconds(openingHour);
    const closingTimeInSeconds = convertTimeToSeconds(closingHour);

    if (openingTimeInSeconds <= currentTimeInSeconds && currentTimeInSeconds <= closingTimeInSeconds) {
        return true;
    } else {
        return false;
    }
}

function convertTimeToSeconds(time) {
    const timeArray = time ? time.split(":") : "";
    const hoursInSeconds = parseInt(timeArray[0]) * 60 * 60;
    const minutesInSeconds = parseInt(timeArray[1]) * 60;
    const seconds = parseInt(timeArray[2]);
    const totalTimeInSeconds = hoursInSeconds + minutesInSeconds + seconds;
    return totalTimeInSeconds;
}

const MapComponent = (props) => {
    const [clinics, setClinics] = useState([])
    const [userLocation, setUserLocation] = useState([0, 0])
    const [userLocationStatus, setUserLocationStatus] = useState(false)


    const customIcon = new L.Icon({
        iconUrl: locationIcon,
        iconSize: [25, 25],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const customIconBig = new L.Icon({
        iconUrl: locationIcon,
        iconSize: [25, 25],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const customIconUser = new L.Icon({
        iconUrl: userLocationIcon,
        iconSize: [25, 25],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const getUserLocation = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocationStatus(true)
                    setUserLocation([
                        latitude, longitude
                    ])

                },
                (error) => {
                    setUserLocationStatus(false)
                }
            );
        } else {
            setUserLocationStatus(false)
        }
    }

    const handleCheckUserLocation = async () => {
        getUserLocation();
    }

    const [selectedClinic, setSelectedClinic] = useState({})

    const markerRef = useRef(null);
    useEffect(() => {
        for (var i in props.clinics) {
            if (props.clinics[i] == props.hoveredClinicId) {
                markerRef.current.openPopup();
            }
        }
    }, [props.hoveredClinicId]);


    useEffect(() => {
        for (var i in props.clinics) {
            if (props.clinics[i] == props.hoveredClinicId) {
                setSelectedClinic(props.clinics[i])

            }


        }

    }, [props.hoveredClinicId])

    useEffect(() => {
        handleCheckUserLocation()
        setClinics(props.clinics)
    }, [])

    return (
        props.clinics && props.clinics.length > 0 ?
            <Map

                center={
                    selectedClinic && selectedClinic.latitude && selectedClinic.longitude ?
                        [selectedClinic.latitude, selectedClinic.longitude]
                        :
                        props.clinics[0].latitude && props.clinics[0].longitude ?
                            [props.clinics[0].latitude, props.clinics[0].longitude]
                            :
                            userLocationStatus ?

                                userLocation :

                                [43.676180, -79.347015]

                } zoom={15}
                className="leaflet-map-search-result"
            >
                <TileLayer
                    attribution="Google Maps"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                />
                {
                    // userLocationStatus && (
                    //     <Marker position={userLocation} icon={""}>

                    //     </Marker>
                    // )

                }
                {
                    props.clinics && props.clinics.map((clinic) => (
                        clinic.latitude && clinic.longitude ?
                            <Marker ref={markerRef} position={[clinic.latitude, clinic.longitude]} icon={props.hoveredClinicId == clinic.id ? customIconBig : customIcon}>
                                <Popup isOpen={props.hoveredClinicId == clinic.id ? true : false}>
                                    <div bordered={false} style={{ lineHeight: "30px" }} className="popUpMapCard">
                                        <Row type='flex' justify="center">
                                            <img src={ClinicPhoto} alt="clinic" width={165} height={80} style={{
                                                marginBottom: "10px",
                                                marginTop: "10px",
                                                borderRadius: "4px"
                                            }} />
                                            <br />
                                        </Row>
                                        <Row>
                                            <img src={locationWhite} alt="location-icon" /> <span className="ml5" style={{ fontSize: "12px" }}>{clinic.name}</span>
                                        </Row>
                                        <Row type={"flex"} justify="space-between">
                                            <Col className='pl3'>
                                                <img src={callWhite} alt="location-icon" /> <span className="ml5 " style={{ fontSize: "10px" }}>{clinic.phone}</span>
                                            </Col>
                                            <Col>
                                                <img width={25} src={translateWhite} alt="location-icon" style={{ marginRight: "10px" }} />
                                                {
                                                    clinic.languages && clinic.languages.length > 0 && clinic.languages.map((lang) => (
                                                        <span>{lang && lang.slice(0, 2) ? lang.slice(0, 2) + " " : ""}</span>
                                                    ))
                                                }
                                            </Col>


                                        </Row>
                                        <Row type={"flex"} justify="space-between" align="middle">
                                            <Col>
                                                <span className='rate-parent'>
                                                    <Rate disabled value={clinic.rating} className='card-rate-leaflet' size="small" />
                                                    <span style={{ fontSize: "10px" }}>
                                                        {clinic.number_of_votes ? "(" + clinic.number_of_votes + ")" : "(" + '-' + ")"}
                                                    </span>
                                                </span>
                                            </Col>
                                            <Col >
                                                <img width={17} src={clockWhite} alt="clock-icon" />
                                                <span style={{ marginLeft: "5px", fontSize: "10px" }}>

                                                    {
                                                        isOpen(clinic.openingHour, clinic.closing_hour) ? "Open" : "Closed"
                                                    }

                                                </span>


                                            </Col>

                                        </Row>


                                    </div>
                                </Popup>
                            </Marker>
                            :
                            <></>
                    ))
                }
            </Map >
            :
            <div style={{ minHeight: "30vh" }}>

            </div>
    );
};

export default MapComponent;
