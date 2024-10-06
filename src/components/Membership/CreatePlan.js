import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Col,
  Button,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Radio,
  Row,
  Select,
  Table,
  Card
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Controller } from "./Controller/Controller";
import "./style.css";
import add from '../../assets/icons/add-circle.png';
import add2 from '../../assets/icons/add-circle2.png';

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

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const serviceColumns = [
  {
    title: "Name",
    dataIndex: "Name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Cost",
    dataIndex: "Cost",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Count",
    dataIndex: "Count",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    dataIndex: "Action",
    render: (text) => <a>{text}</a>,
  },
];

class CreatePlan extends Component {
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

  getPlan = async () => {
    const response = await Controller.GetAllPlans();
    this.setState({
      planList: response.json,
    });
  };

  getMember = async () => {
    const response = await Controller.GetAllMember();

    this.setState({
      membersList: response.json,
    });
  };

  getData = () => {
    this.getMember();
    this.getPlan();
  };


  constructor(props) {
    super(props);

    this.getData();

    this.state = {
      membershipCreateDataCustom: {
        membership: {
          customer: 0,
          is_active: true,
          automatic_renewal: false,
        },
        membership_plan: {
          services: [],
          name: "",
          interval: "daily",
          interval_count: 0,
          active: true,
          cost: "",
          description: "",
          type: "custom",
          terms: "",
        },
      },
      membershipCreateData: {
        customer: "",
        plan: "",
        automatic_renewal: false,
      },
      changeStateTempForTestTableUpdate: true,
      SelectedServicesFromSelectBox: "",
      SelectedCountFromSelectBox: "",
      preDefinePlanForCreate: {
        name: "",
        interval: "daily",
        interval_count: 0,
        cost: "",
        description: "",
        active: true,
        clinic: localStorage.getItem("selectedOffice"),
        type: "predefined",
        services: [],
        terms: "",
      },
      createsService: {
        name: "",
        description: "",
        cost: "",
      },
      NpServices: [
        {
          cost: "",
          description: "",
          id: 1,
          name: "",
        },
      ],
      openAddNewRowVisible: false,
      openAddMembershipVisible: false,
      membersList: [],
      planList: [],
      visibleAddservice: false,
      selectedServices: [],
      currentState: "customePlan",
      openAddMembershipVisible10: false
    };


    this.handleCreateCustomPlan = this.handleCreateCustomPlan.bind(this);
    this.getData = this.getData.bind(this);
    this.getPlan = this.getPlan.bind(this);
    this.handleOpenAddService = this.handleOpenAddService.bind(this);
    this.handleCloseAddService = this.handleCloseAddService.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.addNewRowModal = this.addNewRowModal.bind(this);
    this.handleCreateNewPlan = this.handleCreateNewPlan.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateService = this.handleCreateService.bind(this);
    this.handleChangeCreatePlanData = this.handleChangeCreatePlanData.bind(
      this
    );
    this.handleCreateNewPlanPreDefined01 = this.handleCreateNewPlanPreDefined01.bind(
      this
    );
    this.handleSubmitCreateNewMembershipWithMemberAndPlan = this.handleSubmitCreateNewMembershipWithMemberAndPlan.bind(
      this
    );
  }

  handleCreateCustomPlan = async () => {
    const response = await Controller.CreateCustomMembership(
      this.state.membershipCreateDataCustom
    );
    if (response.status < 250) {
      this.openNotification(
        "bottom",
        response.message ? response.message : "Done",
        "Successful"
      );
      this.setState({
        membershipCreateDataCustom: {
          ...this.state.membershipCreateDataCustom,
          membership_plan: {
            ...this.state.membershipCreateDataCustom.membership_plan,
            services: [],
            name: "",

            interval_count: 0,
            active: true,
            cost: "",
            description: "",
            type: "custom",
            terms: "",
          },
        },
      });
    }
  };

  handleSubmitCreateNewMembershipWithMemberAndPlan = async () => {
    const response = await Controller.CreateMembershipnPreDefined(
      this.state.membershipCreateData
    );
    if (response.status < 250) {
      this.setState({
        membershipCreateData: {
          ...this.state.membershipCreateData,
          plan: "",
        },
      });
      this.openNotification(
        "bottom",
        response.message ? response.message : "Done",
        "Successful"
      );
    }
  };

  handleCloseAddRowModal = () => {
    this.setState({
      openAddNewRowVisible: false,
      SelectedServicesFromSelectBox: "",
      SelectedCountFromSelectBox: "",
    });
  };

  addNewRowModal = async () => {
    const response = await Controller.GetServiceNP();

    this.setState({
      openAddNewRowVisible: true,
      NpServices: response.json,
    });
  };

  openMembershipModal = () => {
    this.setState({
      openAddMembershipVisible10: true,
    });
    console.log(this.state.openAddMembershipVisible10);
  }

  closeMembershipModal = () => {
    this.setState({
      openAddMembershipVisible10: false,
    });
  }

  handleCreateService = async () => {
    const response = await Controller.CreateServiceList(
      this.state.createsService
    );
    if (response.status < 250) {
      this.openNotification(
        "bottom",
        "Create service successful",
        "Successful"
      );
      this.handleCloseAddService();
      this.setState({
        createsService: {
          name: "",
          description: "",
          cost: "",
        },
      });
    } else {
      this.openNotification(
        "bottom",
        response.detail ? response.detail : "Error!",
        "Error"
      );
    }
  };

  handleCreateNewPlanPreDefined01 = async () => {
    const response = await Controller.CreatePlan(
      this.state.preDefinePlanForCreate
    );
  };

  handleChangeCreatePlanData(e) {
    const { name, value } = e.target;
    this.setState({
      preDefinePlanForCreate: {
        ...this.state.preDefinePlanForCreate,
        [name]: value,
      },
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      createsService: {
        ...this.state.createsService,
        [name]: value,
      },
    });
  }

  handleCreateNewPlan = () => {
    this.setState({
      currentState: "createNewPlan",
    });
  };

  addNewRow = async () => {
    var temp = this.state.selectedServices;
    const response = await Controller.GetServiceNP();
    temp.push({
      Id: this.state.selectedServices.length,
      Name: (
        <Select
          className="inputs mw100"
          placeholder="Select Service"
          defaultValue={[]}
          onChange={(e, value) => {
            this.setState({
              preDefinePlanForCreate: {
                ...this.state.preDefinePlanForCreate,
                services: this.state.preDefinePlanForCreate.services.push(e),
              },
            });
          }}
        >
          {response.json.map((service) => (
            <Option key={service.id}>{service.name}</Option>
          ))}
        </Select>
      ),
      Count: (
        <InputNumber
          defaultValue={0}
          min={0}
          max={10}
          formatter={(value) => `${value}x`}
          parser={(value) => value.replace("x", "")}
        />
      ),
      Price: <p>$ 0</p>,
      Action: (
        <button
          value={this.state.selectedServices.length}
          onClick={(e) => {
            e.preventDefault();
            var temp = this.state.selectedServices.filter(
              (t) => t.Id != e.target.value
            );
            if (temp.length < 1) {
              this.setState({
                selectedServices: [],
              });
            } else {
              this.setState({
                selectedServices: temp,
              });
            }
          }}
          className="membership_h10-action"
        >
          Delete
        </button>
      ),
    });

    this.setState({
      selectedServices: temp,
      changeStateTempForTestTableUpdate: !this.state
        .changeStateTempForTestTableUpdate,
    });
  };

  handleChangeCurrentState = (e) => {
    this.setState({ currentState: e.target.value });
  };

  handleOpenAddService = () => {
    this.setState({
      visibleAddservice: true,
    });
  };
  handleCloseAddService = () => {
    this.setState({
      createsService: {
        name: "",
        description: "",
        cost: "",
      },
      visibleAddservice: false,
    });
  };

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
    const dropdownRender = (menu) => (
      <div>
        {menu}
        <Button
          className="step2-button3"
          type="default"
          onClick={this.handleOpenAddService}
        >
          Add New Service
        </Button>
      </div>
    );

    return (
      <div
        //  className="paymentRequestContent w100p"
        style={{ width: '100%', padding: '31px' }}
      >
        <div className="payreq-container">
          <div className="content">
            <Card style={{ width: '100%' }}>
              {this.state.currentState != "createNewPlan" ? (
                <React.Fragment>
                  <div className="flex-row">
                    <div>
                      <label className="formLabel" style={{ fontSize: '16px', fontWeight: '400' }}>Member</label>
                      <Select
                        showSearch
                        className="w10p0"
                        placeholder="search Member"
                        optionFilterProp="children"
                        onChange={(e) => {
                          this.setState({
                            membershipCreateDataCustom: {
                              ...this.state.membershipCreateDataCustom,
                              membership: {
                                ...this.state.membershipCreateDataCustom.membership,
                                customer: e,
                              },
                            },
                            membershipCreateData: {
                              ...this.state.membershipCreateData,
                              customer: e,
                            },
                          });
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
                      </Select>
                    </div>
                    <div className="margin-left">
                      <label className="formLabel" style={{ fontSize: '16px', fontWeight: '400' }}>Renewal</label>
                      <Radio.Group
                        className="radio-flex"
                        onChange={(e) => {
                          this.setState({
                            membershipCreateDataCustom: {
                              ...this.state.membershipCreateDataCustom,
                              membership: {
                                ...this.state.membershipCreateDataCustom.membership,
                                automatic_renewal: e.target.value,
                              },
                            },
                            membershipCreateData: {
                              ...this.state.membershipCreateData,
                              automatic_renewal: e.target.value,
                            },
                          });
                        }}
                        value={this.state.membershipCreateData.automatic_renewal}
                      >
                        <Radio className="radio-margin" value={false}>Manual</Radio>
                        <br />
                        <br />
                        <Radio value={true}>Automatic</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                  <br /> <br />
                  <Row type="flex" justify="center">
                    <Card className="circle-card">
                      <Radio.Group
                        className="radio-gp"
                        value={this.state.currentState}
                        onChange={this.handleChangeCurrentState}
                      >
                        <Radio.Button className="radio-gp1" value="customePlan">Custom plan</Radio.Button>
                        <Radio.Button className="radio-gp1" value="preDefinePlan">
                          Membership plan{" "}
                        </Radio.Button>
                      </Radio.Group>
                    </Card>
                  </Row>

                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}

              {this.state.currentState == "customePlan" ? (
                <React.Fragment>
                  <div className="flex-row1">
                    <div className="flex-row-justify">
                      {/* <div style={{marginBottom: 25}}>
                      <label className="formLabel">Plan name</label>
                      <Input
                        className="input-plan"
                        onChange={(e) => {
                          this.setState({
                            membershipCreateDataCustom: {
                              ...this.state.membershipCreateDataCustom,
                              membership_plan: {
                                ...this.state.membershipCreateDataCustom
                                  .membership_plan,
                                name: e.target.value,
                              },
                            },
                          });
                        }}
                        type="text"
                        name="name"
                        placeholder="plan-1"
                        value={
                          this.state.membershipCreateDataCustom.membership_plan.name
                        }
                      />
                    </div> */}
                      <div>
                        <label className="formLabel">Price</label>
                        <InputNumber
                          formatter={(value) =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          // className="w100p"
                          className="input-plan"
                          placeholder="Enter Price"
                          value={
                            this.state.membershipCreateDataCustom.membership_plan.cost
                          }
                          onChange={(e) => {
                            this.setState({
                              membershipCreateDataCustom: {
                                ...this.state.membershipCreateDataCustom,
                                membership_plan: {
                                  ...this.state.membershipCreateDataCustom
                                    .membership_plan,

                                  cost: e,
                                },
                              },
                            });
                          }}
                        />
                      </div>
                      <div>
                        <label className="formLabel">Billing Cycle</label>
                        <Select
                          className="input-plan"
                          defaultValue={[]}
                          placeholder="Select Billing Cycle"
                          value={
                            this.state.membershipCreateDataCustom.membership_plan
                              .interval
                          }
                          onChange={(e) => {
                            this.setState({
                              membershipCreateDataCustom: {
                                ...this.state.membershipCreateDataCustom,
                                membership_plan: {
                                  ...this.state.membershipCreateDataCustom
                                    .membership_plan,
                                  interval: e,
                                },
                              },
                            });
                          }}
                        >
                          <Option key={"monthly"}>Monthly</Option>
                          <Option key={"daily"}>Daily</Option>
                          <Option key={"yearly"}>yearly</Option>
                        </Select>
                      </div>
                      <div>
                        <label className="formLabel">Renewal Period</label>
                        <Input
                          className="input-plan"
                          prefix={<ClockCircleOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                          }
                          value={
                            this.state.membershipCreateDataCustom.membership_plan
                              .interval_count
                          }
                          onChange={(e) => {
                            this.setState({
                              membershipCreateDataCustom: {
                                ...this.state.membershipCreateDataCustom,
                                membership_plan: {
                                  ...this.state.membershipCreateDataCustom
                                    .membership_plan,

                                  interval_count: e.target.value,
                                },
                              },
                            });
                          }}
                          type="text"
                          name="name"
                          placeholder="Renewal Period"
                        />
                      </div>




                      <br />
                      <br />
                    </div>
                    <div className="margin-left" style={{ width: '680px', height: '100%' }}>
                      <label className="formLabel">Terms</label>

                      <TextArea
                        onChange={(e) => {
                          this.setState({
                            membershipCreateDataCustom: {
                              ...this.state.membershipCreateDataCustom,
                              membership_plan: {
                                ...this.state.membershipCreateDataCustom
                                  .membership_plan,

                                terms: e.target.value,
                              },
                            },
                          });
                        }}
                        autoSize={{ minRows: 11.5, maxRows: 16 }}
                        placeholder="Write terms...."
                      />
                    </div>
                  </div>
                  <Row type="flex" justify="space-between" className="row-label">
                    <label>Service</label>
                    {/* <Button
                    onClick={this.addNewRowModal}
                    type="primary"
                    className="mb16"
                  >
                    + New
                  </Button> */}
                    <Button
                      className="details-button-color"
                      type="text"
                      onClick={this.addNewRowModal}
                    >
                      <span style={{ fontSize: 12 }}>Add Service</span>
                      <img src={add} alt="" style={{ marginLeft: '8px' }} />
                    </Button>

                  </Row>

                  {this.state.changeStateTempForTestTableUpdate ? (
                    <div className="border-table">
                      <Table
                        className="membership_table_wo ant-table-wrapper"
                        Pagination={false}
                        columns={serviceColumns}
                        dataSource={this.state.selectedServices}
                      />
                    </div>
                  ) : (
                    <div className="border-table">
                      <Table
                        className="membership_table_wo ant-table-wrapper"
                        Pagination={false}
                        columns={serviceColumns}
                        dataSource={this.state.selectedServices}
                      />
                    </div>
                  )}


                  {/* <div className="btnBox df">
                    <button
                      className="whiteBtn cancel-btn"
                      onClick={() => {
                        this.props.back(true);
                      }}
                    >
                      Back
                    </button>

                    <button
                      onClick={this.handleCreateCustomPlan}
                      className="createBtn"
                      type="submit"
                    >
                      Create
                    </button>
                  </div> */}
                </React.Fragment>
              ) : this.state.currentState == "preDefinePlan" ? (
                <React.Fragment>
                  <Row style={{ marginTop: 20, width: "100%", display: "flex", flexDirection: 'column', marginLeft: 24 }} >
                    <label className="formLabel">Membership Plans</label>
                    <div className="flex-plan-row">
                      <Select
                        showSearch
                        className="w220"
                        placeholder="search Membership Plans"
                        optionFilterProp="children"
                        disabled={this.state.planList.length > 0 ? false : true}
                        onChange={(e) => {
                          this.setState({
                            membershipCreateData: {
                              ...this.state.membershipCreateData,
                              plan: e,
                            },
                          });
                        }}
                        value={this.state.membershipCreateData.plan}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.state.planList ? (
                          this.state.planList.map((plan0) => (
                            <Option value={plan0.id}>{plan0.name}</Option>
                          ))
                        ) : (
                          <></>
                        )}
                      </Select>

                      <Button
                        type="link"
                        onClick={this.openMembershipModal}
                      >
                        <span className="size-16">Add</span>
                        <img src={add2} alt="" style={{ marginLeft: '8px' }} />
                      </Button>
                    </div>
                  </Row>
                
                  <Modal
                    style={{ minWidth: 702 }}
                    title="Add Membership Plan"
                    open={this.state.openAddMembershipVisible10}
                    footer={null}
                    onCancel={this.closeMembershipModal}
                  >
                    <Row gutter={[30, 30]}>
                      <Col span={12}>
                        <label className="formLabel">Plan name</label>
                        <Input
                          className="w220"
                          onChange={this.handleChangeCreatePlanData}
                          type="text"
                          name="name"
                          placeholder="plan #1"
                          value={this.state.preDefinePlanForCreate.name}
                        />
                      </Col>
                      <Col span={12}>
                        <label className="formLabel">Billing Cycle</label>
                        <Select
                          className="w220"
                          defaultValue={[]}
                          placeholder="Select Cycle"
                          name="interval"
                          value={this.state.preDefinePlanForCreate.interval}
                          onChange={(e, value) => {
                            this.setState({
                              preDefinePlanForCreate: {
                                ...this.state.preDefinePlanForCreate,
                                interval: e,
                              },
                            });
                          }}
                        >
                          <Option key={"monthly"}>Monthly</Option>
                          <Option key={"daily"}>Daily</Option>
                          <Option key={"yearly"}>yearly</Option>
                        </Select>
                      </Col>
                      <Col span={12}>
                        <label className="formLabel">Renewal Period</label>
                        <Input
                          className="w220"
                          prefix={
                            <ClockCircleOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                          }
                          name="interval_count"
                          onChange={this.handleChangeCreatePlanData}
                          type="text"
                          placeholder="Renewal Period"
                          value={this.state.preDefinePlanForCreate.interval_count}
                        />
                      </Col>
                      <Col span={12}>
                        <label className="formLabel">Price</label>
                        <InputNumber
                          className="w220"
                          value={this.state.preDefinePlanForCreate.cost}
                          defaultValue={0}
                          formatter={(value) =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          onChange={(e) => {
                            this.setState({
                              preDefinePlanForCreate: {
                                ...this.state.preDefinePlanForCreate,
                                cost: e,
                              },
                            });
                          }}
                        />
                      </Col>
                      <Col span={12} style={{ bottom: 20 }}>
                        <br />
                        <br />
                        <Row type="flex" justify="space-between" style={{ marginBottom: 10 }}>
                          <label>Service </label>
                          <Button
                            className="details-button-color"
                            type="text"
                            onClick={this.addNewRowModal}
                          >
                            <span style={{ fontSize: 12 }}>Add Service</span>
                            <img src={add} alt="" style={{ marginLeft: '8px' }} />
                          </Button>
                        </Row>
                        {this.state.changeStateTempForTestTableUpdate ? (
                          <Table
                            className="membership_table_wo"
                            Pagination={false}
                            columns={serviceColumns}
                            dataSource={this.state.selectedServices}
                          />
                        ) : (
                          <div>
                            <Table
                              className="membership_table_wo"
                              Pagination={false}
                              columns={serviceColumns}
                              dataSource={this.state.selectedServices}
                            />
                          </div>
                        )}
                      </Col>
                      <Col span={12}>
                        <label className="formLabel" >Terms</label>

                        <TextArea
                          // className="text-input"
                          name="terms"
                          onChange={(e) => {
                            this.setState({
                              preDefinePlanForCreate: {
                                ...this.state.preDefinePlanForCreate,
                                terms: e.target.value,
                              },
                            });
                          }}
                          autoSize={{ minRows: 3, maxRows: 5 }}
                          placeholder="Write terms...."
                        />
                      </Col>

                      <div style={{ display: "flex", marginLeft: 'auto' }}>
                        <Button
                          onClick={this.handleCreateNewPlanPreDefined01}
                          className="createBtn"
                          type="submit"
                        >
                          Add
                        </Button>
                      </div>
                    </Row>
                  </Modal>
                </React.Fragment>
              ) : (
                <React.Fragment>

                </React.Fragment>
              )}
              <br />
            </Card>
            {this.state.currentState === "customePlan" ? (
              <button
                style={{marginTop: 40}}
                onClick={this.handleCreateCustomPlan}
                className="createBtn"
                type="submit"
              >
                Create
              </button>

            ) : (
              <></>
            )}
            {this.state.currentState === "preDefinePlan" ? (
               <button
               style={{marginTop: 40}}
               onClick={
                 this.handleSubmitCreateNewMembershipWithMemberAndPlan
               }
               className="createBtn"
               type="submit"
             >
               Create
             </button>

            ) : (
              <></>
            )}
          </div>
        </div>

        <Modal
          title="Add new service"
          visible={this.state.openAddNewRowVisible}
          footer={null}
          onCancel={this.handleCloseAddRowModal}
        >
          <p style={{ marginTop: 25 }}>Service</p>

          <Row type="flex" justify="space-between">
            <Col span={18}>
              <Select
                className="inputs-select"
                placeholder="Select Service"
                value={this.state.SelectedServicesFromSelectBox}
                dropdownRender={dropdownRender}
                onChange={(e, value) => {
                  this.setState({
                    SelectedServicesFromSelectBox: e,
                  });
                }}
              >
                {this.state.NpServices.map((service) => (
                  <Option key={service.id} className='option-height'>
                    <span>{service.name}</span>
                    <span style={{ marginLeft: 120, color: '#979797', fontSize: '12px' }}>Cost: ${service.cost}</span>

                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={5} className="col-input">
              <p>Count</p>
              <InputNumber
                className="w101p"
                defaultValue={0}
                min={0}
                max={10}
                value={this.state.SelectedCountFromSelectBox}
                formatter={(value) => `${value}x`}
                parser={(value) => value.replace("x", "")}
                onChange={(e) => {
                  this.setState({
                    SelectedCountFromSelectBox: e,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <div className="membership_button-container mt15">
            {/* <Button onClick={this.handleCloseAddRowModal} type="secondary">
              Close
            </Button> */}
            <Button
              type="primary"
              className="createbusiness_button"
              onClick={() => {
                var t = {
                  count: this.state.SelectedCountFromSelectBox,
                  service: this.state.SelectedServicesFromSelectBox,
                };

                var h = this.state.preDefinePlanForCreate.services;
                h.push(t);
                var NameSelectedService = "";
                for (var i in this.state.NpServices) {
                  if (
                    this.state.NpServices[i].id ==
                    this.state.SelectedServicesFromSelectBox
                  ) {
                    NameSelectedService = this.state.NpServices[i];
                  }
                }
                var h10 = {
                  id: NameSelectedService.id,
                  Name: NameSelectedService.name,
                  Count: this.state.SelectedCountFromSelectBox,
                  Action: (
                    <button
                      onClick={() => {
                        var aaaa = this.state.selectedServices.filter(
                          (e) => e.id != NameSelectedService.id
                        );
                        this.setState({
                          selectedServices: aaaa,
                        });
                      }}
                      value={this.state.selectedServices.length}
                      className="membership_h10-action"
                    >
                      Delete
                    </button>
                  ),
                };

                var h100 = this.state.selectedServices.push(h10);
                this.setState({
                  preDefinePlanForCreate: {
                    ...this.state.preDefinePlanForCreate,
                    services: h,
                  },
                  membershipCreateDataCustom: {
                    ...this.state.membershipCreateDataCustom,
                    membership_plan: {
                      ...this.state.membershipCreateDataCustom.membership_plan,

                      services: h,
                    },
                  },
                  changeStateTempForTestTableUpdate: !this.state
                    .changeStateTempForTestTableUpdate,
                });
                this.handleCloseAddRowModal();
              }}
            >
              Create
            </Button>
          </div>
        </Modal>
        <Modal
          title="Add new service"
          open={this.state.visibleAddservice}
          footer={null}
          onCancel={this.handleCloseAddService}
        >
          <Row gutter={[60, 60]}>
            <Col span={16}>
              <label className="formLabel">Service Name</label>
              <Input
                style={{ width: 290, height: 39, borderRadius: '7px', border: '1px solid #6B43B5' }}
                className="inputs"
                onChange={this.handleChange}
                type="text"
                name="name"
                placeholder="Service 1"
                value={this.state.createsService.name}
              />
            </Col>
            <Col span={8}>
              <label className="formLabel">Cost</label>
              <InputNumber
                style={{ width: 101, height: 39, borderRadius: '8px', border: '1px solid #6B43B5' }}
                value={this.state.createsService.cost}
                name="cost"
                defaultValue={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                className="w100p"
                onChange={(e, value) => {
                  this.setState({
                    createsService: {
                      ...this.state.createsService,
                      cost: e,
                    },
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={15}>
              <label className="formLabel">Description</label>

              <TextArea
                name="description"
                value={this.state.createsService.description}
                onChange={this.handleChange}
                autoSize={{ minRows: 6, maxRows: 8 }}
                placeholder="Description..."
              />
            </Col>
          </Row>
          <br />
          <div className="btnBox service_close-edit">
            <Button
              style={{ width: 139, height: 38, fontSize: 16 }}
              onClick={this.handleCreateService}
              type="primary"
              className="service_update"
            >
              Create
            </Button>
          </div>
        </Modal>{" "}
      </div >
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

const connectedCreatePlan = connect(mapStateToProps)(CreatePlan);

export default connectedCreatePlan;
