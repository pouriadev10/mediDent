import React from "react";
import config from "../../config";
import { connect } from "react-redux";
import { dashboardActions } from "../../actions";
import {Button } from "antd";
import {
  StripeProvider,
  injectStripe,
  Elements,
  CardElement,
} from "react-stripe-elements";
import { apiService } from "../../_services";

import "./Checkout.css";

import { ReactComponent as Spinner } from "../../assets/img/loading-spinner.svg";

class _SplitForm extends React.Component {
  state = { resp_message: "", card_errors: "", is_paying: false };

  handleCardErrors = (card_dets) => {
    if (card_dets.error) {
      this.setState({ card_errors: card_dets.error.message, is_paying: false });
    } else {
      this.setState({ card_errors: "", is_paying: false });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ card_errors: "", resp_message: "", is_paying: true });
    return this.props.stripe.createToken({ type: "card" }).then((result) => {
      if (result.error) {
        return this.setState({
          card_errors: result.error.message,
          is_paying: false,
        });
      } else {
        apiService
          .post(`/billpay/payment/${this.props.uuid}/charge/`, {
            token: result.token.id,
          })
          .then((json) =>
            this.setState({ resp_message: json.status, is_paying: false })
          )
          .catch((error) => {
            this.setState({
              card_errors: "Sorry, we could not process your payment",
              is_paying: false,
            });
          });
      }
    });
  };

  render() {
    return (
      <div className="Checkout">
        {this.state.card_errors && (
          <p className="card_error">{this.state.card_errors}</p>
        )}
        {this.state.resp_message ? (
          <p className="payment-not-required-box Paid">
            Thank you for your payment
          </p>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <label>
              Card details
              <CardElement onChange={this.handleCardErrors} />
            </label>
            <Button
              type="primary" size="large"
              disabled={this.state.is_paying ? "disabled" : ""}
              onClick={this.handleSubmit} 
            >
              {this.state.is_paying ? "sending payment..." : "send payment"}
            </Button>
          </form>
        )}
      </div>
    );
  }
}
const SplitForm = injectStripe(_SplitForm);

class Checkout extends React.Component {
  state = {
    uuid: this.props.match.params.uuid,
    payment: {
      patient_name: "",
      reason: "",
      appointment_datetime: "",
      amount: "",
      pay_status: "",
      receipt_file: "",
    },
    clinic_logo: "",
  };

  componentDidMount() {
    this.props.dispatch(dashboardActions.fetchProfileSummary());
    apiService
      .get(`/billpay/payment/${this.state.uuid}/charge/`)
      .then((data) => {
        this.setState({
          payment: {
            patient_name: data.patient_name,
            reason: data.reason,
            appointment_datetime: data.appointment_datetime,
            amount: data.amount,
            pay_status: data.pay_status,
            receipt_file: data.receipt_file,
          },
          clinic_logo: config.mediaGateway.URL + data.logo,
        });
      })
      .catch((error) => {
        console.error("error in checkout page", error);
      });
  }

  render() {
    const {
      patient_name,
      reason,
      appointment_datetime,
      amount,
      pay_status,
      receipt_file,
    } = this.state.payment;

    const _date = new Date(appointment_datetime);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const processed_date = _date.toLocaleString("en-US", options);

    return (
      <div
        className={
          "paymentCardBody" + (!patient_name.length ? " is-loading" : "")
        }
      >
        <div className="loading-spinner">
          <Spinner />
        </div>
        <div className="form-container">
          {this.state.clinic_logo && (
            <img className="paymentCardLogo" src={this.state.clinic_logo} />
          )}
          <span className="paymentCardLabel">
            Send payment instantly and securely
          </span>
          <div className="paymentCardBox ha">
            <label className="paymentCardBoxLabel">Patient:</label>
            <span className="paymentCardBoxInfo">{patient_name}</span>
            <label className="paymentCardBoxLabel">Reason:</label>
            <span className="paymentCardBoxInfo">{reason}</span>
            <label className="paymentCardBoxLabel">Date:</label>
            <span className="paymentCardBoxInfo">{processed_date}</span>
            <label className="paymentCardBoxLabel">Amount:</label>
            <span 
              className="paymentCardBoxNumber mb20"
            >
              $ {amount}
            </span>
            {receipt_file && (
              <div>
                <label className="paymentCardBoxLabel">Invoice File:</label>
                <span className="paymentCardBoxNumber">
                  <a className="ci" href={receipt_file}>
                    Download
                  </a>
                </span>
              </div>
            )}
          </div>
          {pay_status == "Pending" && (
            <StripeProvider apiKey={config.stripe.key}>
              <Elements>
                <SplitForm uuid={this.props.match.params.uuid} />
              </Elements>
            </StripeProvider>
          )}
          {pay_status == "Canceled" && (
            <p className={"payment-not-required-box " + pay_status}>
              This request has been cancelled by the clinic
            </p>
          )}
          {pay_status == "Paid" && (
            <p className={"payment-not-required-box " + pay_status}>
              This request has already been paid
            </p>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { profileSummary } = state.dashboard;
  return {
    profileSummary,
  };
}

const connectedCheckout = connect(mapStateToProps)(Checkout);

export default connectedCheckout;
