import React from "react";
import {
    Row,
    Col,
    Button
} from "antd"


// import components
import NewDashboardLayout from "./component/NewDashboardLayout"
import MaintainHealth from "./component/MaintainHealth"
import OutstandingTreatments from "./component/OutstandingTreatments"
import DashboardCardPercent from "./component/DashboardCardPercent";
import DashboardCardDollor from "./component/DashboardCardDollor";
import AppointmentCardProvider from "./component/AppointmentCardProvider";
import PendingPaymentCard from "./component/PendingPaymentCard";

// import images
import providerImage from "./assets/img/imgo4.jpg"

const HomeNew = () => {
    return (
        <NewDashboardLayout>
            <Row type="flex" justify={"space-between"}>
                <Col span={15} style={{ paddingRight: "25px" }} >
                    <div className="new-cards">
                        <Row>
                            <Col span={12} className="pr5 temp-class-padding" style={{ paddingRight: "12px" }}>
                                <DashboardCardPercent
                                    title={"Oral health"}
                                    subTitle={"Improve your score"}
                                />
                            </Col>
                            <Col span={12} className="pl5 temp-class-padding">
                                <DashboardCardPercent
                                    title={"Preventative Care"}
                                    subTitle={"Improve your score"}
                                />
                            </Col>
                        </Row>
                        <Row className="mt7">
                            <Col span={12} className="pr5 temp-class-padding" style={{ paddingRight: "12px" }}>
                                <DashboardCardDollor
                                    title={"Rewards Points"}
                                    subTitle={"450"}
                                    footerText=
                                    {
                                        <span>
                                            Get <b> +50 </b> Points now
                                        </span>
                                    }
                                />
                            </Col>
                            <Col span={12} className="pl5 temp-class-padding">
                                <DashboardCardDollor
                                    title={"Outstanding Balance"}
                                    subTitle={"$4,500"}
                                    footerText=
                                    {
                                        <span>
                                            <b>(+$532)</b> than last month

                                        </span>
                                    }
                                />
                            </Col>
                        </Row>
                    </div>
                    <Row type="flex" justify={"space-between"} style={{ marginTop: "25px" }}>
                        <p className="textHeaderNewDashboard">Upcoming Appointments</p>
                        <Button className="detail-button-new-home">
                            Details
                        </Button>
                    </Row>
                    <Row>

                        <AppointmentCardProvider
                            img={providerImage}
                            provderName={"Dr. Wick"}
                            appointmentType={"Consult"}
                            providerRating={"4.6"}
                            time={"11:00 AM"}
                            day={"Jan 1"}
                            location={"Main st"}
                        />

                        <AppointmentCardProvider
                            img={providerImage}
                            provderName={"Dr. Wick"}
                            appointmentType={"Consult"}
                            providerRating={"4.6"}
                            time={"11:00 AM"}
                            day={"Jan 1"}
                            location={"Main st"}
                        />

                        <AppointmentCardProvider
                            img={providerImage}
                            provderName={"Dr. Wick"}
                            appointmentType={"Consult"}
                            providerRating={"4.6"}
                            time={"11:00 AM"}
                            day={"Jan 1"}
                            location={"Main st"}
                        />
                    </Row>
                    <Row type="flex" justify={"space-between"} style={{ marginTop: "25px" }}>
                        <p className="textHeaderNewDashboard">Pending Payments</p>
                        <Button className="detail-button-new-home">
                            Details
                        </Button>
                    </Row>
                    <Row type="flex" justify={"space-between"} style={{ marginTop: "25px" }}>

                        <PendingPaymentCard
                            title={"Invisalign Payment Plan"}
                            startDate={"2023/12/12"}
                            endDate={"2024/12/12"}
                            amount={"17.98$"}
                        />
                        <PendingPaymentCard
                            title={"Invisalign Payment Plan"}
                            startDate={"2023/12/12"}
                            endDate={"2024/12/12"}
                            amount={"17.98$"}
                        />
                        <PendingPaymentCard
                            title={"Invisalign Payment Plan"}
                            startDate={"2023/12/12"}
                            endDate={"2024/12/12"}
                            amount={"17.98$"}
                        />
                        <PendingPaymentCard
                            title={"Invisalign Payment Plan"}
                            startDate={"2023/12/12"}
                            endDate={"2024/12/12"}
                            amount={"17.98$"}
                        />

                    </Row>
                </Col>
                <Col span={9} >
                    <div className="new-cards" style={{ padding: "30px" }}>
                        <p className="textHeaderNewDashboard">Maintaining Your Health</p>
                        <MaintainHealth />

                        <p className="textHeaderNewDashboard mt15">Outstanding Treatments</p>
                        <OutstandingTreatments />
                    </div>
                </Col>
            </Row>
        </NewDashboardLayout>
    )
}

export default HomeNew;