import {
    Avatar,
    Rate,
    Row
} from "antd";
import React, { useEffect, useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import config from "../../config";
import ReviewIconDown from "../Assets/quote-down.png";
import ReviewIcon from "../Assets/quote-up.png";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
const ReviewCarousel = ({ reviews }) => {
    const carouselRef = useRef(null);

    return (
        reviews && reviews.length > 0 ?
            <div>
                <div>
                    <AliceCarousel
                        ref={carouselRef}
                        autoPlay
                        autoPlayInterval={3000}
                        disableDotsControls
                        infinite
                    >

                        {reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <div>
                                    <img src={ReviewIcon} alt="icon" width={24} height={24} />
                                </div>
                                <div>
                                    <span className="score-review-number">{review.score}</span> / 5

                                </div>
                                <div className="score-review-card rate-parent">
                                    <Rate value={review.score} disabled={true} />
                                </div>
                                <div>
                                    <span className="review-count">
                                        0 Reviews
                                    </span>
                                </div>
                                <div className="review-content">
                                    <p>{review.note} </p>
                                    {/* <div className="review-author">{review.patient_name}</div> */}
                                </div>
                                <Row type="flex" style={{ alignItems: "center" }}>
                                    <div>
                                        <Avatar size={32} src={config.apiGateway.URL + review.image} />
                                    </div>
                                    <div className='ml5'>
                                        <span>{review.provider_name}</span>
                                    </div>

                                </Row>
                                <div className="mt25">
                                    <img src={ReviewIconDown} alt="icon" width={24} height={24} />
                                </div>
                            </div>
                        ))}
                    </AliceCarousel>
                </div>
            </div >
            :
            <>
                There isn't any review
            </>

    );
};



const PatientReview = (props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [data, setData] = useState(props);

    useEffect(() => {
        if (props && props.clinic && props.clinic.most_recent_reviews)
            setData(props.clinic.most_recent_reviews)
    }, [props])


    useEffect(() => {

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div>
            <Row>
                <span className='profile-clinic-section-title'>
                    Patient reviews
                </span>
            </Row>
            <Row>
                <span className='profile-clinic-section-subtitle'>
                    All reviews have been submitted by patients after seeing the provider.
                </span>
            </Row>
            <div className='card-membership'>
                <div>
                    <ReviewCarousel reviews={data} />
                </div>

            </div>

        </div>

    )
}

export default PatientReview;