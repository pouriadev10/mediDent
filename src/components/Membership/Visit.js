import {
  Avatar,
  Button,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Layout,
  Modal,
  notification,
  Row,
  Select,
  Table,
} from "antd";
import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import { controller } from "../../controller";
import { Controller } from "./Controller/Controller";
import moment from "moment";

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

const now = new Date();

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
    title: "Member name",
    dataIndex: "fullname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Service",
    dataIndex: "service",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Service count",
    dataIndex: "count",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "date",
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

class Visit extends Component {
  createServiceUsage = async () => {
    const response = await Controller.serviceUsage(this.state.VisitData);
    if (response.status < 250) {
      this.openNotification("bottom", "added successfully", "Successful");
      this.getData();
      this.setState({
        VisitData: {
          date: dayjs(new Date()),
          count: 0,
          membership: "",
          service: "",
        },
        visibleVisit: false,
      });
    } else {
      this.openNotification("bottom", "Error", "error");
    }
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
  getData = async () => {
    const response = await Controller.getAllVisit();
    var temp = [];

    for (var i in response.json.results) {
      temp.push({
        key: i,
        fullname:
          response.json.results[i] &&
            response.json.results[i].member_info &&
            response.json.results[i].member_info.first_name ? (
            <>
              <Avatar
                src={
                  response.json.results[i] &&
                    response.json.results[i].member_info &&
                    response.json.results[i].member_info.profile_picture
                    ? response.json.results[i].member_info.profile_picture
                    : ""
                }
                sx={{ width: 56, height: 56 }}
                style={{ marginRight: "5px" }}
              />
              {response.json.results[i].member_info.first_name +
                " " +
                response.json.results[i].member_info.last_name}
            </>
          ) : (
            "-"
          ),
        service:
          response.json.results[i] && response.json.results[i].service_name
            ? response.json.results[i].service_name
            : "-",
        count:
          response.json.results[i] && response.json.results[i].count
            ? response.json.results[i].count + "x"
            : "-",
        date:
          response.json.results[i] && response.json.results[i].date
            ? new Date(response.json.results[i].date).toLocaleDateString() +
            " " +
            new Date(response.json.results[i].date).toLocaleTimeString()
            : "-",
      });
    }

    this.setState({
      visitRow: temp,
    });
  };

  handleOpenVisitModal = async () => {
    const response = await Controller.GetAllMember();

    this.setState({
      membersList: response.json,
      visibleVisit: true,
    });
  };

  handleSelectMembership = async (value) => {
    const response = await Controller.getServicesOfMembership(value);
    this.setState({
      selectedMemberShipInModal: value,
      serviceOfMembership: response.json,
    });
  };

  handleSelectMemberInModal = async (value) => {
    const response = await Controller.GetAllSubscriptions(value);
    this.setState({
      selectedMemberInModal: value,
      selectedMemberShipInModal: "",
      membershipsOfMember: response.json,
    });
  };

  constructor(props) {
    super(props);
    this.getData();

    this.state = {
      VisitData: {
        date: moment(),
        count: 0,
        membership: "",
        service: "",
      },
      selectedService: "",
      selectedMemberShipInModal: "",
      selectedMemberInModal: "",
      serviceOfMembership: [],
      membersList: [],
      visitRow: [],
      membershipsOfMember: [],
      visibleVisit: false,
    };
    this.handleOpenVisitModal = this.handleOpenVisitModal.bind(this);
    this.handleSelectMemberInModal = this.handleSelectMemberInModal.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleChangeInputVisitData = this.handleChangeInputVisitData.bind(
      this
    );
    this.onOkDate = this.onOkDate.bind(this);
  }
  handleChangeInputVisitData = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({
      VisitData: {
        ...this.state.VisitData,
        [name]: value,
      },
    });
  };
  handleChangeInputVisitData = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({
      VisitData: {
        ...this.state.VisitData,
        [name]: value,
      },
    });
  };

  onOkDate = (value) => { };

  onChangeDate = (value, dateString) => { };

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
    return (<DashboardLayout
      breadCrumb={'Visit'}
      logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
      footerLogo={true}
    >
      <div className="paymentRequestContent ">
        <Row type="flex" justify="space-between" className="flex-visit">
          <div className="visit-font">
            Visit
          </div>
          <div>
            <Button
              className="create-btn"
              onClick={this.handleOpenVisitModal}
              type="primary" size="large"
            >
              Add Visit
            </Button>
          </div>
        </Row>
        <div className="visit_mt15">
          <Table
            columns={PlanColumn}
            dataSource={this.state.visitRow}
          />
        </div>
      </div>
      <Modal
        style={{ minWidth: 568 }}
        title="Add Visit"
        visible={this.state.visibleVisit}
        footer={null}
        onCancel={() => {
          this.setState({
            visibleVisit: false,
          });
        }}
      >
        <div className="flex-roww">
          <div>
            <label className="formLabel">Member</label>
            <Select
              showSearch
              style={{ width: 290, height: 39 }}
              className="w100pp"
              placeholder="search Member"
              optionFilterProp="children"
              onChange={(e, value) => {
                this.handleSelectMemberInModal(e);
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.membersList ? (
                this.state.membersList.map((member0) => (
                  <Option value={member0.id}>
                    {member0.first_name + " " + member0.last_name}
                  </Option>
                ))
              ) : (
                <></>
              )}
              {this.state.membersList.map((member0) => (
                <Option value={member0.id}>
                  {member0.first_name + " " + member0.last_name}
                </Option>
              ))}
            </Select>

          </div>
          <div className="margin-l">
            <label className="margin-bt">Cost</label>
            <InputNumber
              className="cost-input"
              // value={createsService.cost}
              name="cost"
              defaultValue={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            // className="w100p"
            // onChange={(e, value) => {
            //   setCreatesService({
            //     ...createsService,
            //     cost: e,
            //   });
            // }}
            />
          </div>
        </div>

        <label className="formLabel">MemberShip</label>
        <Select
          showSearch
          style={{ width: 290, height: 39 }}
          className="w100pp"
          placeholder="search MemberShip"
          optionFilterProp="children"
          onChange={(e, value) => {
            this.handleSelectMembership(e);
            this.setState({
              VisitData: {
                ...this.state.VisitData,
                membership: e,
              },
            });
          }}
          filterOption={(input, option) =>
            option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >
          {this.state.membershipsOfMember ? (
            this.state.membershipsOfMember.map((member0) => (
              <Option value={member0.id}>{member0.plan_name}</Option>
            ))
          ) : (
            <></>
          )}
          {this.state.membershipsOfMember.map((member0) => (
            <Option value={member0.id}>{member0.plan_name}</Option>
          ))}
        </Select>
         <br />
         <div className="btnBox services_close" style={{marginTop: 92}}>
        <Button
          onClick={this.createServiceUsage}
          type="primary"
          className="service_create"
        >
          Create
        </Button>
        </div>



        {/* <label className="formLabel">Member</label>
          <Select
            showSearch
            className="w100p"
            placeholder="search Member"
            optionFilterProp="children"
            onChange={(e, value) => {
              this.handleSelectMemberInModal(e);
            }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
             {this.state.membersList ? (
              this.state.membersList.map((member0) => (
                <Option value={member0.id}>
                  {member0.first_name + " " + member0.last_name}
                </Option>
              ))
            ) : (
              <></>
            )}
            {this.state.membersList.map((member0) => (
                <Option value={member0.id}>
                  {member0.first_name + " " + member0.last_name}
                </Option>
              ))}
          </Select> */}

        {/* {this.state.selectedMemberInModal ? (
            <>
              <label className="formLabel">MemberShip</label>
              <Select
                showSearch
                className="w100p"
                placeholder="search MemberShip"
                optionFilterProp="children"
                onChange={(e, value) => {
                  this.handleSelectMembership(e);
                  this.setState({
                    VisitData: {
                      ...this.state.VisitData,
                      membership: e,
                    },
                  });
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >  */}
        {/* {this.state.membershipsOfMember ? (
                  this.state.membershipsOfMember.map((member0) => (
                    <Option value={member0.id}>{member0.plan_name}</Option>
                  ))
                ) : (
                  <></>
                )} */}
        {/* {this.state.membershipsOfMember.map((member0) => (
                    <Option value={member0.id}>{member0.plan_name}</Option>
                  ))}
              </Select>
              <br /> */}
        {/* {this.state.selectedMemberShipInModal ? (
                <>
                  <label className="formLabel">Service</label>
                  <Select
                    showSearch
                    className="w100p"
                    placeholder="search Service"
                    optionFilterProp="children"
                    onChange={(e, value) => {
                      this.setState({
                        VisitData: {
                          ...this.state.VisitData,
                          service: e,
                        },
                      });
                    }}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.serviceOfMembership ? (
                      this.state.serviceOfMembership.map((service0) => (
                        <Option value={service0.service_info[0].service_id}>
                          {service0.service_info[0].service_name}
                        </Option>
                      ))
                    ) : (
                      <></>
                    )}
                  </Select>
                  <br />
                  <label className="formLabel">Count</label>
                  <InputNumber
                    className="w100p"
                    placeholder="count"
                    onChange={(e) => {
                      this.setState({
                        VisitData: {
                          ...this.state.VisitData,
                          count: e,
                        },
                      });
                    }}
                  />
                  <label className="formLabel">Time</label>
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={(e, value) => {
                      this.setState({
                        VisitData: {
                          ...this.state.VisitData,
                          date: moment(value),
                        },
                      });
                    }}
                    value={this.state.VisitData.date}
                  />
                  <div className="btnBox mb0 dbf-jcc">
                    <Button
                      onClick={() => {
                        this.setState({
                          visibleVisit: false,
                        });
                      }}
                      type="secondary"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={this.createServiceUsage}
                      type="primary"
                      className="mb5 ml5"
                    >
                      Create
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="btnBox mb0 dbf-jcc">
                    <Button
                      onClick={() => {
                        this.setState({
                          visibleVisit: false,
                        });
                      }}
                      type="secondary"
                    >
                      Close
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="btnBox mb0 dbf-jcc">
                <Button
                  onClick={() => {
                    this.setState({
                      visibleVisit: false,
                    });
                  }}
                  type="secondary"
                >
                  Close
                </Button>
              </div>
            </>
          )} */}
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

const connectedVisit = connect(mapStateToProps)(Visit);

export default connectedVisit;
