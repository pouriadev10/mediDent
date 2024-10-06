import React, { Component } from "react";
import Logo from "../../../assets/img/logo-bookc.png";
import { connect } from "react-redux";
import PoweredBy from "../../CommonUi/PoweredBy";
import { notification, Modal, Spin, Input } from "antd";
import { Paymentcontroller } from "../../../Paymentcontroller";
import App from "../../stripeAdmin/App";
import { Error } from "../../../ErrorHandeling";

import CreateGurantorBillingForm from "./CreateGurantorBillingForm";

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
      const { paymentId } = this.props;
      const payID = paymentId;

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
    const { paymentId } = this.props;
    // localStorage.setItem(
    //   "paymentId",
    //   paymentId

    // );
    const response = await Paymentcontroller.get_payment_wizard_data(
      paymentId
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

    this.setState({ loading: false });
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      payment_data: {},
      visibleModal: false,
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
    };
    this.getPaymentData();

    this.handleChange = this.handleChange.bind(this);
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
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
            <div className="header_payment_page_part">
              Patient Information
            </div>
            <hr className="endline_payment" />

            <CreateGurantorBillingForm
              handleSubmit2={this.handleSubmit2}
            />

            <div style={{ height: "15px" }}></div>


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
