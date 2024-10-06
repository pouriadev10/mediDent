import {
  Modal,
  Col,
  Button,
  Switch,
  Spin,
  Input,
  Row,
  notification,
  Space,
  InputNumber,
  Table,
  Typography
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { controller } from "../controller";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import "./app.local.css";
import { controllerBooking } from "./../controllerBooking";
import { Error } from "../ErrorHandeling";
import trash from '../assets/icons/trash.png';
import edit from '../assets/icons/edit.png';
import up from '..//assets/icons/up.png';
import down from '../assets/icons/down.png';

const { Title } = Typography


class DiscountOptions extends Component {
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
    this.getLogo();

    this.state = {
      percentage: 0
    };

    this.state = {
      loading: false,
      formError: {
        time_to_appointment: {
          massage: "",
          status: true,
        },
        percentage: {
          massage: "",
          status: true,
        },
      },
      loadingActive: false,
      loadingActiveID: 0,
      loading_update: true,
      serverLogo: "",
      DiscountList: [],
      openNew: false,
      data: {
        percentage: 0,
        time_to_appointment: "",
      },
    };

    this.getData();
  }

  getData = async () => {
    const response = await controllerBooking.ListOfDiscount();
    this.setState({
      DiscountList: response.results,
      loading_update: false,
    });
  };

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
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

  handleCreateNewRule = async () => {
    this.setState({
      loading: true,
    });
    const timeHandle = await Error.AmountHandling(
      this.state.data.time_to_appointment
    );
    const percentageHandling = await Error.PercentHandling(
      this.state.data.percentage
    );

    this.setState({
      formError: {
        time_to_appointment: timeHandle,
        percentage: percentageHandling,
      },
    });

    if (timeHandle.status && percentageHandling.status) {
      var myData = {
        is_active: true,
        time_to_appointment: this.state.data.time_to_appointment * 60,
        percentage: this.state.data.percentage,
        office: localStorage.getItem("selectedOffice"),
      };

      const response = await controllerBooking.createDiscountRule(myData);

      if (response.status < 250) {
        this.getData();
        this.openNotification(
          "bottom",
          response && response.message ? response.message : "Done",
          "Successful"
        );
        this.setState({
          openNew: false,
          data: {
            time_to_appointment: null,
            percentage: null,
          },
        });
      } else {
        this.openNotification(
          "bottom",
          response.appointment_datetime
            ? JSON.stringify(response.appointment_datetime[0])
            : JSON.stringify(response.detail[0]),
          "Error"
        );
      }
    }

    this.setState({
      loading: false,
    });
  };

  handleUpdate = async (item) => { };

  handleDelete = async (item) => { };

  handleChangeActive = async (item) => {
    this.setState({
      loadingActiveID: item.id,
      loadingActive: true,
    });
    var myItem = {
      ...item,
      is_active: !item.is_active,
    };

    const response = await controllerBooking.UpdateDiscount(myItem);

    if (response.status < 250) {
      this.getData();
    } else {
      this.openNotification(
        "bottom",
        response && response.message ? response.message : "Error",
        "Error"
      );
    }
    setTimeout(() => {
      this.setState({
        loadingActive: false,
      });
    }, 500);
  };

  increasePercentage = () => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        percentage: prevState.data.percentage >= 100 ? 100 : parseInt(prevState.data.percentage,) + 1
      }
    }));
  };

  decreasePercentage = () => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        percentage: prevState.data.percentage <= 0 ? 0 : parseInt(prevState.data.percentage,) - 1
      }
    }));
  };


  render() {
    const { profileSummary } = this.props;
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: '89px'
      },
      {
        title: "Office",
        width: '226px',
        render: (_, record) => (
          <>
            {record
              ? record.office
                ? record.office.name
                  ? record.office.name
                  : ""
                : ""
              : ""}
          </>
        ),
      },
      {
        title: "Percentage",
        width: '217px',
        render: (_, record) => (
          <>{record ? (record.percentage ? record.percentage + "%" : "-") : "-"}</>
        ),
      },
      {
        title: "Time to Appointment",
        key: "time_to_appointment",
        dataIndex: "time_to_appointment",
        width: '261px',
      },
      {
        title: "Status",
        key: "tags",
        dataIndex: "tags",
        width: '179px',
        render: (_, record) => (

          this.state.loadingActive && this.state.loadingActiveID == record.id ?
            <Spin />
            :
            <Switch
              checked={record.is_active}
              onChange={() => {
                console.log(record)
                this.handleChangeActive(record);
              }}
            />


        ),
      },
      {
        title: "Action",
        key: "action",
        width: '114px',
        render: (_, record) => (
          <>
            {/* <Tag
              onClick={() => {
                this.handleUpdate(record);
              }}
              color={"green"}
              style={{ cursor: "pointer" }}
            >
              Update
            </Tag>
            <Popconfirm
              title="Are you sure to delete this rule?"
              onConfirm={() => {
                this.handleDelete(record);
              }}
            >
              <Tag color={"volcano"} style={{ cursor: "pointer" }}>
                Remove
              </Tag>
            </Popconfirm> */}
            <Space size="middle">
              <Button
                type="text"
                icon={<img src={trash} alt="" />}
                style={{ color: "#979797" }}
                onClick={() => {
                  this.handleDelete(record);
                }}
              />
              <Button
                type="text"
                icon={<img src={edit} alt="" />}
                style={{ color: "#979797" }}
                onClick={() => {
                  this.handleUpdate(record);
                }}
              />
            </Space>

          </>
        ),
      },
    ];

    const data = [
      {
        id: 1,
        office: {
          name: "Office A"
        },
        percentage: 80,
        time_to_appointment: "2 days",
        tags: ["active"],
        is_active: true
      },
      {
        id: 2,
        office: {
          name: "Office B"
        },
        percentage: 60,
        time_to_appointment: "3 days",
        tags: ["inactive"],
        is_active: false
      },
      {
        id: 3,
        office: {
          name: "Office C"
        },
        percentage: 90,
        time_to_appointment: "1 day",
        tags: ["active"],
        is_active: true
      },
      // Add more data as needed
    ];

    return (
      <DashboardLayout
        breadCrumb={"Discount Options"}
        logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
        footerLogo={this.state.serverLogo}
      >
        <div className="paymentRequestContent">
          <Row justify="space-between" type="flex">
            <Title level={3} style={{ marginBottom: 25 }}>Discounts</Title>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  openNew: true,
                });
              }}
              className="mw120"
            >
              Add
            </Button>
          </Row>

          <div className="payreq-container pt10">
            <Row type="flex" justify="space-between">
              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={this.state.DiscountList}
                  //dataSource={data}
                  pagination={false}
                />
              </Col>
            </Row>
          </div>
        </div>
        <Modal
          style={{ maxWidth: 352, maxHeight: 354 }}
          footer={[
            // <Button
            //   onClick={() => {
            //     this.setState({
            //       data: {
            //         time_to_appointment: null,
            //         percentage: null,
            //       },
            //       formError: {
            //         time_to_appointment: {
            //           massage: "",
            //           status: true,
            //         },
            //         percentage: {
            //           massage: "",
            //           status: true,
            //         },
            //       },
            //       openNew: false,
            //     });
            //   }}
            //   key="Close"
            //   className="mw100"
            // >
            //   Close
            // </Button>,
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginBottom: 20 }}>
              <Button
                disabled={this.state.loading}
                onClick={this.handleCreateNewRule}
                key="Create"
                type="primary"
                className="mw1000"
              >
                {this.state.loading ? "Creating..." : "Create"}
              </Button>
            </div>
            ,
          ]}
          title="Create Rule"
          visible={this.state.openNew}
          onCancel={() => {
            this.setState({
              openNew: false,
            });
          }}
        >
          <label className="inputLabel mt0" style={{ marginTop: 26, marginBottom: 15, marginLeft: 10 }}>Time to Appointment</label>
          <InputNumber
            style={{ width: 290, height: 39, marginLeft: 10, border: '1px solid #6B43B5' }}
            className={
              this.state.formError &&
                this.state.formError.time_to_appointment &&
                this.state.formError.time_to_appointment.status
                ? "inputs w100p"
                : "inputs-error w100p"
            }
            value={this.state.data.time_to_appointment}
            onChange={(e) => {
              this.setState({
                data: {
                  ...this.state.data,
                  time_to_appointment: e,
                },
              });
            }}
            placeholder="Enter Time to Appointment"
          />
          {this.state.formError &&
            this.state.formError.time_to_appointment &&
            this.state.formError.time_to_appointment.status ? (
            <></>
          ) : (
            <div className="error-text">
              {this.state.formError.time_to_appointment.massage}
            </div>
          )}
          <br />
          <label className="inputLabel mt5" style={{ marginBottom: 15, marginLeft: 10 }}>Percentage</label>
          {/* <Input
            style={{marginBottom: 45, width: 290, height: 39, marginLeft: 10, border: '1px solid #6B43B5'}}
            className={
              this.state.formError &&
                this.state.formError.percentage &&
                this.state.formError.percentage.status
                ? " w100p"
                : "inputs-error w100p"
            }
            prefix="%"
            value={this.state.data.percentage}
            onChange={(e) => {
              this.setState({
                data: {
                  ...this.state.data,
                  percentage: e.target.value,
                },
              });
            }}
            placeholder="0"
          /> */}
          <Input
            style={{
              marginBottom: 45,
              width: 290,
              height: 39,
              marginLeft: 10,
              border: '1px solid #6B43B5',

            }}
            suffix={<img src={up} alt="" onClick={this.increasePercentage} />}
            prefix={<img src={down} alt="" onClick={this.decreasePercentage} />}
            placeholder="0.00%"
            min={0}
            max={100}
            formatter={value => `${parseInt(value, 10)}%`}
            parser={value => {
              const parsedValue = value.replace('%', ''); // Remove %
              const numericValue = parsedValue.startsWith('+') ? parsedValue.substring(1) : parsedValue; // Remove leading +

              const intValue = parseInt(numericValue, 10);
              if (!isNaN(intValue) && Number.isInteger(intValue)) {
                return numericValue;
              }
              return '';
            }}
            value={this.state.data.percentage}
            onChange={value => {
              const parsedValue = isNaN(value) ? 0 : parseInt(value, 10);
              this.setState(prevState => ({
                data: {
                  ...prevState.data,
                  percentage: parsedValue
                }
              }));
            }}
            className={
              this.state.formError &&
                this.state.formError.percentage &&
                this.state.formError.percentage.status
                ? "w100p"
                : "inputs-error w100p"
            }
          // addonBefore={<button onClick={this.decreasePercentage} className="decrease-btn">-</button>}
          // addonAfter={<button onClick={this.increasePercentage} className="increase-btn">+</button>}
          />

          {this.state.formError &&
            this.state.formError.percentage &&
            this.state.formError.percentage.status ? (
            <></>
          ) : (
            <div className="error-text">
              {this.state.formError.percentage.massage}
            </div>
          )}
        </Modal>{" "}
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

const connectedDiscountOptions = connect(mapStateToProps)(DiscountOptions);

export default connectedDiscountOptions;
