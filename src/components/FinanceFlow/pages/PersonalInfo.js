import React, { useEffect, useState } from "react";
import PoweredBy from "../../CommonUi/PoweredBy";
import { Input, Steps, Card, Col, Row } from "antd";

import { FinanaceController } from "../controller/FinanaceController";
import "../style.css";

const { Step } = Steps;

const PersonalInfo = ({ handleDoneStage, handleBackStage }) => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [error, setError] = useState({});

  const handleBack = () => {
    handleBackStage(true);
  };

  const handleNext = async () => {
    setLoading(true);
    const response = await FinanaceController.createPatient(inputData);
    if (response.status < 250) {
      if (response.data.patient_id) {
        localStorage.setItem("patient_id", response.data.patient_id);
      }
      handleDoneStage(true);
    } else {
      setError(response.data);
    }
    setLoading(false);
  };

  const handleChange = (type, e) => {
    setInputData({
      ...inputData,
      [type]: e.target.value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("patient_id")) {
      localStorage.removeItem("patient_id");
    }
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="pageBody">
          <div className="page-header wizard-page">
            <div className="title pageHeader">
              <div className="bookcLogo"></div>
            </div>
            <span className="appointmentStep" style={{ fontWeight: "bold" }}>
              POC Payments & Insurance
            </span>
            <span
              className="appointmentStep"
              style={{ fontSize: "10px", color: "#ccc" }}
            >
              Personal Information
            </span>
          </div>
          <Steps
            size="small"
            current={1}
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <Step title="" />
            <Step title="" />
            <Step title="" />
          </Steps>
          <div style={{ marginLeft: "15px", marginRight: "15px" }}>
            <div className="decorLine" style={{ marginTop: "15px" }}></div>
            <div className="body">
              <div className="stepCards">
                <Card style={{ marginBottom: "25px" }}>
                  <div style={{ display: "block" }}>
                    <Row type="flex" justify="space-between">
                      <Col span="11">
                        <span className="appInfo p0 mb10">First Name</span>
                        <Input
                          status={error.first_name ? "error" : ""}
                          placeholder="First Name"
                          onChange={(e) => handleChange("first_name", e)}
                          size="large"
                        />
                        <span className="appInfo p0 cr mt0">
                          {error.first_name ? error.first_name[0] : ""}
                        </span>
                      </Col>
                      <Col span="11">
                        <span className="appInfo p0 mb10">Last Name</span>
                        <Input
                          status={error.last_name ? "error" : ""}
                          placeholder="Last Name"
                          onChange={(e) => handleChange("last_name", e)}
                          size="large"
                        />
                        <span className="appInfo p0 cr mt0">
                          {error.last_name ? error.last_name[0] : ""}
                        </span>
                      </Col>
                    </Row>
                    <Row type="flex" justify="space-between">
                      <Col span="11">
                        <span className="appInfo p0 mb10 mt5">Email</span>
                        <Input
                          status={error.email ? "error" : ""}
                          onChange={(e) => handleChange("email", e)}
                          size="large"
                          placeholder="Example@email.com"
                        />
                        <span className="appInfo p0 cr mt0">
                          {error.email ? error.email[0] : ""}
                        </span>
                      </Col>
                      <Col span="11">
                        <span className="appInfo p0 mb10 mt5">
                          Phone Number
                        </span>
                        <Input
                          onChange={(e) => handleChange("phone", e)}
                          size="large"
                          prefix="+1"
                          placeholder="123456789"
                        />
                      </Col>
                    </Row>
                    <span className="appInfo p0 mb10 mt5">Address</span>
                    <Input
                      onChange={(e) => handleChange("address", e)}
                      size="large"
                      placeholder="Address"
                    />
                    <Row type="flex" justify="space-between">
                      <Col span="8">
                        <span className="appInfo p0 mb10 mt5">State</span>
                        <Input
                          onChange={(e) => handleChange("state", e)}
                          size="large"
                          placeholder="State"
                        />
                      </Col>
                      <Col span="8">
                        <span className="appInfo p0 mb10 mt5">City</span>
                        <Input
                          onChange={(e) => handleChange("city", e)}
                          size="large"
                          placeholder="City"
                        />
                      </Col>
                      <Col span="7">
                        <span className="appInfo p0 mb10 mt5">Zip Code</span>
                        <Input
                          onChange={(e) => handleChange("zip_code", e)}
                          size="large"
                          placeholder="Zip Code"
                        />
                      </Col>
                    </Row>
                  </div>
                </Card>
                <button className="backBtn" onClick={handleBack}>
                  Back
                </button>
                <button
                  className="stepBtn"
                  style={{ width: "100px" }}
                  onClick={loading ? "" : handleNext}
                >
                  {loading ? "Next..." : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PoweredBy />
    </>
  );
};

export default PersonalInfo;
