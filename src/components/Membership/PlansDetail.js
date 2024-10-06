import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { paymentRequestActions } from "../../actions";
import { dashboardActions } from "../../actions"; 
import {
  Row,
  Col,
  Select,
  DatePicker,
  Icon,
  Table,
  Input,
  Layout,
  notification,
  Typography,
} from "antd";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout"; 
import "./style.css";
import { Controller } from "./Controller/Controller";

const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;

const Config = {
  headers: {
    Authorization: localStorage.getItem("user")
      ? "Token " + JSON.parse(localStorage.getItem("user")).key
      : "",
  },
};

const MembersColumn = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => <a>{text}</a>,
  },
];

const MembersRows = [
  {
    key: "1",
    name: "Alireza Sadeqi",
    gender: "Male",
    phone: "+1 (888) 232 56 56",
    email: "aireza.sadeqi@gmail.com",
    status: "Active",
  },
  {
    key: "1",
    name: "Alireza Sadeqi",
    gender: "Male",
    phone: "+1 (888) 232 56 56",
    email: "aireza.sadeqi@gmail.com",
    status: "Active",
  },
  {
    key: "1",
    name: "Alireza Sadeqi",
    gender: "Male",
    phone: "+1 (888) 232 56 56",
    email: "aireza.sadeqi@gmail.com",
    status: "Active",
  },
  {
    key: "1",
    name: "Alireza Sadeqi",
    gender: "Male",
    phone: "+1 (888) 232 56 56",
    email: "aireza.sadeqi@gmail.com",
    status: "Active",
  },
];

const ServiceColumn = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Number",
    dataIndex: "number",
    render: (text) => <a>{text}</a>,
  },
];

const ServiceRows = [
  {
    key: "1",
    name: "Service #1",
    number: "x2",
  },
  {
    key: "1",
    name: "Service #1",
    number: "x2",
  },
  {
    key: "1",
    name: "Service #1",
    number: "x2",
  },
];

class PlansDetail extends Component {
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

  getMembersList = async () => {
    const response = await Controller.GetMembersOfPlan(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
    var memberTemp = [];
    for (var i in response.json.results) {
      var temp = {
        key: response.json.results[i].id,
        name: response.json.results[i].fullname,

        phone: response.json.results[i].phone,
        email: response.json.results[i].email,
        status: response.json.results[i].status,
      };
      memberTemp.push(temp);
    }
    this.setState({
      members: memberTemp,
    });
  };

  getMembershipServices = async () => {
    const response = await Controller.GetServicesofPlan(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
    var ServiceRowsTemp = [];
    for (var i in response.json.results) {
      var temp = {
        key: response.json.results[i].id,
        name: response.json.results[i].service,
        number: response.json.results[i].count + "x",
      };
      ServiceRowsTemp.push(temp);
    }
    this.setState({
      services: ServiceRowsTemp,
    });
  };

  getMembershipDetail = async () => {
    const response = await Controller.GetMembershipDetail(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
    this.setState({
      membershipDetail: response.json,
    });
  };

  getData = () => {
    this.getMembershipDetail();
    this.getMembershipServices();
    this.getMembersList();
  };

  constructor(props) {
    super(props);
    this.getData();

    this.state = {
      currentState: "showMemberDetail",
      membershipDetail: {},
      services: [],
      members: [],
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDateChange(value, dateString) {
    this.setState({
      ...this.state,
      appointment_datetime: dateString,
    });
  }

  handleMenuClick(e) {
    this.setState({
      ...this.state,
      reason: e.item.props.children[1],
    });
  }

  render() {
    const { profileSummary } = this.props;
    return ( <React.Fragment>     <DashboardLayout
      breadCrumb={'Plans / View-Plan'}
      logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
      footerLogo={true}
    >
                <Row>
                  <Col xs={8}>
                    <div className="paymentRequestContent">
                      <Typography.Text strong={true}>
                        Membership Info
                      </Typography.Text>
                      <br />
                      <br />
                      <Col>
                        <Row type="flex" justify="space-between">
                          <Typography.Text disabled={true}>
                            Name{" "}
                          </Typography.Text>
                          <Typography.Text>
                            {this.state.membershipDetail.name}
                          </Typography.Text>
                        </Row>
                        <br />
                        <Row type="flex" justify="space-between">
                          <Typography.Text disabled={true}>
                            Total member{" "}
                          </Typography.Text>
                          <Typography.Text>
                            {this.state.membershipDetail.member_count}
                          </Typography.Text>
                        </Row>
                        <br />
                        <Row type="flex" justify="space-between">
                          <Typography.Text disabled={true}>
                            Active members{" "}
                          </Typography.Text>
                          <Typography.Text>
                            {this.state.membershipDetail.active_member_count}
                          </Typography.Text>
                        </Row>
                        <br />
                        <Row type="flex" justify="space-between">
                          <Typography.Text disabled={true}>
                            Amount
                          </Typography.Text>
                          <Typography.Text>
                            {this.state.membershipDetail.cost} $
                          </Typography.Text>
                        </Row>
                      </Col>
                    </div>
                    <div className="paymentRequestContent">
                      <Typography.Text strong={true}>Services</Typography.Text>
                      <br />
                      <br />
                      <Table
                        columns={ServiceColumn}
                        dataSource={
                          this.state.services
                            ? this.state.services
                            : ServiceRows
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={16}>
                    <div className="paymentRequestContent">
                      <Typography.Text strong={true} className="mt10">
                        Members
                      </Typography.Text>
                      <div className="mt15"></div>
                      <Table
                        columns={MembersColumn}
                        dataSource={this.state.members}
                      />
                    </div>
                  </Col>
                </Row>
              
            </DashboardLayout> </React.Fragment> 
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

const connectedPlansDetail = connect(mapStateToProps)(PlansDetail);

export default connectedPlansDetail;
