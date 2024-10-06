import { notification, Modal, Tag, Row, Col, Button, Card, Menu, Dropdown } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Paymentcontroller } from '../../Paymentcontroller'
import buttonSvgrepoDisabled from '../../assets/img/download-button-svgrepo-com-disabled.svg'
import buttonSvgrepo from '../../assets/img/download-button-svgrepo-com.svg'
import config from '../../config'
import PoweredBy from '../CommonUi/PoweredBy'
import '../app.local.css'
import App from "../stripe/App"
import PaymentPdfDownloader from "./PaymentPdfDownloader"
import CreateGurantorBillingForm from './CreateGurantorBillingForm'
import SelectPaymentMethod from '../Payment/SelectPaymentMethod';
import CustomCard from '../Payment/Components/CustomCard'
import Payment from '../Payment/Payment';
import PaymentWizardStep2 from '../Payment/PaymentWizardStep2';



//Icons
import user from '../../assets/icons/user.svg';
import call from '../../assets/icons/call.png';
import sms from '../../assets/icons/sms.png';
import buliding from '../../assets/icons/buliding.png';
import loc from '../../assets/icons/location.png';
import download from '../../assets/icons/frame.png';

class PaymentFirstPage extends Component {
  getPaymentData = async () => {
    this.setState({
      loading: true
    });

    try {
      // Extract the payment ID from the URL or use the one from props if not available in the URL
      const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
      const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
      const paymentId = match ? match[1] : localStorage.getItem("payid") ? localStorage.getItem("payid") : localStorage.getItem("idPay");

      if (match) {
        localStorage.setItem("idPay", match[1])
      }
      // If match is found use it, otherwise use props

      localStorage.setItem("paymentId", paymentId);
      console.log("Selected ID:", this.props.selectedId);
      console.log("Payment ID:", paymentId);

      const response = await Paymentcontroller.get_payment_data(paymentId);
      console.log("Payment data response:", response);

      if (response.paid || response.status === "subscription") {
        localStorage.setItem("Payment-Receipt", true);
        window.location.href = "#/payment-Done";
      } else {
        const respo = await Paymentcontroller.checkMultiPaymentDone(paymentId);
        console.log("Check multi payment response:", respo);

        if (respo.status) {
          localStorage.setItem("Payment-Receipt", true);
          window.location.href = "#/payment-Done";
        } else {
          localStorage.setItem("Payment-Receipt", false);
        }
      }

      this.setState({
        payment_data: response,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching payment data:", error);
      this.setState({
        loading: false
      });
    }
  };



  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stripe_complete: true,
      payment_data: {},
      visibleModal: false,
      openModalMultiFile: false,
      downloadMultiFileTitle: "",
      ModalMultiFileData: [],
      selectedPaymentType: null,
      selectedIntervalId: null,
      getPaymentDataFromChild: null,
    };
    this.getPaymentData();
    this.handlePayment = this.handlePayment.bind(this);
    this.nextOption = this.nextOption.bind(this);
  }
  nextOption = async () => {
    const response = await Paymentcontroller.get_payment_data(
      window.location.href.split("/")[window.location.href.split("/").length - 1]
    )
    this.props.onNextStep();
    if (response.paid || response.status == "subscription") {
      localStorage.setItem("Payment-Receipt", true)
      // window.location.href = "#/payment-Done"
    } else {
      localStorage.setItem("Payment-Receipt", false)
      if (!response.billing_complete) {
        this.setState({
          stripe_complete: false
        })
      } else {
        window.location.href = "/#/payment-flow/" + window.location.href.split("/")[window.location.href.split("/").length - 1]
      }
    }
  };

  handleDataFromChild = (data) => {
    this.setState({ childData: data });
  }

  handleSelectPaymentType = (paymentType) => {
    this.setState({ selectedPaymentType: paymentType });
  };

  receiveGetPaymentData = (getPaymentDataFunc) => {
    this.setState({ getPaymentDataFromChild: getPaymentDataFunc });
  };


  handleIntervalChange = (intervalId) => {
    console.log("Setting Interval ID:", intervalId); // Confirming the input ID
    this.setState({ selectedIntervalId: intervalId }, () => {
      console.log("Updated Interval ID:", this.state.selectedIntervalId);
    });
  };


  // sendData = () => {
  //   this.props.sendDataToParent(this.childData);
  // }



  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectediD !== this.props.selectediD) {
      this.getPaymentData();
    }
    // Ensure `selectedIntervalId` changes trigger necessary updates or propogations
    if (prevState.selectedIntervalId !== this.state.selectedIntervalId) {
      console.log("Interval ID has changed:", this.state.selectedIntervalId);
      localStorage.setItem('interval Id', this.state.selectedIntervalId)
      // Trigger any action that depends on updated interval ID
    }

  }


  componentDidMount() {
    if (this.props.selectediD) {
      this.getPaymentData(this.props.selectediD);
    }
    // this.nextOption = async () => {
    //   const response = await Paymentcontroller.get_payment_data(
    //     window.location.href.split("/")[window.location.href.split("/").length - 1]
    //   )
    //   this.props.onNextStep();
    //   if (response.paid || response.status == "subscription") {
    //     localStorage.setItem("Payment-Receipt", true)
    //     window.location.href = "#/payment-Done"
    //   } else {
    //     localStorage.setItem("Payment-Receipt", false)
    //     if (!response.billing_complete) {
    //       this.setState({
    //         stripe_complete: false
    //       })
    //     } else {
    //       window.location.href = "/#/payment-flow/" + window.location.href.split("/")[window.location.href.split("/").length - 1]
    //     }
    //   }
    // };
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
    window.location.href = "/#/payment-flow/" + window.location.href.split("/")[window.location.href.split("/").length - 1]

  }



  handlePayment = async () => {
    if (this.state.payment_data.stripe_complete) {
      const response = await Paymentcontroller.paySinglePayment(
        window.location.href.split("/")[window.location.href.split("/").length - 1]
      )

      if (response.status < 250) {
        localStorage.setItem("Payment-Receipt", true)
        window.location.href = "#/payment-Done"
      } else {
        this.openNotification('bottom', response.error ? response.error : "Error", "Error");
      }
    } else {
      this.setState({ visibleModal: true })
    }
  }
  render() {
    const id = localStorage.getItem('paymentId')
    const { payment_data } = this.state;
    const { other_reason, reason_data } = payment_data || {};

    const menu = (
      <Menu>
        {reason_data && reason_data.slice(1).map((item) => (
          <Menu.Item key={item.reason}>
            <Tag className="tag_reason" color="rgba(233, 230, 255, 1)" style={{ cursor: 'pointer' }}>
              {item.reason}
            </Tag>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <><div>
        {this.state.loading ? (
          <>Loading...</>
        ) : (
          !this.state.stripe_complete ? (
            <>
              <hr className='endline_payment' />
              <CreateGurantorBillingForm handleSubmit2={this.handleSubmit2} />
            </>
          ) : (
            <>

              <Card style={{
                marginTop: 25, padding: 10, maxWidth: '100%', '@media (max-width: 768px)': {
                  width: '100%', // Full width on mobile devices
                },
              }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <p style={{ marginRight: 15, fontSize: 14 }}>Payment Plan ID</p>
                      <span className='mr-65' style={{ width: 23, height: 23, fontSize: 10, color: '#6B43B5', borderRadius: '50%', border: '1px solid #6B43B5', background: '#E9E6FF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {id}
                      </span>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginRight: 45 }} className='resp-card'>
                      <p>Created At</p>
                      <span style={{ fontSize: 12, color: '#848696', marginLeft: 10, marginTop: 2 }}>
                        {this.state.payment_data.created_at
                          ? new Date(this.state.payment_data.created_at).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>

                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }} className='container-resp'>
                  <div style={{ minWidth: '260px' }} className='resp-div'>

                    <div style={{ marginBottom: 20, fontSize: '14px', fontWeight: '600' }}>Patient Information</div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                      <img src={user} alt="" style={{ marginRight: 10 }} />
                      <span style={{ fontSize: '13px', fontWeight: '400' }}>
                        {this.state.payment_data &&
                          this.state.payment_data.guarantor_firstname &&
                          this.state.payment_data.guarantor_lastname
                          ? this.state.payment_data.guarantor_firstname + " " + this.state.payment_data.guarantor_lastname
                          : "-"}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                      <img src={call} alt="" style={{ marginRight: 10 }} />
                      <span style={{ fontSize: '13px' }}>
                        {this.state.payment_data.guarantor_phone
                          ? this.state.payment_data.guarantor_phone
                          : "-"}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={sms} alt="" style={{ marginRight: 10 }} />
                      <span
                        style={{
                          fontSize: '13px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '259px' // You can adjust the max width to fit your layout
                        }}
                      >
                        {this.state.payment_data.guarantor_email
                          ? this.state.payment_data.guarantor_email
                          : "-"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: 20, fontSize: '14px', fontWeight: '600' }}>Clinic Information</div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                      <img src={buliding} alt="" style={{ marginRight: 10 }} />
                      <span style={{ fontSize: '13px', fontWeight: '400' }}>
                        {this.state.payment_data.office_name
                          ? this.state.payment_data.office_name
                          : "-"}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                      <img src={call} alt="" style={{ marginRight: 10 }} />
                      <span style={{ fontSize: '13px' }}>
                        {this.state.payment_data.office_phone
                          ? this.state.payment_data.office_phone
                          : "-"}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={loc} alt="" style={{ marginRight: 10 }} />
                      <span style={{ fontSize: '13px' }}>
                        {this.state.payment_data.office_address
                          ? this.state.payment_data.office_address
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-row12">
                  <p className="reason-color">Reason</p>
                  <span className="reason-span">
                    {other_reason ? (
                      <Tag className="tag_reason" color="rgba(233, 230, 255, 1)">
                        <span>{other_reason}</span>
                      </Tag>
                    ) : (
                      <div className='tag-mr'>
                        {reason_data && reason_data.length > 0 && (
                          <>
                            <Tag className="tag_reason" color="rgba(233, 230, 255, 1)">
                              {reason_data[0].reason}
                            </Tag>
                            {reason_data.length > 1 && (
                              <Dropdown overlay={menu} placement="bottomLeft">
                                <Tag className="tag_reason" color="rgba(233, 230, 255, 1)" style={{ cursor: 'pointer' }}>
                                  + {reason_data.length - 1}
                                </Tag>
                              </Dropdown>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </span>
                </div>

                <div className="flex-row123" style={{ justifyContent: 'space-between' }}>
                  <Card className="card-size11"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (this.state.payment_data &&
                        this.state.payment_data.invoice &&
                        this.state.payment_data.invoice.length > 0) {
                        if (this.state.payment_data.invoice.length > 1) {
                          console.log(this.state.payment_data.invoice)
                          this.setState({
                            openModalMultiFile: true,
                            downloadMultiFileTitle: "Download Invoices Files",
                            ModalMultiFileData: this.state.payment_data.invoice
                          })
                        } else {
                          this.state.payment_data.invoice.forEach(item => {
                            if (item && item.invoice) {
                              window.open(config.apiGateway.URL + item.invoice, '_blank')
                            }
                          })
                        }
                      }
                    }}
                  >
                    <div className="card-size11">
                      <div style={{ fontSize: 12 }}>Patient Invoice</div>
                      <Button
                        type="text"
                        icon={<img src={download} alt="" />}
                        style={{ color: "#979797", marginLeft: 'auto', marginRight: 40 }}
                        onClick={() => {
                          if (this.state.payment_data &&
                            this.state.payment_data.invoice &&
                            this.state.payment_data.invoice.length > 0) {
                            if (this.state.payment_data.invoice.length > 1) {
                              console.log(this.state.payment_data.invoice)
                              this.setState({
                                openModalMultiFile: true,
                                downloadMultiFileTitle: "Download Invoices Files",
                                ModalMultiFileData: this.state.payment_data.invoice
                              })
                            } else {
                              this.state.payment_data.invoice.forEach(item => {
                                if (item && item.invoice) {
                                  window.open(config.apiGateway.URL + item.invoice, '_blank')
                                }
                              })
                            }
                          }
                        }} />
                    </div>
                  </Card>
                  <Card className="card-size11"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (this.state.payment_data &&
                        this.state.payment_data.supporting_document &&
                        this.state.payment_data.supporting_document.length > 0) {
                        if (this.state.payment_data.supporting_document.length > 1) {
                          console.log(this.state.payment_data.supporting_document)
                          this.setState({
                            openModalMultiFile: true,
                            downloadMultiFileTitle: "Download Supporting Document Files",
                            ModalMultiFileData: this.state.payment_data.supporting_document
                          })
                        } else {
                          this.state.payment_data.supporting_document.forEach(item => {
                            if (item && item.supporting_document) {
                              window.open(config.apiGateway.URL + item.supporting_document, '_blank')
                            }
                          })
                        }
                      }
                    }}
                  >
                    <div className="card-size11">
                      <div style={{ fontSize: 12 }}>Supporting Document</div>
                      <Button
                        type="text"
                        icon={<img src={download} alt="" />}
                        style={{ color: "#979797", marginLeft: 'auto', marginRight: 40 }}
                        onClick={() => {
                          if (this.state.payment_data &&
                            this.state.payment_data.supporting_document &&
                            this.state.payment_data.supporting_document.length > 0) {
                            if (this.state.payment_data.supporting_document.length > 1) {
                              console.log(this.state.payment_data.supporting_document)
                              this.setState({
                                openModalMultiFile: true,
                                downloadMultiFileTitle: "Download Supporting Document Files",
                                ModalMultiFileData: this.state.payment_data.supporting_document
                              })
                            } else {
                              this.state.payment_data.supporting_document.forEach(item => {
                                if (item && item.supporting_document) {
                                  window.open(config.apiGateway.URL + item.supporting_document, '_blank')
                                }
                              })
                            }
                          }
                        }} />
                    </div>
                  </Card>
                </div>
              </Card>
              <div className="flex-row123">
                <p className="amount-size-color">Total Amount</p>
                <span className="reason-span1">
                  {this.state.payment_data.amount
                    ? this.state.payment_data.amount
                    : "-"}
                </span>
              </div>

              {/* <hr /> */}

              <p style={{ fontSize: 16 }}>Select Your Payment Method:</p>

              <SelectPaymentMethod
                selectedPaymentId={this.props.selectediD}
                onNextStep={this.nextOption}
                provideGetPaymentData={this.state.getPaymentDataFromChild}
                onSelectPaymentType={this.handleSelectPaymentType}
                onIntervalSelect={this.handleIntervalChange} />
              {this.state.selectedPaymentType === 'single' ? (
                <Payment
                  onNextStep={this.handleNextStep}
                  selectedId={this.props.selectediD} />
              ) : null}
              {this.state.selectedPaymentType === 'wizard' && (
                <PaymentWizardStep2
                  onNextStep={this.nextOption}
                  selectediD={this.props.selectediD}
                  selectedIntervalId={this.state.selectedIntervalId} // Ensure this is from state, not props
                  provideGetPaymentData={this.receiveGetPaymentData}
                />
              )}
            </>
          )
        )}
      </div><Modal
        className="mwf"
        visible={this.state.openModalMultiFile}
        title={this.state.downloadMultiFileTitle}
        onCancel={() => {
          this.setState({
            openModalMultiFile: false,
            downloadMultiFileTitle: "",
            ModalMultiFileData: []
          })
        }}
        footer={null}
      >
          {this.state.ModalMultiFileData &&
            this.state.ModalMultiFileData.length > 0 ?
            this.state.ModalMultiFileData.map((item) => (
              <Row type="flex" justify="space-between" className="lineHeightModalStyle">
                <Col>
                  {item.invoice ? item.invoice.split('/').pop() :
                    item.supporting_document ? item.supporting_document.split('/').pop() : ""}
                </Col>
                <Col>
                  <img
                    onClick={() => {
                      item.invoice ?
                        window.open(config.apiGateway.URL + item.invoice, '_blank')
                        :
                        window.open(config.apiGateway.URL + item.supporting_document, '_blank')
                    }}
                    alt="download" style={{ width: "20px", marginTop: "-10px", cursor: "pointer" }} src={buttonSvgrepo} />
                </Col>
              </Row>
            ))
            :
            <></>}

        </Modal></>
    );

  }
}

PaymentFirstPage.propTypes = {
  classes: PropTypes.object,
}

export default PaymentFirstPage; 
