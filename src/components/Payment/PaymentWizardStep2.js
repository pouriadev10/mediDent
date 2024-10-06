import React, { Component } from 'react'
import '../app.local.css'
import { connect } from 'react-redux'
import { Row, Spin, notification, Modal, Input, Button, message } from 'antd'
import { Paymentcontroller } from '../../Paymentcontroller'
import App from "../stripeMulti/App"
import HelcimFormMulti from "./HelcimFormMulti"

const { TextArea } = Input;

class PaymentWizardStep2 extends Component {
  getPaymentType = async () => {
    const { selectedIntervalId } = this.props;
    if (selectedIntervalId) {
      const response = await Paymentcontroller.getPaymentProvider(selectedIntervalId);
      console.log('Payment Type for interval ID:', selectedIntervalId, 'is', response.provider);
      this.setState({
        paymentType: response.provider
      });
    } else {
      console.log("No interval ID provided");
    }
  }


  componentDidMount() {
    const intervalId = localStorage.getItem('interval Id'); // Assuming you store it in localStorage elsewhere
    this.setState({ intervalId: intervalId });
    this.processUrlParameters();
    this.getPaymentType();
    this.getPaymentData();
    this.props.provideGetPaymentData(this.getPaymentData);
  }

  componentDidUpdate(prevProps, prevState) {
    const currentIntervalId = localStorage.getItem('interval Id'); // Fixed the key name, should be consistent.

    if (this.props.selectedIntervalId !== prevProps.selectedIntervalId) {
      // This will only run if selectedIntervalId changes.
      this.getPaymentType();
    }

    if (this.props.selectedID !== prevProps.selectedID) {
      // This will only run if selectedID changes.
      this.getPaymentData();
      this.getPaymentType();
    }

    console.log(currentIntervalId)
    console.log(prevState.intervalId)

    if (currentIntervalId !== prevState.intervalId) {
      this.setState({ intervalId: currentIntervalId });
      this.getPaymentData();
    }



    if (this.state.visibleModalHelcim && !prevState.visibleModalHelcim) {
      // Only runs if visibleModalHelcim transitions from false to true.
      this.readHelcimData();
    }
  }

  processUrlParameters = () => {
    const params = new URLSearchParams(window.location.search);
    const responseMessage = params.get('responseMessage');
    const cardToken = params.get('cardToken');

    if (responseMessage === 'APPROVED') {
      this.handleApprovedCardByHelcim(cardToken);
    } else {
      this.setState({ loadingHelcimResultCheck: false });
    }

    // Clear URL parameters after processing without changing the URL
    // if (responseMessage || cardToken) {
    //   const newUrl = window.location.origin + window.location.pathname;
    //   window.history.replaceState({}, '', newUrl);
    // }

    // Prevent URL from changing when payment is approved
    if (responseMessage === 'APPROVED') {
      window.history.pushState({}, '', window.location.href);
    }
  };


  readHelcimData = async () => {
    // Extract the payment ID from the URL or use the one from props if not available in the URL
    const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
    const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
    const paymentId = match ? match[1] : localStorage.getItem("payid"); // If match is found use it, otherwise use props

    const response = await Paymentcontroller.getHelcimToken(paymentId);

    this.setState({
      helcimConfig: {
        customerCode: response["customerCode"],
        token: response["helcim js token"]
      },
      visibleModalHelcimOpenModal: true
    });
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
    let { name, value } = e.target
    if (name == "card_number") {
      if (value[4] && value[4] != " ") {
        var a = value.substring(0, 4)
        var b = value.substring(4,)
        value = a + " " + b
      }
      if (value[9] && value[9] != " ") {
        var a = value.substring(0, 9)
        var b = value.substring(9,)
        value = a + " " + b
      }
      if (value[14] && value[14] != " ") {
        var a = value.substring(0, 14)
        var b = value.substring(14,)
        value = a + " " + b
      }
      if (value.length <= 19) {
        this.setState(prevState => {
          let myObject = Object.assign({}, prevState.payment_data);
          myObject[name] = value;
          return { payment_data: myObject };
        });
      }

    } else {
      this.setState(prevState => {
        let myObject = Object.assign({}, prevState.payment_data);
        myObject[name] = value;
        return { payment_data: myObject };
      });
    }


  }

  handleSubmit = async (e) => {
    // Extract the payment ID from the URL or use the one from props if not available in the URL
    const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
    const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
    const selectedId = match ? match[1] : localStorage.getItem("payid"); // If match is found use it, otherwise use props

    if (selectedId) {
      localStorage.setItem("paymentId", selectedId);
      const response = await Paymentcontroller.get_payment_data(selectedId);
      if (response.billing_complete) {
        const recurringIntervalCountName = localStorage.getItem("wizard_recurring_interval_count_name");
        const recurringIntervalCount = recurringIntervalCountName ? recurringIntervalCountName.match(/\d+/g)[0] : "0";

        const responseClinicsSubscription = await Paymentcontroller.createInstallment(
          recurringIntervalCount,
          selectedId,
        );
        this.setState({ loading: false });
        if (responseClinicsSubscription.status < 250) {
          this.props.onNextStep();
        } else {
          this.openNotification('bottom', responseClinicsSubscription.detail ? responseClinicsSubscription.detail : "An error occurred during submit process", "Error");
        }
      } else {
        this.setState({ visibleModal: true, customer_id: response.guarantor, payment_data: response });
      }
    } else {
      console.error("Selected ID is not available");
    }
  };


  submitNewFundingSource = async () => {
    const { selectediD, selectedIntervalId } = this.props;
    if (!selectediD) {
      this.openNotification('bottom', "selectediD is not available", "Error");
      return;
    }

    const responseClinicsSubscription = await Paymentcontroller.createInstallment(selectedIntervalId, selectediD);
    if (responseClinicsSubscription.status < 250) {
      this.props.onNextStep();
    } else {
      const errorDetail = responseClinicsSubscription.detail || "An error occurred during the submit process";
      this.openNotification('bottom', errorDetail, "Error");
    }
  };

  handleSubmitModal = async (e) => {
    this.setState({
      loading: true,
      formError: {
        card_cvc: { massage: "", status: true },
        card_number: { massage: "", status: true },
        card_exp_month: { massage: "", status: true },
        card_exp_year: { massage: "", status: true },
      },
    });

    const { card_cvc, card_number, card_exp_month, card_exp_year } = this.state.payment_data;
    const card_cvc_validation = await Error.BankAccounts(card_cvc);
    const card_number_validation = await Error.BankAccounts(card_number.replace(/ /g, ""));
    const card_exp_month_validation = await Error.BankAccounts(card_exp_month);
    const card_exp_year_validation = await Error.BankAccounts(card_exp_year);

    if (
      card_cvc_validation.status &&
      card_number_validation.status &&
      card_exp_month_validation.status &&
      card_exp_year_validation.status
    ) {
      const response = await Paymentcontroller.send_payment_method(
        card_cvc,
        card_number.replace(/ /g, ""),
        card_exp_month,
        card_exp_year,
        localStorage.getItem("customer_id")
      );
      if (response.status < 250) {
        this.openNotification('bottom', response.message || "Created", "Successful");
        const responseClinicsSubscription = await Paymentcontroller.send_clinics_subscription(
          localStorage.getItem("customer_id"),
          localStorage.getItem("price_id"),
          localStorage.getItem("payid")
        );
        this.setState({ loading: false });
        if (responseClinicsSubscription.status < 250) {
          this.props.onNextStep();
        } else {
          this.openNotification('bottom', responseClinicsSubscription.detail || "An error occurred during submit process", "Error");
        }
      } else {
        this.handleResponseError(response);
      }
    } else {
      this.handleValidationErrors(card_cvc_validation, card_number_validation, card_exp_month_validation, card_exp_year_validation);
    }
  }

  handleResponseError = (response) => {
    this.openNotification('bottom', response.detail || "An error occurred during submit process", "Error");
    this.setState({
      loading: false,
      formError: {
        card_cvc: { massage: response.card_cvc || "", status: !response.card_cvc },
        card_number: { massage: response.card_number || "", status: !response.card_number },
        card_exp_month: { massage: response.card_exp_month || "", status: !response.card_exp_month },
        card_exp_year: { massage: response.card_exp_year || "", status: !response.card_exp_year },
      },
    });
  }

  handleValidationErrors = (card_cvc_validation, card_number_validation, card_exp_month_validation, card_exp_year_validation) => {
    this.openNotification('bottom', "An error occurred during submit process", "Error");
    this.setState({
      loading: false,
      formError: {
        card_cvc: { massage: card_cvc_validation.massage, status: card_cvc_validation.status },
        card_number: { massage: card_number_validation.massage, status: card_number_validation.status },
        card_exp_month: { massage: card_exp_month_validation.massage, status: card_exp_month_validation.status },
        card_exp_year: { massage: card_exp_year_validation.massage, status: card_exp_year_validation.status },
      },
    });
  }

  handleCloseModal = () => {
    this.setState({
      visibleModal: false,
      payment_data: {
        card_cvc: "",
        card_number: "",
        card_exp_month: "",
        card_exp_year: "",
      },
    });
  }

  getPaymentData = async () => {
    // Extract the payment ID from the URL or use the one from props if not available in the URL
    const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
    const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
    const selectediD = match ? match[1] : localStorage.getItem("payid") ? localStorage.getItem("payid") : localStorage.getItem("idPay"); // If match is found use it, otherwise use props
    const selectedIntervalId = this.state.intervalId
    if (selectediD && selectedIntervalId) {
      this.setState({ loadingHelcimResultCheck: true });
      try {
        console.log(selectedIntervalId)
        const response = await Paymentcontroller.get_priceproduct(selectediD, selectedIntervalId);
        if (response && response.hasOwnProperty('recurring_interval_count')) {
          localStorage.setItem("wizard_recurring_interval_count", response.recurring_interval_count);
        }
        this.setState({
          payment_data_price_product: response,
          loadingHelcimResultCheck: false,
          intervalIdExist: true
        });
        localStorage.removeItem('interval Id')
      } catch (error) {
        console.error("Error fetching payment data:", error);
        this.setState({ loadingHelcimResultCheck: false });
      }
    } else {
      this.setState({ loadingHelcimResultCheck: false });
      console.log("Missing required IDs: Payment ID or Interval ID");
    }
  };


  constructor(props) {
    super(props)
    this.state = {
      payment_data_price_product: {},
      payment_data: {
        card_cvc: "",
        card_number: "",
        card_exp_month: "",
        card_exp_year: "",
      },
      customer_id: "",
      intervalId: null,
      intervalIdExist: null,
      formError: {
        card_cvc: { massage: "", status: true },
        card_number: { massage: "", status: true },
        card_exp_month: { massage: "", status: true },
        card_exp_year: { massage: "", status: true },
      },
      loadingHelcimResultCheck: true,
      visibleModal: false,
      visibleModalHelcim: false,
      visibleModalHelcimOpenModal: false,
      paymentType: null,
      helcimConfig: {
        token: "",
        customerCode: ""
      }
    }
    this.getPaymentData();
    this.getPaymentType();
    this.handleChange = this.handleChange.bind(this)
    this.submitNewFundingSource = this.submitNewFundingSource.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitModal = this.handleSubmitModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleApprovedCardByHelcim = this.handleApprovedCardByHelcim.bind(this);
  }

  handleApprovedCardByHelcim = async (cardToken) => {
    const { selectediD, onNextStep } = this.props;
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp0 = ipData.ip;

      const response = await Paymentcontroller.helcimPayMulti(
        selectediD,
        selectediD,
        cardToken,
        userIp0
      );

      if (response.status < 250) {
        sessionStorage.setItem('currentStep', 2);  // Store current step in session storage
      } else {
        Object.keys(response).forEach(resp => {
          if (resp !== "status") message.error(response[resp]);
        });
        this.setState({ loadingHelcimResultCheck: false });
      }
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  handleReadDataIP = async () => {

    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp0 = ipData.ip;
      return userIp0.ip


    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
    return null;
  };

  render() {
    const { payment_data_price_product } = this.state;
    const type = localStorage.getItem("type");

    return (
      this.state.loadingHelcimResultCheck ? (
        <>
          <Row justify="center" className="mt5p">
            <Spin size="large" />
          </Row>
          <Row justify="center">
            <p style={{ marginTop: "15px", color: "#722ed1", fontWeight: "600", fontSize: "15px" }}>
              Processing Payment
            </p>
          </Row>
        </>
      ) : (
        type && (
          <div>
            <div className="dashboard-container" style={{ width: '46%' }}>
              <div className="payment-details">
                <div className="payment-row">
                  <div className="payment-label">Monthly Payment</div>
                  <div className="payment-value">{payment_data_price_product.recurring_amount}</div>
                </div>
                <div className="payment-row">
                  <div className="payment-label">Total</div>
                  <div className="payment-value">{payment_data_price_product.total_amount}</div>
                </div>
              </div>
            </div>

            <Button
              className="button-resp"
              style={{ marginLeft: '73%', width: 139, height: 38, background: '#6B43B5', color: 'white' }}
              onClick={() => {
                if (this.state.paymentType !== "helcim" && this.state.intervalId) {
                  this.setState({ visibleModal: true });
                } else {
                  if (this.state.intervalIdExist === true) {
                    this.setState({ visibleModalHelcim: true });
                  } else {
                    message.error("Please Select Payment Option");
                  }
                }
              }}
            >
              Next
            </Button>

            <Modal
              onCancel={() => {
                this.setState({ visibleModal: false });
              }}
              footer={null}
              title="Payment"
              visible={this.state.visibleModal}
            >
              <App />
            </Modal>

            <Modal
              onCancel={() => {
                this.setState({
                  visibleModalHelcimOpenModal: false,
                  visibleModalHelcim: false,
                });
              }}
              footer={null}
              title="Card Information"
              centered
              open={this.state.visibleModalHelcimOpenModal}
              style={{ minWidth: 920 }}
            >
              <HelcimFormMulti
                helcimConfig={this.state.helcimConfig}
                selectedId={this.props.selectediD}
                selectedIntervalId={this.props.selectedIntervalId}
              />
            </Modal>
          </div>
        )
      )
    );
  }
}


function mapStateToProps(state) {
  const { creating, error } = state.paymentRequest;
  const { profileSummary } = state.dashboard;
  return {
    creating,
    error,
    profileSummary
  }
}

const paywiz2 = connect(mapStateToProps)(PaymentWizardStep2)

export default paywiz2
