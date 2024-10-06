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
    const response = await controller.updatePractice(myData, props.practiceId)
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

      <p style={{ fontSize: "20px", fontWeight: "500", marginBottom: 37 }}>Basic Information of your Practice</p>


      <Form name="updatePracticeForm" onFinish={onFinish} autoComplete="off">
            <div className="form-container">
                <div className="form-item">
                    <div className="input-lable">Country</div>
                    <Form.Item
                        name="country"
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
                        <Select placeholder="Select a country" style={{height: 39}}>
                            <Option value="Canada">Canada</Option>
                            <Option value="United States of America">United States of America</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="form-item">
                    <div className="input-lable">State</div>
                    <Form.Item
                        name="state"
                        rules={[{ required: true, message: 'Please enter the state!' }]}
                    >
                        <Input placeholder="Enter state" />
                    </Form.Item>
                </div>

                <div className="form-item">
                    <div className="input-lable">City</div>
                    <Form.Item
                        name="city"
                        rules={[{ required: true, message: 'Please enter the city!' }]}
                    >
                        <Input placeholder="Enter city" />
                    </Form.Item>
                </div>

                <div className="form-item">
                    <div className="input-lable">Postal Code</div>
                    <Form.Item
                        name="zip_code"
                        rules={[{ required: true, message: 'Please enter the postal code!' }]}
                    >
                        <Input placeholder="Enter postal code" />
                    </Form.Item>
                </div>

                <div className="form-item full-width">
                    <div className="input-lable">Address</div>
                    <Form.Item>
                    <PlaceSearch getLocation={getLocation} style={{height:39}}  />
                    </Form.Item>
                </div>

                <div className="form-item full-width">
                    <Form.Item>
                        <Button loading={loading} style={{ marginTop: "25px", width: "100%", height: 39 }} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    </>
  );
};

export default UpdatePractice;
