import React, { useEffect, useState } from "react";
import { controller } from "../../controller";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import {
  Button,
  InputNumber,
  Input,
  notification,
  Divider,
  Modal,
  Table,
  Row,
  Typography,
  Space,
  Pagination
} from "antd";
// import { Pagination } from "antd";
import "./style.css";
import trash from '../../assets/icons/trash.png';
import edit from '../../assets/icons/edit.png';

const { TextArea } = Input;

const Service = () => {
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
    setOpenCreateModal(true);
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

  const handlePageChange = async (e) => {
    setPage(e);
  };

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
    const response = await controller.deleteService(id);
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
    var response = await controller.getServiceList(page);

    if (response.status > 250) {
      response = await controller.getServiceList(page - 1);
      setPage(page - 1);
      setData(response.data.results);
      setPage_size(response.data.count);
      setLoading(false);
    } else {
      setData(response.data.results);
      setPage_size(response.data.count);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: '174px'
    },
    {
      title: "Cost",
      width: '94px',
      render: (_, record) => {
        return (
          <>
            {record ? (
              record.cost ? (
                <>
                  {"$ "}
                  {record.cost}
                </>
              ) : (
                ""
              )
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: '700px'
    },
    {
      title: "Action",
      width: '89px',
      render: (_, record) => {
        return (
          <>
           <Space size="middle">
             <Button
              type="text"
              icon={<img src={trash} alt="" />}
              style={{ color: "#979797" }}
              onClick={() =>{ handleDeleteService(record.id); }}
            />
             <Button
              type="text"
              icon={<img src={edit} alt="" />}
              style={{ color: "#979797" }}
              onClick={() =>{ handleEditService(record); }}
            />
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      {" "}
      <DashboardLayout breadCrumb={"Services"} logo={"x"} footerLogo={true}>
        <div className="paymentRequestContent">
          <Row
            className="services_row"
            align="middle"
            justify="space-between"
            type={"flex"}
          >
            <Typography.Text className="font-20-500">Services</Typography.Text>
            <Button
              onClick={handleAddNewService}
              className="create-btn"
            >
              Add 
            </Button>
          </Row>

          <Table
            columns={columns}
            dataSource={data}
            style={{ marginTop: "15px" }}
            pagination={false}
          />
          <Row type="flex" justify="end" className="mt25">
            <Pagination
              disabled={loading}
              current={page}
              total={page_size}
              onChange={handlePageChange}
              className="paginator"
              size="small"
            />
          </Row>
        </div>
        <Modal
          title="Add new service"
          visible={openCreateModal}
          footer={null}
          onCancel={handleCloseAddService}
          className="modal-size"
        >
          <div className="flex-roww">
            <div>
              <label className="margin-bt">Service Name</label>

              <Input
                className='input-area'
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Enter Service Name"
                value={createsService.name}
              />
            </div>
            <div className="margin-l">
              <label className="margin-bt">Cost</label>
              <InputNumber
                className="cost-input"
                value={createsService.cost}
                name="cost"
                defaultValue={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                // className="w100p"
                onChange={(e, value) => {
                  setCreatesService({
                    ...createsService,
                    cost: e,
                  });
                }}
              />
            </div>
          </div>

          <label className='formLabel' >Description</label>

          <TextArea
            name="description"
            value={createsService.description}
            onChange={handleChange}
            autoSize={{ minRows: 6, maxRows: 8 }}
            placeholder="Write Description..."
            className='text-area-size'
            style={{width: '100%'}}
          />
          <br />
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
            {/* <Button onClick={handleCloseAddService} type="secondary">
              Close
            </Button> */}
            <Button
              disabled={loading}
              onClick={handleCreateService}
              type="primary"
              className="service_create"
            >
              {loading ? "..." : "Create"}
            </Button>
          </div>
        </Modal>
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
          <div className="btnBox service_close-edit">
            <Button onClick={handleCloseEdit} type="secondary">
              Close
            </Button>
            <Button
              disabled={loading}
              onClick={editService}
              type="primary"
              className="service_update"
            >
              {loading ? "..." : "Update"}
            </Button>
          </div>
        </Modal>{" "}
      </DashboardLayout>
    </React.Fragment>
  );
};

export default Service;
