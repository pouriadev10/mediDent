import React, { Component } from "react";
import { dashboardActions } from "../../actions";
import {
  Button,
  Modal,
  DatePicker,
  notification,
  Card,
  Table,
  Space,
  Typography,
  Tabs
} from "antd";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import { controller } from "../../controller";
import { connect } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";
import "./style.css";

import edit from '../../assets/icons/edit.png';
import arrow from '../../assets/icons/arrow-left.png';
import tick from '../../assets/icons/tick-circle.png';

const { Title } = Typography;
const { TabPane } = Tabs;


class Appointments extends Component {
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
    this.getData();
    this.state = {
      isEditing: false, 
      selectedDate: dayjs("2015-01-01", { format: "YYYY-MM-DD" }),
      currentPage: 1,
      page_size: 1,
      page: 1,
      currentState: "showTable",
      loadingApprove: false,
      loadingDecline: false,
      AppointmentList: [
      ],
    };
    this.getLogo = this.getLogo.bind(this);
    this.getData = this.getData.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
    this.closeModalEditAppointment = this.closeModalEditAppointment.bind(this);
    this.openModalEditAppointment = this.openModalEditAppointment.bind(this);
    this.onSelectTime = this.onSelectTime.bind(this);
    this.ApproveModalEditAppointment =
      this.ApproveModalEditAppointment.bind(this);
    this.DeclineModalEditAppointment =
      this.DeclineModalEditAppointment.bind(this);

    this.props.dispatch(dashboardActions.fetchProfileSummary());
  }

  DeclineModalEditAppointment = async () => {
    this.setState({
      loadingDecline: true,
    });
    const response = await controller.declineAppointment(
      this.state.selectedAppointment.time,
      this.state.selectedAppointment.id,
      true
    );
    if (response.status && response.status < 250) {
      this.openNotification("bottom", response.detail[0], "Successful");
    }
    this.setState({
      loadingDecline: false,
      editAppointment: false,
    });
  };

  ApproveModalEditAppointment = async () => {
    this.setState({
      loadingApprove: true,
    });

    const response = await controller.approveAppointment(
      this.state.selectedAppointment.time,
      this.state.selectedAppointment.id,
      true
    );
    if (response.status && response.status < 250) {
      this.openNotification("bottom", response.detail[0], "Successful");
    }

    this.setState({
      loadingApprove: false,
      editAppointment: false,
      isEditing: false
    });
  };

  onSelectTime = (value, dateString) => {
    this.setState({
      selectedAppointment: {
        ...this.state.selectedAppointment,
        time: dateString,
      },
    });
  };

  openModalEditAppointment = (time, id) => {
    this.setState({
      editAppointment: true,
      selectedAppointment: {
        id: id,
        time: time.replace("T", " ").replace("Z", " "),
      },
    });
  };

  closeModalEditAppointment = () => {
    this.setState({
      editAppointment: false,
    });
  };

  onSelectDate = (date) => {
    this.setState({ selectedDate: date });
  };

  // Handler for when the user confirms the new date selection
  onOk = () => {
    this.setState({ ApproveModalEditAppointment: this.selectedDate });
  };

  // Handler for when the user clicks the edit icon to enable editing
  onEditClick = () => {
    this.setState({ isEditing: true });
  };

  getData = async () => {
    const response = await controller.unApprovedAppointment("1");
    if (response && response.data) {
      this.setState({
        AppointmentList: response.data.results,
        page: 1,
        currentPage: 1,
        page_size: response.data.count,
      });
    } else this.setState({ AppointmentList: [] });
  };

  handlePageChange = async (page) => {
    this.setState({
      currentPage: page,
    });

    const response = await controller.unApprovedAppointment(page);
    if (response.status < 250) {
      this.setState({
        page: 1,
        page_size: response.data.count,
        AppointmentList: response.data.results,
      });
    }
  };

  getLogo = async () => {
    const response = await controller.getLogo();
    this.setState({ serverLogo: response.data.dark });
  };

  handleApprove = async (time, id) => {
    const response = await controller.approveAppointment(time, id, true);
    this.openNotification("bottom", response.detail[0], "Successful");
    this.getData();
  };

  render() {
    const { profileSummary } = this.props;

    const columns = [
      {
        title: "Patient  Name",
        width: '179px',
        render: (_, record) => {
          return (
            <>
              {record.patient &&
                record.patient.first_name &&
                record.patient.last_name
                ? record.patient.first_name + " " + record.patient.last_name
                : "-"}
            </>
          );
        },
      },
      {
        title: "Appointment Date & Time",
        width: '252px',
        render: (_, record) => {
          return (
            <>
             {this.state.isEditing ? ( // If in edit mode, render DatePicker for editing
          <DatePicker
            suffixIcon={<img src={arrow} alt="" />}
            style={{ width: 220, height: 34, borderRadius: '8px', border: '1px solid #6B43B5' }}
            disabledDate={(current) => dayjs().subtract(1, "day") >= dayjs(current)}
            onChange={this.onSelectDate}
            defaultValue={this.state.selectedDate}
            showTime
            placeholder="Select Time"
            onOk={this.onOk}
            className="w100p"
            size="large"
          />
        ) : (
          // Otherwise, render the selected date
          <>
            <div>{record.appointment_datetime}</div>
            
          </>
        )}
            </>
          );
        },
      },
      {
        title: "Provider",
        width: '162px',
        render: (_, record) => {
          return (
            <>
              {record.provider && record.provider.name
                ? record.provider.name
                : "-"}
            </>
          );
        },
      },
      {
        title: "Service",
        width: '164px',
        render: (_, record) => {
          return (
            <>
              {record.appointment_type && record.appointment_type.service
                ? record.appointment_type.service
                : "-"}
            </>
          );
        },
      },
      {
        title: "Clinic Name",
        width: '153px',
        render: (_, record) => {
          return <>{record.amount}$</>;
        },
      },

      {
        title: "Action",
        width: '130px',
        render: (_, record) => {
          return (
            <>
              <Space size="middle">
                <Button type="primary" style={{ background: '#6B43B5', width: 75, height: 26, fontSize: 10 }} onClick={() => { this.handleApprove(record.appointment_datetime, record.id) }}>
                  Approve
                </Button>
                {this.state.isEditing ? (
                <Button
                  type="text"
                  icon={<img src={tick} alt="" />}
                  style={{ color: "#979797" }}
                  onClick={this.ApproveModalEditAppointment}
                />
                ) : (<Button
                  type="text"
                  icon={<img src={edit} alt="" />}
                  style={{ color: "#979797" }}
                  onClick={this.onEditClick}
                />) }
              </Space>
            </>
          );
        },
      },
    ];

   

    return (
      <DashboardLayout
        breadCrumb={"Appointments"}
        logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
        footerLogo={this.state.serverLogo}
      >
        <Title level={4} style={{ marginBottom: 40, marginTop: 57, marginLeft: 32 }}>Appointments</Title>
        <Card style={{ width: '95%', padding: 0, marginLeft: 32 }}>
          <Tabs defaultActiveKey="1" style={{ borderBottom: 'none'}} >
            <TabPane tab="Pending" key="1">
              <Table
                style={{marginTop: 5}}
                columns={columns}
                dataSource={this.state.AppointmentList}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="Approved" key="2">
              {/* Render Approved Appointments here */}
            </TabPane>
          </Tabs>
        </Card>
        <Modal
          footer={[
            <Button
              onClick={this.DeclineModalEditAppointment}
              key="Decline"
              className="mw100"
            >
              {!this.state.loadingDecline ? "Decline" : "Declining..."}
            </Button>,
            <Button
              onClick={this.ApproveModalEditAppointment}
              key="Approve"
              type="primary"
              className="mw120"
            >
              {!this.state.loadingApprove ? "Approve" : "Approving..."}
            </Button>,
          ]}
          title="Edit appointment"
          visible={this.state.editAppointment}
          onCancel={this.closeModalEditAppointment}
        >
          <label className="inputLabel mt0">Appointment time</label>

          <DatePicker
            disabledDate={(current) => {
              return dayjs().subtract(1, "day") >= dayjs(current);
            }}
            onChange={this.onSelectTime}
            defaultValue={
              this.state.selectedAppointment &&
                this.state.selectedAppointment.time
                ? dayjs(this.state.selectedAppointment.time)
                : dayjs("2015-01-01", { format: "YYYY-MM-DD" })
            }
            showTime
            placeholder="Select Time"
            onOk={this.onOk}
            className="w100p"
            size="large"
          />
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

const connectedAppointment = connect(mapStateToProps)(Appointments);

export default connectedAppointment;
