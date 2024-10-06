import React, { Component } from "react";
import "../app.local.css";
import Logo from "../../assets/img/logo-bookc.png";
import { connect } from "react-redux";
import PoweredBy from "../CommonUi/PoweredBy";
import { notification, Modal, Spin, Input } from "antd";
import { Paymentcontroller } from "../../Paymentcontroller";
import App from "../stripe/App";
import { Error } from "../../ErrorHandeling";
import HelcimForm from "./HelcimForm"
import CreateGurantorBillingForm from "./CreateGurantorBillingForm";
const { TextArea } = Input;

const styles = (theme) => ({
  root: {
    width: "90%",
  },
  iconContainer: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  connectorActive: {
    "& $connectorLine": {
      borderColor: theme.palette.secondary.main,
    },
  },
  connectorCompleted: {
    "& $connectorLine": {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorDisabled: {
    "& $connectorLine": {
      borderColor: theme.palette.grey[100],
    },
  },
  connectorLine: {
    transition: theme.transitions.create("border-color"),
  },
});

class PaymentWizard extends Component {
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
    let { name, value } = e.target;
    if (name == "cell") {
      value = value.replaceAll(" ", "");
      if (value.length < 10) {
        value = value
          .replace(/[^\dA-Z]/g, "")
          .replace(/(.{3})/g, "$1 ")
          .trim();
        this.setState((prevState) => {
          let myObject = Object.assign({}, prevState.payment_data);

          myObject[name] = value;

          return { payment_data: myObject };
        });
      } else if (value.length == 10) {
        value =
          value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6);
        this.setState((prevState) => {
          let myObject = Object.assign({}, prevState.payment_data);

          myObject[name] = value;

          return { payment_data: myObject };
        });
      }
    } else {
      this.setState((prevState) => {
        let myObject = Object.assign({}, prevState.payment_data);

        myObject[name] = value;

        return { payment_data: myObject };
      });
    }
  }

  handleBirthDateChange(value, dateString) {
    const name = "birth_date";
    this.setState((prevState) => {
      let myObject = Object.assign({}, prevState.payment_data);
      myObject[name] = value;
      return { payment_data: myObject };
    });
  }

  handleSubmit2 = () => {
    this.props.onSubmitStepOne("done");
  };

  readHelcimData = async () => {
    const response = await Paymentcontroller.getHelcimToken(
      window.location.href.split("/")[
      window.location.href.split("/").length - 1
      ]
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

  handleSubmit = async (e) => {
    this.setState({
      loading: true,
      formError: {
        first_name: {
          massage: "",
          status: true,
        },
        last_name: {
          massage: "",
          status: true,
        },
        birth_date: {
          massage: "",
          status: true,
        },
        email: {
          massage: "",
          status: true,
        },
        phone: {
          massage: "",
          status: true,
        },
        address: {
          massage: "",
          status: true,
        },
      },
    });
    const first_name_validation = await Error.NameHandling(
      this.state.payment_data.firstname
    );
    const last_name_validation = await Error.NameHandling(
      this.state.payment_data.lastname
    );
    const birth_date_validation = await Error.BirthDateHandling(
      this.state.payment_data.birthdate
    );
    const email_validation = await Error.EmailHandling(
      this.state.payment_data.email
    );
    const phone_validation = await Error.PhoneHandling(
      this.state.payment_data.cell.replace(/ /g, "")
    );
    const address_validation = await Error.NameHandling(
      this.state.payment_data.address
    );
    if (
      first_name_validation.status &&
      last_name_validation.status &&
      email_validation.status &&
      phone_validation.status
    ) {
      const payID = window.location.href.split("wizard-payment/")[1];

      const response = await Paymentcontroller.getPatientId(payID);
      localStorage.setItem("patientData", JSON.stringify(response));

      const response_send_customer_data = await Paymentcontroller.send_customer_data(
        this.state.payment_data.firstname,
        this.state.payment_data.lastname,
        this.state.payment_data.email,
        this.state.payment_data.cell.replace(/ /g, ""),
        this.state.payment_data.address,
        this.state.payment_data.id
      );
      if (response_send_customer_data.status < 250) {
        localStorage.setItem(
          "customer_id",
          response_send_customer_data.customer_id
        );
        this.openNotification(
          "bottom",
          JSON.stringify(response_send_customer_data.success),
          "Successful"
        );
        this.props.onSubmitStepOne("done");
      } else {
        this.openNotification(
          "bottom",
          response_send_customer_data.detail
            ? response_send_customer_data.detail
            : "an error occurred during submit process",
          "Error"
        );
        this.setState({
          loading: false,
          formError: {
            first_name: {
              massage: response_send_customer_data.first_name
                ? response_send_customer_data.first_name[0]
                : "",
              status: response_send_customer_data.first_name ? false : true,
            },
            last_name: {
              massage: response_send_customer_data.last_name
                ? response_send_customer_data.last_name[0]
                : "",
              status: response_send_customer_data.last_name ? false : true,
            },
            email: {
              massage: response_send_customer_data.email
                ? response_send_customer_data.email[0]
                : "",
              status: response_send_customer_data.email ? false : true,
            },
            phone: {
              massage: response_send_customer_data.phone
                ? response_send_customer_data.phone[0]
                : "",
              status: response_send_customer_data.phone ? false : true,
            },
          },
        });
      }
    } else {
      this.openNotification(
        "bottom",
        "an error occurred during submit process",
        "Error"
      );
      this.setState({
        loading: false,
        formError: {
          first_name: {
            massage: first_name_validation.status
              ? ""
              : first_name_validation.massage,
            status: first_name_validation.status ? true : false,
          },
          last_name: {
            massage: last_name_validation.status
              ? ""
              : last_name_validation.massage,
            status: last_name_validation.status ? true : false,
          },
          birth_date: {
            massage: birth_date_validation.status
              ? ""
              : birth_date_validation.massage,
            status: birth_date_validation.status ? true : false,
          },
          email: {
            massage: email_validation.status ? "" : email_validation.massage,
            status: email_validation.status ? true : false,
          },
          phone: {
            massage: phone_validation.status ? "" : phone_validation.massage,
            status: phone_validation.status ? true : false,
          },
          address: {
            massage: address_validation.status
              ? ""
              : address_validation.massage,
            status: address_validation.status ? true : false,
          },
        },
      });
    }
  };

  getPaymentData = async () => {
    this.setState({ loading: true });
    if (
      window.location.href.split("/") &&
      window.location.href.split("/")[
      window.location.href.split("/").length - 1
      ]
    ) {
      localStorage.setItem(
        "paymentId",
        window.location.href.split("/")[
        window.location.href.split("/").length - 1
        ]
      );
      const response = await Paymentcontroller.get_payment_wizard_data(
        window.location.href.split("/")[
        window.location.href.split("/").length - 1
        ]
      );
      if (response.billing_complete) {
        this.props.onSubmitStepOne("done");
      }

      if (response.subscription) {
        this.props.onSubmitStepThree("done");
      }
      if (response.phone) {
        const strPhone =
          response.phone.substring(0, 3) +
          " " +
          response.phone.substring(3, 6) +
          " " +
          response.phone.substr(6);
        response.phone = strPhone;
      }

      this.setState({ payment_data: response });
    }
    this.setState({ loading: false });
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      payment_data: {},
      visibleModal: false,
      visibleModalHelcim: false,
      visibleModalHelcimOpenModal: false,
      paymentType: null,
      loading: true,
      helcimConfig: {
        token: "",
        customerCode: ""
      },
      formError: {
        first_name: {
          massage: "",
          status: true,
        },
        last_name: {
          massage: "",
          status: true,
        },
        birth_date: {
          massage: "",
          status: true,
        },
        email: {
          massage: "",
          status: true,
        },
        phone: {
          massage: "",
          status: true,
        },
        address: {
          massage: "",
          status: true,
        },
      },
    };
    this.getPaymentData();
    this.getPaymentType();
    this.handleChange = this.handleChange.bind(this);
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }
  
  getPaymentType = async () => {
    const response = await Paymentcontroller.getPaymentProvider(
      window.location.href.split("/")[
      window.location.href.split("/").length - 1
      ]
    );

    console.log(response.provider)
    this.setState({
      paymentType: response.provider
    })
  }

  readHelcimData = async () => {
    const response = await Paymentcontroller.getHelcimToken(
      window.location.href.split("/")[
      window.location.href.split("/").length - 1
      ]
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

  dismiss() {
    this.props.unmountMe();
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              height: "250px",
            }}
          >
            <Spin size="large" style={{ alignSelf: "center" }} />
          </div>
        ) : (
          <>
            <div className="dashboard-container">
              <div className="pageBody wizard-page">
                <div className="page-header">
                  <div className="title pageHeader">
                    {this.props.logo ? (
                      <img
                        className="bookcLogo"
                        src={this.props.logo}
                        alt={Logo}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div>
                  <div
                    className="decorLine"
                    style={{ marginTop: "15px" }}
                  ></div>
                  <div className="body">
                    <div className="stepCards">
                      <div
                        className="muiCardBody"
                        style={{ marginBottom: "25px" }}
                      >
                        <div className="muiCard">
                          <div className="header_payment_page_part">
                            Patient Information
                          </div>
                          <hr className="endline_payment" />

                          <CreateGurantorBillingForm
                            handleSubmit2={this.handleSubmit2}
                          />

                          <div style={{ height: "15px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  visibleModalHelcim: false
                });
              }}
              footer={null}
              title="Payment"
              open={this.state.visibleModalHelcimOpenModal}
            >
              <HelcimForm helcimConfig={this.state.helcimConfig} />
            </Modal>

            <PoweredBy />
          </>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { creating, error } = state.paymentRequest;
  const { profileSummary } = state.dashboard;
  return {
    creating,
    error,
    profileSummary,
  };
}

const paywiz = connect(mapStateToProps)(PaymentWizard);

export default paywiz;
