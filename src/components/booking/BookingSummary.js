import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticationActions } from "../../actions";
import "../app.local.css";
import "./style.css";
import { notification, Select, Input, Card, Col, Row } from "antd";
import PoweredBy from "../CommonUi/PoweredBy";
import { withRouter } from "react-router-dom";
import { appointmentController } from "../../appointmentController";
import { Error } from "../../ErrorHandeling";

const { TextArea } = Input;

class RegistrationStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainLoading: false,
      paymentType: "myself",
      open: false,
      appointmentType: "",
      doctorName: "",
      day: "",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      birthDay: "",
      email: "",
      phoneNumber: "",
      comment: "",
      labelWidth: 120,
      logo: localStorage.getItem("Logo"),
      formError: {
        pay_methode: {
          status: true,
          massage: "",
        },
      },
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDropDown = (value) => {
    this.setState({ ["paymentType"]: value });
  };
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
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });

    if (this.state.auth_nonce) {
      const { email, password, auth_nonce } = this.state;

      if (email && password && auth_nonce) {
        this.props.dispatch(
          authenticationActions.login(email, password, auth_nonce)
        );
      } else {
        console.error("incomplete form");
      }
    } else {
      const { email, password } = this.state;

      if (email && password) {
        this.props.dispatch(
          authenticationActions.sendLoginEmail(email, password)
        );
      }
    }
  }
  handleInput = (event) => {
    this.setState({ ["comment"]: event.target.value });
  };
  handleRequest = async () => {
    this.setState({
      mainLoading: true,
      formError: {
        pay_methode: {
          status: true,
          massage: "",
        },
      },
    });

    const pay_methode_Validation = await Error.SelectItem(
      this.state.paymentType
    );

    if (pay_methode_Validation.status) {
      var office = window.location.href.split("?selectedOffice=")[1];
      var appointment_type = localStorage
        .getItem("booking-step-one")
        .split(" ")[0];
      var appointment_datetime = localStorage.getItem("booking-step-three");
      var time = localStorage
        .getItem("booking-step-three")
        .split("T")[1]
        .split("Z")[0];
      var provider = localStorage.getItem("booking-step-two");
      var patient = JSON.parse(localStorage.getItem("booking-step-four")).id;
      var comment = this.state.comment;
      var payment_metode = this.state.paymentType;
      const response = await appointmentController.set_appointment(
        office,
        appointment_type,
        appointment_datetime,
        time,
        provider,
        patient,
        comment,
        payment_metode
      );
      if (response.status < 250) {
        this.props.onSubmitStepFive("done");
      } else {
        this.openNotification(
          "bottom",
          response.appointment_datetime
            ? JSON.stringify(response.appointment_datetime[0])
            : JSON.stringify(response.detail[0]),
          "Error"
        );
      }
    } else {
      this.setState({
        formError: {
          pay_methode: {
            status: false,
            massage: pay_methode_Validation.massage,
          },
        },
      });
    }
    this.setState({ mainLoading: false });
  };

  componentDidMount() {
    let type = "";
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.appointmentType === "implant") {
        type = "Dental implant consult (30 min)";
      } else if (this.props.location.state.appointmentType === "Invisalign") {
        type = "Invisalign consult (30 min)";
      } else if (
        this.props.location.state.appointmentType === "adult-cleaning"
      ) {
        type = "New patient cleaning - Adult (60 min)";
      } else if (
        this.props.location.state.appointmentType === "child-cleaning"
      ) {
        type = "New patient cleaning – Child (60 min)";
      } else if (this.props.location.state.appointmentType === "adult-exam") {
        type = "New patient exam- Adult (30 min)";
      } else if (this.props.location.state.appointmentType === "child-exam") {
        type = "New patient exam- Child (30 min)";
      } else if (this.props.location.state.appointmentType === "emergency") {
        type = "Emergency/Tooth pain (30 min)";
      }
    }
    var phone_first = JSON.parse(
      localStorage.getItem("booking-step-four")
    ).phone;
    const strPhone =
      phone_first.substring(0, 3) +
      " " +
      phone_first.substring(3, 6) +
      " " +
      phone_first.substr(6);
    phone_first = "+1 " + strPhone;
    var doctorInfo = {};
    doctorInfo = JSON.parse(
      localStorage.getItem("booking-step-two-provider-info")
    );
    this.setState({
      appointmentType: localStorage
        .getItem("booking-step-one")
        .substring(localStorage.getItem("booking-step-one").indexOf(" ") + 1),
      doctorName:
        doctorInfo.specialty == "General Dentist"
          ? "Dr." + doctorInfo.name
          : doctorInfo.name,
      day: "1",
      date: "1",
      time: localStorage.getItem("booking-step-three"),
      firstName: JSON.parse(localStorage.getItem("booking-step-four"))
        .first_name,
      lastName: JSON.parse(localStorage.getItem("booking-step-four")).last_name,
      birthDay: JSON.parse(localStorage.getItem("booking-step-four"))
        .birth_date,
      email: JSON.parse(localStorage.getItem("booking-step-four")).email,
      phoneNumber: phone_first,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="pageBody">
          <div className="page-header">
            <div className="title pageHeader">
              {this.state.logo ? (
                <img
                  className="bookcLogo w150 h50"
                  src={this.state.logo}
                  alt="logo"
                />
              ) : (
                <></>
              )}
            </div>
            <span className="appointmentStep">Book Your Appointment</span>
          </div>
          <Row>
            <Col span={24}>
              <Card
                className="dentist_container"
                bodyStyle={{ padding: "0px" }}
              >
                <span className="appInfo">Provider</span>
                <span className="summaryDetails">{this.state.doctorName}</span>
                <span className="appInfo">Appointment</span>
                <span className="summaryDetails">
                  {this.state.time.replace("T", " ").replace("Z", "")}
                </span>
                <span className="appInfo">Reason for Visit</span>
                <span className="summaryDetails mb15">
                  {this.state.appointmentType}
                </span>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                className="dentist_container"
                bodyStyle={{ padding: "0px" }}
              >
                <span className="appInfo">Name</span>
                <span className="summaryDetails">
                  {this.state.firstName} {this.state.lastName}
                </span>
                <span className="appInfo">Date of Birth</span>
                <span className="summaryDetails">{this.state.birthDay}</span>
                <span className="appInfo">Email</span>
                <span className="summaryDetails">{this.state.email}</span>
                <span className="appInfo">Phone Number</span>
                <span className="summaryDetails mb15">
                  {this.state.phoneNumber}
                </span>
              </Card>
            </Col>{" "}
            <Col span={24}>
              <Card
                className="dentist_container"
                bodyStyle={{ padding: "0px 16px 16px 16px" }}
              >
                <form autoComplete="off">
                  <span className="appInfo p0 mb10">Payment Method</span>
                  <Select
                    size="large"
                    defaultValue="myself"
                    className="w100p"
                    options={[
                      { value: "myself", label: "I will pay myself" },
                      { value: "creditCard", label: "Visa/Credit" },
                      { value: "insurance", label: "Insurance" },
                    ]}
                    value={this.state.paymentType}
                    onChange={this.handleChangeDropDown}
                  />
                </form>
                <div className="mw315">
                  <span className="appInfo p0 mb10">Optional Message</span>

                  <TextArea
                    placeholder="Write your message"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    onChange={this.handleInput}
                  />
                </div>
              </Card>
              <button
                className="backBtn"
                onClick={() => {
                  this.props.onSubmitStepFive("reject");
                }}
              >
                Back
              </button>
              {this.state.mainLoading ? (
                <button className="stepBtn booking" disabled={true}>
                  Booking...
                </button>
              ) : (
                <button
                  className="stepBtn mw180"
                  onClick={() => this.handleRequest()}
                  disabled={false}
                >
                  Book Appointment
                </button>
              )}
            </Col>
          </Row>
          <PoweredBy />
        </div>
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

export default withRouter(connectedRegistrationStep);
