import React, { useState } from "react";
import {
    Col,
    Row,
    Radio,
    Button,
    message
} from "antd"
import { controller } from "../controller";

import checkbox from '../../assets/icons/checkbox.svg';


const MultipleOffice = (props) => {
    const [value, setValue] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleNext = async () => {
        setLoading(true)
        localStorage.setItem("multipleOffice", value)
        var myData = {
            answer: "no"
        }
        if (value) {
            myData["answer"] = "yes"
        }
        const response = await controller.setMultipleOffice(myData)

        if (response.status < 250) {
            message.success("Done")
            props.readOnboardingStatus()
        }
        setLoading(false)
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <>
            <p className="login-title" style={{marginBottom: 10}}>Welcome</p>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <img src={checkbox} alt="" style={{marginRight: 7}} />
                <p style={{ fontSize: 20, marginTop: 13 }}>Your Account has been verified.🎉</p>
            </div>


            <p className="question-multiple-office">Do you have multiple Offices?</p>
            <Row justify={"space-between"} style={{ width: "70%" }}>
                <Radio.Group onChange={onChange} value={value} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Radio value={true} style={{ marginRight: 140 }}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Row>

            <Row className="mt5p">
                <Button loading={loading} className="login-button" onClick={handleNext}>
                    Next
                </Button>
            </Row>

        </>
    )
}

export default MultipleOffice;