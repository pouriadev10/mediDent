import React, { useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { controller } from './controller';

const ForgetPass = (props) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleBackToLogin = async () => {
        form.resetFields();
        props.goToLoginPage()
    }

    const handleBackToSignUp = async () => {
        form.resetFields();
        props.goToSignUpPage()
    }

    const handleSubmit = async (values) => {
        setLoading(true)
        if (values.email) {
            localStorage.setItem("Email" ,values.email)
            const response = await controller.forgotPass(values);
            if (response.status < 250) {
                setOpen(true)
                form.resetFields();
                message.success("Recover E-Mail sent successfully!")
            } else {
                message.error("Error")
            }

        }
        setLoading(false)
    };

    const handleResend = async () => {
        setLoading(true)
        var Email = localStorage.getItem('Email')
        if (Email) {
            const response = await controller.forgotPass({
            email : Email
        });
            if (response.status < 250) {
                message.success("Recover E-Mail sent successfully!")
                localStorage.removeItem('Email')
                setOpen(false)
            } else {
                message.error("Error")
            }

        }
        setLoading(false)
    };

    const handleCloseModal = () => {
        setOpen(false)
    }

    return (
        <>
            <Modal
                open={open}
                footer={null}
                onCancel={handleCloseModal}
                centered
            >
                <div style={{margin: 20}}>
                <p className="modal-titr">Check your Email</p>
                <p className="modal-sub-titr">We have sent a password recover link to your Email.</p>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 33}}>
                    <p style={{fontSize: 14}}>Did not receive the link? </p>
                    <p style={{fontSize: 14, color: '#9176DC', marginLeft: 'auto', cursor: 'pointer'}} onClick={handleResend}>Resend link</p>
                </div>
                </div>
            </Modal>
            <p style={{fontSize: 24, fontWeight: '600'}}>Forget Password</p>
            <p style={{fontSize: 16, color: '#6B43B5', marginBottom: 43, cursor: 'pointer', textDecoration: 'underline'}} onClick={handleBackToLogin}>I know my password</p>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <div className="input-lable">Email</div>
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Please enter a valid email address',
                        },
                        {
                            required: true,
                            message: 'Please enter your email',
                        },
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} className="login-button" type="primary" htmlType="submit" style={{marginTop: 40}}>
                        Submit
                    </Button>
                    <p onClick={handleBackToSignUp} className="forgotpass-text" style={{ textDecoration: 'underline'}}>Sign Up</p>
                </Form.Item>
            </Form>
        </>
    );
};

export default ForgetPass;
