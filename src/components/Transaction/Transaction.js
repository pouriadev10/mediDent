import {
  Tag,
  Col,
  Table,
  Button,
  notification,
  Input,
  Layout,
  Pagination,
  Row,
  Modal,
  Progress,
  Menu,
  Tabs,
  Card,
  Typography,
  Dropdown,
  Space
} from "antd";
import { green, red } from '@ant-design/colors';
import { Flex } from 'antd';
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dashboardActions } from "../../actions";
import { controller } from "../../controller";
import "../app.local.css";
import _ from "lodash";
import config from "../../config.js";
import TopBar from "../CommonUi/TopBar";
import Sidebar from "../Sidebar.js";
import DynamicProgress from "./DynamicProgress.js";
import "./style.css";

import union from '../../assets/icons/Union.png';
import eye from '../../assets/icons/eye.png';
import user from '../../assets/icons/user.svg';
import call from '../../assets/icons/call.png';
import sms from '../../assets/icons/sms.png';
import buliding from '../../assets/icons/buliding.png';
import loc from '../../assets/icons/location.png';
import download from '../../assets/icons/frame.png';
import buttonSvgrepo from '../../assets/img/download-button-svgrepo-com.svg'






const { Search } = Input;
const { TabPane } = Tabs;
const { Title } = Typography


const options = [
  { value: "new", label: "New" },
  { value: "archive", label: "Recorded" },
];

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      OpenInstallmentModal: false,
      OpenPayReqModal: false,
      installment: [],
      tr_pay_req: {},
      reloadSidebar: false,
      mode: "new",
      loading: false,
      currentPage: 1,
      page_size: 1,
      page: 1,
      transactions: [],
      transactionsDetail: null,
      transactionId: null,

    };

    this.getLogo();
    this.getData();
    this.getLogo = this.getLogo.bind(this);
    this.handleShowInstallment = this.handleShowInstallment.bind(this);
    this.handleShowPaymentReq = this.handleShowPaymentReq.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateToArchive = this.updateToArchive.bind(this);
    this.updateToNew = this.updateToNew.bind(this);
    this.handleSearchTransaction = _.debounce(
      this.handleSearchTransaction,
      500
    );
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
  updateToArchive = async (id) => {
    const response = await controller.UpdateTransactionState("archive", id);

    if (response.status < 250) {
      const response = await controller.GetTransaction(
        this.state.mode,
        this.state.currentPage
      );
      if (response.status < 250) {
        this.setState({
          reloadSidebar: !this.state.reloadSidebar,
        });
        this.openNotification(
          "bottom",
          response.message
            ? response.message
            : "State changed successfully",
          "Successful"
        );
        this.setState({
          page: 1,
          page_size: response.data.count,
          transactions: response.data.results,
        });
      }
    }
  };

  updateToNew = async (id) => {
    const response = await controller.UpdateTransactionState("new", id);

    if (response.status < 250) {
      const response = await controller.GetTransaction(
        this.state.mode,
        this.state.currentPage
      );
      if (response.status < 250) {
        this.setState({
          reloadSidebar: !this.state.reloadSidebar,
        });
        this.openNotification(
          "bottom",
          response.message
            ? response.message
            : "State changed successfully",
          "Successful"
        );
        this.setState({
          page: 1,
          page_size: response.data.count,
          transactions: response.data.results,
        });
      }
    }
  };

  getData = async () => {
    const response = await controller.GetTransaction(
      this.state.mode,
      this.state.currentPage
    );
    if (response.status < 250) {
      this.setState({
        page: 1,
        page_size: response.data.count,
        transactions: response.data.results,
      });
    }
  };

  getDataDetail = async (id) => {
    try {
      const response = await controller.getProgressStatus(id);
      if (response.status < 250) {

        this.setState({
          transactionsDetail: response.json,
        });
        console.log('Response data:', response.json); // Debug logging  
      }
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  };


  handleSearchTransaction = async (e) => { };

  handleSelectChange = async (e) => {
    const value = e.target.value;
    this.setState({ mode: value });
    const response = await controller.GetTransaction(
      value,
      this.state.currentPage
    );
    if (response.status < 250) {
      this.setState({
        page: 1,
        page_size: response.data.count,
        transactions: response.data.results,
      });
    }
  };

  handleShowInstallment = () => {
    this.setState({
      installment: this.state.tr_pay_req.installment_data,
      OpenInstallmentModal: true,
    });
  };

  handleShowPaymentReq = (data) => {
    this.setState(
      {
        tr_pay_req: data.payment_request,
        OpenPayReqModal: true,
        transactionId: data.id,
      },
      () => {
        this.getDataDetail(data.id);
        this.updateStepWidth();
      }
    );
  };

  updateStepWidth = () => {
    const numberOfSteps = this.props.transactionsDetail && this.props.transactionsDetail.installment
      ? this.props.transactionsDetail.installment.interval_count
      : 3; // Use a smaller default to better illustrate changes
    const newWidth = `${100 / numberOfSteps}%`;
    const stepsItems = document.querySelectorAll('.ant-progress-steps-item');
    stepsItems.forEach(step => {
      step.style.width = newWidth; // Directly adjust the width of each step
    });
  };

  getStrokeColors = () => {
    const { transactionsDetail, transactionId } = this.state;
    if (!transactionsDetail || !transactionsDetail.all_transactions) {
      return ["#23D020"]; // Default color if no transactions are available
    }

    return transactionsDetail.all_transactions.map(transaction =>
      transaction.id === transactionsDetail.current_transaction ? '#6B43B5' : '#23D020'
    );
  };


  handleTabChange = async (key) => {
    this.setState({ mode: key, currentPage: 1 }); // Set the current mode and reset page if needed

    // Directly call the method to fetch data based on the selected tab
    // Ensure this method exists and is capable of fetching data for both 'new' and 'archive' modes
    const response = await controller.GetTransaction(key, 1); // Assuming page 1 is a good starting point when switching tabs

    if (response.status < 250) {
      this.setState({
        page: 1, // Consider setting this based on the response if pagination data is available
        page_size: response.data.count,
        transactions: response.data.results,
      });
    }
  };


  handlePageChange = async (page) => {
    this.setState({
      currentPage: page,
    });
    this.setState({
      loading: true,
    });
    if (this.state.searchValue != "") {
      const response = await controller.GetTransaction(this.state.mode, page);
      if (response.status < 250) {
        this.setState({
          page: 1,
          page_size: response.data.count,
          transactions: response.data.results,
        });
      }
      this.setState({
        loading: false,
      });
    } else {
      const response = await controller.GetTransaction(
        this.state.searchValue,
        this.state.mode,
        page
      );
      if (response.status < 250) {
        this.setState({
          page: 1,
          page_size: response.data.count,
          transactions: response.data.results,
        });
      }
      this.setState({
        loading: false,
      });
    }
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

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
  };

  render() {
    const { loadingSummary, loadingRequests, profileSummary } = this.props;
    const { transactionsDetail, transactionId, } = this.state;
    const total = transactionsDetail && transactionsDetail.installment ? transactionsDetail.installment.interval_count : 0
    const paid = transactionsDetail && transactionsDetail.all_transactions ? transactionsDetail.all_transactions.length : 0
    const perc = total > 0 ? (paid * 100) / total : 0;
    // Ensures that transactionsDetail is not null and installments is both non-null and an array
    const paidInstallments = transactionsDetail && Array.isArray(transactionsDetail.installments) ?
      transactionsDetail.installments.filter(installment => installment.status === 'paid').length : 0;
    console.log(paidInstallments)


    const className =
      "dashboard-container" +
      (loadingSummary || loadingRequests ? " is-loading" : "");
    const columns = [
      {
        title: "Name",
        render: (_, record) => {
          if (record && record.guarantor_detail) {
            return (
              <>
                {record.guarantor_detail.firstname} {record.guarantor_detail.lastname}
              </>
            );
          }
          return null;
        },
      },
      {
        title: "Email",
        render: (_, record) => {
          if (record && record.guarantor_detail) {
            return <>{record.guarantor_detail.email}</>;
          }
          return null;
        },
      },
      {
        title: "Total",
        dataIndex: "amount_total",
        key: "amount_total",
      },
      {
        title: "Date",
        key: "date",
        render: (_, record) => {
          if (record && record.date) {
            const dateObj = new Date(record.date);
            return <>{dateObj.toLocaleDateString()}</>;
          }
          return null;
        },
      },
      {
        title: "Time",
        key: "time",
        render: (_, record) => {
          if (record && record.date) {
            const dateObj = new Date(record.date);
            dateObj.setHours(dateObj.getHours() - 3);
            dateObj.setMinutes(dateObj.getMinutes() - 30);
            return <>{dateObj.toLocaleTimeString('en-US', { hour12: false })}</>;
          }
          return null;
        },
      },

      // {
      //   title: "Status",
      //   render: (_, record) => this.renderStatusTag(record.payment_request.status),
      // },
      {
        title: "Action",
        headerCell: () => {
          return {
            style: {
              textAlign: 'center',
            }
          };
        },
        width: '90px',
        align: 'center',
        render: (_, record) => {
          if (this.state.mode === "new") {
            return (
              <>
                <Space size="middle">
                  <Button
                    type="text"
                    icon={<img src={eye} alt="" />}
                    onClick={() => this.handleShowPaymentReq(record)}
                    style={{ color: "#979797" }} />
                  <Button
                    style={{ width: 75, height: 26, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 10 }}
                    type="primary"
                    onClick={() => this.updateToArchive(record.id)}
                  >
                    Record
                  </Button>
                </Space>
              </>
            );
          } else {
            return (
              <Button
                style={{ padding: "0" }}
                type="link"
                onClick={() => this.updateToNew(record.id)}
              >
                Remove Record
              </Button>
            );
          }
        },
      },
    ];

    const installmentColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
      },
    ];
    const { tr_pay_req } = this.state

    const { reason_data } = tr_pay_req.reason_data || {};

    const menu = (
      <Menu>
        {transactionsDetail && transactionsDetail.payment_request && transactionsDetail.payment_request.reason_text && transactionsDetail.payment_request.reason_text.slice(1).map((item) => (
          <Menu.Item key={item.reason}>
            <Tag className="tag_reason" color="rgba(233, 230, 255, 1)" style={{ cursor: 'pointer' }}>
              {item.reason}
            </Tag>
          </Menu.Item>
        ))}
      </Menu>

    );

    return (
      <div>
        <div className="mainPart">
          <Layout className="mh100v">
            {this.state.reloadSidebar ? (
              <Sidebar reloadSidebar={this.state.reloadSidebar} />
            ) : (
              <Sidebar reloadSidebar={this.state.reloadSidebar} />
            )}

            <Layout>
              <TopBar
                clinicLogo={
                  profileSummary && profileSummary.logo
                    ? profileSummary.logo
                    : ""
                }
              />
              <div className={className} style={{ marginTop: 15 }}>
                <div className="paymentContent">
                  <Row type="flex" justify="space-between" style={{ marginBottom: 10 }}>
                    <Title level={3} style={{ marginBottom: 25 }}>Transactions</Title>
                    <div>
                      <Input
                        style={{ borderRadius: 30 }}
                        prefix={<img src={union} alt="" />}
                        value={this.state.searchValue}
                        size="middle"
                        placeholder="Search payments"
                        onChange={async (e) => {
                          const value = e.target.value;
                          this.setState({
                            searchValue: value,
                            currentPage: 1,
                          });
                          const response =
                            await controller.GetTransactionSearch(
                              e.target.value,
                              this.state.mode,
                              1
                            );
                          if (response.status < 250) {
                            this.setState({
                              page: 1,
                              page_size: response.data.count,
                              transactions: response.data.results,
                            });
                          }
                        }}
                        className="transaction_mw250"
                      />
                    </div>

                  </Row>

                  <Card style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Tabs defaultActiveKey="new" onChange={this.handleTabChange}>
                      <TabPane tab="New" key="new">
                      </TabPane>
                      <TabPane tab="Recorded" key="archive">
                      </TabPane>
                    </Tabs>


                    <Table
                      className="centerTble-action"
                      columns={columns}
                      dataSource={this.state.transactions}
                      style={{ marginTop: "15px" }}
                      pagination={false}
                    />
                    <Row type="flex" justify="end" className="mt15">
                      <Pagination
                        showSizeChanger={false}
                        hideOnSinglePage={true}
                        disabled={this.state.loading}
                        current={this.state.currentPage}
                        total={this.state.page_size}
                        onChange={this.handlePageChange}
                        className="paginator"
                        size="small"
                      />
                    </Row>
                  </Card>

                </div>
              </div>
              <div className="text-muted poweredby">
                &copy; powered by{" "}
                <img
                  className="large-logo smilinLogoPowerdBy w52"
                  src={this.state.serverLogo}
                />
              </div>
              <div className="flex_end"></div>
            </Layout>
          </Layout>
        </div>
        <Modal
          title="Installment"
          onCancel={() => {
            this.setState({
              OpenInstallmentModal: false,
            });
          }}
          open={this.state.OpenInstallmentModal}
          footer={null}
        >
          <div className="transaction_lh35">
            <Table
              columns={installmentColumns}
              dataSource={this.state.installment}
              style={{ marginTop: "15px" }}
            />
          </div>
        </Modal>

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
                          window.open(item.invoice, '_blank')
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

        <Modal
          title="Payment Details"
          onCancel={() => {
            this.setState({
              OpenPayReqModal: false,
            });
          }}
          open={this.state.OpenPayReqModal}
          footer={null}
          style={{ minWidth: 568 }}
        >
          <Card style={{ marginTop: 25, marginLeft: 15, marginRight: 15 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: 15, fontSize: 14 }}>Payment Plan ID</p>
                <div style={{ width: 23, height: 23, fontSize: 10, color: '#6B43B5', borderRadius: '50%', border: '1px solid #6B43B5', background: '#E9E6FF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {transactionsDetail && transactionsDetail.payment_request ? transactionsDetail.payment_request.id : "-"}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: 65 }}>
                <div style={{ marginBottom: 20, fontSize: '14px' }}>Guarantor Information</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <img src={user} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px', fontWeight: '400' }}>

                    {this.state.tr_pay_req.guarantor_firstname +
                      " " +
                      this.state.tr_pay_req.guarantor_lastname}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <img src={call} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px' }}>
                    {this.state.tr_pay_req.guarantor_phone}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={sms} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px' }}>
                    {this.state.tr_pay_req.guarantor_email}
                  </span>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: 20, fontSize: '14px' }}>Clinic Information</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <img src={buliding} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px', fontWeight: '400' }}>
                    {this.state.tr_pay_req.office_name
                      ? this.state.tr_pay_req.office_name
                      : "-"}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <img src={call} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px' }}>
                    {this.state.tr_pay_req.office_phone
                      ? this.state.tr_pay_req.office_phone
                      : "-"}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={loc} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px' }}>
                    {this.state.tr_pay_req.office_address
                      ? this.state.tr_pay_req.office_address
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
            {/* <p style={{ marginTop: 30, fontSize: 16 }}>Reason</p>
            <span className="reason-span">
              {tr_pay_req.reason_data && ( // Ensure tr_pay_req is defined before accessing its properties
                tr_pay_req.reason_data.other_reason ? (
                  <span>{tr_pay_req.reason_data.other_reason}</span>
                ) : (
                  <div className='tag-mr'>
                    {tr_pay_req.reason_data && tr_pay_req.reason_data.length > 0 && (
                      <>
                        <Tag className="tag_reason" color="rgba(233, 230, 255, 1)">
                          {tr_pay_req.reason_data[0].reason}
                        </Tag>
                        {tr_pay_req.reason_data.length > 1 && (
                          <Dropdown overlay={menu} placement="bottomLeft">
                            <Tag className="tag_reason" color="rgba(233, 230, 255, 1)" style={{ cursor: 'pointer' }}>
                              + {tr_pay_req.reason_data.length - 1}
                            </Tag>
                          </Dropdown>
                        )}
                      </>
                    )}
                  </div>
                )
              )}
            </span> */}
            <div className="flex-row12">
              <p className="reason-color">Reason</p>
              <span className="reason-span">
                {transactionsDetail && ( // Ensure transactionsDetail is defined before accessing its properties
                  transactionsDetail.other_reason ? (
                    <span>{transactionsDetail.other_reason}</span>
                  ) : (
                    <div className='tag-mr'>
                      {transactionsDetail.payment_request.reason_text && transactionsDetail.payment_request.reason_text.length > 0 && (
                        <>
                          <Tag className="tag_reason" color="rgba(233, 230, 255, 1)">
                            {transactionsDetail.payment_request ? transactionsDetail.payment_request.reason_text[0].reason : "-"}
                          </Tag>
                          {transactionsDetail.payment_request.reason_text.length > 1 && (
                            <Dropdown overlay={menu} placement="bottomLeft">
                              <Tag className="tag_reason" color="rgba(233, 230, 255, 1)" style={{ cursor: 'pointer' }}>
                                + {transactionsDetail.payment_request.reason_text.length - 1}
                              </Tag>
                            </Dropdown>
                          )}
                        </>
                      )}
                    </div>
                  )
                )}
              </span>
            </div>
            <div className="flex-row123" style={{ justifyContent: 'space-between', marginTop: 30 }}>
              <Card className="card-size11"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (this.state.tr_pay_req &&
                    this.state.tr_pay_req.invoice &&
                    this.state.tr_pay_req.invoice.length > 0
                  ) {
                    if (this.state.tr_pay_req.invoice.length > 1) {
                      console.log(this.state.tr_pay_req.invoice)
                      this.setState({
                        openModalMultiFile: true,
                        downloadMultiFileTitle: "Download Invoices Files",
                        ModalMultiFileData: this.state.tr_pay_req.invoice
                      })

                    } else {
                      this.state.tr_pay_req.invoice.forEach(item => {
                        if (item && item.invoice) {
                          window.open(item.invoice, '_blank');
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
                      if (this.state.tr_pay_req &&
                        this.state.tr_pay_req.invoice &&
                        this.state.tr_pay_req.invoice.length > 0
                      ) {
                        if (this.state.tr_pay_req.invoice.length > 1) {
                          console.log(this.state.tr_pay_req.invoice)
                          this.setState({
                            openModalMultiFile: true,
                            downloadMultiFileTitle: "Download Invoices Files",
                            ModalMultiFileData: this.state.tr_pay_req.invoice
                          })

                        } else {
                          this.state.tr_pay_req.invoice.forEach(item => {
                            if (item && item.invoice) {
                              window.open(item.invoice, '_blank');
                            }
                          })
                        }

                      }
                    }}
                  />
                </div>
              </Card>
              <Card className="card-size11"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (this.state.payment_data &&
                    transactionsDetail.supporting_document &&
                    transactionsDetail.supporting_document.length > 0
                  ) {

                    if (transactionsDetail.supporting_document.length > 1) {
                      console.log(transactionsDetail.supporting_document)
                      this.setState({
                        openModalMultiFile: true,
                        downloadMultiFileTitle: "Download Supporting Document Files",
                        ModalMultiFileData: transactionsDetail.supporting_document
                      })

                    } else {


                      transactionsDetail.supporting_document.forEach(item => {
                        if (item && item.supporting_document) {
                          window.open(config.apiGateway.URL + item.supporting_document, '_blank')
                        }
                      })
                    }
                  }

                }}>
                <div className="card-size11">
                  <div style={{ width: '90%', fontSize: 12 }}>Supporting Document</div>
                  <Button
                    type="text"
                    icon={<img src={download} alt="" />}
                    style={{ color: "#979797", marginLeft: 'auto', marginRight: 40 }}
                    onClick={() => {

                      if (transactionsDetail &&
                        transactionsDetail.supporting_document &&
                        transactionsDetail.supporting_document.length > 0
                      ) {

                        if (transactionsDetail.supporting_document.length > 1) {
                          console.log(transactionsDetail.supporting_document)
                          this.setState({
                            openModalMultiFile: true,
                            downloadMultiFileTitle: "Download Supporting Document Files",
                            ModalMultiFileData: transactionsDetail.supporting_document
                          })

                          console.log(this.state.openModalMultiFile)

                        } else {


                          transactionsDetail.supporting_document.forEach(item => {
                            if (item && item.supporting_document) {
                              window.open(config.apiGateway.URL + item.supporting_document, '_blank')
                            }
                          })
                        }
                      }

                    }}
                  />
                </div>
              </Card>
            </div>
          </Card>

          <div className="flex-row123" style={{ marginLeft: 15, marginRight: 15 }}>
            <p style={{ fontSize: 16 }}>Created Date</p>
            <span className="reason-span">
              {this.state.tr_pay_req.created_at
                ? new Date(this.state.tr_pay_req.created_at).toLocaleDateString()
                : "-"}
            </span>
          </div>


          <div className="flex-row123" style={{ marginRight: 15, marginLeft: 15 }}>
            <p className="amount-size-color">Amount Due</p>
            <span className="reason-span1">
              ${transactionsDetail && transactionsDetail.amount_total
                ? transactionsDetail.amount_total
                : "-"}
            </span>
          </div>
          {transactionsDetail && transactionsDetail.installment && transactionsDetail.installment.installment !== "no installment" && (
            <div style={{ marginRight: 15, marginLeft: 15 }}>
              <p style={{ marginTop: 15, fontSize: 16, color: "black" }}>Installment Timeline</p>
              <DynamicProgress
                percent={perc}
                steps={transactionsDetail && transactionsDetail.installment ? transactionsDetail.installment.interval_count : 0}
                stroke={this.getStrokeColors()}
              />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ fontSize: 12, color: '#B7B7B7' }}>{paidInstallments} Paid</p>
                <p style={{ marginLeft: 'auto', fontSize: 12 }}>{(transactionsDetail && transactionsDetail.installment ? transactionsDetail.installment.interval_count : 0) - paidInstallments} Left</p>
              </div>
            </div>
          )}
          <Row justify={"center"}>
            <Button type="primary"
              onClick={() => {
                this.updateToArchive(this.state.transactionId)
                this.setState({
                  OpenPayReqModal: false
                });
              }} style={{ width: 139, height: 39, fontSize: 16, borderRadius: 5000, marginTop: 30 }}>
              Record
            </Button>
          </Row>
        </Modal>
      </div>

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

const connectedAR = connect(mapStateToProps)(Transaction);

export default withRouter(connectedAR);
