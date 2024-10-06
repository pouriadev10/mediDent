import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticationActions } from "../../actions";
import "../app.local.css";
import "./style.css";

class DoneBooking extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(authenticationActions.logout());
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      birthDay: "",
      phoneNumber: "",
      logo: localStorage.getItem("Logo"),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
                  className="bookcLogo booking_logo"
                  src={this.state.logo}
                  alt="logo"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="body">
            <div className="summaryInfo">
              <span className="appointmentStep">
                Thank you. Your dental appointment information has been sent to
                your email at <br />
                {" " +
                  JSON.parse(localStorage.getItem("booking-step-four")).email}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    sendingLoginEmail,
    loginEmailSent,
    loggingIn,
    error,
  } = state.authentication;
  return {
    sendingLoginEmail,
    loginEmailSent,
    loggingIn,
    error,
  };
}

const connectedDoneBooking = connect(mapStateToProps)(DoneBooking);

export default connectedDoneBooking;
