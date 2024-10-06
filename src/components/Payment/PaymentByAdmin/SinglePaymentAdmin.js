import { Modal, notification, Button, message, Row, Spin } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Paymentcontroller } from "../../../Paymentcontroller";
import "../../app.local.css";
import App from "../../stripeAdmin/App";
import CreateGurantorBillingForm from "./CreateGurantorBillingForm";
import PaymentDone from "./PaymentDone";
import HelcimForm from "./HelcimForm"

class Payment extends Component {
  getPaymentType = async () => {
    const { paymentId } = this.props;
    const response = await Paymentcontroller.getPaymentProvider(
      paymentId
    );

    console.log(response.provider)
    this.setState({
      paymentType: response.provider
    })
  }

  getPaymentData = async () => {
    const { paymentId } = this.props;
    this.setState({
      loading: true,
    });

    localStorage.setItem(
      "paymentId",
      paymentId
    );
    const response = await Paymentcontroller.get_payment_data(
      paymentId
    );
    if (response.paid || response.status == "subscription") {
      localStorage.setItem("Payment-Receipt", true);
      this.setState({
        paymentDoneState: true
      })
    } else {
      localStorage.setItem("Payment-Receipt", false);
      if (!response.billing_complete) {
        this.setState({
          stripe_complete: false,
        });
      }
    }
    this.setState({
      payment_data: response,
      loading: false,
    });

  };
  constructor(props) {
    super(props);
    this.state = {

      paymentDoneState: false,
      loading: true,
      stripe_complete: true,
      payment_data: {},
      visibleModal: false,
      visibleModalHelcim: false,
      visibleModalHelcimOpenModal: false,
      paymentType: null,
      helcimConfig: {
        token: "",
        customerCode: ""
      }
    };
    this.getPaymentData();
    this.getPaymentType();
    this.handleApprovedCardByHelcim = this.handleApprovedCardByHelcim.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.handleDonePaymentByAdmin = this.handleDonePaymentByAdmin.bind(this);
    this.handleReadDataIP = this.handleReadDataIP.bind(this);
  }

  readHelcimData = async () => {
    const { paymentId } = this.props;
    const response = await Paymentcontroller.getHelcimToken(
      paymentId
    )

    console.log(response)
    this.setState({

      helcimConfig: {
        customerCode: response["customerCode"],
        token: response["helcim js token"]
      },
      visibleModalHelcimOpenModal: true
    })

  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the state value has changed to true
    if (this.state.visibleModalHelcim && !prevState.visibleModalHelcim) {
      this.readHelcimData()
    }
  }


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

  handleApprovedCardByHelcim = async (cardToken) => {
    console.log(cardToken)
    const { paymentId } = this.props;
    const userIP = ""
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp0 = ipData.ip;
      const response = await Paymentcontroller.helcimPay(
        paymentId,
        cardToken,
        userIp0
      )

      if (response.status < 250) {
        window.location.href = window.location.origin + window.location.pathname +
          "#/payment-requests"
      } else {
        var errors = Object.keys(response)

        errors.map((resp) =>
          resp != "status" ? message.error(response[resp]) : ""
        )
        this.setState({
          loadingHelcimResultCheck: false
        })
        this.setState({
          loadingHelcimResultCheck: false
        })
      }
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
    /*
    }*/
  }

  handleApprovedCardByHelcim2 = async (cardToken) => {
    const { paymentId } = this.props;
    const userIP = ""
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp0 = ipData.ip;
      const response = await Paymentcontroller.helcimPayMulti(
        paymentId,
        cardToken,
        userIp0
      )

      if (response.status < 250) {
        window.location.href = window.location.origin + window.location.pathname +
          "#/payment-requests"
      } else {
        var errors = Object.keys(response)

        errors.map((resp) =>
          resp != "status" ? message.error(response[resp]) : ""
        )
        this.setState({
          loadingHelcimResultCheck: false
        })
        this.setState({
          loadingHelcimResultCheck: false
        })
      }
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }

  }


  // check submited helcim form
  componentDidMount() {
    const { paymentId } = this.props;
    localStorage.setItem("singlePaymentId", paymentId);
    var type = localStorage.getItem('type');

    // Function to parse URL parameters
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Get the value of responseMessage and cardToken from URL parameters
    const responseMessage = getUrlParameter('responseMessage');
    const cardToken = getUrlParameter('cardToken');

    // Check if responseMessage is "APPROVED" and log cardToken
    if (responseMessage === 'APPROVED' || responseMessage === 'APPROVAL') {
        const userIp = this.handleReadDataIP();

        if (type === 'single') {
            this.handleApprovedCardByHelcim(cardToken);
        } else if (type === 'wizard') {
            this.handleApprovedCardByHelcim2(cardToken);
        }

        console.log('user ip:', userIp);
        console.log('Card Token:', cardToken);
    } else {
        this.setState({
            loadingHelcimResultCheck: false
        });
    }
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

  handleSubmit2 = () => {
    this.setState({
      stripe_complete: true
    })
  };

  handlePayment = async () => {
    if (this.state.payment_data.stripe_complete) {
      const response = await Paymentcontroller.paySinglePayment(
        window.location.href.split("/")[
        window.location.href.split("/").length - 1
        ]
      );

      if (response.status < 250) {
        localStorage.setItem("Payment-Receipt", true);
        this.setState({
          paymentDoneState: true
        })
      } else {
        this.openNotification(
          "bottom",
          response.error ? response.error : "Error",
          "Error"
        );
      }
    } else {
      this.setState({ visibleModal: true });
    }
  };

  handleDonePaymentByAdmin = () => {

    this.setState({
      paymentDoneState: true,
      visibleModal: false
    })

  }

  render() {
    const { paymentId } = this.props;
    return (
      this.state.loadingHelcimResultCheck ?
        <>
          <Row justify={"center"} className="mt5p">
            <br />
            <br />
            <br />
            <Spin size="large" />
          </Row>
          <Row justify={"center"}>
            <p style={{ marginTop: "15px", color: " #722ed1", fontWeight: "600", fontSize: "15px" }}>Processing Payment</p>
          </Row>
        </>
        :
        this.state.paymentDoneState ?
          <>
            <PaymentDone />
          </>
          :
          <><div className="align-center-text" style={{ width: '270px', marginLeft: '280px', marginTop: 20 }}>

            {/* <div className="header_payment_page_part">
      {!this.state.loading ? "Payment Details" : ""}
    </div> */}

            {this.state.loading ? (
              <>Loading...</>
            // ) : !this.state.stripe_complete ? (
            //   <>
            //     <hr className="endline_payment" />

            //     <CreateGurantorBillingForm
            //       handleSubmit2={this.handleSubmit2} />
            //     <div style={{ height: "15px" }}></div>
            //   </>
            ) : (
              <>
                <div
                  className="main_container_card "
                  style={{ paddingTop: "0px", fontWeight: "bold" }}
                >
                  <div>
                    <div>Amount</div>
                  </div>
                  <div className="align_rights_items" s>
                    <div>
                      {this.state.payment_data.amount
                        ? this.state.payment_data.amount
                        : "-"}
                    </div>
                  </div>
                </div>
                <div style={{ height: "15px" }}></div>


                <div style={{ height: "15px" }}></div>
              </>
            )}
            <Modal
              onCancel={() => {
                this.setState({ visibleModal: false });
              }}
              footer={null}
              title="Payment"
              visible={this.state.visibleModal}
            >
              <App paymentId={paymentId} handleDonePaymentByAdmin={this.handleDonePaymentByAdmin} />
            </Modal>
            <Modal
              onCancel={() => {
                this.setState({
                  visibleModalHelcimOpenModal: false,
                  visibleModalHelcim: false
                });
              }}
              footer={null}
              title="Payment"
              open={this.state.visibleModalHelcimOpenModal}
              style={{minWidth: 921}}
            >
              <HelcimForm helcimConfig={this.state.helcimConfig} />
            </Modal>
          </div><Button
            onClick={() => {
              if (this.state.paymentType != "helcim") {
                this.setState({ visibleModal: true });
              }
              else {
                this.setState({ visibleModalHelcim: true });
              }
            }}
            // className="login-btn"
            style={{ width: "100%" }}
            type="primary" size="large"
          >
              Payment
            </Button></>



    );
  }
}

Payment.propTypes = {
  classes: PropTypes.object,
};

export default Payment 
