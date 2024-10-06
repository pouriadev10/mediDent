import React, { useEffect } from "react";
import { Spin, Row } from "antd";
import "../style.css";

const SelectCard = ({ handleBackStage, handleDoneStage }) => {
  const closeLoadingPage = () => {
    setTimeout(() => {
      handleDoneStage();
    }, 10);
  };

  useEffect(() => {
    closeLoadingPage();
  }, []);

  return (
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
    </React.Fragment>
  );
};

export default SelectCard;
