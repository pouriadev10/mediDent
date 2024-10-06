import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { paymentRequestActions } from "../../actions";
import { dashboardActions } from "../../actions"; 
import {
  Divider,
  Row,
  Button,
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
import { controller } from "../../controller";

import CreatePlan from "./CreatePlan";
import { Controller } from "./Controller/Controller";
import "./style.css";

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

const ActionPlan = ({ id }) => {
  return (
    <a href="/">
      <a href="/">Edit</a>
      <Divider type="vertical" />
      <a href={"/#/plan-detail/" + id}>View</a>
    </a>
  );
};

const PlanColumn = [
  {
    title: "Membership Plan Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Total Members",
    dataIndex: "member",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Cost",
    dataIndex: "cost",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Services",
    dataIndex: "services",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (text) => <a>{text}</a>,
  },
];

const PlanRows = [
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
  {
    key: "1",
    name: "XYZ Membership Plan",
    member: "560",
    cost: "35$",
    services: "Service #1, Service #2, ...",
    action: <ActionPlan />,
  },
];

class Plans extends Component {
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
    const response = await Controller.GetAllMembership();

    var memberRows = [];

    var result = response.json.results;

    for (var i in response.json.results) {
      var services = "";

      for (var j in response.json.results[i].services) {
        if (j == 0)
          services = services + response.json.results[i].services[j].service;
        else
          services =
            services + ", " + response.json.results[i].services[j].service;
      }
      var temp = {
        key: response.json.results[i].id,
        name: response.json.results[i].name,
        member: response.json.results[i].member_count,
        cost: response.json.results[i].cost + "$",
        services: services,
        action: <ActionPlan id={response.json.results[i].id} />,
      };
      memberRows.push(temp);
    }

    this.setState({
      memberships: memberRows,
      membershipsCount: response.json.count,
    });
  };

  constructor(props) {
    super(props);
    this.getData();

    this.state = {
      currentState: "createPlan",
      memberships: [{}],
      membershipsCount: 0,
    };
    this.handleBackFromCreate = this.handleBackFromCreate.bind(this);
  }

  handleBackFromCreate(status) {
    this.setState({ currentState: "showTable" });
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
    return (
      <DashboardLayout
      breadCrumb={'Plans'}
      logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
      footerLogo={true}
    >
              <Row>
                {this.state.currentState == "showTable" ? (
                  <div
                    className="paymentRequestContent"
                    style={{ width: "100%" }}
                  >
                    <div className="payreq-container">
                      <Row type="flex" justify="space-between">
                        <div>
                          <Search
                            placeholder="input search text"
                            className="w200"
                          />
                        </div>
                        <div>
                          <Button
                            className="login-btn create-payment-request-btn"
                            onClick={() => {
                              this.setState({ currentState: "createPlan" });
                            }}
                            type="primary" size="large"
                          >
                            Create Plan
                          </Button>
                        </div>
                      </Row>
                      <div className="mt15">
                        <Table
                          columns={PlanColumn}
                          dataSource={this.state.memberships}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <CreatePlan back={this.handleBackFromCreate} />
                )}
              </Row> 
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

const connectedPlans = connect(mapStateToProps)(Plans);

export default connectedPlans;
