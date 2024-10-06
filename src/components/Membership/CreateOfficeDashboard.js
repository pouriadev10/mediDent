import React, { useState, useEffect } from "react";
import { notification, Button, Card, Row, Input, Typography } from "antd";
import Axios from "axios";
import { Controller } from "./Controller/Controller";
import config from "../../config";
import "./style.css";

const { TextArea } = Input;
const { Title } = Typography;

const CreateOfficeDashboard = () => {

    const [categoery, setCategory] = useState([
        { "1": "cloud_computing" },
    ])

    const [office, setOffice] = useState({
        name: "",
        state: "",
        city: "",
        address: "",
        admin_email: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOffice({
            ...office,
            [name]: value
        })

    }

    const openNotification = (placement, message, status) => {
        if (status && status.toLowerCase().search("success") != -1) {
            notification.success({
                message: status,
                description: message,
                placement,
            });
        } else if (status && status.toLowerCase().search("error") != -1) {
            notification.error({
                message: status,
                description: message,
                placement,
            });
        } else {
            notification.info({
                message: status,
                description: message,
                placement,
            });
        }
    };

    const handleCreateOffice = async () => {
        const response = await Controller.CreateOffice(office);
        if (response.status < 250) {
            const resp = await Controller.GetFinishOnBoarding();
            if (resp.status < 250) {
                const resp2 = await Controller.getOnboardingStage();
                if (resp2.json.status == "complete") {
                    const reszzz = getData();
                    openNotification('bottom', "create successful", "Successful");
                }

            } else {
                openNotification('bottom', "create successful", "Error");
            }

        } else {
            openNotification('bottom', response.detail ? response.detail : "Error", "Error");
        }
    }

    const getData = async () => {
        const Config = {
            headers: {
                Authorization: localStorage.getItem("user") ? "Token " + JSON.parse(localStorage.getItem("user")).key : "",
            }
        }
        const response = await Axios.get(config.apiGateway.URL + `/clinics/selectoffice/`, Config);
        var chengedResponse = response.data;
        for (var i = 0; i < chengedResponse.length; i++)
            chengedResponse[i].office_id = chengedResponse[i].id

        localStorage.setItem("office_ids", JSON.stringify(chengedResponse))
        localStorage.setItem("selectedOffice", eval(JSON.stringify(chengedResponse[0].office_id)))
        localStorage.setItem("selectedOfficeName", eval(JSON.stringify(chengedResponse[0].office_name)))
        window.location.href = "/";
        return response

    }

    const getCategory = async () => {
        const response = await Controller.getAllCategoryBusiness()
        setCategory(response.json)
    }

    useEffect(() => {
        getCategory();
    }, [])

    return (
        <React.Fragment>
            <Row type="flex" justify="center">
            <Card className="createbusiness_container">
                    <Title level={2}>Create Office</Title>
                    <p>* You can add another offices later</p>
                    <div className="code-form">
                        <label className='inputLabel'>Name</label>
                        <Input
                            onChange={handleChange}
                            className="inputs"
                            name="name"
                            placeholder="Name of Your Office"
                            value={office.name}
                        />
                    </div>
                    <div className="code-form">
                        <label className='inputLabel'>State</label>
                        <Input
                            onChange={handleChange}
                            className="inputs"
                            name="state"
                            placeholder="State"
                            value={office.state}
                        />
                    </div>
                    <div className="code-form">
                        <label className='inputLabel'>City</label>
                        <Input
                            onChange={handleChange}
                            className="inputs"
                            name="city"
                            placeholder="City"
                            value={office.city}
                        />
                    </div>
                    <div className="code-form">
                        <label className='inputLabel'>Admin Email</label>
                        <Input rows={4}
                            type="email"
                            onChange={handleChange}
                            className="inputs"
                            name="admin_email"
                            placeholder="admin_email"
                            value={office.admin_email}
                        />

                    </div>
                    <div className="code-form">
                        <label className='inputLabel'>Address</label>
                        <TextArea rows={4}
                            onChange={handleChange}
                            className="inputs"
                            name="address"
                            placeholder="address"
                            value={office.address}
                        />

                    </div>


                    <div className="btnBox createbusiness_button-container">

                        <Button
                            onClick={handleCreateOffice}
                            type="primary" className="createbusiness_button">
                            Create
                        </Button>

                    </div>

                </Card>
            </Row>

        </React.Fragment>
    )
}

export default CreateOfficeDashboard;