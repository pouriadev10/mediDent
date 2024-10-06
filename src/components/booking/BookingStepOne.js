import React, { Component } from "react";
import PropTypes from "prop-types";
import "../app.local.css";
import ChooseDentist from "../dentist/ChooseDentist";
import PoweredBy from "../CommonUi/PoweredBy";
import { appointmentController } from "../../appointmentController";
import { Spin } from "antd";
import "./style.css";

class BookingStepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      value: "implant",
      action: true,
      logo: "",
      mainLoading: true,
    };
    this.clearStorage();
    this.getLogo();
  }

  getLogo = async () => {
    const response = await appointmentController.get_logo(
      window.location.href.split("?selectedOffice=")[1]
    );
    this.setState({ logo: response.logo });
    localStorage.setItem("Logo", response.logo);
    setTimeout(() => {
      this.setState({ mainLoading: false });
    }, 500);
  };

  clearStorage = () => {
    localStorage.clear();
  };

  handleSelectedButton = (value) => {
    this.setState({ value });
    localStorage.setItem("booking-step-one", value);
  };

  render() {
    const appointmentType = this.state.value;
    return (
      <div>
        {this.state.mainLoading ? (
          <div className="booking_stepone-mainloading">
            <Spin
              spinning
              className="booking_mainloading-color"
              size={"large"}
            />
          </div>
        ) : (
          <>
            <div className="dashboard-container">
              <div className="pageBody">
                <div className="page-header">
                  <div className="title pageHeader">
                    {this.state.logo ? (
                      <img
                        className="bookcLogo logo"
                        src={this.state.logo}
                        alt="logo"
                      />
                    ) : (
                      <div className="bookcLogo"></div>
                    )}
                  </div>
                  <span className="appointmentStep">Appointments Type</span>
                </div>
                <div className="mr15 ml15">
                  <div className="body">
                    <div className="stepCards">
                      <ChooseDentist onSelect={this.handleSelectedButton} />
                      {localStorage.getItem("booking-step-one") ? (
                        <button
                          className="stepBtn"
                          onClick={() => {
                            if (localStorage.getItem("booking-step-one"))
                              this.props.onSubmitStepOne("done");
                          }}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          className="stepBtn"
                          disabled={!localStorage.getItem("booking-step-one")}
                          onClick={() => {
                            if (localStorage.getItem("booking-step-one"))
                              this.props.onSubmitStepOne("done");
                          }}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PoweredBy />
          </>
        )}
      </div>
    );
  }
}

BookingStepOne.propTypes = {
  classes: PropTypes.object,
};

export default BookingStepOne ;
