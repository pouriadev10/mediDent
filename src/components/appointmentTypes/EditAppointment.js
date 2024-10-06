import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Row, notification } from "antd";
import { controller } from "../../controller";

const { Option } = Select;

const EditAppointment = (props) => {
  const [form] = Form.useForm();
  const [providers, setProviders] = useState([]);

  const handleCloseEditAppointment = async () => {
    props.closeEditModal(true);
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

  const onFinish = async (values) => {
    try {
      console.log("Received values:", values);
      values.id = props.data.id;
      const response = await controller.EditAppointmentType(values);
      if (response.status < 250) {
        props.closeEditModal();
        openNotification(
          "bottom",
          response && response.message ? response.message : "Done",
          "Successful"
        );
      } else {
        openNotification(
          "bottom",
          response.detail ? JSON.stringify(response.detail[0]) : "Error",
          "Error"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getlistOfProvider = async () => {
    try {
      const response = await controller.listOfProviderForCreateAppointment();
      setProviders(response.json);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  useEffect(() => {
    getlistOfProvider();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        form.setFieldsValue({
          service: props.data.service || "",
          length: props.data.length || "",
          provider: (props.data.provider || []).map((provider) => provider.id),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    getlistOfProvider();
  }, [props]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        service: props.data.service || "",
        length: props.data.length || "",
        provider: (props.data.provider || []).map((provider) => provider.id),
        requiredMarkValue: false,
      }}
    >
      <Form.Item
        label="Service"
        name="service"
        rules={[{ required: true, message: "Please input the service!" }]}
      >
        <Input placeholder="Service" />
      </Form.Item>

      <Form.Item
        label="Length"
        name="length"
        rules={[{ required: true, message: "Please input the length!" }]}
      >
        <Input placeholder="Length (minute)" type="number" />
      </Form.Item>

      <Form.Item
        label="Provider"
        name="provider"
        rules={[{ required: true, message: "Please select the provider!" }]}
      >
        <Select mode="multiple" placeholder="Select a provider">
          {providers.map((provider) => (
            <Option key={provider.id} value={provider.id}>
              {provider.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Row type="flex" justify="end">
        <Form.Item>
          <Button
            onClick={handleCloseEditAppointment}
            className="mr8 white-btn create-payment-request-btn"
          >
            Close
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EditAppointment;
