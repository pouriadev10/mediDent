import { Pagination, Modal, Row, Select, Table, Button, Tag, Space, Spin, notification } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { dashboardActions } from "../../actions";
import { controller } from "../../controller";
import "../app.local.css";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import DashboardPagePaymentDetail from "../dashboardPayment/DashboardPagePaymentDetail";
import "./style.css";

import eye from '../../assets/icons/eye.png';
import refresh from '../../assets/icons/refresh.png';
import trash from '../../assets/icons/trash.png';
import { paymentRequest } from "../../reducers/paymentRequest";

const { Option } = Select;



class ArDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverLogo: "",
      ARList: [],
      selectedPayment: [],
      page_size: 0,
      page: 1,
      search_term: "",
      modalTransaction: false,
      paymentRequests: [],
      detailModalVisible: false,
      selectedPayment2: [],
      loading: false

    };
    this.getLogo();
    this.getData();
    this.updateRequestList();
    this.getLogo = this.getLogo.bind(this);
    this.getData = this.getData.bind(this);

    this.props.dispatch(dashboardActions.fetchProfileSummary());
    this.props.dispatch(dashboardActions.fetchSummary());
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

  handlePageChange = async (value) => {
    this.setState({
      page: value,
    });
    const response = await controller.getARDetail(
      window.location.hash.split("/")[
      window.location.hash.split("/").length - 1
      ],
      value
    );
    this.setState({
      ARList: response.results,
      page_size: response.count,
    });
  };

  updateRequestList = async () => {
    const response = await controller.get_payment_requests2(
      this.state.page_size,
      this.state.page,
      this.state.search_term,
      localStorage.getItem("selectedOffice"),
      false,
      localStorage.getItem("guarantor.id")
    );
    if (response.status < 250) {
      this.setState({ paymentRequests: response.results });
      console.log(this.state.paymentRequests);
      // Assuming you want to store the patient id of the first payment request
      if (this.state.paymentRequests.length > 0) {
        const patientId = this.state.paymentRequests[0].patient.id;
        localStorage.setItem("patientId", patientId);
      }
    } else {
      this.openNotification(
        "bottom",
        response.detail ? response.detail : response.message,
        "Error"
      );
      if (response.detail) {
        this.setState({
          errorMessage: response.detail,
        });
      }
    }
  };
  

  handleCloseDetailModal1 = () => {

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

  handlePaymentButtonClick1 = (record) => {
    // if (record.status === "pending" && "active") {
    this.setState({
      detailModalVisible: true,
      selectedPayment2: record,
    });
    sessionStorage.setItem('currentStep', '1');  // Start from step 1 when opening the modal
    localStorage.setItem("payid", record.id);


    // }
  };

  handleCancel = async (id) => {
    this.setState({
      loadingCancelPayReq: true
    })
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
        openCancelPayReq: false
      })
      this.updateRequestList();
    } else {
      this.openNotification(
        "bottom",
        response.json.Detail ? response.json.Detail : "Error ",
        "Error"
      );
    }
    this.setState({
      loadingCancelPayReq: false
    })
    window.location.reload()
  };

  getData = async () => {
    localStorage.setItem(
      "gurantor.name",
      window.location.href.match(/\/ar-detail\/([^/?]+)/)[1]
    );
    const response = await controller.getARDetail(
      window.location.hash.split("/")[
      window.location.hash.split("/").length - 1
      ],
      this.state.page
    );
    this.setState({
      ARList: response.results,
      page_size: response.count,
    });
  };
  goToCreatePaymentRequest = () => {
    this.props.dispatch(
      push("/paymentrequest/&ARid=" + window.location.href.split("?id=")[1])
    );
  };

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
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


  render() {
    const { loadingSummary, loadingRequests, profileSummary } = this.props;
    const { selectedPayment2, detailModalVisible, loading } = this.state

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

    const className =
      "dashboard-container" +
      (loadingSummary || loadingRequests ? " is-loading" : "");

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
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
                // disabled={true}
              />
              <Button
                type="text"
                icon={<img src={refresh} alt="" />}
                style={{ color: "#979797" }}
                disabled={true}
              />
              <Button
                type="text"
                icon={<img src={trash} alt="" />}
                style={{ color: "#979797" }}
                onClick={(e) => {
                  this.handleCancel(record.id);
                }}
                // disabled={true}
              />
            </Space>
          );
        },
      },
    ];
    const transactionColumns = [
      {
        title: "Amount",
        dataIndex: "amount_total",
        key: "amount_total",
      },
      {
        title: "Currency",
        render: (_, record) => (
          <>{record.currency ? record.currency.toUpperCase() : ""}</>
        ),
      },
      {
        title: "Date",
        render: (_, record) => (
          <>
            {record ? (
              record.date ? (
                <>
                  {new Date(record.date).toLocaleDateString() +
                    " " +
                    new Date(record.date).toLocaleTimeString()}
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </>
        ),
      },
      {
        title: "Status",
        dataIndex: "payment_status",
        key: "payment_status",
      },
    ];

    return (
      <DashboardLayout
        breadCrumb={false}
        logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
        footerLogo={this.state.serverLogo}
      >
        <div className={className}>
          {/* <div className="page-breadcrumb">
            <div className="breadcrumb-part">
              <span
                className="ar_cursor"
                onClick={() => {
                  this.props.history.push("/ar");
                  const url = window.location.href;
                  const match = url.match(/\/ar-detail\/([^/?]+)/);
                  const result = match ? match[1] : null;
                }}
              >
                AR
              </span>{" "}
              / AR Detail /{" "}
              {window.location.href.match(/\/ar-detail\/([^/?]+)/)
                ? window.location.href.match(/\/ar-detail\/([^/?]+)/)[1]
                : null}
            </div>
          </div> */}
          <div className="paymentContent">
            <Row justify="space-between" type="flex" style={{ marginBottom: 30 }}>
              <div className="ar_paymentrequest" style={{ fontSize: 20 }}> {localStorage.getItem('gurantor.name')}'s Payment Requests</div>
              <div className="ar_paymentrequest-send">
                <Button
                  type="primary"
                  // className="login-btn create-payment-request-btn cw"
                  style={{ width: 200, height: 43, fontSize: 12, background: '6B43B5', borderRadius: 100 }}
                  onClick={this.goToCreatePaymentRequest}
                  size="large"
                >
                  Send Payment Request
                </Button>
              </div>
            </Row>
            <div>
              <Table
                 style={{
                  border: "1px solid rgba(240, 240, 240, 1)", borderRadius: '8px', boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)"
      
                }}
                columns={columns}
                dataSource={this.state.paymentRequests}
                pagination={false}
              />
              <Pagination
                current={this.state.page}
                total={this.state.page_size}
                onChange={this.handlePageChange}
                className="paginator"
                size="large"
              />
            </div>
          </div>
        </div>
        <Modal
          className="ar_modal"
          title="Transaction"
          footer={null}
          open={this.state.modalTransaction}
          onCancel={() => {
            this.setState({ modalTransaction: false });
          }}
        >
          <Table
            columns={transactionColumns}
            dataSource={this.state.selectedPayment}
            pagination={false}
          />
        </Modal>
        <Modal
          visible={detailModalVisible}
          title="Details"
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
              {selectedPayment2 ? (
                <DashboardPagePaymentDetail selectediD={selectedPayment2.id} />
              ) : (
                <></>
              )}
            </>
          )}
        </Modal>
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

const connectedAR = connect(mapStateToProps)(ArDetail);

export default withRouter(connectedAR);
