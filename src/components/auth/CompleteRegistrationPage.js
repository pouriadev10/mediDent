import React, { Component } from "react";
import Logo from "../../assets/img/logo-bookc-blue.png";
import { Input, Tooltip, Button } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authenticationActions } from "../../actions";
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./style.css";

class CompleteRegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      newPassword: "",
      password: "",
      auth_nonce: "",
      submitted: false,
      type: "password",
      show: "Show",
      showIcon: "eye",
      showMargin: "12px",
      auth_pin: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { token, password } = this.state;

    if (token && password) {
      this.props.dispatch(authenticationActions.setPassword(token, password));
    } else {
      console.error("incomplete form");
    }
  }

  componentDidMount() {
    const token = this.props.location.search;
    this.setState({
      token,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

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
    const is_reset_password = this.props.location.search.includes("True");
    return (
      <div className="registrationBody">
        <div className="registrationBox">
          <img className="registrationLogo" src={Logo} />
          <form name="form" onSubmit={this.handleSubmit}>
            <h2 className="loginHeader auth_fw500">
              {is_reset_password ? "Reset Password" : "Complete Registration"}
            </h2>
            <div></div>
            <div className="emailpass-form">
              <div>
                <label className="registrationInputLabel">
                  New Password
                  <label
                    className="registrationShowHide"
                    onClick={this.handleShowPassword}
                  >
                    <Tooltip title="show">
                      {this.state.showIcon === "eye" ? (
                        <EyeOutlined
                          style={{ color: "#378b99", verticalAlign: "0" }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          style={{ color: "#378b99", verticalAlign: "0" }}
                        />
                      )}
                    </Tooltip>
                    <span
                      className="show"
                      style={{ marginLeft: this.state.showMargin }}
                    >
                      {this.state.show}
                    </span>
                  </label>
                </label>
                <Input
                  onChange={this.handleChange}
                  name="newPassword"
                  type={this.state.type}
                  placeholder="Enter new password"
                  prefix={
                    <ClockCircleOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              </div>

              <div>
                <label className="registrationInputLabel">
                  Confirm Password
                  <label
                    className="registrationShowHide"
                    onClick={this.handleShowPassword}
                  >
                    <Tooltip title="show">
                      {this.state.showIcon === "eye" ? (
                        <EyeOutlined
                          style={{ color: "#378b99", verticalAlign: "0" }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          style={{ color: "#378b99", verticalAlign: "0" }}
                        />
                      )}
                    </Tooltip>
                    <span
                      className="show"
                      style={{ marginLeft: this.state.showMargin }}
                    >
                      {this.state.show}
                    </span>
                  </label>
                </label>
                <Input
                  onChange={this.handleChange}
                  className=" mb46"
                  name="password"
                  type={this.state.type}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  prefix={
                    <ClockCircleOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              </div>
            </div>
            <div className="btn-container">
              <Button
                onClick={this.handleSubmit}
                style={{ width: "100%" }}
                type="primary"
                size={"large"}
              >
                Log in
              </Button>
            </div>
          </form>
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

const connectedCompleteRegistration = connect(mapStateToProps)(
  CompleteRegistrationPage
);

export default withRouter(connectedCompleteRegistration);
