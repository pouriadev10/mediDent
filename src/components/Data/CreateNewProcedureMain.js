import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { controller } from '../../controller';

const CreateNewProcedureMain = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        setLoading(true)
        console.log('Form values:', values);
        const response = await controller.createNewMainProcedure(values)

        if (response.status < 250) {
            props.getData()
            message.success("Procedure CreatedSuccessfully!")
            setIsModalVisible(false);
            form.resetFields();

        } else {
            message.error("Error!")
        }
        setLoading(false)

    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                +New
            </Button>
            <Modal
                title="Add New Procedure"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button loading={loading} key="submit" type="primary" onClick={() => form.submit()}>
                        Submit
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        label="Procedure Code"
                        name="procedure_code"
                        rules={[{ required: true, message: 'Please input the procedure code!' }]}
                    >
                        <Input placeholder="Procedure Code" />
                    </Form.Item>
                    <Form.Item
                        label="Procedure Code Description"
                        name="procedure_code_description"
                        rules={[{ required: true, message: 'Please input the procedure code description!' }]}
                    >
                        <Input placeholder="Procedure Code Description" />
                    </Form.Item>
                    <Form.Item
                        label="Link"
                        name="link"
                        rules={[{ required: true, message: 'Please input the link!' }, { type: 'url', message: 'Please enter a valid URL!' }]}
                    >
                        <Input placeholder="Video Link" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CreateNewProcedureMain;
