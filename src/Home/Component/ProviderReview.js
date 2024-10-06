import React, { useEffect, useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ReviewIconDown from "../Assets/quote-down.png";
import ReviewIcon from "../Assets/quote-up.png";
import {
    Avatar,
    Rate,
} from "antd";
import config from "../../config";

const ReviewCarousel = ({ reviews }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    // Define your responsive setting according to the design
    const responsiveConfig = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 3 },
    };

    const handleSlideChanged = (e) => {
        setActiveIndex(e.item);
    };

    // Calculate the center index based on the responsiveConfig and window width
    const getCenterIndex = (current) => {
        const items = responsiveConfig[Object.keys(responsiveConfig).reverse().find(size => window.innerWidth >= size)];
        return current + Math.floor(items.items / 2);
    };

    // Generate the carousel items
    const carouselItems = reviews.map((review, index) => (
        <div
            key={index}
            className={`review-card ${index === getCenterIndex(activeIndex) ? 'review-card-center' : ''}`}
        >
            <div>
                <img src={ReviewIcon} alt="icon" width={index === getCenterIndex(activeIndex) ? 32 : 24} height={index === getCenterIndex(activeIndex) ? 32 : 24} />
            </div>
            <div>
                <span className={index === getCenterIndex(activeIndex) ? "score-review-number-center" : "score-review-number"}>{review.score}</span>
                <span className={index === getCenterIndex(activeIndex) ? "score-review-number-center-fix-number" : ""}>/ 5</span>
            </div>
            <div className="score-review-card rate-parent">
                <Rate className={index === getCenterIndex(activeIndex) ? "rate-center-card" : ""} value={review.score} disabled={true} />
            </div>
            <div>
                <span className={index === getCenterIndex(activeIndex) ? "review-count-center" : "review-count"}>

                </span>
            </div>
            <div className={index === getCenterIndex(activeIndex) ? "review-content-center" : "review-content"}>
                <p>{review.note} </p>
                {/* <div className="review-author">{review.patient_name}</div> */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <Avatar size={index === getCenterIndex(activeIndex) ? 45 : 32} src={config.apiGateway.URL + review.image} />
                </div>
                <div className='ml5'>
                    <span className={index === getCenterIndex(activeIndex) ? "provider-name-center" : ""}>{review.provider_name}</span>
                </div>


            </div>
            <div className="mt25">
                <img src={ReviewIconDown} alt="icon" width={index === getCenterIndex(activeIndex) ? 32 : 24} height={index === getCenterIndex(activeIndex) ? 32 : 24} />
            </div>
        </div>
    ));

    return (
        <div>
            {reviews.length > 0 ? (
                <AliceCarousel
                    mouseTracking
                    items={carouselItems}
                    responsive={responsiveConfig}
                    //autoPlay
                    autoPlayInterval={2000}
                    infinite
                    disableDotsControls
                    onSlideChanged={handleSlideChanged}
                    ref={carouselRef}
                />
            ) : (
                'There aren’t any reviews'
            )}
        </div>
    );
};



const ProviderReview = (props) => {
    return (
        <div>
            <div>
                <p className="provider-part-title">Patient reviews</p>
                <p className="provider-part-sub-title">All reviews have been submitted by patients after seeing the provider.</p>
                <div className="provider-reviews">
                    {
                        props.data && props.data.reviews && props.data.reviews.length > 0 ?
                            <ReviewCarousel reviews={props.data.reviews} />
                            :
                            <p>There are no reviews available for this provider.</p>
                    }

                </div>
            </div>
        </div>
    )
}

export default ProviderReview;