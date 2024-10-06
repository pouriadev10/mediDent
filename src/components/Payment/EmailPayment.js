import React, { Component } from 'react';
import { Card, message, Spin } from 'antd';
import PaymentFirstPage from './PaymentFirstPage';
import PaymentDone from './PaymentDone'
import PaymentFaild from './PaymentFaild';
import { Paymentcontroller } from "../../Paymentcontroller";
import PoweredBy from '../CommonUi/PoweredBy'
import PaymentDoneMulti from './PaymentDoneMulti';



class EmailPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      detailModalVisible: false,
      paymentType: '',
      loadingHelcimResultCheck: false,
      payResult: null,
      payResult1: null,
      currentStep2: 1,
      response: '',
      response2: '',
      loading: false,
      payment_data: {},
    };
  }



  getPaymentData = async () => {
    try {
      // Extract the payment ID from the URL or use the one from props if not available in the URL
      const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
      const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
      const paymentId = match ? match[1] : localStorage.getItem("payid") ? localStorage.getItem("payid") : localStorage.getItem("idPay");

      console.log("Extracted payment ID:", paymentId); // Debug log

      if (!paymentId) {
        console.error("No payment ID found");
        return;
      }

      const response = await Paymentcontroller.get_payment_data(paymentId);
      console.log("Payment data response:", response);

      this.setState({
        payment_data: response,
      });
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };
  handleApprovedCardByHelcim = async (cardToken, responseMessage2) => {
    const id = localStorage.getItem('paymentId');
    this.setState({ loading: true });
    if (!id) {
      console.error("No selected ID provided");
      message.error("Payment failed: No selected ID provided.");
      return;
    }

    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp = ipData.ip;

      const response = await Paymentcontroller.helcimPay(id, cardToken, userIp, responseMessage2);

      if (response.status < 250) {
        message.success("Payment successful");
        this.setState({
          payResult: true,
          currentStep2: 2
        })

        // localStorage.removeItem("idPay")
        // window.history.pushState({}, '', `/payment/${id}`); // Update the URL without reloading the page
      } else {
        this.setState({
          payResult: false,
          currentStep2: 2,
          response: response.error
        })
        window.history.pushState({}, '', `/#/payment/${id}`);
        message.error("Payment failed: " + response.error);
      }
    } catch (error) {
      console.error('Error during payment processing:', error);
      message.error("Payment processing error: " + error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleApprovedCardByHelcim2 = async (cardToken, responseMessage2) => {
    const id = localStorage.getItem('paymentId');
    this.setState({ loading: true });
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp0 = ipData.ip;

      const response = await Paymentcontroller.helcimPayMulti(
        id,
        cardToken,
        userIp0,
        responseMessage2,
      );

      if (response.status < 250) {
        this.setState({
          payResult1: true,
          currentStep2: 2
        })
        //  message.success("Payment successful");
      } else {
        this.setState({
          payResult1: false,
          currentStep2: 2,
          response2: response.error
        })
        Object.keys(response).forEach(resp => {
          if (resp !== "status") {
            message.error(response[resp])
            this.setState({
              response: response
            })
          };
        });
        this.setState({ loadingHelcimResultCheck: false });
      }
    } catch (error) {
      console.error('Error fetching IP address:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleReadDataIP = async () => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp0 = ipData.ip;
      return userIp0.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
    return null;
  };

  componentDidMount() {

    const getUrlParameter = (name) => {
      const urlParams = new URLSearchParams(window.location.search);
      if (name) {
        return urlParams.get(name) ? decodeURIComponent(urlParams.get(name).replace(/\+/g, ' ')) : '';
      }
      return window.location.href; // Return the complete URL if no parameter name is provided
    };

    // Get the value of responseMessage and cardToken from URL parameters
    const responseMessage = getUrlParameter('responseMessage');
    const responseMessage2 = getUrlParameter();
    const cardToken = getUrlParameter('cardToken');
    const paymentType = this.state.paymentType;

    console.log(`Response Message: ${responseMessage}, Card Token: ${cardToken}, Payment Type: ${paymentType}`);

    // Check if responseMessage is "APPROVED" and log cardToken
    if (responseMessage === 'APPROVED' || responseMessage === 'APPROVAL' ||
      (window.location.href.includes("/?") && !window.location.href.includes("/?id="))) {

      console.log(`Card Token: ${cardToken}`);

      try {
        const userIp = this.handleReadDataIP();
        console.log(`User IP: ${userIp}`);

        // this.setState({ currentStep: 2, detailModalVisible: true });

        var pay = localStorage.getItem("type")

        // Check the payment type and call the appropriate function
        if (pay === 'wizard') {
          this.handleApprovedCardByHelcim2(cardToken, responseMessage2);
        } else {
          this.handleApprovedCardByHelcim(cardToken, responseMessage2);
        }

        // window.history.replaceState({}, '', window.location.pathname);

      } catch (error) {
        console.error('Error handling payment:', error);
      }
    } else {
      console.log("Payment not approved or missing necessary URL parameters.");
      // Optionally, update the state to indicate the loading or checking has concluded without action
      // this.setState({ loadingHelcimResultCheck: false });
    }
    this.getPaymentData();
  }

  getDefaultSelectedPayment = () => {
    // Fetch the last payment or set a default value
    return {
      id: this.state.selectedPayment,
      status: 'pending'
    };
  };

  handleRetryPayment = () => {
    // const defaultSelectedPayment = this.getDefaultSelectedPayment(); // Assuming you have a method to get a default or previous state.
    this.setState({
      currentStep2: 1,
      // selectedPayment: defaultSelectedPayment // Reset or maintain the selectedPayment
    });
    localStorage.removeItem("payid")
  };

  // handleRetryPayment2 = () => {
  //   // const defaultSelectedPayment = this.getDefaultSelectedPayment(); // Assuming you have a method to get a default or previous state.
  //   this.setState({
  //     currentStep2: 1,
  //   });

  //   localStorage.removeItem("payid");

  //   // Refresh the page
  //   window.location.reload();
  // };




  render() {
    const { loading, currentStep2, payResult, payResult1, response, response2 } = this.state;
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', background: 'white' }}>
        <div className="title pageHeader">
          {
            this.state.payment_data && this.state.payment_data.office_logo ?
              <img className='bookcLogo'
                src={this.state.payment_data.office_logo + ""}
                alt="logo"
              />
              :
              <></>
          }
        </div>
        {/* <span className='appointmentStep' style={{ fontWeight: "bold", marginTop: 10 }} >
          Payment Page
        </span> */}
        <Card style={{ width: 568, marginTop: 20, marginBottom: 20,  maxWidth: '100%',  '@media (max-width: 768px)': {
          width: '100%', // Full width on mobile devices
        }, }}>
          {(payResult === true || payResult1 === true || payResult === null || payResult1 === null) && (
            <p style={{ fontSize: 16, fontWeight: 600 }}>Payment Details </p>
          )}

          {loading ? ( // Show loading spinner when loading is true
            <div style={{ textAlign: 'center', height: '100%' }}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              {currentStep2 === 1 && (
                <PaymentFirstPage />
              )}
              {currentStep2 === 2 && payResult === true && (
                <PaymentDone />
              )}
              {currentStep2 === 2 && payResult1 === true && (
                <PaymentDoneMulti />
              )}
              {currentStep2 === 2 && payResult === false && (
                <PaymentFaild response={response} onRetry={this.handleRetryPayment} />
              )}
              {currentStep2 === 2 && payResult1 === false && (
                <PaymentFaild response={response2} onRetry={this.handleRetryPayment} />
              )}
            </>
          )}
        </Card>
        <PoweredBy />
      </div>
    );
  }
}

export default EmailPayment;
