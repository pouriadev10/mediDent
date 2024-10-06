import { Row, Progress } from "antd";
import React from "react";

const OralHealthCardSide = (props) => {
    return (
        <div className="oralSmallCardSidebar">
            <Row>
                <img width={30} src={props.icon} alt="OralHealth" className="iconCardOral" />
                <span className="titleOralCard">{props.title}</span>

            </Row>
            <div className="mt10">
                <p className="subTitleOralCard">{props.subTitle}</p>
            </div>
            <div>
                <div>
                    <Progress percent={props.number} />
                </div>
            </div>
        </div>
    )
}

export default OralHealthCardSide;