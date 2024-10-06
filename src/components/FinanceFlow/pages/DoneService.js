import { Select, Steps, Card } from "antd";
import React, { useState, useEffect } from "react";
import { FinanaceController } from "../controller/FinanaceController";
import "../style.css";

const { Step } = Steps;
const { Option } = Select;

const DoneService = ({ handleBackStage, handleDoneStage }) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [stage, setStage] = useState(1);

  const handleBack = () => {
    handleBackStage(true);
  };

  const handleNext = () => {
    if (stage == 1) {
      setStage(2);
    }
    if (stage == 2) {
      handleDoneStage(true);
    }
  };

  const getDataService = async () => {
    const response = await FinanaceController.getServiceList();
    var temp = [];
    for (var i in response.data) {
      temp.push(
        <Option key={response.data[i].id}>{response.data[i].name}</Option>
      );
    }
    setServices(temp);
  };

  useEffect(() => {
    getDataService();
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard-container">
        <div className="pageBody wizard-page">
          <div className="page-header">
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
              Done
            </span>
          </div>
          <Steps
            size="small"
            current={3}
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <Step title="" />
            <Step title="" />
            <Step title="" />
          </Steps>
          <div style={{ marginLeft: "15px", marginRight: "15px" }}>
            <div className="body">
              <div className="stepCards">
                <div className="decorLine" style={{ marginTop: "15px" }}></div>
                <div className="body">
                  <div className="stepCards">
                    <Card style={{ marginBottom: "25px" }}>
                      <div style={{ display: "block" }}>
                        <span className="appointmentStep">
                          Thank you. Your dental appointment information has
                          been sent to your email.
                        </span>
                      </div>
                    </Card>
                    <button className="backBtn" onClick={handleBack}>
                      Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DoneService;
