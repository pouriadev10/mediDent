import React, { Component } from "react";
import logo_c_white from "../../assets/img/logo-bookc-blue.png";
import "../app.local.css";
import "./style.css";
 import { withRouter } from "react-router-dom";
import Logo from "../../assets/img/logo-bookc-blue.png";
import { notification, Input, Tooltip,Button } from "antd";
import {  EyeOutlined,EyeInvisibleOutlined,ClockCircleOutlined} from "@ant-design/icons";
import { controller } from "../../controller";
import { Error } from "../../ErrorHandeling";
class ResetConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: "",
      password2: "",
      type: "password",
      show: "Show",
      showIcon: "eye",
      showMargin: "12px",
      forgetPassModal: false,
      sendingData: false,
      formErrors: {
        new_password1: {
          massage: "",
          status: true,
        },
        new_password2: {
          massage: "",
          status: true,
        },
      },
    };
    this.clearLocalStorages();
    this.handleChange = this.handleChange.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  clearLocalStorages = () => {
    localStorage.clear();
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

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ sendingData: true });
    const { password1, password2 } = this.state;
    const password1_validation = await Error.PasswordHandling(password1);
    const password2_validation = await Error.PasswordHandling(password2);
    var location1 = window.location.href.split("/");
    if (password1_validation.status && password2_validation.status) {
      this.setState({
        formErrors: {
          new_password1: {
            status: true,
            massage: "",
          },
          new_password2: {
            status: true,
            massage: "",
          },
        },
      });
      const response = await controller.resetConfirm(
        password1,
        password2,
        location1[location1.length - 2],
        location1[location1.length - 1]
      );
      if (response.status < 250) {
        this.setState({ forgetPassModal: false, email: "" });
        this.openNotification(
          "bottom",
          JSON.stringify(response.detail),
          "Successful"
        );
        window.location.href = "/";
      } else {
        this.openNotification(
          "bottom",
          response.detail
            ? response.detail
            : response.token
              ? response.token
              : "",
          "Error"
        );
        this.setState({
          forgetPassModal: false,
          email: "",
          formErrors: {
            new_password1: {
              massage: response.new_password1 ? response.new_password1[0] : "",
              status: response.new_password1 ? false : true,
            },
            new_password2: {
              massage: response.new_password2 ? response.new_password2[0] : "",
              status: response.new_password2 ? false : true,
            },
          },
        });
      }
      this.setState({ sendingData: false });
    } else {
      this.setState({
        formErrors: {
          new_password1: password1_validation,
          new_password2: password2_validation,
        },
        sendingData: false,
      });
    }
    this.setState({ sendingData: false });
  };

  handleShowPassword() {
    if (this.state.show === "Show") {
      this.setState({
        ...this.state,
        show: "Hide",
        type: "text",
        showIcon: "eye-invisible",
        showMargin: "18px",
      });
    } else {
      this.setState({
        ...this.state,
        show: "Show",
        type: "password",
        showIcon: "eye",
        showMargin: "12px",
      });
    }
  }
  render() {
    return (
      <div className="container login-container">
        <div className="leftSide">
          <div className="login-box">
            <div className="content">
              <img alt="logo" className="loginLogo" src={Logo} />
              <div>
                <label className="inputLabel">
                  Password
                  <label className="showHide" onClick={this.handleShowPassword}>
                    <Tooltip title="show">
                    {this.state.showIcon==='eye'? <EyeOutlined
                        style={{ color: "#7A08FA", verticalAlign: "0" }}
                      />: <EyeInvisibleOutlined
                      style={{ color: "#7A08FA", verticalAlign: "0" }}
                    />}
                    </Tooltip>
                    <span
                      className="show"
                      style={{
                        color: "#7A08FA",
                        marginLeft: this.state.showMargin,
                      }}
                    >
                      {this.state.show}
                    </span>
                  </label>
                </label>
                <Input
                  className={
                    this.state.formErrors &&
                      this.state.formErrors.new_password1 &&
                      this.state.formErrors.new_password1.massage == ""
                      ? "inputs"
                      : "inputs-error"
                  }
                  onChange={this.handleChange}
                  name="password1"
                  type={this.state.type}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  prefix={
                    <ClockCircleOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                {this.state.formErrors &&
                  this.state.formErrors.new_password1 &&
                  this.state.formErrors.new_password1.massage == "" ? (
                  <div className="error-text-empty"></div>
                ) : (
                  <div className="error-text">
                    {this.state.formErrors.new_password1.massage}
                  </div>
                )}
                <label className="inputLabel">
                  Confirm Password
                  <label className="showHide" onClick={this.handleShowPassword}>
                  <Tooltip title="show">
                    {this.state.showIcon==='eye'? <EyeOutlined
                        style={{ color: "#7A08FA", verticalAlign: "0" }}
                      />: <EyeInvisibleOutlined
                      style={{ color: "#7A08FA", verticalAlign: "0" }}
                    />}
                    </Tooltip>
                    <span
                      className="show"
                      style={{
                        color: "#7A08FA",
                        marginLeft: this.state.showMargin,
                      }}
                    >
                      {this.state.show}
                    </span>
                  </label>
                </label>
                <Input
                  className={
                    this.state.formErrors &&
                      this.state.formErrors.new_password2 &&
                      this.state.formErrors.new_password2.massage == ""
                      ? "inputs"
                      : "inputs-error"
                  }
                  onChange={this.handleChange}
                  name="password2"
                  type={this.state.type}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  prefix={
                    <ClockCircleOutlined  style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                {this.state.formErrors &&
                  this.state.formErrors.new_password2 &&
                  this.state.formErrors.new_password2.massage == "" ? (
                  <div className="error-text-empty"></div>
                ) : (
                  <div className="error-text">
                    {this.state.formErrors.new_password2.massage}
                  </div>
                )}
                <br />
                <div className="btn-container text-center">
                  <Button
                    onClick={this.handleSubmit}
                    className="login-btn w100p cw "
                    type="primary" size="large"
                    disabled={this.state.sendingData}
                  >
                    {!this.state.sendingData ? "Send" : "Sending ..."}
                  </Button>
                </div>
                <span className="copyRight">
                  2019 All Rights Reserved by{" "}
                  <img
                    className="large-logo smilinLogoPowerdBy w52"
                    src={logo_c_white}
                  />
                  .
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="overlay"></div>
          <div className="text-wrapper">
            <div className="rows1">
              {/* <h2>Real-time Online Booking</h2> */}
            </div>
            <div className="rows2">
              {/* <h2>Online Payments and Collections</h2> */}
            </div>
            <div className="rows2">
              {/* <h2>Predictive Analytics</h2> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResetConfirm);
