import { Input, Modal, notification, Radio, Spin, Button, Card, Row, Col, Checkbox, Select } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Logo from '../../assets/img/logo-bookc.png'
import { controller } from '../../controller'
import { Paymentcontroller } from '../../Paymentcontroller'
import '../app.local.css'
import PoweredBy from '../CommonUi/PoweredBy'
import App from "../stripe/App"


import rec from '../../assets/icons/Rectangle 7734.png';
import rec2 from '../../assets/icons/Rectangle 7733.png';

const { Option } = Select

const styles = theme => ({
  root: {
    width: '90%',
  },
  iconContainer: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  connectorActive: {
    '& $connectorLine': {
      borderColor: theme.palette.secondary.main,
    },
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorDisabled: {
    '& $connectorLine': {
      borderColor: theme.palette.grey[100],
    },
  },
  connectorLine: {
    transition: theme.transitions.create('border-color'),
  },
})

class SelectPaymentMethod extends Component {
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
  onChange = (e) => {
    localStorage.setItem("wizard_recurring_interval_count", e.target.value)
    localStorage.setItem("wizard_recurring_interval_count_name", e.target.label)
    this.setState({ value: e.target.value })
  }
  getLogo = async () => {
    if (window.location.href.split("/") &&
      window.location.href.split("/")[window.location.href.split("/").length - 1]
    ) {
      const response = await Paymentcontroller.get_payment_wizard_data(
        window.location.href.split("/")[window.location.href.split("/").length - 1]
      )
      const response_logo = await Paymentcontroller.officeprofile(response.office)
      this.setState({ logo: response_logo.logo })
    }
  }

  componentDidMount() {
    this.getPaymentData()
  }



  checkDetail = async () => {
    // Extract the payment ID from the URL or use the one from props if not available in the URL
    const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
    const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
    const paymentId = match ? match[1] : localStorage.getItem("payid") ? localStorage.getItem("payid") : this.props.selectedPaymentId ? this.props.selectedPaymentId : localStorage.getItem("idPay"); // If match is found use it, otherwise use props

    localStorage.setItem("paymentId", paymentId);

    try {
      const resp = await Paymentcontroller.checkMultiPaymentDone(paymentId);
      if (resp.status1 < 250 && resp.status) {
        // Add additional success logic if needed
      } else {
        const response = await Paymentcontroller.payment_detail(paymentId);
        if (response.status < 250) {
          if (response) {
            this.setState({ logo: response.office_logo });
          }
          const resp = await Paymentcontroller.checkPayment(paymentId);
          if (resp.status < 250) {
            if (resp.is_delete) {
              this.setState({
                isDelete: true
              });
            } else if (resp.paid || resp.status === "subscription") {
              localStorage.setItem("paymentId", paymentId);
              localStorage.setItem("Payment-Receipt", true);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error occurred during payment check:", error);
    }

    setTimeout(() => {
      this.setState({ mainLoading: false });
    }, 100);
  };


  constructor(props) {
    super(props)
    this.state = {
      isDelete: false,
      intervals: [
        { id: '1', name: 'Single Payment' },
        { id: '2', name: 'Multiple Payments' }
      ],
      loading: false,
      value: "",
      logo: "",
      mainLoading: true,
      isChecked: false,
      selectedPaymentType: null,
      payment_data: {},
      paymentType: "",
      selectedIntervalId: null, // State to store the selected interval ID
    }
    this.checkDetail();
    this.getData();
    this.getData = this.getData.bind(this)
    this.onChange = this.onChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.getPaymentData = this.getPaymentData.bind(this)
    this.handleIntervalChange = this.handleIntervalChange.bind(this);


  }


  handleChange(e) {
    this.setState({ isChecked: e.target.checked });
  }

  getData = async () => {
    const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
    const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
    const paymentId = match ? match[1] : this.props.selectedPaymentId; // If match is found use it, otherwise use props

    console.log(paymentId); // Log the used payment ID for debugging purposes

    const response = await controller.getIntervalsForPayment(paymentId);
    this.setState({
      intervals: response
    });
  };


  getPaymentData = async () => {
    this.setState({
      loading: true
    });

    const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
    const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
    const selectedPaymentId = match ? match[1] : localStorage.getItem("payid") ? localStorage.getItem("payid") : localStorage.getItem("idPay"); // If match is found use it, otherwise use props

    localStorage.setItem("paymentId", selectedPaymentId);

    try {
      const response = await Paymentcontroller.get_payment_data(selectedPaymentId);
      console.log("API Response:", response); // Logging the response to debug

      // Check if response is valid and has data you expect
      if (response && response.interval_data) {
        this.setState({
          payment_data: response,
          loading: false
        });
      } else {
        console.error("Received unexpected response structure:", response);
        this.setState({
          payment_data: { interval_data: [] }, // Ensure interval_data is always an array
          loading: false
        });
      }
    } catch (error) {
      console.error("Error fetching payment data:", error); // Error logging
      this.setState({
        payment_data: { interval_data: [] }, // Defaulting to an empty array in case of error
        loading: false
      });
    }
  };



  handleCheckboxChange = (selectedPaymentType, selectedId) => {
    this.setState(prevState => {
      const isSinglePayment = selectedPaymentType === "Single Payment";
      // localStorage.setItem("interval Id", 1)
      // localStorage.removeItem('wizard_recurring_interval_count')
      return {
        selectedPaymentType: prevState.selectedPaymentType === selectedPaymentType ? null : selectedPaymentType,
        selectedIntervalId: isSinglePayment ? null : prevState.selectedIntervalId
      };
    }, () => {
      this.getPaymentData().then(() => {
        const effectivePaymentType = this.state.selectedPaymentType === "Single Payment" ? 'single' : 'wizard';
        localStorage.setItem("type", effectivePaymentType);
        this.props.onSelectPaymentType(effectivePaymentType);
        console.log('Effective Payment Type:', effectivePaymentType);
      }).catch(error => {
        console.error('Failed to fetch or process payment data', error);
      });
    });
  };



  // In your child component
  handleIntervalChange = (value) => {
    // Update the state with the new selected interval ID
    this.setState({ selectedIntervalId: value }, () => {
      // After state update, send the selectedIntervalId to the parent component
      this.props.onIntervalSelect(value);
      console.log(value)
    });
  };






  render() {
    const { intervals, selectedIntervalId, selectedPaymentType, payment_data } = this.state;

    // Check if "Single Payment" exists
    const hasSinglePayment = payment_data && payment_data.interval_data && payment_data.interval_data.some(interval => interval.interval === 'Single Payment');
    // Check if other intervals besides "Single Payment" exist
    const hasOtherPayments = payment_data && payment_data.interval_data && payment_data.interval_data.some(interval => interval.interval !== 'Single Payment');

    return (
      this.state.mainLoading ?
        <div style={{ justifyContent: "center", display: "flex", height: "250px" }}>
          <Spin size="large" style={{ alignSelf: "center" }} />
        </div>
        :
        <div>
          {
            this.state.loading ?
              <div style={{ justifyContent: "center", display: "flex", height: "250px" }}>
                <Spin size="large" style={{ alignSelf: "center" }} />
              </div>
              :
              <>
                {!this.state.isDelete ?
                  <React.Fragment>
                    <div style={{ lineHeight: "30px" }} className='main_container_card1'>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        {
                          (hasSinglePayment && hasOtherPayments) || hasOtherPayments ? (
                            <Card
                              className={`custom-card12 ${selectedPaymentType === 'Recurring Payment' ? 'selected-card' : 'not-selected-card'}`}
                              bordered={false}
                              onClick={() => this.handleCheckboxChange('Recurring Payment')}
                              style={{ cursor: 'pointer' }}
                            >
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: '600',
                                  color: '#6B43B5',
                                  zIndex: 1000,
                                  position: 'relative',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'flex-start',
                                  marginTop: 18,
                                  left: 10,
                                }}
                              >
                                <p>Payment Plan</p>
                              </div>
                              {/* <Checkbox
                                onChange={() => this.handleCheckboxChange('Recurring Payment')}
                                checked={selectedPaymentType === 'Recurring Payment'}
                                className="custom-checkbox"
                                onClick={(e) => e.stopPropagation()} // Prevents the card's onClick event from firing
                              /> */}
                            </Card>
                          ) : (
                            <></>
                          )
                        }


                        <Card
                          className={`custom-card12 ${selectedPaymentType === 'Single Payment' ? 'selected-card' : 'not-selected-card'}`}
                          bordered={false}
                          onClick={() => this.handleCheckboxChange('Single Payment')}
                          style={{ cursor: 'pointer' }}
                        >
                          <div
                            style={{ fontSize: 14, fontWeight: '600', color: '#6B43B5', zIndex: 1000, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: 18, left: 10 }}
                          >
                            <p>Single Payment</p>
                          </div>
                          {/* <Checkbox
                            onChange={() => this.handleCheckboxChange('Single Payment')}
                            checked={selectedPaymentType === 'Single Payment'}
                            className="custom-checkbox"
                            onClick={(e) => e.stopPropagation()} // Prevents the card's onClick event from firing
                          /> */}
                        </Card>
                      </div>
                    </div>
                    {selectedPaymentType && (
                      <div>
                        {selectedPaymentType === 'Single Payment' ? (
                          <></>
                        ) : (
                          <div>
                            <div>
                              <Select
                                style={{ width: '46%', height: 42, border: '1px solid #6B43B5', borderRadius: '7px', marginTop: 15 }}
                                placeholder='Select Months for Payment'
                                onChange={this.handleIntervalChange}  // Use the handler directly
                                value={this.state.selectedIntervalId}
                              >
                                {this.state.payment_data && this.state.payment_data.interval_data &&
                                  this.state.payment_data.interval_data
                                    .filter(interval => interval.interval !== '4 Days for Testing' && interval.interval !== 'Single Payment')
                                    .map(interval => (
                                      <Option key={interval.id} value={interval.id}>
                                        {interval.interval}
                                      </Option>
                                    ))
                                }
                              </Select>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <div className='header_payment_page_part'>
                      Deleted
                    </div>
                    <hr className='endline_payment' />
                    <div style={{ padding: "15px", lineHeight: "30px" }} className='main_container_card'>
                      This payment request expired, and we've sent a new payment request for you.
                    </div>
                  </React.Fragment>
                }
                <div style={{ height: "15px" }}></div>
                <Modal onCancel={() => {
                  this.setState({ visibleModal: false })
                }} footer={null} title="Payment" visible={this.state.visibleModal} >
                  <App />
                </Modal>
              </>
          }
        </div>
    );
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

const paywiz = connect(mapStateToProps)(SelectPaymentMethod)

export default paywiz

