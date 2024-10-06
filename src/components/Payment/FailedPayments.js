import {
  Input,
  Pagination,
  Row,
  Select,
  notification,
  Table,
  Card,
  Col,
  Tag,
  Typography,
  Space,
  Button
} from "antd";
import {
  Modal,
  Progress,
  Flex,
  Tabs,
  Menu,
  Dropdown
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { controller } from "../../controller";
import { Paymentcontroller } from "../../Paymentcontroller";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import config from "../../config";
import DynamicProgress from '../Transaction/DynamicProgress'


import eye from '../../assets/icons/eye.png';
import union from '../../assets/icons/Union.png';
import user from '../../assets/icons/user.svg';
import call from '../../assets/icons/call.png';
import sms from '../../assets/icons/sms.png';
import buliding from '../../assets/icons/buliding.png';
import loc from '../../assets/icons/location.png';
import download from '../../assets/icons/frame.png';
import calender from '../../assets/icons/calendar-2.svg';
import vector from '../../assets/icons/wallet.svg';
import coin from '../../assets/icons/coin.svg';
import buttonSvgrepo from '../../assets/img/download-button-svgrepo-com.svg'





const { Title } = Typography
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const Config = {
  headers: {
    Authorization: localStorage.getItem("user")
      ? "Token " + JSON.parse(localStorage.getItem("user")).key
      : "",
  },
};



const data = [
  {
    key: 1,
    payment_type: "Payment Plan",
    created_at: "2023/12/12 , 05:23:30",
    paid: 'False',
    canceled: 'False',
    subscription_transaction: "Undefined",
  },
  {
    key: 2,
    payment_type: "Payment Plan",
    created_at: "2023/12/12 , 05:23:30",
    paid: 'False',
    canceled: 'False',
    subscription_transaction: "Undefined",
  }
]

class FailedPayments extends Component {
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

  constructor(props) {
    super(props);

    this.state = {
      failedPayments: [],
      OpenPayReqModal: false,
      tr_pay_req: {},
      currentPage: 1,
      page_size: 2,
      page: 1,
      loading: true,
      payment_data: {},
      transactionId: null,
      transactions: {},
      mode: "new",
      transactionsDetail: null,
      paymentRequests: [],
      search_term: "",
      selected: [],
      activeTabKey: '1',
    };

    this.getData();
    // this.getData2();
    this.handleShowPaymentReq = this.handleShowPaymentReq.bind(this);
    this.updateRequestList();


  }

  getData2 = async () => {
    this.setState({
      loading: true,
    });
    if (window.location.href.split("/") && this.state.transactionId) {
      const response = await Paymentcontroller.get_payment_data(
        this.state.transactionId
      );
      this.setState({
        transactions: response,
        loading: false,
      });
    }
  };

  getData = async () => {
    const response = await controller.FailedPayments(this.state.currentPage);
    var data = response.json.results;
    for (var i in data) {
      data[i].created_at = new Date(data[i].created_at)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\.\d+Z$/, "");
    }

    this.setState({
      page: 1,
      currentPage: 1,
      page_size: response.json.count,
      failedPayments: data,
    });
  };

  updateRequestList = async () => {
    const response = await controller.get_payment_requests(
      this.state.page_size,
      this.state.page,
      this.state.search_term,
      localStorage.getItem("selectedOffice"),
      true
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

  getDataDetail = async (id) => {
    try {
      const response = await controller.getProgressStatusFaild(id);
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


  handleShowPaymentReq = (data) => {
    this.setState(
      {
        tr_pay_req: data.payment_request,
        OpenPayReqModal: true,
        transactionId: data.id,
        selected: data
      },
      () => {
        this.getData2();
        this.getDataDetail(data.id);
      }
    );
  };


  handlePageChange = async (page) => {
    this.setState({
      currentPage: page,
    });

    const response = await controller.FailedPayments(page);
    var data = response.json.results;
    for (var i in data) {
      data[i].created_at = new Date(data[i].created_at)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\.\d+Z$/, "");
    }

    if (response.status < 250) {
      this.setState({
        page: 1,
        page_size: response.json.count,
        failedPayments: data,
      });
    }
  };

  getStrokeColors = () => {
    const { transactions } = this.state;

    return transactions.installments && transactions.installments.map(transaction => {
      if (transaction.status === 'failed') {
        return "#EE615B"; // Color for failed transactions
      } else if (transaction.status === 'paid') {
        return "#23D020"; // Color for paid transactions
      } else {
        return "#000000"; // Default color if no matching status is found
      }
    });
  };


  handleTabChange = (key) => {
    this.setState({ activeTabKey: key });
  };

  processData = (data, filterPaid) => {
    return data.results && data.results
      .filter(item => item.all_paid === filterPaid)
      .map((item) => {
        const failedInstallments = item.installments
          ? item.installments.filter(inst => inst.status === 'failed').length
          : 0;
        console.log(failedInstallments)

        const totalFailedAmount = item.installments
          ? item.installments
            .filter(inst => inst.status === 'failed' && typeof inst.transaction_amount === 'number')
            .reduce((acc, inst) => acc + inst.transaction_amount, 0)
          : 0;
        return {
          key: item.id,
          id: item.id,
          billTo: `${item.guarantor_firstname} ${item.guarantor_lastname}`,
          amount: totalFailedAmount || "None",
          status: item.status,
          Failedinstallments: failedInstallments || 'None',
          totalFailedAmount
        };
      });
  };

  render() {
    const { profileSummary } = this.props;
    const { transactionsDetail, transactions, paymentRequests } = this.state;
    const paidInstallmentsCount = transactions.installments
      ? transactions.installments.filter(installment => installment.status === 'failed' || installment.status === 'paid').length

      : 0;

    const paidInstallmentsCount2 = transactions.installments
      ? transactions.installments.filter(installment => installment.status === 'paid').length

      : 0;

    const totalInstallments = transactions.number_of_installments ? transactions.number_of_installments : 0;

    // const perc = totalInstallments > 0 ? (paidInstallmentsCount / totalInstallments) * 10 : 0;
    const perc = totalInstallments > 0 ? (paidInstallmentsCount * 100) / totalInstallments : 0;

    console.log(perc);

    // const value = Math.ceil(perc) * 10;
    // console.log(value);

    const { other_reason, reason_data } = transactions.reason_data || {};

    const menu = (
      <Menu>
        {transactions.reason_data && transactions.reason_data.slice(1).map((item) => (
          <Menu.Item key={item.reason}>
            <Tag className="tag_reason" color="rgba(233, 230, 255, 1)" style={{ cursor: 'pointer' }}>
              {item.reason}
            </Tag>
          </Menu.Item>
        ))}
      </Menu>
    );



    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: 'Account Holder',
        dataIndex: 'billTo',
        key: 'billTo',
      },
      {
        title: 'Failed Installments',
        dataIndex: 'Failedinstallments',
        key: 'Failedinstallments',
        render: (failedInstallments) => {
          console.log('Failed Installments:', failedInstallments); // Log failedInstallments

          if (!failedInstallments || failedInstallments === 'None') {
            return <div>-</div>;
          }

          let failedInstallmentsCount = 0;

          if (typeof failedInstallments === 'string') {
            failedInstallmentsCount = failedInstallments.split(', ').length + 1;
          } else if (Array.isArray(failedInstallments)) {
            failedInstallmentsCount = failedInstallments.length + 1;
          }

          return (
            <Tag
              color="#E9E6FF"
              style={{
                borderRadius: '50%',
                margin: '4px',
                border: '1px solid #6B43B5',
                color: "#6B43B5",
                width: '21px',
                height: '21px',
                textAlign: 'center',
                padding: 0
              }}
            >
              {failedInstallments}
            </Tag>
          );
        },
      },
      {
        title: 'Outstanding Amount',
        dataIndex: 'totalFailedAmount',
        key: 'totalFailedAmount',
        render: amount => typeof amount === 'number' ? `$${amount.toFixed(2)}` : 'Error: Invalid amount'
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <span>
            <Space size="middle">
              <Button
                type="text"
                icon={<img src={eye} alt="" />}
                style={{ color: "#979797" }}
                onClick={() => this.handleShowPaymentReq(record)}
              />
            </Space>
          </span>
        ),
      },
    ];

    // const processData = () => {
    //   return paymentRequests.results && paymentRequests.results.map((item) => ({
    //     const failedInstallments = item.installments
    //     ? item.installments
    //         .map((inst, index) => (inst.status === 'empty' ? index + 1 : null))
    //         .filter(index => index !== null)
    //         .join(', ')
    //     : '';
    //     return {
    //     key: item.id,
    //     id: item.id,
    //     billTo: `${item.guarantor_firstname} ${item.guarantor_lastname}`,
    //     amount: item.amount,
    //     status: item.status,
    //     }
    //   ));
    // };



    // const FailedPaymentColumn = [
    //   {
    //     title: "Payment Type",
    //     dataIndex: "payment_type",
    //     render: (text, record) => (
    //       <a style={record.seen ? {} : { fontWeight: "bold" }}>{text}</a>
    //     ),
    //   },
    //   {
    //     title: "Created at",
    //     dataIndex: "created_at",
    //     render: (text, record) => (
    //       <a style={record.seen ? {} : { fontWeight: "bold" }}>{text}</a>
    //     ),
    //   },
    //   {
    //     title: "Paid",
    //     dataIndex: "paid",
    //     render: (text, record) => (
    //       <a style={record.seen ? {} : { fontWeight: "bold" }}>{text + ""}</a>
    //     ),
    //   },
    //   {
    //     title: "Canceled",
    //     dataIndex: "canceled",
    //     render: (text, record) => (
    //       <a style={record.seen ? {} : { fontWeight: "bold" }}>{text + ""}</a>
    //     ),
    //   },
    //   {
    //     title: "Subscription Transaction",
    //     dataIndex: "subscription_transaction",
    //     render: (subscription) => (
    //       <Tag
    //         color={subscription === "Undefined" ? "#E9E6FF" : "volcano"}
    //         style={{ borderRadius: "20px", color: "#6B43B5", width: 113, textAlign: 'center', border: '1px solid #6B43B5' }}
    //       >
    //         {subscription}
    //       </Tag>
    //     ),
    //   },
    //   {
    //     title: "Action",
    //     key: "action",
    //     render: (_, record) => (
    //       <span>
    //         <Space size="middle">
    //           <Button
    //             type="text"
    //             icon={<img src={eye} alt="" />}
    //             style={{ color: "#979797" }}
    //             onClick={() => this.handleShowPaymentReq(record)}
    //           />
    //         </Space>
    //       </span>
    //     ),
    //   },
    // ];
    // console.log('Processed data:', processData(paymentRequests)); // Debugging: log processed data
    return (
      <DashboardLayout
        breadCrumb={"Failed Payments"}
        logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
        footerLogo={true}
      >
        <Title level={4} style={{ marginTop: 50, marginBottom: 30, marginLeft: 32 }}>Plans In-Default</Title>
        <Card style={{ width: '98%' }}>
          <Tabs activeKey={this.state.activeTabKey} onChange={this.handleTabChange}>
            <TabPane tab="Pending Payment" key="1">
              <Row>
                <Col span={24}>
                  <Row type="flex" justify="space-between" style={{ width: "100%" }}>
                    <Table columns={columns} dataSource={this.processData(paymentRequests, false)} style={{ width: "100%" }} pagination={false} />
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Resolved" key="2">
              <Row>
                <Col span={24}>
                  <Row type="flex" justify="space-between" style={{ width: "100%" }}>
                    <Table columns={columns} dataSource={this.processData(paymentRequests, true)} style={{ width: "100%" }} pagination={false} />
                  </Row>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
        <Row type="flex" justify="end" className="mt15" style={{ marginRight: 20 }}>
          <Pagination
            showSizeChanger={false}
            hideOnSinglePage={true}
            current={this.state.currentPage}
            total={this.state.page_size}
            onChange={this.handlePageChange}
            className="paginator"
            size="small"
          />
        </Row>
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

          <Card style={{ marginTop: 25 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: 15, fontSize: 14 }}>Payment Plan ID</p>
                <div style={{ width: 23, height: 23, fontSize: 10, color: '#6B43B5', borderRadius: '50%', border: '1px solid #6B43B5', background: '#E9E6FF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {this.state.transactionId}
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', position: 'absolute', left: 300 }}>
                  <p>Created At</p>
                  <span style={{ fontSize: 12, color: '#848696', marginLeft: 10, marginTop: 2 }}>
                    {transactions.created_at
                      ? new Date(transactions.created_at).toLocaleDateString()
                      : "-"}
                  </span>
                </div>

              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: 75 }}>
                <div style={{ marginBottom: 20, fontSize: '14px' }}>Guarantor Information</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <img src={user} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px', fontWeight: '400' }}>
                    {transactions &&
                      transactions.guarantor_firstname &&
                      transactions.guarantor_lastname
                      ? transactions.guarantor_firstname +
                      " " +
                      transactions.guarantor_lastname
                      : "-"}
                  </span>

                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <img src={call} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px', fontWeight: '400' }}>
                    {transactions && transactions.guarantor_phone ? transactions.guarantor_phone : " "}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={sms} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px', fontWeight: '400' }}>
                    {transactions && transactions.guarantor_email ? transactions.guarantor_email : " "}
                  </span>
                </div>
              </div>
              <div style={{ marginLeft: 13 }}>
                <div style={{ marginBottom: 20, fontSize: '14px' }}>Clinic Information</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <img src={buliding} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px', fontWeight: '400' }}>
                    {transactions && transactions.office_name ? transactions.office_name : " "}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                  <img src={call} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px', fontWeight: '400' }}>
                    {transactions && transactions.office_phone ? transactions.office_phone : " "}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={loc} alt="" style={{ marginRight: 10 }} />
                  <span style={{ fontSize: '13px', fontWeight: '400' }}>
                    {transactions && transactions.office_address ? transactions.office_address : " "}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-row12">
              <p className="reason-color">Reason</p>
              <span className="reason-span">
                {transactions && ( // Ensure tr_pay_req is defined before accessing its properties
                  transactions.other_reason ? (
                    <span>{transactions.other_reason}</span>
                  ) : (
                    <div className='tag-mr'>
                      {transactions.reason_data && transactions.reason_data.length > 0 && (
                        <>
                          <Tag className="tag_reason" color="rgba(233, 230, 255, 1)">
                            {transactions ? transactions.reason_data[0].reason : "-"}
                          </Tag>
                          {transactions.reason_data.length > 1 && (
                            <Dropdown overlay={menu} placement="bottomLeft">
                              <Tag className="tag_reason" color="rgba(233, 230, 255, 1)" style={{ cursor: 'pointer' }}>
                                + {transactions.reason_data.length - 1}
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
            {/* <div className="flex-row12" >
            <p className="reason-color">Reason:</p>
            <span className="reason-span">
              {transactions && ( // Ensure tr_pay_req is defined before accessing its properties
                transactions.other_reason ? (
                  <span>{transactions.other_reason}</span>
                ) : (
                  <div className='tag-mr'>
                    {transactions.reason_data && transactions.reason_data.length > 0 &&
                      transactions.reason_data.map((item) => (
                        <Tag className="tag_reason" color="rgba(233, 230, 255, 1)">
                          {item.reason}
                        </Tag>
                      ))}
                  </div>
                )
              )}
            </span>
          </div> */}
            <div className="flex-row123" style={{ justifyContent: 'space-between' }}>
              <Card className="card-size11"
                style={{cursor: 'pointer'}}
                onClick={() => {
                  if (transactions &&
                    transactions.invoice &&
                    transactions.invoice.length > 0) {
                    if (transactions.invoice.length > 1) {
                      console.log(transactions.invoice)
                      this.setState({
                        openModalMultiFile: true,
                        downloadMultiFileTitle: "Download Invoices Files",
                        ModalMultiFileData: transactions.invoice
                      })
                    } else {
                      transactions.invoice.forEach(item => {
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
                      if (transactions &&
                        transactions.invoice &&
                        transactions.invoice.length > 0) {
                        if (transactions.invoice.length > 1) {
                          console.log(transactions.invoice)
                          this.setState({
                            openModalMultiFile: true,
                            downloadMultiFileTitle: "Download Invoices Files",
                            ModalMultiFileData: transactions.invoice
                          })
                        } else {
                          transactions.invoice.forEach(item => {
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
                style={{cursor: 'pointer'}}
                onClick={() => {
                  if (transactions &&
                    transactions.supporting_document &&
                    transactions.supporting_document.length > 0) {
                    if (transactions.supporting_document.length > 1) {
                      console.log(transactions.supporting_document)
                      this.setState({
                        openModalMultiFile: true,
                        downloadMultiFileTitle: "Download Supporting Document Files",
                        ModalMultiFileData: transactions.supporting_document
                      })
                    } else {
                      transactions.supporting_document.forEach(item => {
                        if (item && item.supporting_document) {
                          window.open(config.apiGateway.URL + item.supporting_document, '_blank')
                        }
                      })
                    }
                  }
                }}
              >
                <div className="card-size11">
                  <div style={{ width: '90%', fontSize: 12 }}>Supporting Document</div>
                  <Button
                    type="text"
                    icon={<img src={download} alt="" />}
                    style={{ color: "#979797", marginLeft: 'auto', marginRight: 40 }}
                    onClick={() => {
                      if (transactions &&
                        transactions.supporting_document &&
                        transactions.supporting_document.length > 0) {
                        if (transactions.supporting_document.length > 1) {
                          console.log(transactions.supporting_document)
                          this.setState({
                            openModalMultiFile: true,
                            downloadMultiFileTitle: "Download Supporting Document Files",
                            ModalMultiFileData: transactions.supporting_document
                          })
                        } else {
                          transactions.supporting_document.forEach(item => {
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

          <div className="flex-row123" >
            <p className="amount-size-color">Total Amount</p>
            <span className="reason-span1">

              {transactions && transactions.amount
                ? transactions.amount
                : "-"}
            </span>
          </div>

          {/* <div className="flex-row123" >
            <p>Created Date</p>
            <span className="reason-span">
              {transactions && transactions.created_at
                ? new Date(transactions.created_at)
                  .toISOString()
                  .replace(/T/, " ")
                  .replace(/\.\d+Z$/, "")
                : "-"}
            </span>
          </div> */}
          <div >
            <p style={{ color: 'black', marginTop: 15, fontSize: 16 }}>Payment Plan Terms</p>
            <div>
              <Col style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src={calender} alt="" />
                  <p style={{ marginLeft: 5, marginTop: 16, fontSize: 13 }}><span style={{ fontSize: 13, color: '#848696' }}>Start : </span> {transactions && transactions.installment_data ? new Date(transactions.installment_data.start_date).toISOString().split('T')[0] : '-'}
                  </p>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row', marginLeft: "auto" }}>
                    <img src={calender} alt="" />
                    <p style={{ marginLeft: 5, marginTop: 16, fontSize: 13 }}><span style={{ fontSize: 13, color: '#848696' }}>End : </span> {transactions && transactions.installment_data ? new Date(transactions.installment_data.end_date).toISOString().split('T')[0] : '-'}
                    </p>
                  </div>
                </div>
              </Col>
              <Col style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src={coin} alt="" />
                  <p style={{ marginLeft: 5, marginTop: 16, fontSize: 13 }}><span style={{ fontSize: 13, color: '#848696' }}>Installment Period: : </span> {transactions && transactions.installment_data ? (transactions.installment_data.interval_count) : '-'}  Months</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src={vector} alt="" />
                  <p style={{ marginLeft: 5, marginTop: 16, fontSize: 13 }}><span style={{ fontSize: 13, color: '#848696' }}>Monthly Amount : </span> ${transactions && transactions.installment_data ? (parseFloat(transactions.installment_data.monthly_amount).toFixed(2)) : '-'}</p>
                </div>
              </Col>
            </div>
            <p style={{ fontSize: 16, marginTop: 10, color: "black" }}>Installments Timeline</p>
            {transactions && (
              <>
                <DynamicProgress
                  percent={perc}
                  steps={transactions.number_of_installments ? transactions.number_of_installments : 0}
                  stroke={this.getStrokeColors()} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontSize: 12, color: '#B7B7B7' }}>{paidInstallmentsCount2} Paid</p>
                  <p style={{ marginLeft: 'auto', fontSize: 12 }}>{totalInstallments - paidInstallmentsCount2} Left</p>
                </div>
              </>
            )}
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
      </DashboardLayout>
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

const connectedFailedPayments = connect(mapStateToProps)(FailedPayments);

export default connectedFailedPayments;
