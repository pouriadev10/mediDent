import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticationActions } from "../../actions";
import "../app.local.css";
import "./style.css";
import { Link } from "react-router-dom";
import { notification } from "antd";
import PoweredBy from "../CommonUi/PoweredBy";
import { appointmentController } from "../../appointmentController";
import { Error } from "../../ErrorHandeling";
import { Input, Card, DatePicker } from "antd";

class RegistrationStep extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(authenticationActions.logout());

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      birthDay: "",
      loading: false,
      phoneNumber: "",
      Logo: localStorage.getItem("Logo"),
      formError: {
        firstName: {
          massage: "",
          status: true,
        },
        lastName: {
          massage: "",
          status: true,
        },
        birthDay: {
          massage: "",
          status: true,
        },
        email: {
          massage: "",
          status: true,
        },
        phoneNumber: {
          massage: "",
          status: true,
        },
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  openNotification = (placement, message, status) => {
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
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      formError: {
        firstName: {
          massage: "",
          status: true,
        },
        lastName: {
          massage: "",
          status: true,
        },
        birthDay: {
          massage: "",
          status: true,
        },
        email: {
          massage: "",
          status: true,
        },
        phoneNumber: {
          massage: "",
          status: true,
        },
      },
    });
    const firstName_validation = await Error.NameHandling(this.state.firstName);
    const lastName_validation = await Error.NameHandling(this.state.lastName);
    const birthDay_validation = await Error.DateHandling(this.state.birthDay);
    const email_validation = await Error.EmailHandling(this.state.email);
    const phoneNumber_validation = await Error.NameHandling(
      this.state.phoneNumber.replace(/ /g, "")
    );

    if (
      firstName_validation.status &&
      lastName_validation.status &&
      birthDay_validation.status &&
      email_validation.status &&
      phoneNumber_validation.status
    ) {
      const response = await appointmentController.add_appointment_patient(
        window.location.href.split("?selectedOffice=")[1],
        this.state.firstName,
        this.state.lastName,
        this.state.birthDay,
        this.state.email,
        this.state.phoneNumber.replace(/ /g, ""),
        localStorage.getItem("booking-step-two")
      );
      if (response.status < 250) {
        this.setState({ loading: false });
        localStorage.setItem(
          "booking-step-four",
          JSON.stringify(response.data)
        );
        this.props.onSubmitStepFour("done");
      } else {
        this.setState({ loading: false });
        if (response.detail)
          this.openNotification(
            "bottom",
            JSON.stringify(response.detail),
            "Error"
          );
        else {
          this.setState({
            formError: {
              firstName: {
                massage: response.first_name ? response.first_name[0] : "",
                status: response.first_name ? false : true,
              },
              lastName: {
                massage: response.last_name ? response.last_name[0] : "",
                status: response.last_name ? false : true,
              },
              birthDay: {
                massage: response.birth_date ? response.birth_date[0] : "",
                status: response.birth_date ? false : true,
              },
              email: {
                massage: response.email ? response.email[0] : "",
                status: response.email ? false : true,
              },
              phoneNumber: {
                massage: response.phone ? response.phone[0] : "",
                status: response.phone ? false : true,
              },
            },
          });
        }
      }
    } else {
      this.setState({ loading: false });
      this.setState({
        formError: {
          firstName: {
            massage: firstName_validation.massage,
            status: firstName_validation.status,
          },
          lastName: {
            massage: lastName_validation.massage,
            status: lastName_validation.status,
          },
          birthDay: {
            massage: birthDay_validation.massage,
            status: birthDay_validation.status,
          },
          email: {
            massage: email_validation.massage,
            status: email_validation.status,
          },
          phoneNumber: {
            massage: phoneNumber_validation.massage,
            status: phoneNumber_validation.status,
          },
        },
      });
    }
    this.setState({ loading: false });
  };

  handleChange(name, e) {
    let { value } = e.target;
    if (name == "phoneNumber") {
      value = value.replace(/ /g, "");
      if (value.length < 10) {
        if (value.length == 8) {
          value = value.replace(/ /g, "");
          this.setState({
            phoneNumber:
              value.slice(0, 3) +
              " " +
              value.slice(3, 6) +
              " " +
              value.slice(6),
          });
        } else {
          value = value
            .replace(/[^\dA-Z]/g, "")
            .replace(/(.{3})/g, "$1 ")
            .trim();
          this.setState({ [name]: value });
        }
      }
      if (value.length == 10) {
        value =
          value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6);
        this.setState({ [name]: value });
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <div>
        <div className="dashboard-container">
          <div className="pageBody">
            <div className="page-header">
              <div className="title pageHeader">
                {this.state.Logo ? (
                  <img
                    className="bookcLogo auth_register-logo"
                    src={this.state.Logo + ""}
                    alt="Logo"
                  />
                ) : (
                  <></>
                )}
              </div>
              <span className="appointmentStep">Patient information</span>
            </div>
            <div>
              <div className="body">
                <div className="summaryInfo">
                  {" "}
                  <Card className="dentist_container">
                    <div>
                      <span className="appInfo p0 mb10">First Name</span>
                      <Input
                        status={
                          this.state.formError &&
                          this.state.formError.firstName &&
                          this.state.formError.firstName.status
                            ? ""
                            : "error"
                        }
                        placeholder="First Name"
                        onChange={(e) => this.handleChange("firstName", e)}
                        size="large"
                      />
                      <span className="appInfo p0 cr mt0">
                        {this.state.formError &&
                        this.state.formError.firstName &&
                        this.state.formError.firstName.status
                          ? ""
                          : this.state.formError.firstName.massage}
                      </span>
                    </div>
                    <div className="auth_mw300">
                      <span className="appInfo p0 mb10">Last Name</span>
                      <Input
                        status={
                          this.state.formError &&
                          this.state.formError.lastName &&
                          this.state.formError.lastName.status
                            ? ""
                            : "error"
                        }
                        placeholder="Last Name"
                        onChange={(e) => this.handleChange("lastName", e)}
                        size="large"
                      />
                      <span className="appInfo p0 cr mt0">
                        {this.state.formError &&
                        this.state.formError.lastName &&
                        this.state.formError.lastName.status
                          ? ""
                          : this.state.formError.lastName.massage}
                      </span>
                    </div>
                    <div className="auth_mw300">
                      <span className="appInfo p0 mb10">Date of Birth</span>
                      <DatePicker
                        placeholder="Date of Birth"
                        status={
                          this.state.formError.birthDay.status ? "" : "error"
                        }
                        onChange={(value) => { 
                          this.setState({ ["birthDay"]: value });
                        }}
                        size="large"
                        className="w100p"
                      />
                      <span className="appInfo p0 cr mt0">
                        {this.state.formError &&
                        this.state.formError.birthDay &&
                        this.state.formError.birthDay.status
                          ? ""
                          : this.state.formError.birthDay.massage}
                      </span>
                    </div>
                    <div className="auth_mw300">
                      <span className="appInfo p0 mb10">Email</span>
                      <Input
                        status={
                          this.state.formError &&
                          this.state.formError.email &&
                          this.state.formError.email.status
                            ? ""
                            : "error"
                        }
                        placeholder="Email"
                        onChange={(e) => this.handleChange("email", e)}
                        size="large"
                      />
                      <span className="appInfo p0 cr mt0">
                        {this.state.formError &&
                        this.state.formError.email &&
                        this.state.formError.email.status
                          ? ""
                          : this.state.formError.email.massage}
                      </span>
                    </div>
                    <div className="auth_mw300">
                      <span className="appInfo p0 mb10">Phone Number</span>
                      <Input
                        onChange={(e) => this.handleChange("phoneNumber", e)}
                        size="large"
                        prefix="+1"
                        placeholder="Phone Number"
                        status={
                          this.state.formError &&
                          this.state.formError.phoneNumber &&
                          this.state.formError.phoneNumber.status
                            ? ""
                            : "error"
                        }
                      />
                      <span className="appInfo p0 cr mt0">
                        {this.state.formError &&
                        this.state.formError.phoneNumber &&
                        this.state.formError.phoneNumber.status
                          ? ""
                          : this.state.formError.phoneNumber.massage}
                      </span>
                    </div>
                  </Card>
                  <button
                    className="backBtn"
                    onClick={() => {
                      this.props.onSubmitStepFour("reject");
                    }}
                  >
                    Back
                  </button>
                  <Link
                    onClick={this.handleSubmit}
                    className="stepBtn mw100"
                    to={{
                      pathname: "/booking-summary",
                      search:
                        "?selectedOffice=" +
                        window.location.href.split("?selectedOffice=")[1],
                    }}
                  >
                    {this.state.loading ? "Loading..." : "Next"}
                  </Link>
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

function mapStateToProps(state) {
  const { sendingLoginEmail, loginEmailSent, loggingIn, error } =
    state.authentication;
  return {
    sendingLoginEmail,
    loginEmailSent,
    loggingIn,
    error,
  };
}

const connectedRegistrationStep = connect(mapStateToProps)(RegistrationStep);

export default connectedRegistrationStep;
