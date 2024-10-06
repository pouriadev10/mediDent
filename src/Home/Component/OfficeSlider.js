import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import config from '../../config';
// Your images list


const OfficeSlider = (props) => {

    const [imageList, setImageList] = useState([])

    // Handler for rendering items
    const renderItems = () => {
        if (imageList && imageList.length > 0) {
            return imageList.map((item) => (
                <div key={item.id} className="item">
                    <img src={config.apiGateway.URL + item.image} alt={`Item ${item.id}`} className='provider-office-image-courseal' />
                </div>
            ));
        } else {
            return []
        }

    }

    const responsive = {
        0: { items: 1 },
    };



    useEffect(() => {
        if (props.data && props.data.office && props.data.office.images && props.data.office.images.length > 0) {
            console.log("props.data.office.images")
            console.log(props.data.office.images)
            setImageList(props.data.office.images)
        }

    }, [props])

    return (
        <div id="myUniqueCarousel">
            <AliceCarousel
                mouseTracking
                items={renderItems()}
                responsive={responsive}
                autoPlay
                autoPlayInterval={2000}
                infinite
                disableDotsControls
                disableButtonsControls={false}
                renderPrevButton={() => {
                    return <span style={{ color: "#6B43B5" }}>{"<"}</span>;
                }}
                renderNextButton={() => {
                    return <span style={{ color: "#6B43B5" }}>{">"}</span>;
                }}
            />
        </div>

    );
};

export default OfficeSlider;