import React, { useState } from 'react';
import { Row, Form, Input, Button, DatePicker, Select, message, Col } from 'antd';
import moment from 'moment';
import { controller } from '../controller';

const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';

const MyForm = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true)
        values["client_name"] = {}
        values["dateOfBirth"] = moment(values["dateOfBirth"]).format("YYYY-MM-DD")

        const response = await controller.createPlatformCustomer(values)
        console.log(response)
        if (response.status < 250) {
            message.success("Customer created!")
            let formData = new FormData();
            for (var i in props.selectedRowKeys) {
                formData.append("invite", props.selectedRowKeys[i]);
            }
            const resp = await controller.inviteMembership(formData)
            if (resp.status < 250)
                props.closeOpenPlatform()
            else
                message.error("error")
        }
        setLoading(false)
    };

    const onReset = () => {
        form.resetFields();
        props.closeOpenPlatform()
    };

    return (
        <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="first_name"
              label={<span className="custom-label">First Name</span>}
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="Enter First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="last_name"
              label={<span className="custom-label">Last Name</span>}
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Enter Last Name" />
            </Form.Item>
          </Col>
        </Row>
      
        <Form.Item
          name="email"
          label={<span className="custom-label">Email</span>}
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>
      
        <Form.Item
          name="phone"
          label={<span className="custom-label">Phone</span>}
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="Enter Phone Number" />
        </Form.Item>
      
        <Form.Item
          name="dateOfBirth"
          label={<span className="custom-label">Date of Birth</span>}
          rules={[{ required: true, message: 'Please select date of birth' }]}
        >
          <DatePicker style={{ width: "100%", height: 39 }} format={dateFormat} placeholder="Select Date of Birth"  />
        </Form.Item>
      
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="country"
              label={<span className="custom-label">Country</span>}
              rules={[{ required: true, message: 'Please select country' }]}
            >
              <Select placeholder="Select Country" style={{height: 39}}>
                <Option key="US" value="US">United States of America</Option>
                <Option key="CA" value="CA">Canada</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="state"
              label={<span className="custom-label">State</span>}
              rules={[{ required: true, message: 'Please enter state' }]}
            >
              <Input placeholder="Enter State" />
            </Form.Item>
          </Col>
        </Row>
      
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="city"
              label={<span className="custom-label">City</span>}
              rules={[{ required: true, message: 'Please enter city' }]}
            >
              <Input placeholder="Enter City" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="postalCode"
              label={<span className="custom-label">Postal Code</span>}
              rules={[{ required: true, message: 'Please enter postal code' }]}
            >
              <Input placeholder="Enter Postal Code" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="address1"
          label={<span className="custom-label">Address</span>}
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input placeholder="Enter Address" />
        </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" style={{  width: "100%", height: 39, marginTop: 40 }}>
              Submit
            </Button>
          </Form.Item>
      </Form>
      
      
    );
};

export default MyForm;
