import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
import { dashboardActions } from "../../actions";
import { Pagination, Table, Card, Space, Tag, notification, Menu, Modal, Input, Button, message, Row, Col } from "antd";
import "../app.local.css";
import { ReactComponent as Spinner } from "../../assets/img/loading-spinner.svg";
import Axios from "axios";
import config from "../../config";
import { apiService } from "../../_services";
import { controller } from "../../controller";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import "./style.css";
import { Spin } from 'antd'; // Import the Spin component from antd
import DashboardPagePaymentDetail from "./DashboardPagePaymentDetail";
import PaymentFirstPage from '../Payment/PaymentFirstPage';
import PaymentDone from '../Payment/PaymentDone'
import PaymentFaild from '../Payment/PaymentFaild'
import { Paymentcontroller } from "../../Paymentcontroller";
//ICONS
import sent from "../../assets/icons/card-send.png";
import receive from "../../assets/icons/card-receive.png";
import search from '../../assets/icons/search-normal.png';
import eye from '../../assets/icons/eye.png';
import refresh from '../../assets/icons/refresh.png';
import card from '../../assets/icons/card-pos.png';
import trash from '../../assets/icons/trash.png';
import PaymentDoneMulti from "../Payment/PaymentDoneMulti";

const Config = {
  headers: {
    Authorization: localStorage.getItem("user")
      ? "Token " + JSON.parse(localStorage.getItem("user")).key
      : "",
  },
};

class PaymentRequestsTable extends Component {
  getData = () => {
    Axios.get(config.apiGateway.URL + `/clinics/selectoffice/`, Config).then(
      (res) => {
        const response = res.data;
        localStorage.setItem("office_ids", JSON.stringify(response));
      }
    );
  };
  updateRequestList = async () => {
    const response = await controller.get_payment_requests(
      this.state.page_size,
      this.state.page,
      this.state.search_term,
      localStorage.getItem("selectedOffice")
    );
    if (response.status < 250) {
      this.setState({ paymentRequests: response });
      this.setState({ loading_update: false });
    } else {
      this.openNotification(
        "bottom",
        response.detail ? response.detail : response.massage,
        "Error"
      );
      if (response.detail) {
        this.setState({
          errorMessage: response.detail,
        });
      }
    }
  };
  constructor(props) {
    super(props);
    this.getLogo();
    this.state = {
      loadingCancelPayReq: false,
      openCancelPayReq: false,
      idPayReqForCancel: null,
      errorMessage: "",
      serverLogo: "",
      paymentRequests: [],
      page_size: 25,
      page: 1,
      search_term: "",
      totalAr: "",
      loading_update: false,
      openPayModal: false,
      openDetailModal: false,
      currentStep: sessionStorage.getItem('currentStep') || 1, // Retrieve the step from session storage or default to 1
      isChecked: false,
      selectedPaymentId: null,
      paymentType: ''
    };
    this.getLogo();
    this.getLogo = this.getLogo.bind(this);
    this.CloseDetailPaymentModal = this.CloseDetailPaymentModal.bind(this);
    this.OpenDetailPaymentModal = this.OpenDetailPaymentModal.bind(this);
    this.updateRequestList();
    this.openNotification = this.openNotification.bind(this);
    this.handleRetryPayment = this.handleRetryPayment.bind(this);
    // this.props.dispatch(dashboardActions.fetchProfileSummary());
  }
  state = {
    serverLogo: "",
    resend_status: {},
    cancel_status: {},
    office_id: [],
    show_more: {},
    loading_update: false,
    openDetailModal: false,
    detailModalVisible: false,
    selectedPayment: [],
    response: '',
    response2: '',
    payResult: null,
    payResul1: null,
    currentStep2: 1,
    loading: false

  };

  handleApprovedCardByHelcim = async (cardToken, responseMessage2) => {
    var id = localStorage.getItem('paymentId');
    if (!id) {
      console.error("No selected ID provided");
      message.error("Payment failed: No selected ID provided.");
      return;
    }

    this.setState({ loading: true });

    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp = ipData.ip;

      const response = await Paymentcontroller.helcimPay(id, cardToken, userIp, responseMessage2);

      if (response.status < 250) {
        message.success("Payment successful");
        window.history.pushState({}, '', `/#/payment-requests/}`);  // Update the URL without reloading the page
        this.setState({
          payResult: true,
          currentStep: 2,
        });
        setTimeout(() => {
          window.location.href = '/#/payment-requests';
        }, 3000);
      } else {
        message.error("Payment failed: " + response.error);
        this.setState({
          payResult: false,
          currentStep: 2,
          response: response.error,
        });
        setTimeout(() => {
          window.location.href = '/#/payment-requests';
        }, 3000);
      }
    } catch (error) {
      console.error('Error during payment processing:', error);
      message.error("Payment processing error: " + error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleApprovedCardByHelcim2 = async (cardToken, responseMessage2) => {
    var id = localStorage.getItem('paymentId');
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
        // onNextStep();  // Call the parent component's method to go to the next step
        sessionStorage.setItem('currentStep', 2);
        this.setState({ currentStep: 2, detailModalVisible: true });
        this.setState({
          payResult1: true,
          currentStep: 2
        })  // Store current step in session storage
      } else {
        Object.keys(response).forEach(resp => {
          if (resp !== "status") message.error(response[resp]);
        });
        this.setState({ loadingHelcimResultCheck: false });
        this.setState({
          payResult1: false,
          currentStep: 2,
          response2: response.error
        })
        setTimeout(() => {
          window.location.href = '/#/payment-requests';
        }, 3000);
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
      return userIp0.ip
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
    return null;
  };




  // check submited helcim form
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

        this.setState({ currentStep: 2, detailModalVisible: true });

        var pay = localStorage.getItem("type")

        // Check the payment type and call the appropriate function
        if (pay === 'wizard') {
          this.handleApprovedCardByHelcim2(cardToken, responseMessage2);
        } else {
          this.handleApprovedCardByHelcim(cardToken, responseMessage2);
        }

        window.history.replaceState({}, '', window.location.pathname);

      } catch (error) {
        console.error('Error handling payment:', error);
      }
    } else {
      console.log("Payment not approved or missing necessary URL parameters.");
      // Optionally, update the state to indicate the loading or checking has concluded without action
      // this.setState({ loadingHelcimResultCheck: false });
    }


    // Function to parse URL parameters

  }

  // processUrlParameters = () => {
  //   const params = new URLSearchParams(window.location.search);
  //   const responseMessage = params.get('responseMessage');
  //   const cardToken = params.get('cardToken');

  //   if (responseMessage === 'APPROVED') {
  //     // Assuming step 3 is the confirmation step
  //     this.setState({ currentStep: 3, detailModalVisible: true });
  //     sessionStorage.setItem('currentStep', '3');  // Persist step change across refreshes
  //   }

  //   // Clean up URL parameters to prevent reprocessing
  //   // window.history.replaceState({}, '', window.location.pathname);
  // };

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

  OpenDetailPaymentModal = (pyreq) => {
    this.setState({
      openDetailModal: true,
      selectediD: pyreq.id,
    });
  };
  CloseDetailPaymentModal = () => {
    this.setState({
      openDetailModal: false,
    });
  };

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
  };

  componentWillReceiveProps = debounce(async (nextProps) => {
    const { rows_id } = nextProps;
    this.setState({
      resend_status: { ...rows_id },
      cancel_status: { ...rows_id },
    });

    this.setState({ search_term: nextProps.search_term });
    const response = await controller.get_payment_requests(
      this.state.page_size,
      this.state.page,
      nextProps.search_term,
      localStorage.getItem("selectedOffice")
    );
    this.setState({ paymentRequests: response });
  }, 300);

  handleResend = (e) => {
    const id = e.target.name;
    apiService
      .get(`/billpay/payment/${id}/request/`, {})
      .then((response) => {
        let resend_status = { ...this.state.resend_status };
        let id_row = id;
        resend_status[id_row] = 1;
        this.setState({ resend_status });
      })
      .catch((error) => { });
  };


  // handleCancel = async (id) => {
  //   this.setState({
  //     loadingCancelPayReq: true
  //   })
  //   const response = await controller.cancelPayment(id);
  //   if (response.status < 250) {
  //     this.openNotification(
  //       "bottom",
  //       response && response.json.Detail
  //         ? "Payment request was canceled successfully."
  //         : "Done",
  //       "Successful"
  //     );
  //     this.setState({
  //       openCancelPayReq: false
  //     })
  //     this.updateRequestList();
  //   } else {
  //     this.openNotification(
  //       "bottom",
  //       response.json.Detail ? response.json.Detail : "Error ",
  //       "Error"
  //     );
  //   }
  //   this.setState({
  //     loadingCancelPayReq: false
  //   })
  //   window.location.reload()
  // };

  handleCancel = async (id) => {
    const response = await controller.cancelPayment(id);
    if (response.status < 250) {
      this.openNotification(
        "bottom",
        response && response.json.Detail
          ? "Payment request was canceled successfully."
          : "Done",
        "Successful"
      );
      this.setState({
        openCancelPayReq: false })
      this.updateRequestList();
    } else {
      this.openNotification(
        "bottom",
        response.json.Detail ? response.json.Detail : "Error ",
        "Error"
      );
    }
  };


  handlePaginatorChange = (page, page_size) => {
    this.setState(
      {
        page,
        page_size,
        loading_update: true,
      },
      () => {
        this.updateRequestList();
      }
    );
  };

  handlePaymentButtonClick1 = (record) => {
    // if (record.status === "pending" && "active") {
    this.setState({
      detailModalVisible: true,
      selectedPayment: record,
    });
    sessionStorage.setItem('currentStep', '1');  // Start from step 1 when opening the modal
    localStorage.setItem("payid", record.id);


    // }
  };

  onPaymentTypeSelected = (paymentType) => {
    this.setState({
      paymentType: paymentType,
      currentStep: 2
    });
    console.log(this.state.paymentType)
  };


  handleNextStep = () => {
    this.setState(prevState => ({
      currentStep: Number(prevState.currentStep) + 1
    }), () => {
      sessionStorage.setItem('currentStep', this.state.currentStep.toString());  // Persist step change
    });
  };

  renderStatusTag = (status) => {
    switch (status) {
      case "subscription":
        return (
          <Tag
            color={"rgba(37, 180, 248, 0.12)"}
            style={{ borderRadius: "500px", fontSize: '12px', color: "#5191FF", width: 85, height: 22, textAlign: 'center' }}
          >
            Active
          </Tag>
        );
      case "pending":
        return (
          <Tag
            color={"rgba(236, 148, 44, 0.15)"}
            style={{ borderRadius: "500px", fontSize: '12px', color: "rgba(236, 148, 44, 1)", width: 85, height: 22, textAlign: 'center' }}
          >
            Pending
          </Tag>
        );
      case "completed":
        return (
          <Tag
            color={"rgba(4, 201, 0, 0.1)"}
            style={{ borderRadius: "500px", fontSize: '12px', color: "rgba(4, 201, 0, 1)", width: 85, height: 22, textAlign: 'center' }}
          >
            Completed
          </Tag>
        );
      case "failed":
        return (
          <Tag
            color={"rgba(255, 0, 0, 0.08)"}
            style={{ borderRadius: "500px", fontSize: '12px', color: "rgba(238, 97, 91, 1)", width: 85, height: 22, textAlign: 'center' }}
          >
            Failed
          </Tag>
        );
      case "canceled":
        return (
          <Tag
            color={"rgba(151, 151, 151, 0.15)"}
            style={{ borderRadius: "500px", fontSize: '12px', color: "#848696", width: 85, height: 22, textAlign: 'center' }}
          >
            Canceled
          </Tag>
        );
      default:
        return null;
    }
  };

  getDefaultSelectedPayment = () => {
    // Fetch the last payment or set a default value
    return {
      id: this.state.selectedPayment,
      status: 'pending'
    };
  };

  handleRetryPayment = () => {
    const defaultSelectedPayment = this.getDefaultSelectedPayment(); // Assuming you have a method to get a default or previous state.
    this.setState({
      currentStep: 1,
      selectedPayment: defaultSelectedPayment // Reset or maintain the selectedPayment
    });
  };


  render() {
    const { currentStep } = this.state;
    const { detailModalVisible, selectedPayment } = this.state;
    const { loading } = this.state;

    // const detail = (record) => {
    //   return record.status
    // }
    // console.log(detail)
    // const statusDropDown = (payreq_id) => (
    //   <Menu
    //     onClick={(e) => {
    //       this.handleCancel(payreq_id);
    //     }}
    //   >
    //     <Menu.Item>Cancel Request</Menu.Item>
    //   </Menu>
    // );
    // const moreReasonBtn = (payreq_id) => (
    //   <button
    //     className="more-btn"
    //     onClick={(e) => {
    //       let show_more = { ...this.state.show_more };
    //       show_more[payreq_id] = true;
    //       this.setState({ show_more });
    //     }}
    //   >
    //     {" "}
    //     more
    //   </button>
    // );



    const handlePaymentButtonClick1 = (record) => {
      if (record.status === "pending") {
        this.setState({
          detailModalVisible: true,
          selectedPayment: record,
        });
        // sessionStorage.setItem('currentStep', '1');  // Start from step 1 when opening the modal

      }
    };



    const handleCloseDetailModal1 = () => {

      this.setState({
        detailModalVisible: false,
        selectedPayment: [],
        currentStep: 1,
        paymentType: null
      })
      console.log(this.state.paymentType)
      sessionStorage.removeItem('currentStep');
      localStorage.removeItem('paymentId');
      localStorage.removeItem('wizard_recurring_interval_count')
      localStorage.removeItem('interval Id')
      localStorage.removeItem('type')
    };


    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Patient Name",
        render: (_, record) => (
          <>
            {record.patient
              ? (record.patient.first_name ? record.patient.first_name : ' ') + " " + (record.patient.last_name ? record.patient.last_name : ' ')
              : "_"}
          </>
        ),
      },
      {
        title: "Account Holder ",
        render: (_, record) => (
          <>
            {record.guarantor_firstname && record.guarantor_lastname
              ? record.guarantor_firstname + " " + record.guarantor_lastname
              : record.guarantor_firstname
                ? record.guarantor_firstname
                : "_"}
          </>
        ),
      },
      {
        title: "Phone",
        render: (_, record) => (
          <>
            {record.guarantor_phone
              ? record.guarantor_phone.length == 10
                ? "+1-" +
                record.guarantor_phone.slice(0, 3) +
                "-" +
                record.guarantor_phone.slice(3, 6) +
                "-" +
                record.guarantor_phone.slice(6)
                : record.guarantor_phone
              : "_"}
          </>
        ),
      },
      {
        title: "Email",
        dataIndex: "guarantor_email",
        key: "guarantor_email",
      },
      {
        title: "Reason",
        render: (_, record) => (
          <>
            {record.reason_data && record.reason_data.length > 0 ? (
              record.reason_data.map((item) => (
                <span>{item.reason + ", "}</span>
              ))
            ) : record.other_reason ? (
              <span>{record.other_reason}</span>
            ) : (
              <>-</>
            )}
          </>
        ),
      },
      {
        title: "Amount",
        render: (_, record) => <>{record.amount.toLocaleString()}</>,
      },
      {
        title: "Status",
        render: (_, record) => this.renderStatusTag(record.status),
      },
      {
        title: "Action",
        key: "action",
        width: '165px',
        render: (text, record) => {
          const isCompleted = record.status === "completed";
          return (
            <Space size="middle">
              {/* <Button
                type="text"
                icon={<img src={eye} alt="" />}
                style={{ color: "#979797" }}
                onClick={() => {
                  this.OpenDetailPaymentModal(record);
                }}
              /> */}
              <Button
                type="text"
                icon={<img src={eye} alt="" />}
                style={{ color: "#979797" }}
                onClick={() => this.handlePaymentButtonClick1(record)}
              // disabled={isCompleted}
              />
              <Button
                type="text"
                icon={<img src={refresh} alt="" />}
                style={{ color: "#979797" }}
              />
              <Button
                type="text"
                icon={<img src={trash} alt="" />}
                style={{ color: "#979797" }}
                onClick={(e) => {
                  this.setState({
                    openCancelPayReq: true,
                    idPayReqForCancel: record.id
                })
              }}
              // disabled={isCompleted}
              />
            </Space>
          );
        },
      },
    ];
    return (
      <>
        <Modal
          onCancel={() => {
            this.setState({
              openCancelPayReq: false
            })
          }}
          open={this.state.openCancelPayReq}
          footer={null}
          title="Cancel payment request"
        >
          <p>
            Are you sure you want to cancel this payment request?
          </p>
          <Row justify={"end"}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  openCancelPayReq: false
                })
              }}
              style={{ marginRight: "10px" }}>No</Button>
            <Button loading={this.state.loadingCancelPayReq} onClick={() => { this.handleCancel(this.state.idPayReqForCancel) }}> Yes</Button>
          </Row>
        </Modal>
        <Modal
          visible={detailModalVisible}
          title="Payment Details"
          onCancel={() => handleCloseDetailModal1()}
          footer={null}  // This line ensures no footer (and thus no buttons) is displayed
          style={{ minWidth: 568 }}
          className="modal-payment"
          centered
        >
          {loading ? ( // Show loading spinner when loading is true
            <div style={{ textAlign: 'center' }}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              {selectedPayment && currentStep === 1 ? (
                selectedPayment.status === 'pending' ? (
                  <PaymentFirstPage
                    onNextStep={this.handleNextStep}
                    selectediD={selectedPayment.id}
                    onPaymentTypeSelected={this.onPaymentTypeSelected}
                  />
                ) : (
                  <DashboardPagePaymentDetail selectediD={selectedPayment.id} />
                )
              ) : (
                <></>
              )}

              {currentStep === 2 && this.state.payResult ? (
                <PaymentDone />
              ) : (
                <></>
              )}
              {currentStep === 2 && this.state.payResult1 ? (
                <PaymentDoneMulti />
              ) : (
                <></>
              )}
              {currentStep === 2 && this.state.payResult === false ? (
                <PaymentFaild response={this.state.response} onRetry={this.handleRetryPayment} />
              ) : (
                <></>
              )}
              {currentStep === 2 && this.state.payResult1 === false ? (
                <PaymentFaild response={this.state.response2} onRetry={this.handleRetryPayment} />
              ) : (
                <></>
              )}
            </>
          )}
        </Modal>
        <Modal
          style={{ minWidth: 568 }}
          // className="mwf"
          visible={this.state.openDetailModal}
          title="Details"
          onCancel={() => {
            this.setState({
              openDetailModal: false,
            });
          }}
          footer={null}
        >
          <DashboardPagePaymentDetail selectediD={this.state.selectediD} />
        </Modal>

        <Table
          style={{
            border: "1px solid rgba(240, 240, 240, 1)", borderRadius: '8px', boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)"

          }}
          columns={columns}
          dataSource={
            this.state.paymentRequests.results
              ? this.state.paymentRequests.results
              : []
          }
          pagination={false}
        />
        <Row type="flex" justify="center" className="ar_mt15">
          <Pagination
            showSizeChanger={false}
            pageSize={this.state.page_size}
            current={this.state.page}
            total={
              this.state.paymentRequests ? this.state.paymentRequests.count : 0
            }
            onChange={this.handlePaginatorChange}
            className="paginator"
            size="small"
          />
        </Row>
        {this.state.paymentRequests.results &&
          this.state.paymentRequests.results.length > 0 ? (
          <></>
        ) : (
          <p className="error_message">
            {this.state.errorMessage
              ? this.state.errorMessage
              : "No payment requests created yet"}
          </p>
        )}
      </>
    );
  }
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
class DashboardPage extends Component {



  async componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    localStorage.removeItem("pat_id")
    localStorage.removeItem("pat_name")
    localStorage.removeItem("gurantor.name")
    localStorage.removeItem('guarantor.id')
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  constructor(props) {
    super(props);

    this.state = {
      serverLogo: "",
      width: 0,
      height: 0,
      page_size: 25,
      page: 1,
      search_term: "",
      totalAr: "",
      openDetailModal: false,
    };
    this.getLogo();
    this.getLogo = this.getLogo.bind(this);
    this.props.dispatch(dashboardActions.fetchProfileSummary());
    this.props.dispatch(dashboardActions.fetchSummary());
    // this.handleReadDataIP = this.handleReadDataIP.bind(this);
    this.updateRequestList();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }

  goToCreatePaymentRequest = () => {
    this.props.dispatch(push(`/paymentrequest`));
  };
  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
  };
  processRequestsDataIntoRows = (rows) => {
    rows.forEach((payreq) => {
      let date = new Date(payreq.appointment_datetime);
      var options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      payreq.processed_appointment_date = date.toLocaleString("en-GB", options);
      if (payreq.patient_phone) {
        let p = payreq.patient_phone;
        payreq.processed_phone_number = `${p.substr(0, 2)}-${p.substr(
          2,
          3
        )}-${p.substr(5, 3)}-${p.substr(8, 4)}`;
      }
      let max_len = 80;
      if (payreq.reason)
        payreq.short_reason =
          payreq.reason.length > max_len
            ? payreq.reason.substr(0, max_len)
            : null;
    });
    return rows;
  };

  handlePaginatorChange = (page, page_size) => {
    this.setState(
      {
        page,
        page_size,
      },
      () => {
        this.updateRequestList();
      }
    );
  };

  searchDelayTimeout = null;
  handleSearchChange = (e) => {
    const { value } = e.target;
    this.setState({ search_term: value }, function () {
      console.log("Search term updated:", this.state.search_term); // Log updated search term
      this.updateRequestList();
    });
  };
  updateRequestList = async () => { };

  render() {
    const {
      loadingSummary,
      summary,
      loadingRequests,
      requests,
      error,
      profileSummary,
    } = this.props;
    const Search = Input.Search;
    const className =
      "dashboard-container" +
      (loadingSummary || loadingRequests ? " is-loading" : "");

    const rows =
      requests && requests.results
        ? this.processRequestsDataIntoRows(requests.results)
        : [];
    let rows_id = {};
    const rows_is_array =
      requests && requests.results
        ? requests.results.map((row) => (rows_id[row.id] = 0))
        : {};

    return (
      <DashboardLayout
        breadCrumb={false}
        logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
        footerLogo={this.state.serverLogo}
      >
        <div className={className} >
          {error && error.message && (
            <div className="alert">{error.message}</div>
          )}
          <div style={{ marginLeft: 40, marginBottom: 10, marginTop: 52 }}>
            <div style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>Plans </div>
          </div>
          <div className="paymentContent">
            <Card style={{ width: '100%' }}>
              <Row gutter={[16, 16]} justify="space-around">
                <Col xs={24} sm={24} md={24} lg={8}>
                  <div style={{ height: 121, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 20 }}>
                      <img className='icon-center' src={sent} alt='' />
                    </div>
                    <div style={{ marginLeft: 25 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 10 }}>Sent</div>
                      <div style={{ fontSize: 24, color: "#4D3280", fontWeight: 600 }}>
                        {profileSummary && profileSummary.total && profileSummary.total !== "no data"
                          ? profileSummary.total.toLocaleString()
                          : 0
                        }
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                  <div style={{ height: 121, display: 'flex', alignItems: 'center', flexDirection: 'row', background: 'rgba(223, 218, 255, 0.7)', borderRadius: '8px' }}>
                    <div className='circle' style={{ marginLeft: 20 }}>
                      <img className='icon-center' src={receive} alt='' />
                    </div>
                    <div style={{ marginLeft: 25 }}>
                      <div style={{ fontSize: 20, fontWeight: 400, color: '#4D3280', marginBottom: 10 }}>Received</div>
                      <div style={{ fontSize: 24, color: "#4D3280", fontWeight: 600 }}>
                        {profileSummary && profileSummary.total_paid && profileSummary.total_paid !== "no data"
                          ? profileSummary.total_paid.toLocaleString()
                          : 0}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                  <Input
                    value={this.state.search_term}
                    onChange={(e) => {
                      console.log("Input changed:", e.target.value); // Log input change
                      this.handleSearchChange(e);
                    }}
                    size="large"
                    placeholder="Search patient/payment"
                    suffix={<img src={search} alt="" />}
                    style={{ width: '100%', marginBottom: '16px', height: 52 }}
                    className="centered-placeholder"
                  />
                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{ height: 52 }}
                    onClick={this.goToCreatePaymentRequest}
                  >
                    Send Payment Request
                  </Button>
                </Col>
              </Row>
            </Card>
            <div className="loading-spinner">
              <Spinner />
            </div>
            <div style={{ marginTop: 30 }}>
              {
                <div>
                  <PaymentRequestsTable
                    search_term={this.state.search_term}
                    rows={rows}
                    rows_id={rows_id}
                  />
                </div>
              }
            </div>
          </div>
        </div>


      </DashboardLayout>
    );
  }
}

function mapStateToProps(state) {
  const {
    loadingSummary,
    summary,
    profileSummary,
    loadingRequests,
    requests,
    error,
  } = state.dashboard;
  return {
    loadingSummary,
    summary,
    profileSummary,
    loadingRequests,
    requests,
    error,
    authentication: state.authentication,
  };
}

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);

export default withRouter(connectedDashboardPage);