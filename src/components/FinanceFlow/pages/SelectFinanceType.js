import React, { useState } from "react";
import PoweredBy from "../../CommonUi/PoweredBy";
import { Space, Radio, Card, Steps } from "antd";
import { FinanaceController } from "../controller/FinanaceController";
import "../style.css";
const { Step } = Steps;

const SelectFinanceType = ({
  handleDonePaymentPlant,
  handleDoneGove,
  handleDoneProvate,
  handleDoneStage,
  handleBackStage,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(1);

  const handleBack = () => {
    handleBackStage(true);
  };

  const handleNext = async () => {
    setLoading(true);

    const data = {
      patient: localStorage.getItem("patient_id"),
      finance_type: selectedItem,
    };
    if (selectedItem == "private_insurance") {
      handleDoneProvate();
      return 0;
    }
    if (selectedItem == "government_insurance") {
      handleDoneGove();
      return 0;
    }
    if (selectedItem == "payment_plan") {
      handleDonePaymentPlant();
      return 0;
    }

    const response = await FinanaceController.SelectFinanceType(data);
    if (response.status < 250) {
      handleDoneStage(true);
    } else {
      handleDoneStage(true);
    }
    setLoading(false);
  };

  const getFinanceType = async () => {
    const response = await FinanaceController.getFinanceType();
    setFinanceType(response.data);
  };

  const [financeType, setFinanceType] = useState([]);

  return (
    <React.Fragment>
      <div className="dashboard-container">
        <div className="pageBody wizard-page">
          <div className="page-header">
            <div className="title pageHeader">
              <div className="bookcLogo"></div>
            </div>
            <span className="appointmentStep financeflow_fwb">
              POC Payments & Insurance
            </span>
            <span className="appointmentStep financeflow_plan">
              Select Plan
            </span>
          </div>
          <Steps size="small" className="financeflow_step" current={0}>
            <Step title="" />
            <Step title="" />
            <Step title="" />
          </Steps>
          <div className="financeflow_mr15 financeflow_ml15">
            <div className="decorLine financeflow_mt15"></div>
            <div className="body">
              <div className="stepCards">
                <Card className="financeflow_mb25  ">
                  <div className="financeflow_db">
                    <p>I'm looking for</p>
                    <Radio.Group
                      name="provider_specialty"
                      value={selectedItem}
                      onChange={(e) => {
                        setSelectedItem(e.target.value);
                        localStorage.setItem("finance_type", e.target.value);
                      }}
                    >
                      <Space
                        direction="vertical"
                        className="fs25"
                        align={"start"}
                      >
                        <Radio value="membership_plans">Membership Plan</Radio>
                        <Radio value="payment_plan">
                          {"Payment Plan (0% APR)"}
                        </Radio>
                        <Radio value="private_insurance">
                          Private Insurance Plan
                        </Radio>
                        <Radio value="government_insurance">
                          Public Insurance Plan
                        </Radio>
                        <Radio value="ai">
                          Not sure? Use our AI-powered Search Tool
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                </Card>
                <button
                  className="stepBtn financeflow_w100"
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
    </React.Fragment>
  );
};

export default SelectFinanceType;
