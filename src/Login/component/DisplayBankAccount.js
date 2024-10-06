import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Input, Spin, Button, Modal } from 'antd';
import { controllerAccount } from "../../controllerAccount";
import moment from "moment";
// icon
import VisaIcon from "../assets/icon/Visa_Logo.png"

const DisplayBankAccount = (props) => {
    const [data, setData] = useState([])

    const getBankData = async () => {
        const response = await controllerAccount.getListBanks()
        console.log(response)
        setData(response.bank_list[0])
    }

    const handleNext = async () => {
        // my code
        props.ChangeModeToInvite()
    }


    useEffect(() => {
        getBankData()
    }, [])

    return (
        <>
            <p style={{ fontSize: "20px", fontWeight: "500" }} className='mtb'>Bank Account for Your Office</p>
            <div className='box-onboarding-text' style={{ padding: "20px 30px" }}>

                <Row style={{display: 'flex', alignItems: 'center'}}>
                    <Col>
                        <img height={16} width={50} src={VisaIcon} alt="visa" />
                    </Col>
                    <span className='card-box-text-title-onboarding'>{data.bank_name}</span>
                </Row>
                <Row style={{ fontSize: "12px" }}>
                    Funding Source: <span className='card-box-text-title-onboarding' style={{ fontSize: "12px" }}>{data.fundingsource_name}</span>
                </Row>
                <Row justify="space-between">
                    <Col>
                        <Row style={{ fontSize: "12px", lineHeight: "30px" }}>
                            Funding-ID:
                        </Row>
                        <Row style={{ fontSize: "12px", lineHeight: "30px" }}>
                            <span className='card-box-text-title-onboarding' style={{ fontSize: "12px", marginLeft: "0px" }}>{data.funding_id}</span>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{ fontSize: "12px", lineHeight: "30px" }}>
                            Created:
                        </Row>
                        <Row style={{ fontSize: "12px", lineHeight: "30px" }}>
                            <span className='card-box-text-title-onboarding' style={{ fontSize: "12px", marginLeft: "0px" }}>{moment(data.created).format('YYYY/MM/DD  hh:mm:ss ')}</span>
                        </Row>
                    </Col>
                </Row>
            </div>

            <Button onClick={handleNext} className='login-button' style={{marginTop: 40}}>
                Next
            </Button>

        </>
    );
};

export default DisplayBankAccount;
