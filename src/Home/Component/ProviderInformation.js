import React from "react";
import {
    Row,
    Col,
    Avatar
} from "antd";
import ProviderPlaceHolder from "../Assets/provider-place-holder.png"
import Star from "../Assets/star.png"
import config from "../../config";
import certificateProvider from "../Assets/certificate-provider.png";
import EduProvider from "../Assets/edj-provider.png";
const ProviderInformation = (props) => {
    return (
        <div>
            <Row type="flex" align="middle">
                <Avatar style={{ border: '3px solid #9176DC' }} src={props.data.image ? config.apiGateway.URL + props.data.image : ProviderPlaceHolder} size={250} />
                <div className="provider-right-profile">
                    <div className="provider-page-name">{props.data.name ? props.data.name : "-"}</div>
                    <div className="provider-page-speciality">
                        {props.data.specialty ? props.data.specialty : "-"}
                    </div>
                    <div className="provider-page-rating">
                        <img src={Star} alt="rating" className="mr5" /> {props.data.rating ? props.data.rating : "-"}

                    </div>
                </div>
            </Row>
            <Row type="flex" align="middle">
                <div>
                    <div className="provider-page-certificate">
                        <img src={certificateProvider} alt="cert" /> <span className="cert-item-proivder">CERTIFICATION</span>
                    </div>
                    <div className="mt10 provider-cert-info">
                        <div>
                            {props.data.cert ? props.data.cert : "-"}
                        </div>
                        <div>
                            {props.data.cert_date ? props.data.cert_date : "-"}
                        </div>
                    </div>

                </div>
                <div>
                    <div className="provider-edjucation-part">
                        <div className="provider-page-certificate">
                            <img src={EduProvider} alt="cert" /> <span className="cert-item-proivder">EDUCATION</span>
                        </div>
                        <div className="mt10 provider-cert-info">
                            <div>
                                {props.data.education ? props.data.education : "-"}
                            </div>
                            <div>
                                {props.data.university_name ? props.data.university_name : "-"}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="provider-page-edu"></div>
            </Row>

            <Row>
                <div>
                    <p className="provider-part-title">About</p>
                    <p className="provider-part-sub-title">You can read the biography of this doctor in this section and learn more about it</p>
                    <div className="provider-about">
                        {props.data.info}
                    </div>
                </div>
            </Row>

        </div>
    )
}

export default ProviderInformation;