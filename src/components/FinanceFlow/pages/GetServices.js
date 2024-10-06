 import { Select, Steps, Card } from "antd";
import React, { useState, useEffect } from "react";
import { FinanaceController } from "../controller/FinanaceController";
import AppointmentCard from "./AppointmentCard";
import "../style.css";

const { Step } = Steps;
const { Option } = Select;

const GetServices = ({ handleBackStage, handleDoneStage }) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [stage, setStage] = useState(1);

  const submitTime = () => {
    handleDoneStage();
  };

  const handleBack = () => {
    if (stage == 2) {
      setStage(1);
    }
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

  const handleBackStages = () => {
    if (stage == 2) {
      setStage(1);
    }
  };

  useEffect(() => {
    getDataService();
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard-container">
        <div
          className="pageBody wizard-page"
          style={stage == 2 ? { width: "55%" } : {}}
        >
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
              {stage == 1 ? "Select Service" : "Appointment"}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Steps
              size="small"
              current={2}
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              <Step title="" />
              <Step title="" />
              <Step title="" />
            </Steps>
          </div>

          <div style={{ marginLeft: "15px", marginRight: "15px" }}>
            <div className="body">
              <div className="stepCards">
                <div className="decorLine" style={{ marginTop: "15px" }}></div>
                <div className="body">
                  <div className="stepCards">
                    {stage == 1 ? (
                      <React.Fragment>
                        <Card style={{ marginBottom: "25px", }}>
                          <div 
                            style={{ display: "block" }}
                          >
                            <>
                              <p style={{ marginTop: "15px" }}>
                                Select services :
                              </p>
                              <Select
                                showSearch
                                optionFilterProp="children"
                                placeholder="Please select"
                                filterOption={(input, option) =>
                                  option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                                mode="multiple"
                                style={{ width: "100%" }}
                              >
                                {services}
                              </Select>
                            </>
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
                      </React.Fragment>
                    ) : (
                      <AppointmentCard
                        submitTime={submitTime}
                        handleBackStages={handleBackStages}
                      />
                    )}
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

export default GetServices;
