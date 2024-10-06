import { Modal, notification, Button, message, Row, Spin } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Error } from '../../../ErrorHandeling'
import { Paymentcontroller } from '../../../Paymentcontroller'
import PoweredBy from '../../CommonUi/PoweredBy'
import App from "../../stripeAdminMulti/App"
import PaymentDone from "./PaymentDone";
import HelcimFormMulti from "./HelcimFormMulti"
class PaymentWizardStep2 extends Component {
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
    const { paymentId } = this.props;
    localStorage.setItem("paymentId",
      paymentId
    )
    const response = await Paymentcontroller.get_payment_data(
      paymentId
    )

    if (response.billing_complete) {
      const responseClinicsSubscription = await Paymentcontroller.createInstallment(
        localStorage.getItem("wizard_recurring_interval_count_name").match(/\d+/g)[0],
        paymentId,
      )
      this.setState({
        loading: false,
      })
      if (responseClinicsSubscription.status < 250) {
        this.props.onSubmitStepTwo("done")
      } else {
        this.openNotification('bottom', responseClinicsSubscription.detail ? responseClinicsSubscription.detail : "an error occurred during submit process", "Error");
      }
    } else {

      this.setState({ visibleModal: true, customer_id: response.guarantor, payment_data: response })
    }

  }

  handleSubmitCustomerFundingSource = async () => {
    this.props.onSubmitStepTwo("done")
  }


  submitNewFundingSource = async () => {
    const { paymentId } = this.props;
    localStorage.getItem('inter')
    const responseClinicsSubscription = await Paymentcontroller.createInstallment(
      localStorage.getItem("inter") && localStorage.getItem("inter").length == 1 ? localStorage.getItem("inter") : localStorage.getItem("wizard_recurring_interval_count_name").match(/\d+/g)[0],
      paymentId,
    )

    if (responseClinicsSubscription.status < 250) {
      this.props.onSubmitStepTwo("done")
    } else {
      this.openNotification('bottom', responseClinicsSubscription.detail ? responseClinicsSubscription.detail : "an error occurred during submit process", "Error");
    }
  }

  handleSubmitModal = async (e) => {
    this.setState({
      loading: true,
      formError: {
        card_cvc: {
          massage: "",
          status: true
        },
        card_number: {
          massage: "",
          status: true
        },
        card_exp_month: {
          massage: "",
          status: true
        },
        card_exp_year: {
          massage: "",
          status: true
        },
      },
    })
    const card_cvc_validation = await Error.BankAccounts(this.state.payment_data.card_cvc);
    const card_number_validation = await Error.BankAccounts(this.state.payment_data.card_number.replace(/ /g, ""));
    const card_exp_month_validation = await Error.BankAccounts(this.state.payment_data.card_exp_month);
    const card_exp_year_validation = await Error.BankAccounts(this.state.payment_data.card_exp_year);

    if (
      card_cvc_validation.status &&
      card_number_validation.status &&
      card_exp_month_validation.status &&
      card_exp_year_validation.status
    ) {
      const response = await Paymentcontroller.send_payment_method(
        this.state.payment_data.card_cvc,
        this.state.payment_data.card_number.replace(/ /g, ""),
        this.state.payment_data.card_exp_month,
        this.state.payment_data.card_exp_year,
        localStorage.getItem("customer_id")
      )
      if (response.status < 250) {
        this.openNotification('bottom', response.message ?
          response.message : "Created"
          , "Successful");
        const { paymentId } = this.props;
        const responseClinicsSubscription = await Paymentcontroller.send_clinics_subscription(
          localStorage.getItem("customer_id"),
          localStorage.getItem("price_id"),
          paymentId,
        )
        this.setState({
          loading: false,
        })
        if (responseClinicsSubscription.status < 250) {
          this.props.onSubmitStepTwo("done")
        } else {
          this.openNotification('bottom', responseClinicsSubscription.detail ? responseClinicsSubscription.detail : "an error occurred during submit process", "Error");
        }


      } else {
        this.openNotification('bottom', response.detail ? response.detail : "an error occurred during submit process", "Error");
        this.setState({
          loading: false,
          formError: {
            card_cvc: {
              massage: response.card_cvc ? response.card_cvc : "",
              status: response.card_cvc ? false : true
            },
            card_number: {
              massage: response.card_number ? response.card_number : "",
              status: response.card_number ? false : true
            },
            card_exp_month: {
              massage: response.card_exp_month ? response.card_exp_month : "",
              status: response.card_exp_month ? false : true
            },
            card_exp_year: {
              massage: response.card_exp_year ? response.card_exp_year : "",
              status: response.card_exp_year ? false : true
            },
          },
        })
      }
    } else {
      this.openNotification('bottom', "an error occurred during submit process", "Error");
      this.setState({
        loading: false,
        formError: {
          card_cvc: {
            massage: card_cvc_validation.massage,
            status: card_cvc_validation.status
          },
          card_number: {
            massage: card_number_validation.massage,
            status: card_number_validation.status
          },
          card_exp_month: {
            massage: card_exp_month_validation.massage,
            status: card_exp_month_validation.status
          },
          card_exp_year: {
            massage: card_exp_year_validation.massage,
            status: card_exp_year_validation.status
          },
        },
      })
    }
  }

  handleCloseModal = async (e) => {
    this.setState({
      visibleModal: false,
      payment_data: {
        card_cvc: "",
        card_number: "",
        card_exp_month: "",
        card_exp_year: "",

      },
    })

  }

  getPaymentData = async () => {
    const { paymentId } = this.props;
    const interval = localStorage.getItem("inter") && localStorage.getItem("inter").length == 1 ? localStorage.getItem("inter") : this.props.selectedIntervalId

    localStorage.setItem("paymentId",
      paymentId
    )
    const response = await Paymentcontroller.get_priceproduct(
      paymentId,
      // localStorage.getItem('wizard_recurring_interval_count')
      // this.props.selectedIntervalId
      interval
    )
    localStorage.setItem("price_id", response.price_id)
    this.setState({
      payment_data_price_product: response, intervalIdExist: true
    })


  }
  constructor(props) {
    super(props)
    this.state = {
      payment_data_price_product: {},
      payment_data: {
        card_cvc: "",
        card_number: "",
        card_exp_month: "",
        inter: null,
        card_exp_year: "",

      },
      customer_id: "",
      formError: {
        card_cvc: {
          massage: "",
          status: true
        },
        card_number: {
          massage: "",
          status: true
        },
        card_exp_month: {
          massage: "",
          status: true
        },
        card_exp_year: {
          massage: "",
          status: true
        },
      },
      loadingHelcimResultCheck: true,
      visibleModal: false,
      visibleModalHelcim: false,
      visibleModalHelcimOpenModal: false,
      intervalIdExist: null,
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
    this.handleDonePaymentByAdmin = this.handleDonePaymentByAdmin.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitModal = this.handleSubmitModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)

    //this.handlePayment = this.handlePayment.bind(this);
    this.handleApprovedCardByHelcim = this.handleApprovedCardByHelcim.bind(this);
    this.handleReadDataIP = this.handleReadDataIP.bind(this);
    this.readHelcimData = this.readHelcimData.bind(this);
  }

  readHelcimData = async () => {
    // Extract the payment ID from the URL or use the one from props if not available in the URL
    const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
    const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
    const paymentId = match ? match[1] : this.props.paymentId; // If match is found use it, otherwise use props

    const response = await Paymentcontroller.getHelcimToken(paymentId);
    console.log(response);

    this.setState({
      helcimConfig: {
        customerCode: response["customerCode"],
        token: response["helcim js token"]
      },
      visibleModalHelcimOpenModal: true
    });
  };


  componentDidUpdate(prevProps, prevState) {
    if (this.state.visibleModalHelcim && !prevState.visibleModalHelcim) {
      this.readHelcimData();
    }

    if (prevProps.selectedIntervalId !== this.props.selectedIntervalId) {
      this.getPaymentData();
    }
  }

  handleApprovedCardByHelcim = async (cardToken) => {
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

  componentDidMount() {
    const inter = localStorage.getItem('inter'); // Assuming you store it in localStorage elsewhere
    this.setState({ inter: inter });
    console.log(this.state.inter)
    // localStorage.removeItem("inter")
    const { paymentId } = this.props;
    localStorage.setItem("multiPaymentId", paymentId)
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
    if (responseMessage === 'APPROVED' || responseMessage === 'APPROVAL' ) {
      const userIp = this.handleReadDataIP()

      this.handleApprovedCardByHelcim(cardToken)
      console.log('user ip:', userIp);
      console.log('Card Token:', cardToken);
    } else {
      this.setState({
        loadingHelcimResultCheck: false
      })
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
          <><div className="align-center-text" style={{ width: '20%' }}>

            {/* <div className='header_payment_page_part'>
      Payment Details
    </div>
    <hr className='endline_payment' /> */}
            <div className='main_container_card '>
              <div>
                {/* <div>Installment Period</div> */}
                <div>{this.state.payment_data_price_product.period == "day" ? "Daily " : "Monthly "} Amount</div>
                <div>Total Amount</div>
                <div>Month</div>
              </div>
              <div className='align_rights_items'>

                {/* <div>{this.state.payment_data_price_product.recurring_interval_count ? this.state.payment_data_price_product.recurring_interval_count : "-"}{"-"}{this.state.payment_data_price_product.recurring_interval ? this.state.payment_data_price_product.recurring_interval : "-"}</div> */}
                <div> {this.state.payment_data_price_product.recurring_amount ? this.state.payment_data_price_product.recurring_amount : "-"}</div>
                <div>{this.state.payment_data_price_product.total_amount ? this.state.payment_data_price_product.total_amount : "-"}</div>
                <div>{this.state.payment_data_price_product.recurring_interval_count ? this.state.payment_data_price_product.recurring_interval_count : "-"}</div>
              </div>
            </div>
            <br />

            <div style={{ height: "15px" }}></div>




            <Modal onCancel={() => {
              this.setState({ visibleModal: false })
            }} footer={null} title="Payment" visible={this.state.visibleModal}>
              <App payId={paymentId} handleDonePaymentByAdmin={this.handleDonePaymentByAdmin} />

            </Modal>

            <Modal
              onCancel={() => {
                this.setState({
                  visibleModalHelcimOpenModal: false,
                  visibleModalHelcim: false
                })
              }}
              footer={null}
              title="Payment"
              open={this.state.visibleModalHelcimOpenModal}
              style={{ minWidth: 921 }}
            >

              <HelcimFormMulti paymentId={this.props.paymentId} helcimConfig={this.state.helcimConfig} />

            </Modal>
            {/* <PoweredBy /> */}
          </div>
            <Button
              onClick={() => {
                if (this.state.paymentType !== "helcim" && this.state.selectedIntervalId) {
                  this.setState({ visibleModal: true });
                } else {
                  if (this.state.intervalIdExist === true) {
                    this.setState({ visibleModalHelcim: true });
                  } else {
                    message.error("Please Select Payment Option");
                  }
                }
              }}
              // className="login-btn"

              style={{ width: "100%" }}
              type="primary"
              size="large"
            >
              Accept
            </Button>

          </>
    )
  }
}


function mapStateToProps(state) {
  const { creating, error } = state.paymentRequest
  const { profileSummary } = state.dashboard
  return {
    creating,
    error,
    profileSummary
  }
}

const paywiz2 = connect(mapStateToProps)(PaymentWizardStep2)

export default paywiz2
