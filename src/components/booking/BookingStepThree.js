import React, { Component } from "react";
import "../app.local.css";
import AppointmentCard from "../appointment/AppointmentCard";
import PoweredBy from "../CommonUi/PoweredBy";
import "./style.css";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

class BookingStepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      value: "implant",
      action: true,
      Logo: localStorage.getItem("Logo"),
      width: 0,
      height: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div>
        <div className="dashboard-container">
          <div
            className="pageBody"
            style={
              this.state.width > 720
                ? { width: "700px " }
                : { maxWidth: "700px " }
            }
          >
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
              <span className="appointmentStep">
                Preferred Appointment Time
              </span>
            </div>
            <div className="decorLine mt15"></div>
            <div className="body">
              <div className="stepCards">
                <AppointmentCard props={this.props} />
                <button
                  className="backBtn"
                  onClick={() => {
                    this.props.onSubmitStepThree("reject");
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
        <PoweredBy />
      </div>
    );
  }
}

export default BookingStepThree
