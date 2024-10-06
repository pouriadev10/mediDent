import React, { Component } from "react";
import { notification, Modal, Tag, Divider, Row, Col, Card, Button, Menu, Dropdown } from "antd";
import { Paymentcontroller } from "../../Paymentcontroller";
import DashboardPagePaymentTransactionDetail from "./DashboardPagePaymentTransactionDetail";
import DashboardPagePaymentFailedDetail from "./DashboardPagePaymentFailedDetail";
import DynamicProgress from '../Transaction/DynamicProgress';
import "./style.css";
import config from "../../config";
import buttonSvgrepo from '../../assets/img/download-button-svgrepo-com.svg'

//Icons
import user from '../../assets/icons/user.svg';
import call from '../../assets/icons/call.png';
import sms from '../../assets/icons/sms.png';
import buliding from '../../assets/icons/buliding.png';
import loc from '../../assets/icons/location.png';
import download from '../../assets/icons/frame.png';
import calender from '../../assets/icons/calendar-2.svg';
import vector from '../../assets/icons/wallet.svg';
import coin from '../../assets/icons/coin.svg';


class DashboardPagePaymentDetail extends Component {
  getPaymentData = async (props) => {
    this.setState({
      loading: true,
    });
    if (window.location.href.split("/") && props.selectediD) {
      localStorage.setItem("paymentId", props.selectediD);
      const response = await Paymentcontroller.get_payment_data(
        props.selectediD
      );
      this.setState({
        payment_data: response,
        loading: false,
      });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      mode: "transaction",
      loading: true,
      stripe_complete: true,
      payment_data: {},
      visibleModal: false,
      openModalMultiFile: false,
      downloadMultiFileTitle: "",
      ModalMultiFileData: []
    };
    this.getPaymentData(props);
    this.handlePayment = this.handlePayment.bind(this);
    this.nextOption = this.nextOption.bind(this);
  }


  nextOption = async () => {
    const response = await Paymentcontroller.get_payment_data(
      window.location.href.split("/")[
      window.location.href.split("/").length - 1
      ]
    );

    if (response.paid || response.status == "subscription") {
      localStorage.setItem("Payment-Receipt", true);
      window.location.href = "#/payment-Done";
    } else {
      localStorage.setItem("Payment-Receipt", false);
      if (!response.billing_complete) {
        this.setState({
          stripe_complete: false,
        });
      } else {
        window.location.href =
          "/#/payment-flow/" +
          window.location.href.split("/")[
          window.location.href.split("/").length - 1
          ];
      }
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
  handleSubmit2 = () => {
    window.location.href =
      "/#/payment-flow/" +
      window.location.href.split("/")[
      window.location.href.split("/").length - 1
      ];
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
        window.location.href = "#/payment-Done";
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

  componentDidUpdate(prevProps) {
    if (prevProps.selectediD !== this.props.selectediD) {
      this.setState({
        payment_data: {},
      });
      this.getPaymentData(this.props);
    }
  }

  getStrokeColors = () => {
    const { transactionsDetail, transactionId } = this.state;
    if (!transactionsDetail || !transactionsDetail.all_transactions) {
      return ["#23D020"]; // Default color if no transactions are available
    }

    return transactionsDetail.all_transactions.map(transaction =>
      transaction.id === transactionId ? '#EE615B' : '#23D020'
    );
  };

  render() {
    // const paidInstallmentsCount = this.state.payment_data.installments
    //   ? this.state.payment_data.installments.filter(installment => installment.status === 'paid').length
    //   : 0;

    // const totalInstallments = this.state.payment_data.number_of_installments ? this.state.payment_data.number_of_installments : 0;

    // const perc = totalInstallments > 0 ? (paidInstallmentsCount / totalInstallments) * 10 : 0;
    // console.log(perc);

    // const value = Math.ceil(perc) * 10;
    // console.log(value);

    const paidInstallmentsCount = this.state.payment_data.installments
      ? this.state.payment_data.installments.filter(installment => installment.status === 'failed' || installment.status === 'paid').length

      : 0;

    const paidInstallmentsCount2 = this.state.payment_data.installments
      ? this.state.payment_data.installments.filter(installment => installment.status === 'paid').length

      : 0;

    const totalInstallments = this.state.payment_data.number_of_installments ? this.state.payment_data.number_of_installments : 0;

    // const perc = totalInstallments > 0 ? (paidInstallmentsCount / totalInstallments) * 10 : 0;
    const perc = totalInstallments > 0 ? (paidInstallmentsCount * 100) / totalInstallments : 0;

    console.log(perc);

    const paymentType = localStorage.getItem('type')
    const { payment_data } = this.state
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
    )



    return (
      <>
        {/* <Card style={{ marginTop: 25 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: 65 }}>
              <div style={{ marginBottom: 20, fontSize: '16px' }}>Patient Information</div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                <img src={user} alt="" style={{ marginRight: 10 }} />
                <span style={{ fontSize: '13px', fontWeight: '400' }}>
                  {this.state.payment_data &&
                    this.state.payment_data.guarantor_firstname &&
                    this.state.payment_data.guarantor_lastname
                    ? this.state.payment_data.guarantor_firstname +
                    " " +
                    this.state.payment_data.guarantor_lastname
                    : "-"
                  }
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
                <span style={{ fontSize: '13px' }}>
                  {this.state.payment_data.guarantor_email
                    ? this.state.payment_data.guarantor_email
                    : "-"}
                </span>
              </div>
            </div>
            <div style={{marginLeft: 60}}>
              <div style={{ marginBottom: 20, fontSize: '16px' }}>Clinic Information</div>
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
        </Card> */}
        {/* <div className="flex-row12" >
          <p className="reason-color">Reason:</p>
          <span className="reason-span">
            {this.state.payment_data.other_reason ? (
              <span>{this.state.payment_data.other_reason}</span>
            ) : (
              <div className="tag-mr">
              {this.state.payment_data.reason_data &&
                this.state.payment_data.reason_data.map((item, index) => (
                  <Tag key={index} className="tag_reason" color="rgba(233, 230, 255, 1)">
                    {item.reason}
                  </Tag>
                ))}
            </div>
            )}
          </span>
        </div>
        <div className="flex-row123" >
          <p>Created Date</p>
          <span className="reason-span">
            {this.state.payment_data.created_at
              ? new Date(this.state.payment_data.created_at)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\.\d+Z$/, "")
              : "-"}
          </span>
        </div> */}
        {/* <div className="flex-row123" style={{ justifyContent: 'space-between' }}>
          <Card className="card-size11">
            <div className="card-size11">
              <div>Patient Invoice</div>
              <Button
                type="text"
                icon={<img src={download} alt="" />}
                style={{ color: "#979797", marginLeft: 'auto', marginRight: 40 }}
                onClick={() => {
                  if (this.state.payment_data &&
                    this.state.payment_data.invoice &&
                    this.state.payment_data.invoice.length > 0
                  ) {
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
                          window.open(config.apiGateway.URL + item.invoice, '_blank');
                        }
                      })
                    }

                  }
                }}
              />
            </div>
          </Card>
          <Card className="card-size11">
            <div className="card-size11">
              <div style={{ width: '90%' }}>Supporting Document</div>
              <Button
                type="text"
                icon={<img src={download} alt="" />}
                style={{ color: "#979797", marginLeft: 'auto', marginRight: 40 }}
                onClick={() => {
                  if (this.state.payment_data &&
                    this.state.payment_data.supporting_document &&
                    this.state.payment_data.supporting_document.length > 0
                  ) {

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
                          window.open(config.apiGateway.URL + item.supporting_document, '_blank');
                        }
                      })
                    }
                  }

                }}
              />
            </div>
          </Card>
        </div>

        <div className="flex-row123">
          <p className="amount-size-color">Amount Due</p>
          <span className="reason-span1">
            {this.state.payment_data.amount
              ? this.state.payment_data.amount
              : "-"}
          </span>
        </div>
        <hr /> */}

        <Card style={{ marginTop: 25, padding: 10, marginBottom: 15 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p style={{ marginRight: 15, fontSize: 14 }}>Payment Plan ID</p>
              <div style={{ width: 23, height: 23, fontSize: 10, color: '#6B43B5', borderRadius: '50%', border: '1px solid #6B43B5', background: '#E9E6FF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {this.props.selectediD}
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', position: 'absolute', left: 283 }}>
                <p>Created At</p>
                <span style={{ fontSize: 12, color: '#848696', marginLeft: 10, marginTop: 2 }}>
                  {this.state.payment_data.created_at
                    ? new Date(this.state.payment_data.created_at).toLocaleDateString()
                    : "-"}
                </span>
              </div>

            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: 110 }}>
              <div style={{ marginBottom: 20, fontSize: '14px', fontWeight: '600' }}>Patient Information</div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                <img src={user} alt="" style={{ marginRight: 10 }} />
                <span style={{ fontSize: '13px', fontWeight: '400' }}>
                  {this.state.payment_data &&
                    this.state.payment_data.guarantor_firstname &&
                    this.state.payment_data.guarantor_lastname
                    ? this.state.payment_data.guarantor_firstname +
                    " " +
                    this.state.payment_data.guarantor_lastname
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
                <span style={{ fontSize: '13px' }}>
                  {this.state.payment_data.guarantor_email
                    ? this.state.payment_data.guarantor_email
                    : "-"}
                </span>
              </div>
            </div>
            <div style={{ marginLeft: 5 }}>
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
                <span>{other_reason}</span>
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
              style={{ cursor: "pointer" }}
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
              style={{ cursor: "pointer" }}
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
          <p className="amount-size-color" style={{ fontWeight: '600' }}>Total Amount</p>
          <span className="reason-span1">
            {this.state.payment_data.amount
              ? this.state.payment_data.amount
              : "-"}
          </span>
        </div>
        {this.state.payment_data && this.state.payment_data.mode === 'installment' && (
          <>
            <p style={{ fontSize: 16, color: "black", fontWeight: '600' }}>Payment Plan Terms</p>
            <div>
              <Col style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src={calender} alt="" />
                  <p style={{ marginLeft: 5, marginTop: 16, fontSize: 13 }}><span style={{ fontSize: 13, color: '#848696' }}>Start : </span> {this.state.payment_data && this.state.payment_data.installment_data ? new Date(this.state.payment_data.installment_data.start_date).toISOString().split('T')[0] : '-'}
                  </p>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row', marginLeft: "auto" }}>
                    <img src={calender} alt="" />
                    <p style={{ marginLeft: 5, marginTop: 16, fontSize: 13 }}><span style={{ fontSize: 13, color: '#848696' }}>End : </span> {this.state.payment_data && this.state.payment_data.installment_data ? new Date(this.state.payment_data.installment_data.end_date).toISOString().split('T')[0] : '-'}
                    </p>
                  </div>
                </div>
              </Col>
              <Col style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src={coin} alt="" />
                  <p style={{ marginLeft: 5, marginTop: 16, fontSize: 13 }}><span style={{ fontSize: 13, color: '#848696' }}>Installment Period: : </span> {this.state.payment_data && this.state.payment_data.installment_data ? (this.state.payment_data.installment_data.interval_count) : '-'}  Months</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src={vector} alt="" />
                  <p style={{ marginLeft: 5, marginTop: 16, fontSize: 13 }}><span style={{ fontSize: 13, color: '#848696' }}>Monthly Amount : </span> ${this.state.payment_data && this.state.payment_data.installment_data ? (parseFloat(this.state.payment_data.installment_data.monthly_amount).toFixed(2)) : '-'}</p>
                </div>
              </Col>
            </div>
            <div>
              {this.state.payment_data && this.state.payment_data.mode === 'installment' && (
                <>
                  <p style={{ fontSize: 16, marginTop: 15, color: "black", fontWeight: '600' }}>Installment Timeline</p>
                  <DynamicProgress
                    // percent={this.state.payment_data.installments ? (this.state.payment_data.installments.length 
                    // ) * 10 : 0}
                    percent={perc}
                    steps={this.state.payment_data.number_of_installments ? this.state.payment_data.number_of_installments : 0}
                    stroke={"#23D020"} />
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 12, color: '#B7B7B7' }}>{paidInstallmentsCount2} Paid</p>
                    <p style={{ marginLeft: 'auto', fontSize: 12 }}>{totalInstallments - paidInstallmentsCount2} Left</p>
                  </div>
                </>
              )}

            </div></>
        )}
        <p style={{ fontSize: 16, color: "black", fontWeight: '600' }}>Transaction History</p>
        <div
          className="header_payment_page_part pt0 mt0"
          style={{ marginBottom: 25 }}
        >
          <span
            onClick={() => {
              this.setState({
                mode: "transaction",
              });
            }}
            style={{
              fontSize: 14,
              color: this.state.mode == "transaction" ? "#6B43B5" : "",
              cursor: "pointer",
              textDecoration:
                this.state.mode == "transaction" ? "underline" : "",
            }}>Processed Payments</span>

          <Divider type="vertical" />

          <span
            onClick={() => {
              this.setState({
                mode: "failed",
              });
            }}
            style={{
              fontSize: 14,
              color: this.state.mode != "transaction" ? "#6B43B5" : "",
              cursor: "pointer",
              textDecoration:
                this.state.mode != "transaction" ? "underline" : "",
            }}
          >
            Failed Payments
          </span>
        </div>
        {this.state.mode == "transaction" ? (
          <DashboardPagePaymentTransactionDetail
            selectediD={this.props.selectediD}
          />
        ) : (
          <DashboardPagePaymentFailedDetail
            selectediD={this.props.selectediD}
          />
        )}

        <Modal
          className="mwf"
          visible={this.state.openModalMultiFile}
          title={this.state.downloadMultiFileTitle}
          onCancel={() => {
            this.setState({
              openModalMultiFile: false,
              downloadMultiFileTitle: "",
              ModalMultiFileData: []
            });
          }}
          footer={null}
        >
          {
            this.state.ModalMultiFileData &&
              this.state.ModalMultiFileData.length > 0 ?
              this.state.ModalMultiFileData.map((item) => (
                <Row type="flex" justify="space-between" className="lineHeightModalStyle">
                  <Col>
                    {
                      item.invoice ? item.invoice.split('/').pop() :
                        item.supporting_document ? item.supporting_document.split('/').pop() : ""
                    }
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
              <></>
          }

        </Modal>

      </>
    );
  }
}

export default DashboardPagePaymentDetail;
