import React, { useEffect, useState } from "react";
import { controller } from "../../controller";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import {
  Button,
  Select,
  InputNumber,
  Input,
  notification,
  Divider,
  Table,
  Modal,
  Row,
  Typography,
  Popconfirm,
  Pagination,
  Tag,
  Space
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import "./style.css";

import trash from "../../assets/icons/trash.png";
import edit from "../../assets/icons/edit.png"

const { Option } = Select;
const { TextArea } = Input;

const serviceColumns = [
  {
    title: "Name",
    dataIndex: "Name",
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
const PlanManagement = () => {
  const [createNewPlan, setCreateNewPlan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [page_size, setPage_size] = useState(0);
  const [data, setData] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [createsService, setCreatesService] = useState({
    name: "",
    cost: "",
    description: "",
  });
  const [openEdit, setOpenEdit] = useState(false);

  const openNotification = (placement, message, status) => {
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

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCreatesService({
      ...createsService,
      [name]: value,
    });
  };

  const handleAddNewService = async () => {
    setCreateNewPlan(true);
  };

  const handleCloseAddService = async () => {
    setOpenCreateModal(false);
    setCreatesService({
      name: "",
      cost: "",
      description: "",
    });
  };

  const handleEditService = async (item) => {
    setCreatesService(item);
    setOpenEdit(true);
  };

  const handlePageChange = async () => { };

  const handleCreateService = async () => {
    setLoading(true);
    const response = await controller.CreateServiceList(createsService);
    if (response && response.status < 250) {
      openNotification(
        "bottom",
        response.message ? response.message : "Done",
        "Successful"
      );
      setOpenCreateModal(false);
      getData();
      setCreatesService({
        name: "",
        cost: "",
        description: "",
      });
    } else {
      openNotification(
        "bottom",
        response.detail ? response.detail[0] : response.massage,
        "Error"
      );
    }
    setLoading(false);
  };

  const editService = async () => {
    setLoading(true);
    const response = await controller.EditService(createsService);

    if (response.status < 250) {
      openNotification(
        "bottom",
        response.message ? response.message : "Done",
        "Successful"
      );
      getData();
      setCreatesService({
        name: "",
        cost: "",
        description: "",
      });
      setOpenEdit(false);
    } else {
      openNotification(
        "bottom",
        response.detail ? response.detail[0] : response.massage,
        "Error"
      );
    }
    setLoading(false);
  };

  const handleDeleteService = async (id) => {
    const response = await controller.DeletePlan(id);
    if (response && response.status > 250) {
      openNotification(
        "bottom",
        response.detail ? response.detail[0] : response.massage,
        "Error"
      );
    } else {
      openNotification(
        "bottom",
        response.message ? response.message : "Done",
        "Successful"
      );
      setOpenCreateModal(false);
      setCreatesService({
        name: "",
        cost: "",
        description: "",
      });
      getData();
    }
  };

  const getData = async () => {
    setLoading(true);
    const response = await controller.GetAllMembership(page);
    setPage_size(response.json.count);
    setData(response.json.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const plansColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Member",
      dataIndex: "member_count",
      key: "member_count",
    },
    {
      title: "Cost",
      render: (_, record) => <a>{"$ " + record.cost}</a>,
    },
    {
      title: "Interval",
      dataIndex: "interval",
      key: "interval",
    },
    {
      title: "Services",
      render: (_, record) => (
        <>
          {record.services.map((service) => (
            <>{service.service + ","}</>
          ))}
        </>
      ),
    },
    {
      title: "Status",
      key: 'status',
      dataIndex: 'status',

      // render: (_,status) =>
      // <>{record.active ? "Active" : "Deactive"}</>,
      // <Tag
      //   color={status=== "Active" ? "rgba(35, 208, 32, 0.2)" : ""}
      //   style={{ borderRadius: "20px", color: "rgba(35, 208, 32, 0.2)" }}
      // >
      //   <>{status ? "Active" : "Deactive"}</>,
      //   {/* {Status.toUpperCase()} */}
      // </Tag>
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'volcano'}
          style={{ borderRadius: "20px", width: '103px', textAlign: 'center' }}
        >
          {status ? 'Active' : 'Deactive'}
        </Tag>
      )
    },
    {
      title: "Action",
      render: (_, record) => (
        // <>
        //   <span
        //     className="plan_edit"
        //     onClick={() => {
        //       handleEditService(record);
        //     }}
        //   >
        //     Edit
        //   </span>
        //   <Divider type="vertical" />
        //   <Popconfirm
        //     title="Are you sure to delete this plan? "
        //     description="This Plan may have been used before!"
        //     onConfirm={() => {
        //       handleDeleteService(record.id);
        //     }}
        //     okText="Yes"
        //     cancelText="No"
        //   >
        //     <span className="plan_delete">Delete</span>
        //   </Popconfirm>
        // </>
        <>
          <Space size="middle">
            <Button
              type="text"
              icon={<img src={trash} alt="" />}
              style={{ color: "#979797" }}
              onClick={() => { handleDeleteService(record.id); }}
            />
            <Button
              type="text"
              icon={<img src={edit} alt="" />}
              style={{ color: "#979797" }}
              onClick={() => { handleEditService(record); }}
            />
          </Space>
        </>
      ),
    },
  ];

  return (
    <React.Fragment>
      <DashboardLayout breadCrumb={"Plans"} logo={"x"} footerLogo={true}>
        <div className="paymentRequestContent">
          {createNewPlan ? (
            <React.Fragment>
              <label className="formLabel">Plan name</label>
              <Input
                className={"inputs"}
                onChange={this.handleChangeCreatePlanData}
                type="text"
                name="name"
                placeholder="plan #1"
                value={this.state.preDefinePlanForCreate.name}
              />

              <label className="formLabel">Billing Cycle</label>
              <Select
                className="inputs mw100"
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

              <label className="formLabel">Renewal Period</label>
              <Input
                prefix={
                  <ClockCircleOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                }
                name="interval_count"
                onChange={this.handleChangeCreatePlanData}
                type="text"
                placeholder="Renewal Period"
                value={this.state.preDefinePlanForCreate.interval_count}
              />

              <label className="formLabel">Price</label>
              <InputNumber
                value={this.state.preDefinePlanForCreate.cost}
                defaultValue={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                className="w100p"
                onChange={(e) => {
                  this.setState({
                    preDefinePlanForCreate: {
                      ...this.state.preDefinePlanForCreate,
                      cost: e,
                    },
                  });
                }}
              />

              <br />
              <br />
              <Row type="flex" justify="space-between">
                <label>Service</label>
                <Button
                  onClick={this.addNewRowModal}
                  type="primary"
                  className="mb16"
                >
                  + New
                </Button>
              </Row>
              {this.state.changeStateTempForTestTableUpdate ? (
                <Table
                  className="plan_table"
                  Pagination={false}
                  columns={serviceColumns}
                  dataSource={this.state.selectedServices}
                />
              ) : (
                <div>
                  <Table
                    className="plan_table"
                    Pagination={false}
                    columns={serviceColumns}
                    dataSource={this.state.selectedServices}
                  />
                </div>
              )}

              <label className="formLabel">Terms</label>

              <TextArea
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

              <div className="btnBox df">
                <button
                  className="whiteBtn cancel-btn"
                  onClick={() => {
                    this.setState({
                      currentState: "preDefinePlan",
                    });
                  }}
                >
                  Back
                </button>

                <button
                  onClick={this.handleCreateNewPlanPreDefined01}
                  className="createBtn"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </React.Fragment>
          ) : (
            <>
              <Row
                className="newplan_container"
                align="middle"
                justify="space-between"
                type={"flex"}
              >
                <Typography.Text className="plan-text" strong={true}>Plans</Typography.Text>
                {/* <Button
                  onClick={handleAddNewService}
                  className="login-btn create-payment-request-btn newplan_btn"
                >
                  + New Plan
                </Button> */}
                <Button
                  onClick={handleAddNewService}
                  className="create-btn"
                >
                  Add new Plan
                </Button>
              </Row>

              <Table
                className="plan_table"
                Pagination={false}
                columns={plansColumns}
                dataSource={data}
              />
              {/* <Row type="flex" justify="end" className="mt25">
                <Pagination
                  disabled={loading}
                  current={page}
                  total={page_size}
                  onChange={handlePageChange}
                  className="paginator"
                  size="small"
                />
              </Row> */}
            </>
          )}
        </div>
        <Modal
          title="Select Office"
          visible={openEdit}
          footer={null}
          onCancel={handleCloseEdit}
        >
          <label className="formLabel">Service Name</label>
          <Input
            className={"inputs"}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Service 1"
            value={createsService.name}
          />
          <label className="formLabel">Cost</label>
          <InputNumber
            value={createsService.cost}
            name="cost"
            defaultValue={0}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            className="w100p"
            onChange={(e, value) => {
              setCreatesService({
                ...createsService,
                cost: e,
              });
            }}
          />

          <label className="formLabel">Description</label>

          <TextArea
            name="description"
            value={createsService.description}
            onChange={handleChange}
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="Description..."
          />
          <br />
          <p className="mt5">Note: This service may have been used before</p>
          <div className="btnBox plan_close">
            <Button onClick={handleCloseEdit} type="secondary">
              Close
            </Button>
            <Button
              disabled={loading}
              onClick={editService}
              type="primary"
              className="plan_loading"
            >
              {loading ? "..." : "Update"}
            </Button>
          </div>
        </Modal>{" "}
      </DashboardLayout>
    </React.Fragment>
  );
};

export default PlanManagement;
