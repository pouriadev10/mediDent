import React, { useEffect, useState } from "react";
import PoweredBy from "../../CommonUi/PoweredBy";
import { FinanaceController } from "../controller/FinanaceController";
 import {Spin, Col, Steps, Row, Button ,Card} from "antd";
import {LeftOutlined,CaretRightOutlined,RightOutlined,CheckOutlined} from "@ant-design/icons";
 import LogoDentalHouse from "../assets/logo-dentalhouse.png";
import config from "../../../config";
import insuranceImage from "../assets/default_insurance.png"
const { Step } = Steps;

const SelectCard = ({ handleBackStage, handleDoneStage }) => {

    function camelize(str) {
        str = str.replace("_", " ")
        str = str.split(" ");

        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
        var final = str.join(" ");
        if (final == "Membership Plans") {
            final = "Membership Plan"
        }
        if (final == "Memberships" || final == "Memberhsips") {
            final = "Membership Plan"
        }

        if (final == "Private Insurance" || final == "Private Insurence") {
            final = "Private Insurance Plan"
        }

        if (final == "Government Insurances") {
            final = "Public Insurance Plan"
        }

        return final;

    }

    const changeReadMore = () => {
        setReadMore(!readMore)
    }

    const [readMore, setReadMore] = useState(false)
    const [financeOptions, setFinanceOptions] = useState({})
    const [finances, setFinances] = useState([])

    const [loading, setLoading] = useState(true)

    const handleBack = () => {
        handleBackStage(true)
    }

    const handleNext = () => {
        handleDoneStage(true)
    }



    const getData = async () => {
        const response = await FinanaceController.getFinanceOptions();
        setFinanceOptions(response.data)
        var temp = []
        for (var i in response.data)
            temp.push(i)

        var a = temp[0]
        console.log(a)
        console.log(response.data)
        console.log(response.data.a)
        console.log(response.data[temp[0]])

        setFinances(temp)
        setLoading(false)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        loading ?
            <React.Fragment>

<Row
        type="flex"
        justify="center"
        align="middle"
        className="financeflow_loading"
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="financeflow_progresscontainer">
            <Spin spinning className="financeflow_progress" size="large" />
          </div>
          <h3 className="financeflow_search-color">
            Searching for the best plan
          </h3>
        </Row>
      </Row>

            </React.Fragment >
            :

            <React.Fragment>
                <div className='dashboard-container'>
                    <div className="pageBody wizard-page">
                        {/* <div className="page-header">
                            <div className="title pageHeader">
                                <div className='bookcLogo'></div>
                            </div>
                            <span className='appointmentStep' style={{ fontWeight: "bold" }}>POC Payments & Insurance</span>
                            <span className='appointmentStep' style={{ fontSize: "10px", color: "#ccc" }}>Select plan</span>

                        </div>
                        <Steps size="small" current={2} style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            <Step title="" />
                            <Step title="" />
                            <Step title="" />
                        </Steps> */}
                        <div style={{ marginLeft: "15px", marginRight: "15px" }}>

                            <div className='body'>
                                <div className="stepCards">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    finances.map((financeX) => (
                        <React.Fragment>
                            <h4 style={{ fontWeight: "bold", marginTop: "7%", marginRight: "10%", marginLeft: "10%", maxWidth: "80%", flexWrap: "nowrap" }}>{camelize(financeX)}</h4>
                            <Row type="flex" justify="space-between" className="contentMainPage" align="middle" style={{ marginTop: "0%", marginRight: "10%", marginLeft: "10%", maxWidth: "80%", flexWrap: "nowrap" }}>
                                <Button className="backArrowHolder" onClick={() => {
                                    document.getElementById('cardWrapper1' + financeX).scrollLeft -= 120;
                                }} >
                                  <LeftOutlined   style={{ color: "#A8A8A8", fontSize: '12px' }} />
                                </Button>

                                <Row id={"cardWrapper1" + financeX} className={"cardWrapper"}>
                                    {
                                        camelize(financeX) == "Private Insurance Plan" && (
                                            <>
                                                <Card bodyStyle={{padding:'0px'}} className="cardInMainCard">
                                                    <div className="cardInMainRowItem">
                                                        <Row type="flex" justify="center" >

                                                            <img alt="logo" className="cardInMainRowItemImage" src={insuranceImage} />
                                                        </Row>
                                                        <Row className="titlePlanCardItemRow">
                                                            <h4>{"Dental Basic"}</h4>

                                                        </Row>
                                                        <Row
                                                            style={{
                                                                justifyContent: "center",
                                                                display: "flex",
                                                                marginTop: "1%",
                                                            }}
                                                        >
                                                            <p className="describePlanCardItem">{"Comprehensive private dental insurance with extensive coverage for preventive, restorative, and cosm"}</p>
                                                        </Row>

                                                        <h6>Services</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                        </Col>

                                                        <h6>Recall Frequency</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span>
                                                                <CaretRightOutlined  className="card-item-finance" />	Year 1: $500 <br />
                                                                <CaretRightOutlined   className="card-item-finance" />	Year 2: $600 <br />
                                                                <CaretRightOutlined   className="card-item-finance" />    Year 3+: $700 per person per year <br />
                                                                </span>
                                                            </Row>
                                                        </Col><br />

                                                        <h6>Recall Frequency</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span><CaretRightOutlined  className="card-item-finance" />	{"6 months"}</span>
                                                            </Row>
                                                        </Col><br />

                                                        <h6>Coverage Details for Basic Services</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span>    <CaretRightOutlined className="card-item-finance" />	Year 1: Pays 80%, subject to annual maximum</span>
                                                                <span>    <CaretRightOutlined className="card-item-finance" />	Year 2+: Pays 90%, subject to annual maximum</span>
                                                            </Row>
                                                        </Col><br />
                                                        {!readMore && (<p onClick={changeReadMore} className="readmore-cart">{!readMore ? "Read more ..." : ""}</p>)}
                                                        {
                                                            readMore && (
                                                                <>

                                                                    <h6>Coverage Details Comprehensive Basic Services</h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />	Year 1: Pays 80%, subject to annual maximum</span>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" /> Year 2+: Pays 90%, subject to annual maximum</span>
                                                                        </Row>
                                                                    </Col><br />

                                                                    <h6>Coverage Details for Major Services</h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />Available in Year 3+: Pays 50%, subject to annual maximum</span>
                                                                        </Row>
                                                                    </Col><br />

                                                                    <h6>Coverage Details Orthodontic Services </h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />Available in Year 3+: Pays 50%, subject to overall annual dental maximum and $2,000 lifetime orthodontics maximum</span>
                                                                        </Row>
                                                                    </Col><br />
                                                                </>
                                                            )}
                                                        {readMore && (<p onClick={changeReadMore} className="readmore-cart">{readMore ? "Read Less" : ""}</p>)}
                                                        <Row type="flex" justify="center" className="buttonRowInCard">
                                                            <button className='detailBtn'
                                                            >
                                                                Detail
                                                            </button>
                                                            <button className='purchaseBtn'>
                                                                Purchase
                                                            </button>
                                                        </Row>
                                                    </div>

                                                    {/*<Row className="Decory"></Row>*/}
                                                </Card>

                                                <Card bodyStyle={{padding:'0px'}} className="cardInMainCard">
                                                    <div className="cardInMainRowItem">
                                                        <Row type="flex" justify="center" >

                                                            <img alt="logo" className="cardInMainRowItemImage" src={insuranceImage} />
                                                        </Row>
                                                        <Row className="titlePlanCardItemRow">
                                                            <h4>{"Dental Plus"}</h4>

                                                        </Row>
                                                        <Row
                                                            style={{
                                                                justifyContent: "center",
                                                                display: "flex",
                                                                marginTop: "1%",
                                                            }}
                                                        >
                                                            <p className="describePlanCardItem">{"Comprehensive private dental insurance with extensive coverage for preventive, restorative, and cosm"}</p>
                                                        </Row>

                                                        <h6>Services</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                        </Col>

                                                        <h6>Recall Frequency</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span>
                                                                    <CaretRightOutlined className="card-item-finance" />	Year 1: $1,000 <br />
                                                                    <CaretRightOutlined className="card-item-finance" />	Year 2: $1,200 <br />
                                                                    <CaretRightOutlined className="card-item-finance" />    Year 3+: $1,500 per person per year <br />
                                                                </span>
                                                            </Row>
                                                        </Col><br />

                                                        <h6>Recall Frequency</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span>    <CaretRightOutlined className="card-item-finance" />	{"6 months"}</span>
                                                            </Row>
                                                        </Col><br />

                                                        <h6>Coverage Details for Basic Services</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span>    <CaretRightOutlined className="card-item-finance" />	Year 1: Pays 80%, subject to annual maximum</span>
                                                                <span>    <CaretRightOutlined className="card-item-finance" />	Year 2+: Pays 90%, subject to annual maximum</span>
                                                            </Row>
                                                        </Col><br />

                                                        {!readMore && (<p onClick={changeReadMore} className="readmore-cart">{!readMore ? "Read more ..." : ""}</p>)}
                                                        {
                                                            readMore && (
                                                                <>
                                                                    <h6>Coverage Details Comprehensive Basic Services </h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />	Year 1: Pays 80%, subject to annual maximum</span>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" /> Year 2+: Pays 90%, subject to annual maximum</span>
                                                                        </Row>
                                                                    </Col><br />

                                                                    <h6>Coverage Details for Major Services</h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />Available in Year 3+: Pays 50%, subject to annual maximum</span>

                                                                        </Row>
                                                                    </Col><br />

                                                                    <h6>Coverage Details Orthodontic Services </h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />Available in Year 3+: Pays 50%, subject to overall annual dental maximum and $2,000 lifetime orthodontics maximum</span>
                                                                        </Row>
                                                                    </Col><br />
                                                                </>
                                                            )
                                                        }



                                                        {readMore && (<p onClick={changeReadMore} className="readmore-cart">{readMore ? "Read Less" : ""}</p>)}
                                                        <Row type="flex" justify="center" className="buttonRowInCard">
                                                            <button className='detailBtn'
                                                            >
                                                                Detail
                                                            </button>
                                                            <button className='purchaseBtn'>
                                                                Purchase
                                                            </button>
                                                        </Row>
                                                    </div>

                                                    {/*<Row className="Decory"></Row>*/}
                                                </Card>
                                                <Card bodyStyle={{padding:'0px'}} className="cardInMainCard">
                                                    <div className="cardInMainRowItem">
                                                        <Row type="flex" justify="center" >

                                                            <img alt="logo" className="cardInMainRowItemImage" src={insuranceImage} />
                                                        </Row>
                                                        <Row className="titlePlanCardItemRow">
                                                            <h4>{"Dental Pro"}</h4>

                                                        </Row>
                                                        <Row
                                                            style={{
                                                                justifyContent: "center",
                                                                display: "flex",
                                                                marginTop: "1%",
                                                            }}
                                                        >
                                                            <p className="describePlanCardItem">{"Comprehensive private dental insurance with extensive coverage for preventive, restorative, and cosm"}</p>
                                                        </Row>

                                                        <h6>Services</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                        </Col>
                                                        <h6>Recall Frequency</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span>
                                                                    <CaretRightOutlined className="card-item-finance" />	Year 1: $2,000 <br />
                                                                    <CaretRightOutlined className="card-item-finance" />	Year 2: $2,500 <br />
                                                                    <CaretRightOutlined className="card-item-finance" />    Year 3+: $5,000 per person per year <br />
                                                                </span>
                                                            </Row>
                                                        </Col><br />

                                                        <h6>Recall Frequency</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span>    <CaretRightOutlined className="card-item-finance" />	{"6 months"}</span>
                                                            </Row>
                                                        </Col><br />

                                                        <h6>Coverage Details for Basic Services</h6>
                                                        <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                            <Row type="flex" justify='space-between'>
                                                                <span>    <CaretRightOutlined className="card-item-finance" />	Year 1: Pays 80%, subject to annual maximum</span>
                                                                <span>    <CaretRightOutlined className="card-item-finance" />	Year 2+: Pays 90%, subject to annual maximum</span>
                                                            </Row>
                                                        </Col><br />
                                                        {!readMore && (<p onClick={changeReadMore} className="readmore-cart">{!readMore ? "Read more ..." : ""}</p>)}
                                                        {
                                                            readMore && (
                                                                <>
                                                                    <h6>Coverage Details Comprehensive Basic Services</h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />	Year 1: Pays 80%, subject to annual maximum</span>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" /> Year 2+: Pays 90%, subject to annual maximum</span>
                                                                        </Row>
                                                                    </Col><br />

                                                                    <h6>Coverage Details for Major Services</h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />Available in Year 3+: Pays 50%, subject to annual maximum</span>
                                                                        </Row>
                                                                    </Col><br />

                                                                    <h6>Coverage Details Orthodontic Services </h6>
                                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                                        <Row type="flex" justify='space-between'>
                                                                            <span>    <CaretRightOutlined className="card-item-finance" />Available in Year 3+: Pays 50%, subject to overall annual dental maximum and $2,000 lifetime orthodontics maximum</span>
                                                                        </Row>
                                                                    </Col><br />
                                                                </>
                                                            )}
                                                        {readMore && (<p onClick={changeReadMore} className="readmore-cart">{readMore ? "Read Less" : ""}</p>)}
                                                        <Row type="flex" justify="center" className="buttonRowInCard">
                                                            <button className='detailBtn'
                                                            >
                                                                Detail
                                                            </button>
                                                            <button className='purchaseBtn'>
                                                                Purchase
                                                            </button>
                                                        </Row>
                                                    </div>

                                                    {/*<Row className="Decory"></Row>*/}
                                                </Card>
                                            </>
                                        )
                                    }

                                    {
                                        financeOptions[financeX] && financeOptions[financeX].map((option) => (
                                            <Card bodyStyle={{padding:'0px'}} className="cardInMainCard">
                                                <div className="cardInMainRowItem">
                                                    <Row type="flex" justify="center" >

                                                        <img className="cardInMainRowItemImage" src={option.logo ? config.apiGateway.URL + option.logo : LogoDentalHouse} />
                                                    </Row>
                                                    <Row className="titlePlanCardItemRow">
                                                        <h4>{option.name}</h4>

                                                    </Row>
                                                    <Row
                                                        style={{
                                                            justifyContent: "center",
                                                            display: "flex",
                                                            marginTop: "1%",
                                                        }}
                                                    >
                                                        <p className="describePlanCardItem">{option.description ? option.description : "-"}</p>
                                                    </Row>
                                                    <Row type="flex" justify="center" align='bottom' style={{ alignItems: "baseline" }}>
                                                        <p style={{
                                                            fontSize: "2.3rem",
                                                            marginRight: "5px",
                                                            marginBottom: "0px"
                                                        }}>{" $ "}</p> <h1 style={{ marginBottom: "0px" }}>{option.cost ? option.cost : "-"}</h1>
                                                    </Row>
                                                    <h6>Services</h6>
                                                    <Col style={{ marginLeft: "5px", display: "grid" }}>
                                                        {
                                                            option.services && option.services.map((service) => (
                                                                <Row type="flex" justify='space-between'>
                                                                    <span><CheckOutlined   style={{ marginRight: "8px", fontSize: "12px", color: "#5d00fe" }} />{service.name}</span>
                                                                    <span style={{ marginRight: "8px" }} >x {" " + service.count}</span>
                                                                </Row>
                                                            ))
                                                        }
                                                    </Col>
                                                    <Row type="flex" justify="center" className="buttonRowInCard">
                                                        <button className='detailBtn'
                                                        >
                                                            Detail
                                                        </button>
                                                        <button className='purchaseBtn'>
                                                            Purchase
                                                        </button>
                                                    </Row>
                                                </div>

                                                {/*<Row className="Decory"></Row>*/}
                                            </Card>
                                        ))
                                    }

                                </Row>
                                <Button className="backArrowHolder" onClick={() => {
                                    document.getElementById('cardWrapper1' + financeX).scrollLeft += 120;
                                }}>
                                   <RightOutlined   style={{ color: "#A8A8A8", fontSize: '12px' }} />
                                </Button>
                            </Row>
                        </React.Fragment>

                    ))
                }



                <Row type="flex" justify="space-between" className="contentMainPage" align="middle" style={{ marginTop: "5%", marginRight: "10%", marginLeft: "10%", maxWidth: "80%", flexWrap: "nowrap" }}>
                    <p style={{
                        cursor: "pointer",
                        color: "#444"
                    }}
                        onClick={handleBack}>
                        {"<"} Back
                    </p>
                    <PoweredBy />
                    <div></div>
                </Row>

            </React.Fragment >
    )
}

export default SelectCard;
