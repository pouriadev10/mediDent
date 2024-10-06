import { Select, Col, Input, Modal, Row, Table, Button } from "antd";
import { UserOutlined, UserAddOutlined, MailOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { dashboardActions } from "../../actions";
import { controller } from "../../controller";
import "../app.local.css";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import "./style.css";

const { Option } = Select;

class PracticeAdminMenu extends Component {
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
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
      width: 0,
      height: 0,
      page_size: 25,
      page: 1,
      search_term: "",
      totalAr: "",
      practiceOfficesList: [],
      addUserToOfficeModal: false,
      modalAddUserToOffice: false,
      officeUsers: [],
      addAdminForOffice: {
        username: "",
        office_id: "",
      },
      adduserData: {
        phone_number: "",
        email: "",
        username: "",
      },
    };
    this.getData();
    this.getData = this.getData.bind(this);
    this.handleShowModalAddUser = this.handleShowModalAddUser.bind(this);
    this.handleChangeAddUser = this.handleChangeAddUser.bind(this);
    this.handleCreateNewUser = this.handleCreateNewUser.bind(this);
    this.handleAddUserToOffice = this.handleAddUserToOffice.bind(this);
    this.handleCreateUserForOffice = this.handleCreateUserForOffice.bind(this);
    this.props.dispatch(dashboardActions.fetchProfileSummary());
    this.props.dispatch(dashboardActions.fetchSummary());
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  handleCreateUserForOffice = async () => {
    const response = await controller.setOfficeAdmin(
      this.state.addAdminForOffice
    );
    this.setState({
      addAdminForOffice: {
        username: "",
        office_id: "",
      },
      modalAddUserToOffice: false,
    });
    this.getData();
  };

  handleAddUserToOffice = async (e) => {
    const response = await controller.getUserOffices();
    this.setState({
      officeUsers: response,
      modalAddUserToOffice: true,
      addAdminForOffice: {
        ...this.state.addAdminForOffice,
        office_id: e + "",
      },
    });
  };

  handleCreateNewUser = async () => {
    const data = {
      email: this.state.adduserData.email,
      username: this.state.adduserData.username,
      phone_number:
        "+1" + this.state.adduserData.phone_number.replace(/ /g, ""),
    };
    const response = await controller.createUser(data);
    if (response.status < 250) {
      this.setState({
        addUserToOfficeModal: false,
        adduserData: {
          email: "",
          username: "",
        },
      });
    }
  };
  handleChangeAddUser = (e) => {
    const { name, value } = e.target;
    this.setState({
      adduserData: {
        ...this.state.adduserData,
        [name]: value,
      },
    });
  };

  handleShowModalAddUser = (id) => {
    this.setState({
      addUserToOfficeModal: true,
    });
  };

  goToCreatePaymentRequest = () => {
    this.props.dispatch(push(`/paymentrequest`));
  };
  getData = async () => {
    const response = await controller.getPracticeOffices();
    this.setState({
      practiceOfficesList: response.data,
    });
  };

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

    const columns = [
      {
        title: "Office ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Office Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Users",
        render: (_, record) => {
          return (
            <>
              {record.users.map((user) => (
                <>{user.username + ","}</>
              ))}
            </>
          );
        },
      },
      {
        title: "Add User",
        render: (_, record) => {
          return (
            <>
              <UserAddOutlined
                onClick={() => {
                  this.handleAddUserToOffice(record.id);
                }}
                style={{
                  color: "gray",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
            </>
          );
        },
      },
    ];
    return (
      <DashboardLayout
        breadCrumb={false}
        logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
        footerLogo={true}
      >
        <div className={className}>
          {error && error.message && (
            <div className="alert">{error.message}</div>
          )}
          <div className="page-breadcrumb">
            <div className="breadcrumb-part">User Management</div>
          </div>
          <div className="paymentContent">
            <Row justify="end" type="flex">
              <Col>
                <Button
                  className="login-btn practice_new_user"
                  onClick={() => this.handleShowModalAddUser()}
                  type="primary"
                  size={"large"}
                >
                  + New User
                </Button>
              </Col>
            </Row>
            <div className="requests">
              <br />
              <Table
                columns={columns}
                dataSource={this.state.practiceOfficesList}
                style={{ marginTop: "15px" }}
              />
            </div>
          </div>
        </div>
        <Modal
          title="Add new user"
          onOk={this.handleCreateNewUser}
          visible={this.state.addUserToOfficeModal}
          onCancel={() => {
            this.setState({ addUserToOfficeModal: false });
          }}
        >
          <label className="inputLabel mt0">Email</label>
          <Input
            value={this.state.adduserData.email}
            onChange={this.handleChangeAddUser}
            name="email"
            type="email"
            placeholder="example@domain.com"
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          <label className="inputLabel mt10">Username</label>
          <Input
            value={this.state.adduserData.username}
            onChange={this.handleChangeAddUser}
            name="username"
            type="text"
            placeholder="@alex"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          <label className="formLabel">Phone</label>
          <Input
            onChange={(e) => {
              let { name, value } = e.target;
              value = value.replace(/ /g, "");
              if (value.length < 10) {
                if (value.length == 8) {
                  value = value.replace(/ /g, "");
                  this.setState({
                    adduserData: {
                      ...this.state.adduserData,
                      phone_number:
                        value.slice(0, 3) +
                        " " +
                        value.slice(3, 6) +
                        " " +
                        value.slice(6),
                    },
                  });
                } else {
                  value = value
                    .replace(/[^\dA-Z]/g, "")
                    .replace(/(.{3})/g, "$1 ")
                    .trim();

                  this.setState({
                    adduserData: {
                      ...this.state.adduserData,
                      phone_number: value,
                    },
                  });
                }
              }
              if (value.length == 10) {
                value =
                  value.slice(0, 3) +
                  " " +
                  value.slice(3, 6) +
                  " " +
                  value.slice(6);
                this.setState({
                  adduserData: {
                    ...this.state.adduserData,
                    phone_number: value,
                  },
                });
              }
            }}
            type="text"
            name="phone_number"
            placeholder="123 456 0789"
            value={this.state.adduserData.phone_number}
            prefix={"+1"}
          />
        </Modal>
        <Modal
          title="Add user to office"
          onOk={this.handleCreateUserForOffice}
          visible={this.state.modalAddUserToOffice}
          onCancel={() => {
            this.setState({ modalAddUserToOffice: false });
          }}
        >
          <label className="inputLabel mt0">Username</label>
          <Select
            placeholder="Username"
            className="inputs"
            onChange={(e) => {
              this.setState({
                addAdminForOffice: {
                  ...this.state.addAdminForOffice,
                  username: e,
                },
              });
            }}
            value={
              this.state.addAdminForOffice.username
                ? this.state.addAdminForOffice.username
                : undefined
            }
          >
            {this.state.officeUsers.map((user) => (
              <Option key={user.username}>{user.username} </Option>
            ))}
          </Select>
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

const connectedPracticeAdminMenu = connect(mapStateToProps)(PracticeAdminMenu);

export default withRouter(connectedPracticeAdminMenu);
