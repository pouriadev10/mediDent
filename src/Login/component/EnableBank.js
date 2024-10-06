import React, { useState, useRef, useEffect } from 'react';
import { Row, Form, Input, Spin, Button, Modal } from 'antd';
import config from '../../config';
import { controller } from '../controller';

const EnableBank = (props) => {
    const [helcimModalOpen, setHelcimModalOpen] = useState(false);
    const [helcimLink, setHelcimLink] = useState(''); // Make sure to set the initial value for helcimLink
    const formRef = useRef();

    const handleOpenHelcimModal = () => {
        setHelcimModalOpen(true);
    };

    const handleCloseHelcimModal = () => {
        setHelcimModalOpen(false);
        formRef.current.resetFields();
    };

    const onFinish = async (values) => {
        if (values.account) {
            // Call your function here
            window.location.href = config.apiGateway.URL + "/payment/check-business-onboarding/" + localStorage.getItem("selectedOffice")
                + "/" + values.account + "/" + encodeURIComponent(values.account1) + "/?manual_redirect=yes"

        } else {
            // Handle validation error
            console.log('Account is required!');
        }
    }

    const getHelcimLinkBank = async () => {
        const response = await controller.generateAccountBank();
        if (response.url.search("helcim") != -1) {
            setHelcimLink(response.url)
            //window.open(response.url, '_blank');
        }
    }

    useEffect(() => {
        getHelcimLinkBank()
    })

    return (
        <>
            <p style={{ fontSize: "20px", fontWeight: "500", marginBottom: 37 }}>Enable Bank Account for Your Office</p>
            <div className='box-onboarding-text'>
                <span style={{ fontSize: 14, fontWeight: 600 }}>
                    Enable Your account!.
                </span>


            </div>

            <Button onClick={handleOpenHelcimModal} className='login-button ' style={{ marginTop: 40 }}>
                Enable
            </Button>
            <Modal
                title="Enable account by helcim"
                visible={helcimModalOpen}
                footer={null}
                onCancel={handleCloseHelcimModal}
                centered
            >
                <p style={{ marginTop: 15, marginBottom: 37 }}>
                    Please enter your Helcim information below.
                </p>
              
                <Form ref={formRef} onFinish={onFinish}>
                    <label className="input-lable">Helcim js token</label>
                    <Form.Item
                        style={{ marginBottom: 20 }}
                        label=""
                        name="account"
                        rules={[{ required: true, message: 'Please input your Helcim js token!' }]}
                    >
                        <Input placeholder="Enter Helcim js token" />
                    </Form.Item>
                    <label className="input-lable">Helcim Account token</label>
                    <Form.Item
                        label=""
                        name="account1"
                        rules={[{ required: true, message: 'Please input your Helcim Account token!' }]}
                    >
                        <Input placeholder="Enter Helcim Account token" />
                    </Form.Item>
                    <Row type="flex" justify="center" style={{marginTop: 25}}>
                    <a style={{ color: '#6B43B5', textDecoration: 'underline' }} href={helcimLink} target="_blank" rel="noopener noreferrer">
                        Enable account by helcim
                    </a>
                </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginTop: 40, width: '100%', height: 39 }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EnableBank;
