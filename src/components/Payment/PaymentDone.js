import React, { Component } from "react";
import PropTypes from "prop-types";
import "../app.local.css";
import PoweredBy from "../CommonUi/PoweredBy";
import { Paymentcontroller } from "../../Paymentcontroller";
import { Tag, Modal, Row, Col, Spin, Button, } from "antd";
import config from "../../config";
import buttonSvgrepo from '../../assets/img/download-button-svgrepo-com.svg'
class PaymentDone extends Component {

  getPaymentData = async () => {
    var a = ""

    var counter = 0;
    var maxCounter = 10;


    const getData = async () => {
      var id = localStorage.getItem('paymentId')
      if (id) {
        while (!this.state.haveRecipt && this.state.payment_data.mode != "installment") {
          if (maxCounter <= counter) {
            this.setState({
              haveRecipt: "failed"
            })
            break;
          }

          counter = counter + 1
          const response = await Paymentcontroller.get_payment_data(
            id
          );
          localStorage.setItem("paymentIdPrint", id);
          //localStorage.removeItem("paymentId");
          if (response.receipt_file)
            this.setState({
              haveRecipt: true
            })
          console.log(response)
          this.setState({ payment_data: response });
        }
      }
      else {
        window.location.href = "/";
      }
    };


    getData()
  };
  constructor(props) {
    super(props);
    this.state = {
      haveRecipt: false,
      payment_data: {},
      visibleModal: false,
      PaymentReceipt: false,
    };
    this.getPaymentData();
  }

  render() {
    return (
      <div>
        {/* <div className="dashboard-container">
          <div className="pageBody wizard-page"> */}
            {/* <div className="page-header">
              <div className="title pageHeader">
                {this.state.payment_data &&
                  this.state.payment_data.office_logo ? (
                  <img
                    className="bookcLogo"
                    src={this.state.payment_data.office_logo + ""}
                    alt="logo"
                  />
                ) : (
                  <></>
                )}
              </div>
            </div> */}
            <div>
              <div className="decorLine" style={{ marginTop: "15px" }}></div>
              <div className="body">
                <div className="stepCards">
                  <div className="muiCardBody" style={{ marginBottom: "25px" }}>
                    <div className="muiCard">
                      <div style={{ marginTop: "15px" }}></div>
                      <div style={{padding: 15}}>
                        <svg
                          fill="#25b96d"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                          width="50px"
                          height="50px"
                        >
                          <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
                        </svg>
                        <div style={{ marginTop: "15px" }}></div>
                        {localStorage.getItem("Payment-Receipt") != "false" ? (
                          <>
                            <p style={{ color: "#25b96d", fontSize: "20px" }}>
                              Payment Receipt
                            </p>
                          </>
                        ) : (
                          <p style={{ color: "#25b96d", fontSize: "20px" }}>
                            Payment Successful!
                          </p>
                        )}
                        <div style={{ marginTop: "15px" }}></div>
                        <div className="header_payment_page_part">
                          Patient Information
                        </div>
                        <div className="main_container_card ">
                          <div>
                            <div>Name</div>
                            <div>Email</div>
                            <div>Phone</div>
                            <div>Reason</div>
                          </div>
                          <div className="align_rights_items">
                            <div>
                              {this.state.payment_data.guarantor_firstname &&
                                this.state.payment_data.guarantor_lastname
                                ? this.state.payment_data.guarantor_firstname +
                                " " +
                                this.state.payment_data.guarantor_lastname
                                : "-"}
                            </div>
                            <div>
                              {this.state.payment_data.guarantor_email
                                ? this.state.payment_data.guarantor_email
                                : "-"}
                            </div>
                            <div>
                              {this.state.payment_data.guarantor_phone
                                ? this.state.payment_data.guarantor_phone
                                : "-"}
                            </div>
                            <div>
                              {this.state.payment_data.other_reason ? (
                                <span>
                                  {this.state.payment_data.other_reason}
                                </span>
                              ) : (
                                this.state.payment_data.reason_data &&
                                this.state.payment_data.reason_data.map(
                                  (item) => (
                                    <Tag
                                      style={{
                                        marginRight: "0px",
                                        marginLeft: "2px",
                                      }}
                                      color="purple"
                                    >
                                      {item.reason}
                                    </Tag>
                                  )
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="header_payment_page_part">
                          Clinic Information
                        </div>
                        <div className="main_container_card ">
                          <div>
                            <div>Name</div>
                          </div>
                          <div className="align_rights_items">
                            <div>
                              {this.state.payment_data.office_name
                                ? this.state.payment_data.office_name
                                : "-"}
                            </div>
                          </div>
                        </div>
                        <div className="main_container_card pt0 fwb mt15 ">
                          <div>
                            <div>Patient Invoice</div>
                          </div>
                          <div className="align_rights_items" s>
                            <div style={
                              this.state.payment_data &&
                                this.state.payment_data.invoice &&
                                this.state.payment_data.invoice.length > 0
                                ?
                                { cursor: "pointer" } : {}}
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
                            >
                              {
                                this.state.payment_data &&
                                  this.state.payment_data.invoice && this.state.payment_data.invoice.length > 0 ?
                                  <img style={{ width: "20px", marginTop: "-10px", cursor: "pointer" }} alt="download" src={buttonSvgrepo} />
                                  :
                                  "-"
                              }


                            </div>
                          </div>
                        </div>
                        <div className="main_container_card pt0 fwb ">
                          <div>
                            <div>Supporting Document</div>
                          </div>
                          <div className="align_rights_items" s>
                            <div style={
                              this.state.payment_data &&
                                this.state.payment_data.supporting_document &&
                                this.state.payment_data.supporting_document.length > 0
                                ?
                                { cursor: "pointer" } : {}}
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
                            >
                              {
                                this.state.payment_data &&
                                  this.state.payment_data.supporting_document && this.state.payment_data.supporting_document.length > 0 ?
                                  <img style={{ width: "20px", marginTop: "-10px", cursor: "pointer" }} src={buttonSvgrepo} />
                                  :
                                  "-"
                              }


                            </div>
                          </div>
                        </div>

                        <hr className="endline_payment" />
                        <div
                          className="main_container_card "
                          style={{ paddingTop: "0px", fontWeight: "bold" }}
                        >
                          <div>
                            <div>Amount</div>
                          </div>
                          <div className="align_rights_items">
                            <div>
                              {this.state.payment_data.amount
                                ? this.state.payment_data.amount
                                : "-"}
                            </div>
                          </div>
                        </div>

                        <div style={{ height: "15px" }}></div>
                        {
                          !this.state.haveRecipt && this.state.payment_data.mode == "installment" ? <></>
                            :
                            <Button
                              onClick={
                                () => {
                                  window.open(
                                    config.apiGateway.URL + this.state.payment_data.receipt_file,
                                    "_blank"
                                  );
                                }
                              }
                              style={{ display: this.state.haveRecipt == "failed" ? "none" : "" }}
                              disabled={!this.state.haveRecipt ? true : false}
                              className={"login-btn submit-wizard-btn w100p"}
                              type="primary" size="large"
                            >
                              {
                                this.state.haveRecipt ? "Print" : <Spin spinning className="circularprogress-button" />
                              }

                            </Button>
                        }


                        <div style={{ height: "15px" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* </div>
        </div> */}
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
      </div >
    );
  }
}

PaymentDone.propTypes = {
  classes: PropTypes.object,
};

export default PaymentDone 
