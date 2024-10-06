import React, { useState } from 'react';
import { Row, Form, Input, Select, Button, Modal, message } from 'antd';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlaceSearch from "./PlaceSearch"
import { controller } from '../controller';

const { Option } = Select;

const UpdatePractice = (props) => {
  const [lat, setLat] = useState("-1")
  const [long, setLong] = useState("-1")
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true)
    console.log('Received values:', values);
    var myData = {
      ...values,
      latitude: lat,
      longitude: long,
    }
    const response = await controller.updateOfficePractice(myData, props.practiceId)
    // Handle form submission here
    if (response.status < 250) {
      props.readOnboardingStatus()
      message.success("Practice information updated!")
    } else {
      message.error(response.detail)
    }
    setLoading(false)
  };

  const getLocation = (long, lat) => {
    setLong(long)
    setLat(lat)
  }

  return (
    <>

      <p style={{ fontSize: "20px", fontWeight: "500" }}>Basic Information of your Practice</p>


      <Form
        name="updatePracticeForm"
        onFinish={onFinish}
        autoComplete={false}
      >
        <div className='input-lable'>Country</div>
        <Form.Item
          label=""
          name="country"
          autoComplete={false}
          rules={[
            { required: true, message: 'Please select a country!' },
            {
              validator: (_, value) =>
                ['Canada', 'United States of America'].includes(value)
                  ? Promise.resolve()
                  : Promise.reject('Invalid country'),
            },
          ]}
        >
          <Select placeholder="Select a country">
            <Option value="Canada">Canada</Option>
            <Option value="United States of America">United States of America</Option>
          </Select>
        </Form.Item>

        <div className='input-lable'>State</div>
        <Form.Item
          label=""
          name="state"
          rules={[{ required: true, message: 'Please enter the state!' }]}
          autoComplete={false}
        >
          <Input placeholder="Enter state" />
        </Form.Item>


        <div className='input-lable'>City</div>
        <Form.Item
          label=""
          name="city"
          autoComplete={false}
          rules={[{ required: true, message: 'Please enter the city!' }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>

        <div className='input-lable'>Postal Code</div>
        <Form.Item
          label=""
          autoComplete={false}
          name="zip_code"
          rules={[{ required: true, message: 'Please enter the postal code!' }]}
        >
          <Input placeholder="Enter postal code" />
        </Form.Item>


        <Row justify={""}>
          <div className='input-lable'>Address</div>
          <PlaceSearch getLocation={getLocation} />
        </Row>

        <Form.Item >
          <Button loading={loading} style={{ marginTop: "25px" }} className='login-button' type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdatePractice;
