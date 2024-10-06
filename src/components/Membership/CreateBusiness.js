import React, { useState, useEffect } from "react";
import {
  notification,
  Button,
  Card,
  Row,
  Input,
  Select,
  Typography,
} from "antd";
import { Controller } from "./Controller/Controller";
import "./style.css";

const { Option } = Select;
const { Title } = Typography;

const CreateBusiness = () => {
  const [categoery, setCategory] = useState([{ "1": "cloud_computing" }]);

  const [business, setBusiness] = useState({
    name: "",
    category: "",
    employees_number: "less_than_10",
    offices_number: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness({
      ...business,
      [name]: value,
    });
  };

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

  const handleCreateBusiness = async () => {
    const response = await Controller.CreateBusiness(business);
    if (response.status < 250) {
      openNotification("bottom", "create successful", "Successful");
      window.location.reload();
    } else {
      openNotification(
        "bottom",
        response.detail ? response.detail : "Error",
        "Error"
      );
    }
  };

  const getCategory = async () => {
    const response = await Controller.getAllCategoryBusiness();
    setCategory(response.json);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <React.Fragment>
      <Row type="flex" justify="center">
        <Card className="createbusiness_container" >
          <Title level={2}>Create Business</Title>
          <div className="code-form">
            <label className="inputLabel">Name</label>
            <Input
              onChange={handleChange}
              className="inputs"
              name="name"
              placeholder="Name of Your Business"
              value={business.name}
            />
          </div>
          <div className="code-form">
            <label className="inputLabel">Category</label>
            <Select
              onChange={(e, value) => {
                setBusiness({
                  ...business,
                  category: eval(e),
                });
              }}
              className="inputs"
              name="name"
              placeholder="Category of Your Business"
            >
              {categoery.map((cater) =>
                Object.keys(cater).map((cat) => (
                  <Option key={cat}>{cater[cat]}</Option>
                ))
              )}
            </Select>
          </div>
          <div className="code-form">
            <label className="inputLabel">Number of Employees</label>
            <Select
              onChange={(e, value) => {
                setBusiness({
                  ...business,
                  employees_number: e,
                });
              }}
              className="inputs"
              name="name"
              placeholder="Category of Your Business"
              value={business.employees_number}
            >
              <Option value="less_than_10">less_than_10</Option>
              <Option value="10_to_50">10_to_50</Option>
              <Option value="more_than_50">more_than_50 </Option>
            </Select>
          </div>

          <div className="btnBox createbusiness_button-container">
            <Button
              onClick={handleCreateBusiness}
              type="primary"
              className="createbusiness_button"
             >
              Create
            </Button>
          </div>
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default CreateBusiness;
