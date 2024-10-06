import React, { Component } from "react";
import PropTypes from "prop-types";  
import { Paymentcontroller } from "../../../Paymentcontroller";
import { Tag,Spin,Button } from "antd";
import config from "../../../config"; 

class PaymentDoneMulti extends Component {
  getPaymentData = async () => {
    var a = ""
    const getData = async () => {
      if (localStorage.getItem("payAdminId")) {
        while (!this.state.haveRecipt) {
          const response = await Paymentcontroller.get_payment_data(
            localStorage.getItem("payAdminId")
          );
          localStorage.setItem("paymentIdPrint", localStorage.getItem("payAdminId"));
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


        <div>
          <div className="decorLine" style={{ marginTop: "15px" }}></div>
          <div className="body">
            <div className="stepCards">
              <div className="muiCardBody" style={{ marginBottom: "25px" }}>
                <div className="muiCard">
                  <div style={{ marginTop: "15px" }}></div>
                  <div>
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
                      <></>
                    ) : (
                      <p style={{ color: "#25b96d", fontSize: "20px" }}>
                        An instalment plan has been created for you
                        successfully!
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

                    <Button
                      onClick={

                        () => {
                          window.open(
                            config.apiGateway.URL + this.state.payment_data.receipt_file,
                            "_blank"
                          );
                        } 

                      }
                      disabled={!this.state.haveRecipt ? true : false}
                      className={"login-btn"}
                      style={{ width: "92%" }}
                      type="primary" size="large"
                    >
                      {
                        this.state.haveRecipt ? "Print" : <Spin spinning className="circularprogress-button" />
                      }

                    </Button>

                    <div style={{ height: "15px" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PaymentDoneMulti.propTypes = {
  classes: PropTypes.object,
};

export default  PaymentDoneMulti 
