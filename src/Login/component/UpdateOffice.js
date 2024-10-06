import React, { useEffect, useState } from 'react';
import { Col, Radio, message, Row, Form, Input, Select, Button, Modal, Card, Checkbox } from 'antd';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlaceSearch from "./PlaceSearch"
import { controller } from '../controller';
import { useForm } from 'antd/es/form/Form';

import rec from '../../assets/icons/shape1.png';
import rec2 from '../../assets/icons/shape2.png';

const { Option } = Select;

const UpdateOffice = (props) => {
  const [form] = useForm()
  const [openModalSelectOffice, setOpenModalSelectOffice] = useState(false)
  const [lat, setLat] = useState("-1")
  const [long, setLong] = useState("-1")
  const [loading, setLoading] = useState(false);
  const [integratePMS, setIntegratePMS] = React.useState('no');
  const [pmsData, setPmsData] = useState([])
  const [selectedPMS, setSelectedPMS] = useState(-1)

  const handleRadioChange = (e) => {
    setIntegratePMS(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(props)
    var values = form.getFieldValue()
    setLoading(true)
    var myData = {
      claimed_office_id: selectedPMS,
      office: props.officeId
    }
    console.log(myData)
    const res = await controller.sendPMS(myData)
    if (res.status < 250) {
      var myData = {
        ...values,
        latitude: lat,
        longitude: long,
        organization_id: props.practiceId
      }
      console.log(props.officeId)
      const response = await controller.updateOffice(myData, props.officeId)

      if (response.status < 250) {
        props.readOnboardingStatus()
        message.success("Office information updated!")
      } else {
        message.error(response.detail)
      }
    } else {
      message.error("ERROR")
    }

    setLoading(false)
  }

  const onFinish = async (values) => {
    if (integratePMS == "yes") {
      setOpenModalSelectOffice(true)
    } else {
      setLoading(true)
      var myData = {
        ...values,
        latitude: lat,
        longitude: long,
        organization_id: props.practiceId
      }
      console.log(props.officeId)
      const response = await controller.updateOffice(myData, props.officeId)

      if (response.status < 250) {
        props.readOnboardingStatus()
        message.success("Office information updated!")
      } else {
        message.error(response.detail)
      }
      setLoading(false)
    }
  };

  const getLocation = (long, lat) => {
    setLong(long.toString().slice(0, 10))
    setLat(lat.toString().slice(0, 10))
  }

  const handleReadPMSData = async () => {
    const response = await controller.getPMSData();
    console.log(response)
    if (response) {
      setPmsData(response)
    } else {
      setPmsData([])
    }
  }

  useEffect(() => {
    handleReadPMSData()
  }, [])

  const handleCheckboxChange = (officeId) => {
    setSelectedPMS((prevSelectedPMS) => (prevSelectedPMS === officeId ? -1 : officeId));
  };

  return (
    <>
      <p style={{ fontSize: "20px", fontWeight: "500", marginBottom: 37 }}>Basic Information of your Office</p>

      <Form form={form} name="updatePracticeForm" onFinish={onFinish} autoComplete="off">
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
              <Select placeholder="Select a country" style={{ height: 39 }}>
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
            <PlaceSearch getLocation={getLocation} />
          </div>

          <div className="form-item full-width">
            <div style={{ fontWeight: '600', color: '#6B43B5', fontSize: 14, marginBottom: 5 }}>Do you want to integrate your PMS?</div>
            <Form.Item>
              <Radio.Group onChange={handleRadioChange} value={integratePMS} style={{ display: 'flex', flexDirection: 'row' }} className="custom-radio-group">
                <Radio value="yes" style={{ marginRight: 140 }}>Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="form-item full-width">
            <Form.Item>
              <Button loading={loading} style={{ marginTop: "25px", width: '100%', height: 39 }} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
      <Modal
        onCancel={() => { setOpenModalSelectOffice(false) }}
        open={openModalSelectOffice}
        footer={null}
        title="Find your office"
      >
        <p>
          We found some offices based on your data
        </p>

        <p style={{ color: "#6B43B5", fontSize: "12px" }}>
          Select Your Office
        </p>

        <div>
          {
            pmsData.map((item) => (
              <Card
                onClick={() => {
                  setSelectedPMS(item.office_id);
                }}
                className={`custom-card129 ${selectedPMS === item.office_id ? 'selected-card' : 'not-selected-card'}`}
                bordered={false}
                style={{marginBottom: 20}}
              >
                <div
                  style={{ fontSize: 16, fontWeight: '600', color: '#6B43B5', zIndex: 1000, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: 15, left: 15, marginBottom: 10 }}
                >
                  {item.office_id + " " + item.practice_name}
                </div>
                <div style={{ fontSize: "12px", left: 15, position: 'relative' }}>
                  {item.address + " " + item.state + " " + item.city + " " + item.zip + ", Canada"}
                </div>
                <Checkbox
                  onChange={() => handleCheckboxChange(item.office_id)}
                  checked={selectedPMS === item.office_id}
                  className="custom-checkbox"
                />
                {selectedPMS === item.office_id ? (
                  <img src={rec} alt="Selected" className="image-pay" />
                ) : (
                  <img src={rec2} alt="Not selected" className="image-pay" />
                )}
              </Card>
            ))
          }
        </div>
        <Button
          loading={loading}
          onClick={handleSubmit}
          style={{ marginTop: "25px" }} className='login-button' type="primary">
          Submit
        </Button>
      </Modal >
    </>
  );
};

export default UpdateOffice;
