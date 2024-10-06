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
import Axios from "axios";
import config from "../../config";
import { controller } from "../../controller";
import { Error } from "../../ErrorHandeling";

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

const ViewInvoice = () => {
  return <a href="/">Invoice</a>;
};

const PaymentColumn = [
  {
    title: "Amount",
    dataIndex: "amount",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "action",
    dataIndex: "action",
    render: (text) => <a>{text}</a>,
  },
];

const subscriptionRows = [
  {
    key: "1",
    amount: "1400$",
    date: "12/11/2022 16:00",
    status: "Successful",
    action: <ViewInvoice />,
  },
  {
    key: "1",
    amount: "1400$",
    date: "12/11/2022 16:00",
    status: "Successful",
    action: <ViewInvoice />,
  },
  {
    key: "1",
    amount: "1400$",
    date: "12/11/2022 16:00",
    status: "Successful",
    action: <ViewInvoice />,
  },
  {
    key: "1",
    amount: "1400$",
    date: "12/11/2022 16:00",
    status: "Successful",
    action: <ViewInvoice />,
  },
];

class Subscriptions extends Component {
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
  getData = () => {
    Axios.get(config.apiGateway.URL + `/clinics/selectoffice/`, Config).then(
      (res) => {
        const response = res.data;
        this.setState((prevState) => ({
          office_id: response,
        }));
      }
    );
  };

  constructor(props) {
    super(props);
    this.getData();

    this.state = {
      currentState: "showMemberDetail",    };
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
    return ( <DashboardLayout
      breadCrumb={'Subscriptions'}
      logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
      footerLogo={true}
    > 
      
              <Row>
                <Col xs={8}>
                  <div className="paymentRequestContent">
                    <Typography.Text strong={true} className="mb10">
                      Subscriptions
                    </Typography.Text>
                    <br />
                    <br />
                    <Col>
                      <Row type="flex" justify="space-between">
                        <Typography.Text disabled={true}>
                          Monthly amount{" "}
                        </Typography.Text>
                        <Typography.Text>800$</Typography.Text>
                      </Row>
                      <br />
                      <Row type="flex" justify="space-between">
                        <Typography.Text disabled={true}>
                          Start Date{" "}
                        </Typography.Text>
                        <Typography.Text>12/12/2022 17:00</Typography.Text>
                      </Row>
                      <br />
                      <Row type="flex" justify="space-between">
                        <Typography.Text disabled={true}>
                          Exp. Date{" "}
                        </Typography.Text>
                        <Typography.Text>12/12/2022 17:00</Typography.Text>
                      </Row>
                      <br />
                      <Row type="flex" justify="space-between">
                        <Typography.Text disabled={true}>
                          Billing Cycle{" "}
                        </Typography.Text>
                        <Typography.Text>1 Month</Typography.Text>
                      </Row>
                    </Col>
                  </div>
                </Col>
                <Col xs={16}>
                  <div className="paymentRequestContent">
                    <Typography.Text strong={true} className="mb10">
                      Payment
                    </Typography.Text>
                    <div className="mt15">
                      <Table
                        columns={PaymentColumn}
                        dataSource={subscriptionRows}
                      />
                    </div>
                  </div>
                </Col>
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

const connectedSubscriptions = connect(mapStateToProps)(Subscriptions);

export default connectedSubscriptions;
