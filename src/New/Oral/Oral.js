import React from "react";
import {
    Row,
    Col,
    Button,
    Typography
} from "antd"

// import components
import NewDashboardLayout from "../component/NewDashboardLayout"
import "./style.css"
import OralHealthCard from "./OralHealthCard"
import OralHealthCardSide from "./OralHealthCardSide"
import PreventativeCareCard from "./PreventativeCareCard"

// import images
import infoCircleIcon from "../assets/icon/info-circle.png"
import oralChart from "../assets/img/oral-chart.png"
import Occlusion from "../assets/icon/timer.png"
import PreventativeCareIcon from "../assets/icon/search-normal.png"
import DentalHealthIcon from "../assets/icon/crown.png"
import checkUpIcon from "../assets/icon/radar.png"
import CleaningIcon from "../assets/icon/wind-2.png"
import BrushIcon from "../assets/icon/magicpen.png"
import toothImage from "../assets/icon/5 az akhr 7.png"
import DrImg from "../assets/img/imgo4.jpg"
import starIcon from "../assets/icon/star.png"
import clockImg from "../assets/icon/clock-2.png"
import calImg from "../assets/icon/calendar-2.png"
import locationImg from "../assets/icon/location-2.png"
import GumHealth from "../assets/icon/blur.png"
import DounutChart from "../component/DonutChart"


const Oral = () => {
    return (
        <NewDashboardLayout>
            <Row type="flex" justify={"space-between"}>

                <p className="notice-text-treatment-plan">
                    <img src={infoCircleIcon} alt="info" width={40} />
                    <span className="ml10"> You have three treatments left, please book an appointment as soon as possible.
                        <span className="link-text"> view Details</span>
                    </span>
                </p>

            </Row>
            <Row>
                <div className="new-cards fullWidth100p" style={{ padding: "25px" }}>
                    <Typography style={{ fontSize: "24px", fontWeight: "500" }}>
                        Your Oral Health Score
                    </Typography>
                    <Typography style={{ fontSize: "12px", fontWeight: "400", color: "#979797" }}>
                        The state of the mouth, teeth and orofacial structures that enables individuals to perform essential functions such as eating, breathing and ...
                    </Typography>

                    <div className="mt5p">
                        <Row type="flex" justify={"space-between"}>
                            <Col style={{marginTop: 30}}>
                              <DounutChart />
                            </Col>
                            <Col span={14} style={{ width: "62%" }}>
                                <div class="square01">
                                    <div>
                                        <Row className="fullWidth100p mb10">
                                            <Col span={12}>
                                                <OralHealthCard
                                                    icon={Occlusion}
                                                    title={"Occlusion"}
                                                    subTitle={"The contact between teeth."}
                                                    number={40}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <OralHealthCard
                                                    icon={PreventativeCareIcon}
                                                    title={"Preventative Care"}
                                                    subTitle={"Combination of regular check-ups with developing good habits: brushing & ..."}
                                                    number={24}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <OralHealthCard
                                                    icon={DentalHealthIcon}
                                                    title={"Dental Health"}
                                                    subTitle={"A healthy mouth, free of infections, injuries and other problems with teeth and gums."}
                                                    number={69}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <OralHealthCard
                                                    icon={Occlusion}
                                                    title={"Gum & Bone Health"}
                                                    subTitle={"Healthy gums are pink and firm to the touch."}
                                                    number={85}
                                                />
                                            </Col>
                                        </Row>
                                    </div>

                                    <div class="triangle01">
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Row>
            <Row className="mt4p">
                <Typography style={{ fontSize: "20px", fontWeight: "400", marginLeft: "5px", marginBottom: "15px" }}>
                    Detailed Oral Health Report
                </Typography>
            </Row>
            <Row>
                <Col span={6} className="sideReeport">
                    <Row>
                        <OralHealthCardSide
                            icon={Occlusion}
                            title={"Gum & Bone Health"}
                            subTitle={"Healthy gums are pink and firm to the touch."}
                            number={85}
                        />
                    </Row>
                    <Row>
                        <OralHealthCardSide
                            icon={Occlusion}
                            title={"Gum & Bone Health"}
                            subTitle={"Healthy gums are pink and firm to the touch."}
                            number={85}
                        />
                    </Row>
                    <Row>
                        <OralHealthCardSide
                            icon={Occlusion}
                            title={"Gum & Bone Health"}
                            subTitle={"Healthy gums are pink and firm to the touch."}
                            number={85}
                        />
                    </Row>
                    <Row>
                        <OralHealthCardSide
                            icon={Occlusion}
                            title={"Gum & Bone Health"}
                            subTitle={"Healthy gums are pink and firm to the touch."}
                            number={85}
                        />
                    </Row>
                </Col>
                <Col span={18} className="mainReport mt5">
                    <div className="new-cards ">
                        <div className="insideNewCardsMainReport">
                            <Row>
                                <Col>
                                    <Row align={"middle"} type="flex">
                                        <img src={PreventativeCareIcon} alt="report-title" className="iconCardOralReport" />
                                        <div className="ml25">
                                            <div className="report-title-text">Preventative Care</div>
                                            <div className="report-subtitle-text">Combination of regular check-ups with developing good habits: brushing & ...</div>
                                        </div>
                                    </Row>


                                </Col>
                            </Row>
                            <Row>
                                <p className="mt10 card-title-of-section">
                                    What is Preventative Care:
                                </p>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <PreventativeCareCard
                                        icon={checkUpIcon}
                                        title="Check-ups"
                                        subTitle="Regular Check-ups"
                                        description="sdh jsh kshfskjhf skjh kjdfh khf skfskj skf sf akhfsk sbc kb djsb bkdkj."
                                    />
                                </Col>
                                <Col span={8}>
                                    <PreventativeCareCard
                                        icon={CleaningIcon}
                                        title="Cleanings"
                                        subTitle="Regular Cleanings"
                                        description="sdh jsh kshfskjhf skjh kjdfh khf skfskj skf sf akhfsk sbc kb djsb bkdkj."
                                    />
                                </Col>
                                <Col span={8}>
                                    <PreventativeCareCard
                                        icon={BrushIcon}
                                        title="Brushing & flossing"
                                        subTitle="Others"
                                        description="sdh jsh kshfskjhf skjh kjdfh khf skfskj skf sf akhfsk sbc kb djsb bkdkj."
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <p className="mt10 card-title-of-section">
                                    Recommended Actions:
                                </p>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div className="preventativeCareCard-container">
                                        <Row>
                                            <div className="preventativeCareCard">
                                                <Row>
                                                    <Col>
                                                        <Typography style={{ fontSize: "10px", fontWeight: "400" }}>
                                                            Related Treatment Plan
                                                        </Typography>
                                                    </Col>

                                                </Row>
                                                <Row className="mt10">

                                                    <Col>
                                                        <div className="tooth-image-container">
                                                            <img src={toothImage} alt="tooth" width={22} height={22} />
                                                        </div>
                                                    </Col>
                                                    <Col className="ml10">
                                                        <Row>
                                                            <p className="relatedTreatmentPlanCard">
                                                                Crown Tooth 15
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <p className="relatedTreatmentPlanCardSub">
                                                                Procedure Code: 858585
                                                            </p>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Button className="bookTreatmentBtn">
                                                        Book Appointment
                                                    </Button>
                                                </Row>
                                            </div>
                                        </Row>
                                        <Row>

                                        </Row>

                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="preventativeCareCard-container">
                                        <Row>
                                            <div className="preventativeCareCard">
                                                <Row>
                                                    <Col>
                                                        <Typography style={{ fontSize: "10px", fontWeight: "400" }}>
                                                            Your Personal Task
                                                        </Typography>
                                                    </Col>

                                                </Row>
                                                <Row className="mt10">

                                                    <Col>
                                                        <div className="tooth-image-container">
                                                            <img src={toothImage} alt="tooth" width={22} height={22} />
                                                        </div>
                                                    </Col>
                                                    <Col className="ml10">
                                                        <Row>
                                                            <p className="relatedTreatmentPlanCard">
                                                                Flossing
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <p className="relatedTreatmentPlanCardSub">
                                                                Twice a day
                                                            </p>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Button className="bookTreatmentBtn">
                                                        Book Appointment
                                                    </Button>
                                                </Row>
                                            </div>
                                        </Row>
                                        <Row>

                                        </Row>

                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="preventativeCareCard-container">
                                        <Row>
                                            <div className="preventativeCareCard">
                                                <Row>
                                                    <Col>
                                                        <Typography style={{ fontSize: "10px", fontWeight: "400" }}>
                                                            Related Appointment
                                                        </Typography>
                                                    </Col>

                                                </Row>
                                                <Row className="mt10">

                                                    <Col>

                                                        <img src={DrImg} alt="tooth" width={40} height={40} className="providerAvatarRelatedBooking" />

                                                    </Col>
                                                    <Col className="ml10">
                                                        <Row>
                                                            <p className="relatedTreatmentPlanCard">
                                                                Dr Wick
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <p className="relatedTreatmentPlanCardSub">
                                                                <img src={starIcon} alt="star" width={10} height={10} />      <span className="ml2">4.6</span>
                                                            </p>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Typography style={{ color: "#6B43B5", fontWeight: "400", fontSize: "7px", marginTop: "17px" }}>
                                                        Appointment for: Consult
                                                    </Typography>
                                                </Row>
                                                <Row type="flex" justify={"space-between"} style={{ width: "100%" }}>
                                                    <Col>
                                                        <img src={clockImg} alt="clock" width={11} height={11} />         <span className="ml3 relatedProviderCardInfo">11:00 AM</span>
                                                    </Col>
                                                    <Col>
                                                        <img src={calImg} alt="calander" width={11} height={11} />     <span className="ml3 relatedProviderCardInfo">Jan 1</span>
                                                    </Col>
                                                    <Col>
                                                        <img src={locationImg} alt="location" width={8} height={9} />     <span className="ml3 relatedProviderCardInfo">Main ST</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Row>
                                        <Row>

                                        </Row>

                                    </div>
                                </Col>
                            </Row>
                            <Row>

                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </NewDashboardLayout>
    )
}

export default Oral;