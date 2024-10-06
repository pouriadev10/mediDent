import React, { Component } from "react";
import "../app.local.css";
import "./style.css";
import DentistCard from "../dentist/DentistCard";
import PoweredBy from "../CommonUi/PoweredBy";

class BookingStepOne extends Component {
  state = {
    activeStep: 0,
    value: "implant",
    action: true,
    Logo: localStorage.getItem("Logo"),
  };

  render() {
    return (
      <div>
        <div className="dashboard-container">
          <div className="pageBody">
            <div className="page-header">
              <div className="title pageHeader">
                {this.state.Logo ? (
                  <img
                    className="bookcLogo w150 h50"
                    src={this.state.Logo + ""}
                    alt="Logo"
                  />
                ) : (
                  <></>
                )}
              </div>
              <span className="appointmentStep">Select your provider </span>
            </div>
            <div>
              <div className="body">
                <div className="stepCards">
                  <div className="stepCards mt15">
                    <div className="db">
                      <DentistCard props={this.props} />
                    </div>
                    <button
                      className="backBtn"
                      onClick={() => {
                        this.props.onSubmitStepTwo("reject");
                      }}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PoweredBy />
      </div>
    );
  }
}

export default BookingStepOne
