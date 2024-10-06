import {
    Col,
    Row
} from "antd";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Map, Marker, TileLayer } from 'react-leaflet';
import config from "../config";
import Clinic1 from "./Assets/clinic1.png";
import locationIcon from './Assets/location-new.png';
import ClinicInformationCard from "./Component/ClinicInformationCard";
import ClinicInformationCardRightMobile from "./Component/ClinicInformationCardRightMobile";
import ClinicService from "./Component/ClinicService";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import MembershipPart from "./Component/MembershipPart";
import PatientReview from "./Component/PatientReview";
import ProviderPart from "./Component/ProviderPart";
import { Controller } from "./Controller/Controller";
import ImagePlaceHolder from "./Assets/placeholder.png"
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

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
            setPosition([props.clinic.latitude, props.clinic.longitude]);
        }
    }, [props]);

    return (
        <Map center={position} zoom={13} style={{ height: '200px', width: '100%' }}>
            <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <Marker position={position} icon={customIcon} />
        </Map>
    );
}

const ClinicProfile = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [data, setData] = useState({});
    const [photos, setPhotos] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [isMembershipFixed, setIsMembershipFixed] = useState(false);

    const membershipPartRef = useRef(null);
    const footerRef = useRef(null);


    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };


    const getClinicData = async () => {
        const response = await Controller.getClinicData(
            window.location.hash.split("/")[window.location.hash.split("/").length - 1]
        );

        const myPhoto = [];
        if (response.featured_images && response.featured_images.length > 0) {
            for (var i in response.featured_images) {
                var img = response.featured_images[i];
                myPhoto.push({
                    src: config.apiGateway.URL + img.path,
                    width: 1,
                    height: 3
                });

            }
        }
        setPhotos(myPhoto);

        setData(response);
    };

    useEffect(() => {
        getClinicData();
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        // function handleScroll() {
        //     const membershipPart = membershipPartRef.current;
        //     const footerPart = footerRef.current;
        //     console.log("footerPart", footerPart.getBoundingClientRect())
        //     if (footerRef) {
        //         const rect = membershipPart.getBoundingClientRect();
        //         const rectFooter = footerPart.getBoundingClientRect();

        //         if (rectFooter.top < 255) {
        //             setIsMembershipFixed("stickBottom");
        //         } else {
        //             if (rect.top < -255) {
        //                 setIsMembershipFixed(true);
        //             } else {
        //                 setIsMembershipFixed(false);
        //             }
        //         }
        //     }
        // }

        // window.addEventListener('resize', handleResize);
        // window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            // window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="clinic-page">
            <div className={windowDimensions.width > 958 ? "main-clinic-profile" : "main-clinic-profile-small"}>
                <div className="container-clinic-page">
                    <Header />
                </div>
                <div>
                    <ClinicInformationCard clinic={data} windowDimensions={windowDimensions} />
                </div>
                <div>
                    <Row>
                        <div
                            className={`clinic-infoCard `}
                            style={{ backgroundColor: "white", marginBottom: "25px" }}
                            ref={membershipPartRef}
                        >
                            <Row type="flex" justify="space-between" style={{ alignItems: "center" }}>
                                <Col span={windowDimensions.width > 958 ? 13 : 24}>
                                    <div style={{ maxHeight: "200px", overflow: "auto" }}>
                                        <Row>

                                            <div className={windowDimensions.width > 750 ? 'gallary-container-card' : "gallary-container-card-mobile-size"}>
                                                <Row type='flex' justify="space-between">

                                                    <Col span={11}>
                                                        <div>
                                                            <img src={data.featured_images && data.featured_images[0] && data.featured_images[0].image ? config.apiGateway.URL + data.featured_images[0].image : ImagePlaceHolder} alt="img" style={{ width: "-webkit-fill-available" }} className="img-radious" height={200} />
                                                        </div>
                                                    </Col>

                                                    <Col style={{ margin: "0px 10px" }} span={6}>
                                                        <div className="column-image-container">
                                                            <div className="overlay-image-watch-more">
                                                                <img src={data.featured_images && data.featured_images[0] && data.featured_images[0].image ? config.apiGateway.URL + data.featured_images[0].image : ImagePlaceHolder} alt="img" className="image-row-box" />
                                                            </div>
                                                            <div className="overlay-image-watch-more">
                                                                <img src={data.featured_images && data.featured_images[0] && data.featured_images[0].image ? config.apiGateway.URL + data.featured_images[0].image : ImagePlaceHolder} alt="img" className="image-row-box" />
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col span={6}>
                                                        <div className="column-image-container">
                                                            <div className="overlay-image-watch-more">
                                                                <img src={data.featured_images && data.featured_images[1] && data.featured_images[1].image ? config.apiGateway.URL + data.featured_images[1].image : ImagePlaceHolder} alt="img" className="image-row-box" />
                                                            </div>

                                                            <div class="overlay-image-watch-more overlay-last">
                                                                <img src={data.featured_images && data.featured_images[2] && data.featured_images[2].image ? config.apiGateway.URL + data.featured_images[2].image : ImagePlaceHolder} alt="img" className="image-row-box" />
                                                            </div>

                                                        </div>
                                                    </Col>


                                                </Row>



                                            </div>
                                        </Row>

                                        <ModalGateway>
                                            {viewerIsOpen ? (
                                                <Modal onClose={closeLightbox}>
                                                    <Carousel
                                                        currentIndex={currentImage}
                                                        views={photos.map(x => ({
                                                            ...x,
                                                            srcset: x.srcSet,
                                                            caption: x.title
                                                        }))}
                                                    />
                                                </Modal>
                                            ) : null}
                                        </ModalGateway>
                                    </div>
                                </Col>
                                {
                                    windowDimensions.width < 958 && (
                                        <ClinicInformationCardRightMobile windowDimensions={windowDimensions} />
                                    )
                                }

                                <Col span={windowDimensions.width > 958 ? 11 : 24} style={{ paddingLeft: windowDimensions.width > 958 ? "60px" : "" }}>
                                    <div style={{ paddingRight: "0px" }}>
                                        <LeafletMap clinic={data} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </div>
                <div>
                    <Row type="flex" justify="space-between">
                        <Col span={windowDimensions.width > 958 ? 13 : 24}>
                            <PatientReview clinic={data} />
                            <ProviderPart provider={data.providers ? data.providers : []} />
                            <div >
                                <Row type="flex">
                                    <ClinicService services={data.services ? data.services : []} />
                                </Row>
                            </div>

                        </Col>
                        <Col
                            span={windowDimensions.width < 958 ? 24 : 11}
                            style={{
                                paddingLeft: "60px",
                                // display: isMembershipFixed == "stickBottom" ? "flex" : "block",
                                // alignItems: isMembershipFixed == "stickBottom" ? "end" : "",
                                // marginBottom: isMembershipFixed == "stickBottom" ? "20px" : "",
                            }}
                        >

                            <MembershipPart clinic={data} />

                        </Col>
                    </Row>
                </div>

            </div>

            <div className="clinic-footer" >
                <Footer />
            </div>
        </div >
    );
}

export default ClinicProfile;
