import { Input, Modal, Select, Table, TimePicker, notification } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Error } from "../ErrorHandeling";
import config from "../config";
import { controller } from "../controller";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import { EyeTwoTone, PlusCircleOutlined } from "@ant-design/icons";
import "./app.local.css";

const { TextArea } = Input;
const { Option } = Select;
const Config = {
  headers: {
    Authorization: localStorage.getItem("user")
      ? "Token " + JSON.parse(localStorage.getItem("user")).key
      : "",
  },
};

class ProviderScheduling extends Component {
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
  getData = async () => {
    this.setState({ loading_open_modal: true });
    const response = await controller.get_provider(
      localStorage.getItem("selectedOffice")
    );
    this.setState({
      loading_update: false,
      providers: response.data,
    });
  };

  setEndTime = (time, timeString) => {
    this.setState({
      endTime: timeString,
      sowEndTime: time,
    });
  };

  setStartTime = (time, timeString) => {
    this.setState({
      startTime: timeString,
      sowStartTime: time,
    });
  };

  handleSubmitAddNewTime = async () => {
    this.setState({
      load_add_time: true,
      formError: {
        start: {
          status: true,
          massage: "",
        },
        end: {
          status: true,
          massage: "",
        },
        weekday: {
          status: true,
          massage: "",
        },
      },
    });

    const start_validation = await Error.DateHandling(this.state.startTime);
    const end_validation = await Error.DateHandling(this.state.endTime);
    const weekDay_validation = await Error.SelectItem(this.state.weekDay);

    if (
      start_validation.status &&
      end_validation.status &&
      weekDay_validation.status
    ) {
      const response = await controller.add_provider_times(
        this.state.weekDay,
        this.state.startTime,
        this.state.endTime,
        this.state.selectedProviderId
      );
      if (response.status < 250) {
        this.closeAddTimes();
        this.openNotification(
          "bottom",
          response.message ? response.message : "Created",
          "Successful"
        );
        this.setState({
          startTime: "00:00:00",
          endTime: "00:00:00",
          weekDay: "Mon",
          sowStartTime: moment("00:00:00", "HH:mm:ss"),
          sowEndTime: moment("00:00:00", "HH:mm:ss"),
        });
      } else {
        if (response.data.detail)
          this.openNotification("bottom", response.data.detail[0], "Error");
        else {
          this.openNotification("bottom", "Failed", "Error");
          this.setState({
            formError: {
              start: {
                status: response.data.start ? false : true,
                massage: response.data.start ? response.data.start : "",
              },
              end: {
                status: response.data.end ? false : true,
                massage: response.data.end ? response.data.end : "",
              },
              weekday: {
                status: response.data.weekday ? false : true,
                massage: response.data.weekday ? response.data.weekday : "",
              },
            },
          });
        }
      }
    } else {
      this.setState({
        formError: {
          start: {
            status: start_validation.status ? true : false,
            massage: start_validation.status ? "" : start_validation.massage,
          },
          end: {
            status: end_validation.status ? true : false,
            massage: end_validation.status ? "" : end_validation.massage,
          },
          weekday: {
            status: weekDay_validation.status ? true : false,
            massage: weekDay_validation.status
              ? ""
              : weekDay_validation.massage,
          },
        },
      });
    }

    this.setState({
      load_add_time: false,
    });
  };

  addTimes = (id) => {
    this.setState({ openAddTimes: true, selectedProviderId: id });
  };
  showTimes = async (id) => {
    this.setState({
      loading_open_modal: true,
      openShowTimes: true,
      provider_times: [],
    });
    const response = await controller.get_provider_times(id);
    this.setState({
      loading_open_modal: false,
      provider_times: response.data,
    });
  };

  closeShowTimes = () => {
    this.setState({ openShowTimes: false });
  };
  closeAddTimes = () => {
    this.setState({ openAddTimes: false });
  };
  constructor(props) {
    super(props);

    this.state = {
      serverLogo: "",
      load_add_time: false,
      loading_update: true,
      loading_open_modal: false,
      openShowTimes: false,
      openAddTimes: false,
      providers: [],
      provider_times: [],
      startTime: "00:00:00",
      endTime: "00:00:00",
      weekDay: "Mon",
      loadingActiveID: "-1",
      loadingActive: false,
      sowStartTime: moment("00:00:00", "HH:mm:ss"),
      sowEndTime: moment("00:00:00", "HH:mm:ss"),
      selectedProviderId: -1,
      formError: {
        start: {
          status: true,
          massage: "",
        },
        end: {
          status: true,
          massage: "",
        },
        weekday: {
          status: true,
          massage: "",
        },
      },
    };
    this.getData();
    this.getLogo();
    this.getLogo = this.getLogo.bind(this);
    this.handleChangeActive = this.handleChangeActive.bind(this);
  }

  handleChangeActive = async (my_status, id) => {
    this.setState({
      loadingActive: true,
      loadingActiveID: id
    })
    var status = "";
    if (my_status == "active") {
      status = "inactive"
    } else {
      status = "active"
    }
    const response = await controller.editProviderActive(status, id)
    this.getData();
    setTimeout(() => {
      this.setState({
        loadingActive: false,
        loadingActiveID: "-1"
      })
    }, 500)

  }

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
  };

  goToDashboard = () => {
    this.props.dispatch(push(`/dashboard`));
  };

  render() {
    const columns = [
      {
        title: "Image",
        render: (_, record) => {
          return (
            <>
              <img
                className="providerscheduling_img"
                src={config.apiGateway.URL + record.image}
              />
            </>
          );
        },
      },
      {
        title: "Name",
        render: (_, record) => {
          return (
            <>
              {record.firstname && record.lastname
                ? record.firstname + " " + record.lastname
                : record.firstname && !record.lastname
                ? record.firstname
                : !record.firstname && record.lastname
                ? record.lastname
                : record.name
                ? record.name
                : "-"}
            </>
          );
        },
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Specialty",
        dataIndex: "specialty",
        key: "specialty",
      },
      {
        title: "Times",
        render: (_, record) => {
          return (
            <>
              <EyeTwoTone
                onClick={() => {
                  this.showTimes(record.id);
                }}
                style={{
                  cursor: "pointer",
                  fontSize: "13px",
                  margin: "2px",
                }}
              />
            </>
          );
        },
      },
      {
        title: "Add Time",
        render: (_, record) => {
          return (
            <>
              <PlusCircleOutlined
                onClick={() => {
                  this.addTimes(record.id);
                }}
                style={{
                  color: "#52c41a",
                  cursor: "pointer",
                  margin: "2px",
                  fontSize: "13px",
                }}
              />
            </>
          );
        },
      },
    ];
    const TimeColumns = [
      {
        title: "Week Day",
        dataIndex: "weekday",
        key: "weekday",
      },
      {
        title: "Start",
        dataIndex: "start",
        key: "start",
      },
      {
        title: "End",
        dataIndex: "end",
        key: "end",
      },
    ];
    return (
      <DashboardLayout
        breadCrumb={"Provider Scheduling"}
        logo={false}
        footerLogo={this.state.serverLogo}
      >
        <div className="paymentRequestContent">
          <div className="providerscheduling_container">
            <div id="custom-scrollbar-x">
              <label className="formLabel">Provider List</label>
              <br />
              <Table
                columns={columns}
                dataSource={this.state.providers}
                pagination={false}
              />
            </div>
          </div>
        </div>
        <Modal
          title="Provider Times"
          open={this.state.openShowTimes}
          footer={null}
          onCancel={this.closeShowTimes}
        >
          <div className="provider_items">
            <Table
              columns={TimeColumns}
              dataSource={this.state.provider_times}
              pagination={false}
            />
          </div>
        </Modal>

        <Modal
          title="Add New Time"
          open={this.state.openAddTimes}
          onOk={this.handleSubmitAddNewTime}
          okText={this.state.load_add_time ? "Loading..." : "Submit"}
          onCancel={this.closeAddTimes}
        >
          <div className="row">
            <label className="formLabel">Week Days</label>

            <Select
              className={
                this.state.formError &&
                  this.state.formError.weekday &&
                  this.state.formError.weekday.status
                  ? "inputs w100p"
                  : "inputs-error w100p"
              }
              placeholder="week day"
              value={this.state.weekDay}
              onChange={(event) => this.setState({ weekDay: event })}
            >
              <Option key="Mon">Mon</Option>
              <Option key="Tue">Tue</Option>
              <Option key="Wed">Wed </Option>
              <Option key="Thu">Thu </Option>
              <Option key="Fri">Fri </Option>
              <Option key="Sat">Sat </Option>
              <Option key="Sun">Sun </Option>
            </Select>

            {this.state.formError &&
              this.state.formError.weekday &&
              this.state.formError.weekday.status ? (
              <></>
            ) : (
              <div className="error-text">
                {this.state.formError.weekday.massage}
              </div>
            )}
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <label className="formLabel">Start time</label>
              <TimePicker
                value={this.state.sowStartTime}
                className={
                  this.state.formError &&
                    this.state.formError.start &&
                    this.state.formError.start.status
                    ? "inputs w100p"
                    : "inputs-error w100p"
                }
                onChange={this.setStartTime}
              />
              {this.state.formError &&
                this.state.formError.start &&
                this.state.formError.start.status ? (
                <></>
              ) : (
                <div className="error-text">
                  {this.state.formError.start.massage}
                </div>
              )}
            </div>
            <div className="col-6">
              <label className="formLabel">End time</label>
              <TimePicker
                value={this.state.sowEndTime}
                className={
                  this.state.formError &&
                    this.state.formError.end &&
                    this.state.formError.end.status
                    ? "inputs w100p"
                    : "inputs-error w100p"
                }
                onChange={this.setEndTime}
              />
              {this.state.formError &&
                this.state.formError.end &&
                this.state.formError.end.status ? (
                <></>
              ) : (
                <div className="error-text">
                  {this.state.formError.end.massage}
                </div>
              )}
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    );
  }
}

function mapStateToProps(state) { }

const connectedProviderScheduling =
  connect(mapStateToProps)(ProviderScheduling);

export default connectedProviderScheduling;
