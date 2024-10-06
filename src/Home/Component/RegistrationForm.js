import { Button, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { Controller } from '../Controller/Controller';
import { PhoneOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
const RegistrationForm = ((props) => {

    const { getFieldDecorator, validateFields } = props.form;

    const handleSubmit = async (e) => {
        e.preventDefault();
        var error = false
        validateFields(async (err, values) => {
            if (!err) {
                const response = await Controller.add_appointment_patient(
                    window.location.href.split("/")[window.location.href.split("/").length - 1],
                    values.firstName,
                    values.lastName,
                    values.birthDay,
                    values.email,
                    values.phoneNumber,
                    props.providerID
                )
                if (response.status < 250) {
                    localStorage.setItem("booking-step-four-clinic", JSON.stringify(response.data))
                    props.onSubmitRegistrationStep('done')
                }
            }
        });
    };

    const validateBirthDate = (rule, value, callback) => {
        if (value) {
            const currentDate = moment();
            const selectedDate = moment(value);

            if (
                selectedDate.isAfter(currentDate.subtract(5, 'years')) ||
                selectedDate.isBefore(currentDate.subtract(150, 'years'))
            ) {
                callback('Invalid');
            } else {
                callback();
            }
        } else {
            callback('Please select your birth day');
        }
    };

    const handleCancel = () => {
        props.backToStep1();
        props.form.resetFields();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item label="Email">
                {getFieldDecorator('email', {
                    rules: [
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ],
                })(
                    <Input
                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                    />
                )}
            </Form.Item>

            <Form.Item label="First Name">
                {getFieldDecorator('firstName', {
                    rules: [{ required: true, message: 'Please enter your first name' }],
                })(
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="First Name"
                    />
                )}
            </Form.Item>

            <Form.Item label="Last Name">
                {getFieldDecorator('lastName', {
                    rules: [{ required: true, message: 'Please enter your last name' }],
                })(
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Last Name"
                    />
                )}
            </Form.Item>

            <Form.Item label="Birth Day">
                {getFieldDecorator('birthDay', {
                    rules: [{ validator: validateBirthDate }],
                })(
                    <DatePicker
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
                        placeholder="Birth Day"
                    />
                )}
            </Form.Item>

            <Form.Item label="Phone Number">
                {getFieldDecorator('phoneNumber', {
                    rules: [{ required: true, message: 'Please enter your phone number' }],
                })(
                    <Input
                        prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Phone Number"
                    />
                )}
            </Form.Item>
            <Row type="flex" justify="center">
                <Form.Item>
                    <Button type="default" onClick={handleCancel} >
                        Back
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                        Submit
                    </Button>

                </Form.Item>
            </Row>

        </Form>
    );
});

export default RegistrationForm;
