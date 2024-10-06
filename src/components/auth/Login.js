import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { authenticationActions } from "../../actions";
import "../app.local.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { notification, Modal, Input, Tooltip, Button } from "antd";
import {
  EyeOutlined,
  ClockCircleOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { controller } from "../../controller";
import { Error } from "../../ErrorHandeling";
import config from "../../config";
import "./style.css";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.getLogo();
    if (this.props.match.params.action == "logout") {
      this.props.dispatch(authenticationActions.logout());
    } else if (this.props.loggedIn && !this.props.match.params.email) {
      this.props.dispatch(push(`/dashboard`));
    }

    this.state = {
      noOfficeModal: false,
      serverLogo: "",
      loginLoading: false,
      emailForgetPass: "",
      EmailForgetPass: {
        massage: "",
        status: true,
      },
      email: this.props.match.params.email,
      password: "",
      auth_nonce: "",
      submitted: false,
      forgot_password: false,
      resend_pin: false,
      type: "password",
      show: "Show",
      showIcon: "eye",
      showMargin: "12px",
      forgetPassModal: false,
      sendingData: false,
      formErrors: {
        Email: {
          massage: "",
          status: true,
        },

        Password: {
          massage: "",
          status: true,
        },
      },
    };

    this.getLogo = this.getLogo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resendPin = this.resendPin.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.getData = this.getData.bind(this);
  }

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
  };

  getData = async () => {
    const Config = {
      headers: {
        Authorization: localStorage.getItem("user")
          ? "Token " + JSON.parse(localStorage.getItem("user")).key
          : "",
      },
    };
    const response = await Axios.get(
      config.apiGateway.URL + `/clinics/selectoffice/`,
      Config
    );
    var chengedResponse = response.data;

    if (chengedResponse && chengedResponse.length > 0) {
      for (var i = 0; i < chengedResponse.length; i++)
        chengedResponse[i].office_id = chengedResponse[i].id;

      localStorage.setItem("office_ids", JSON.stringify(chengedResponse));
      localStorage.setItem(
        "selectedOffice",
        eval(JSON.stringify(chengedResponse[0].office_id))
      );
      localStorage.setItem(
        "selectedOfficeName",
        eval(JSON.stringify(chengedResponse[0].office_name))
      );
      return response;
    } else {
      this.setState({
        noOfficeModal: true,
      });
      localStorage.clear();

      return [];
    }
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

  showModalForgetPass = () => {
    this.setState({
      formErrors: {
        Email: {
          massage: "",
          status: true,
        },
        Password: {
          massage: "",
          status: true,
        },
      },
    });
    this.setState({ forgetPassModal: true });
  };

  closeModalForgetPass = () => {
    this.setState({
      forgetPassModal: false,
      formErrors: {
        Email: {
          massage: "",
          status: true,
        },
        Password: {
          massage: "",
          status: true,
        },
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ submitted: true, loginLoading: true });

    const { email, password } = this.state;

    const email_validation = await Error.EmailHandling(email);
    const password_validation = await Error.PasswordHandling(password);

    if (email_validation.status && password_validation.status) {
      this.setState({
        formErrors: {
          Email: {
            massage: "",
            status: true,
          },
          Password: {
            massage: "",
            status: true,
          },
        },
      });
      const response = await controller.Login(email, password);
      if (response.status < 250) {
        localStorage.setItem("user", JSON.stringify(response));
        this.openNotification("bottom", "Login was successful", "Successful");
        const res = await this.getData();
        if (res && res.data && res.data.length > 0) window.location.href = "/";
      } else {
        this.openNotification("bottom", response.detail, "Error");
        this.setState({
          loginLoading: false,
          formErrors: {
            Email: {
              massage: response.email ? response.email[0] : "",
              status: response.email ? false : true,
            },
            Password: {
              massage: response.password ? response.password[0] : "",
              status: response.password ? false : true,
            },
          },
        });
      }
    } else {
      this.setState({ loginLoading: false });
      this.setState({
        formErrors: {
          Email: email_validation,
          Password: password_validation,
        },
      });
    }
  };

  handleSubmitForgetPass = async (e) => {
    e.preventDefault();

    this.setState({
      sendingData: true,
      EmailForgetPass: {
        massage: "",
        status: true,
      },
    });
    const { emailForgetPass } = this.state;
    const email = emailForgetPass;
    const email_validation = await Error.EmailHandling(email);
    if (email_validation.status) {
      const response = await controller.passwordReset(email);
      if (response.status < 250) {
        this.setState({
          forgetPassModal: false,
          emailForgetPass: "",

          EmailForgetPass: {
            massage: "",
            status: true,
          },
        });
        this.openNotification(
          "bottom",
          JSON.stringify(response.detail),
          "Successful"
        );
      } else {
        this.setState({
          EmailForgetPass: {
            massage: response.email ? response.email[0] : "",
            status: response.email ? false : true,
          },
        });

        this.openNotification(
          "bottom",
          JSON.stringify(
            response.detail ? JSON.stringify(response.detail) : response.message
          ),
          "Error"
        );
      }
    } else {
      this.setState({
        EmailForgetPass: {
          massage: email_validation.massage,
          status: email_validation.status,
        },
      });
    }

    this.setState({ sendingData: false });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  resendPin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ resend_pin: true });
    if (email && password)
      this.props.dispatch(
        authenticationActions.sendLoginEmail(email, password, true)
      );
    setTimeout(() => {
      this.setState({ resend_pin: false });
    }, 10000);
  }

  handleForgotPassword(e) {
    this.setState({ forgot_password: true });
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
    const {
      sendingLoginEmail,
      loginEmailSent,
      loggingIn,
      error,
      passwordResetEmailSent,
    } = this.props;

    const className =
      "content" +
      (error ||
        (this.state.submitted && (!this.state.email || !this.state.password))
        ? " login_errors_container"
        : "");
    const button_text = this.state.forgot_password
      ? "Reset Password"
      : sendingLoginEmail
        ? "Sending Login PIN"
        : loginEmailSent
          ? "Enter the PIN"
          : loggingIn
            ? "Go to Dashboard"
            : "LOG IN";
    return (
      <div className=" login-container">
        <div className="leftSide">
          <div className="login-box">
            <div className={className}>
              <div>
                <img className="loginLogo" src={this.state.serverLogo} />
                <form name="form" onSubmit={this.handleSubmit}>
                  <h3 className="loginHeader">
                    {!this.state.forgot_password
                      ? "Login to your account"
                      : "Forgot Password"}
                  </h3>
                  {!this.state.forgot_password ? (
                    <p className="auth_tal">
                      Need a Smilepass account?{" "}
                      <a className="createAccountLoginPage">Create an account</a>
                    </p>
                  ) : (
                    <></>
                  )}

                  {this.state.forgot_password && !passwordResetEmailSent && (
                    <div className="code-form">
                      <label className="inputLabel">Email</label>
                      <Input
                        onChange={this.handleChange}
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        prefix={
                          <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                      />
                    </div>
                  )}
                  {!loginEmailSent && !this.state.forgot_password && (
                    <div className="emailpass-form">
                      <div>
                        <label className="inputLabel">Email</label>
                        <Input
                          onChange={this.handleChange}
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="example@domain.com"
                          prefix={
                            <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                          }
                          size="large"
                          status={
                            this.state.formErrors &&
                              this.state.formErrors.Email &&
                              this.state.formErrors.Email.massage == ""
                              ? ""
                              : "error"
                          }
                        />
                        {this.state.formErrors &&
                          this.state.formErrors.Email &&
                          this.state.formErrors.Email.massage == "" ? (
                          <div className="error-text-empty"></div>
                        ) : (
                          <div className="error-text">
                            {this.state.formErrors.Email.massage}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="inputLabel" style={{ marginTop: "10px" }}>
                          Password
                          <label
                            className="showHide"
                            onClick={this.handleShowPassword}
                          >
                            <Tooltip title="show">
                              {this.state.showIcon === "eye" ? (
                                <EyeOutlined
                                  style={{ color: "#7A08FA", verticalAlign: "0" }}
                                />
                              ) : (
                                <EyeInvisibleOutlined
                                  style={{ color: "#7A08FA", verticalAlign: "0" }}
                                />
                              )}
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
                          onChange={this.handleChange}
                          name="password"
                          type={this.state.type}
                          autoComplete="current-password"
                          placeholder="Enter password"
                          prefix={
                            <ClockCircleOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          status={
                            this.state.formErrors &&
                              this.state.formErrors.Password &&
                              this.state.formErrors.Password.massage == ""
                              ? ""
                              : "error"
                          }
                          size="large"
                        />
                        {this.state.formErrors &&
                          this.state.formErrors.Password &&
                          this.state.formErrors.Password.massage == "" ? (
                          <div className="error-text-empty"></div>
                        ) : (
                          <div className="error-text">
                            {this.state.formErrors &&
                              this.state.formErrors.Password
                              ? this.state.formErrors.Password.massage
                              : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {!this.state.forgot_password || !passwordResetEmailSent ? (
                    <div className="btn-container">
                      <Button
                        style={{ width: "100%", color: "white" }}
                        size="large"
                        className="login-btn"
                        type="submit"
                        fullWidth
                        disabled={this.state.loginLoading}
                        onClick={this.handleSubmit}
                      >
                        {this.state.loginLoading
                          ? "Go To Dashboard ..."
                          : "Login"}
                      </Button>
                    </div>
                  ) : (
                    <p className="auth_check_email">
                      Check your email for password reset link.
                    </p>
                  )}
                </form>

                {loginEmailSent && (
                  <div className="mt52">
                    <span className="loginSubtitle">
                      {this.state.resend_pin && (
                        <div>
                          <p className="auth_pin">
                            A new PIN is sent to your email.
                          </p>
                          <p className="auth_pin-color">
                            You can request another new PIN from this page after 3
                            minutes
                          </p>
                        </div>
                      )}
                      {!this.state.resend_pin && (
                        <div>
                          <span>Problem receiving your code?</span>
                          <span
                            className="loginLink"
                            onClick={this.resendPin}
                            disabled={this.state.resend_pin}
                          >
                            Send again
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                )}
                {!this.state.forgot_password && !loginEmailSent && (
                  <span
                    className="forgotLink auth_cp"
                    onClick={this.showModalForgetPass}
                  >
                    Forgot Password?
                  </span>
                )}
              </div>
              <div>
                <span className="copyRight">
                  2023 All Rights Reserved by{" "}
                  <img
                    className="large-logo smilinLogoPowerdBy w52"
                    src={this.state.serverLogo}
                  />
                </span>
              </div>

            </div>
          </div>
        </div>
        <div className="rightSide">


        </div>

        <Modal
          centered
          title="No Office"
          visible={this.state.noOfficeModal}
          footer={null}
          onCancel={() => {
            this.setState({
              noOfficeModal: false,
            });
            localStorage.clear();
            window.location.reload();
          }}
        >
          <p> Ask smilepass admin too add your office then try again.</p>
        </Modal>

        <Modal
          title="Forget Password"
          visible={this.state.forgetPassModal}
          footer={null}
          onCancel={this.closeModalForgetPass}
        >
          <p>
            Enter your email and we'll send you a link to get back into your
            account.
          </p>
          <label className="inputLabel mt0">Email</label>
          <Input
            value={this.state.emailForgetPass}
            onChange={this.handleChange}
            className={
              this.state.EmailForgetPass &&
                this.state.EmailForgetPass.massage == ""
                ? ""
                : "inputs-error"
            }
            name="emailForgetPass"
            size="large"
            type="email"
            autoComplete="email"
            placeholder="example@domain.com"
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          {this.state.EmailForgetPass &&
            this.state.EmailForgetPass.massage == "" ? (
            <div className="error-text"> </div>
          ) : (
            <div className="error-text">
              {this.state.EmailForgetPass
                ? this.state.EmailForgetPass.massage
                : ""}
            </div>
          )}
          <br />

          <div className="btn-container text-center">
            <Button
              onClick={this.handleSubmitForgetPass}
              className="login-btn auth_w70p"
              type="submit"
              fullWidth
              disabled={this.state.sendingData}
              style={{ width: "100%", color: "white" }}
              size="large"
            >
              {!this.state.sendingData ? "Send" : "Sending ..."}
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    sendingLoginEmail,
    loginEmailSent,
    loggingIn,
    loggedIn,
    error,
    passwordResetEmailSent,
  } = state.authentication;
  return {
    sendingLoginEmail,
    loginEmailSent,
    loggingIn,
    loggedIn,
    error,
    passwordResetEmailSent,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);

export default withRouter(connectedLoginPage);
