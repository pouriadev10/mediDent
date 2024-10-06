import React from "react";
import { Row, Col } from "antd";
const VideoPlayer = ({ videoUrl }) => {
    return (
        <div style={{ borderRadius: '8px', overflow: 'hidden', height:"150px" }}>
            <iframe
                title="videoPlayer"
                width="100%"
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

const PreventativeCareCard = (props) => {
    return (
        <div className="preventativeCareCard-container">
            <div className="preventativeCareCard">
                <Row>
                    <img src={props.icon} alt="checkup" width={50} height={50} />
                    <Row className="ml8" align={"middle"}>
                        <Col>
                            <p className="preventativeCareCardTitle">{props.title}</p>
                            <p className="preventativeCareCardSubTitle">{props.subTitle}</p>
                        </Col>

                    </Row>
                </Row>

                <Row className="mt10">
                    <p className="preventativeCareCardSubTitle">{props.description}</p>
                </Row>

                <Row className="mt10">
                    <VideoPlayer videoUrl="https://www.youtube.com/embed/wCio_xVlgQ0" />
                </Row>
            </div>
        </div>

    )
}

export default PreventativeCareCard;