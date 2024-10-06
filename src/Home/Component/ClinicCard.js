import React, { useCallback, useEffect, useState } from 'react';
import {
    Col,
    Modal as LightBox,
    Rate,
    Row,
    notification,
    Select,
    Button
} from "antd";
import Gallery from "react-photo-gallery";
import Clinic1 from "../Assets/clinic1.png";
import ClockIcon from "../Assets/clock.png";
import Carousel, { Modal, ModalGateway } from "react-images";
import SelectProviderCard from './SelectProviderCard';
import RegistrationFormModal from './RegistrationFormModal';
import { Controller } from '../Controller/Controller';
import moment from "moment";
import SelectProviderCardModal from './SelectProviderCardModal';
import ImagePlaceHolder from "../Assets/placeholder.png"
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
const { Option } = Select;


const ClinicCard = (props) => {
    const [photos, setPhotos] = useState([])
    const [currentImage, setCurrentImage] = useState(0);
    const [hoveredClinicId, setHoveredClinicId] = useState(-1)
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState("-1");
    const [selectedProvider, setSelectedProvider] = useState("");
    const [selectedProviderTime, setSelectedProviderTime] = useState("");
    const [visible, setVisible] = useState(false)
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    const openNotification = (placement, message, status) => {
        if (status && status.toLowerCase().search("success") != -1) {
            notification.success({
                message: status,
                description: message,
                placement,
            });
        } else if (status && status.toLowerCase().search("error") != -1) {
            notification.error({
                message: status,
                description: message,
                placement,
            });
        } else {
            notification.info({
                message: status,
                description: message,
                placement,
            });
        }
    };

    const handleSelectClinic = () => {
        window.location.href = "#/clinic/" + props.clinic.id
    }

    const handleLeave = () => {
        setHoveredClinicId(-1)
    }

    const handleSelectAppointment = (e) => {
        setSelectedAppointment(e)
    }

    const handleHover = () => {
        if (props.clinic.id != hoveredClinicId)
            setHoveredClinicId(props.clinic.id)
    }

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const handleCheckProvider = (e) => {
        setSelectedProvider(e.provider_id);
        setSelectedProviderTime(e.date_time);
    };

    const openModal = () => {
        if (selectedAppointment == "-1") {
            if (
                props.clinic.appointment_types &&
                props.clinic.appointment_types.length > 0
            ) {
                for (var i in props.clinic.appointment_types) {
                    if (props.clinic.appointment_types[i].service == "consult") {
                        setSelectedAppointment(props.clinic.appointment_types[i].id)
                    }
                }
            }

        }
        if (selectedProvider != "")
            setVisible(true)
        else
            openNotification("bottom", "Select a provider", "Error");
        setBookingStep(2)
    }

    const backToStep1 = () => {
        setVisible(false)
        setBookingStep(1)
    };


    const onSubmitRegistrationStep = async () => {
        console.log(props.clinic)
        const response = await Controller.set_appointment(
            props.clinic.id,
            selectedAppointment,
            selectedProviderTime,
            selectedDate,
            selectedProvider,
            JSON.parse(localStorage.getItem("booking-step-four-clinic")).id,
            "",
            "myself"
        );
        if (response.status < 250) {
            openNotification(
                "bottom",
                response.message
                    ? response.message
                    : "Your appointment date has been successfully registered",
                "Successful"
            );
            setBookingStep(3);
        }
    };

    const handleChangeSelectedAppointment = async (e) => {
        console.log(e)
        setSelectedProvider("");
        setSelectedAppointment(e);
    }

    useEffect(() => {
        var temp = [];
        if (
            props.clinic.featured_images &&
            props.clinic.featured_images.length > 0
        ) {
            for (var i in props.clinic.featured_images) {
                temp.push(props.clinic.featured_images[i])
            }
        }
        setPhotos(temp)
    }, [props.clinic.featured_images])

    return (
        <React.Fragment>

            <Row
                className='clinicCard'
                onMouseOver={handleHover}
                onMouseLeave={handleLeave}

                style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 15px", width: "99%" }}
            // onClick={handleSelectClinic}
            >
                <Col span={14} style={{
                    paddingRight: "20px",
                    lineHeight: "2",
                    height: "354px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }} onClick={handleSelectClinic}>
                    <Row type="flex">
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "28px", lineHeight: "2" }} >
                                {props.clinic.name}

                                <div className='distanceCard ml5'>
                                    <span>{props.clinic.distance ? props.clinic.distance : "-"} km</span>
                                </div>
                            </div>
                            <div>
                                <span className='serviceDentalCard '>
                                    {
                                        props.clinic.appointment_types && props.clinic.appointment_types.length > 0 ?
                                            props.clinic.appointment_types.map((service) => (
                                                <>{service.service + ","}</>
                                            ))
                                            :
                                            "-"
                                    }
                                </span>
                            </div>

                            <div style={{ paddingTop: "10px" }}>
                                <Row style={{ lineHeight: "2" }}>
                                    <EnvironmentOutlined />
                                    <span style={{ marginLeft: "15px", fontSize: "15px" }} >{props.clinic.city + "," + props.clinic.address}</span>
                                </Row>
                                <Row style={{ lineHeight: "2" }}>
                                    <PhoneOutlined />
                                    <span style={{ marginLeft: "15px", fontSize: "15px" }} >{props.clinic.phone}</span>
                                </Row>
                            </div>
                        </div>
                    </Row>

                    <Row type='flex' justify="space-between">
                        <Col>
                            <Row type='flex'
                                align="middle"
                                style={{
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Row style={{ fontSize: "14px", lineHeight: "2" }}>
                                    <Col>
                                        <span style={{ fontSize: "36px", fontWeight: "bold", lineHeight: "2" }}>
                                            {props.clinic && props.clinic.rating && eval(props.clinic.rating).toFixed(1)}
                                        </span>        / 5
                                    </Col>
                                </Row>


                                <Row style={{ textAlign: "center" }}>

                                    <Row style={{ lineHeight: "0" }} className='rate-parent'>
                                        <Rate style={{ fontSize: "25px" }} disabled={true} value={props.clinic && props.clinic.rating && eval(props.clinic.rating).toFixed(1)} />
                                    </Row>



                                </Row>
                                <Row style={{ lineHeight: "3", fontSize: "11px", color: "#999" }}>{props.clinic.number_of_votes ? props.clinic.number_of_votes : "0"} {" "}   Reviews </Row>
                            </Row>
                        </Col>
                        <Col>
                            <Row>

                                <div className={props.windowDimensions.width > 750 ? 'gallary-container-card' : "gallary-container-card-mobile-size"}>

                                    <Row type='flex'>
                                        {/* <Gallery photos={photos} className="gallery-images" /> */}
                                        <Col>

                                            <Row>
                                                <img src={photos[1] ? photos[1] : ImagePlaceHolder} alt="img" width={90} height={50} className='img-radious' />
                                            </Row>
                                            <Row>
                                                <img src={photos[2] ? photos[2] : ImagePlaceHolder} alt="img" width={90} height={50} style={{ paddingTop: "5px" }} className='img-radious' />
                                            </Row>
                                            <Row>
                                                <img src={photos[3] ? photos[3] : ImagePlaceHolder} alt="img" width={90} height={50} style={{ paddingTop: "5px" }} className='img-radious' />
                                            </Row>
                                        </Col>
                                        <Col style={{ marginLeft: "5px" }}>
                                            <img src={photos[0] ? photos[0] : ImagePlaceHolder} alt="img" width={200} height={150} className='img-radious' />
                                        </Col>

                                    </Row>



                                </div>
                            </Row>
                        </Col>
                    </Row>


                </Col>

                <Col span={10} >
                    <Row type="flex" justify="space-between" align="middle">
                        <span style={{ fontWeight: "bold" }}>
                            Request Appointment for :{" "}
                        </span>
                        <Select
                            filterOption={(input, option) => option.props.children}
                            mode="single"
                            //onChange={handleSelectAppointment}
                            className="select-filter-type app-type-selector"
                            value={selectedAppointment ? selectedAppointment == "-1" ? "consult" : selectedAppointment : ""}
                            placeholder="Select Appointment"
                            defaultValue='consult'
                            onChange={handleChangeSelectedAppointment}
                        >
                            {props.clinic.appointment_types &&
                                props.clinic.appointment_types.length > 0 &&
                                props.clinic.appointment_types.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.service}
                                    </Option>
                                ))}
                        </Select>
                    </Row>
                    <Row>
                        <div style={{ overflow: "auto", lineHeight: "1", width: "100%" }}>
                            {props.clinic.appointments.map((item) => (
                                <SelectProviderCardModal
                                    provider={item}
                                    handleCheckProvider={handleCheckProvider}
                                    checkTime={selectedProviderTime}
                                    check={selectedProvider}
                                />
                            ))
                                .slice(0, 3)}
                        </div>
                    </Row>
                    <Row type="flex" justify="end">
                        <button
                            onClick={openModal}
                            style={{
                                minWidth: props.windowDimensions.width > 750 ? "100%" : "150px",
                                fontWeight: "bold",
                                fontSize: "14px",
                                marginTop: "18px"

                            }}
                            className='book-clinic-button-card'>
                            Requset appointment
                        </button>

                    </Row>

                </Col>
            </Row >

            <LightBox
                title="Booking"
                visible={visible}
                footer={null}
                onCancel={() => {
                    setVisible(false)
                }}
            >
                {
                    bookingStep == 2 ?
                        <div className="card-membership-modal">
                            <RegistrationFormModal
                                clinicID={props.clinic.id}
                                backToStep1={backToStep1}
                                providerID={selectedProvider}
                                onSubmitRegistrationStep={onSubmitRegistrationStep}
                            />
                        </div>
                        :
                        bookingStep == 3 ?
                            <div className="card-membership-modal">
                                <Row type="flex" justify="center">
                                    <h3>Thank you!</h3>
                                    <div className="success-message-appointment">
                                        Your dental appointment information has been sent to your email.
                                    </div>
                                    <Button type="primary" key="console" onClick={backToStep1}>
                                        Close
                                    </Button>
                                </Row>
                            </div>
                            :
                            <></>
                }
            </LightBox>
        </React.Fragment >
    )
}

export default ClinicCard;