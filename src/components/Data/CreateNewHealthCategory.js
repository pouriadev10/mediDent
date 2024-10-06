import React, { useState } from 'react';
import { Form, Input, Button, Row, notification } from 'antd';
import { controller } from '../../controller';

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

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const NumberInput = ({ label, name, min, max, required, placeholder }) => (
    <Form.Item
        label={label}
        name={name}
        style={{ display: 'block' }} // Make the label appear on top
        rules={[
            {
                required: required,
                message: 'Please input your floating number!',
                type: 'number',
                transform: value => parseFloat(value),
            },
            {
                type: 'number',
                min: min,
                max: max,
                transform: value => parseFloat(value),
            },
        ]}
    >
        <Input placeholder={placeholder} />
    </Form.Item>
);

const CreateNewHealthCategory = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true)
        console.log('Success:', values);
        const response = await controller.CreateNewHealthCategory(values)

        if (response.status < 250) {
            form.resetFields();
            openNotification("bottom", "Created", "Successful")
            props.createSuccessFully(true)
        }
        setLoading(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        openNotification("bottom", errorInfo, "Error");
    };

    const onReset = () => {
        props.closeModal()
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Name"
                name="name"
                style={{ display: 'block' }} // Make the label appear on top
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}
            >
                <Input placeholder="Please enter your name" />
            </Form.Item>

            <NumberInput
                label="Importance Factor"
                name="importance_factor"
                required={true}
                min={0}
                max={10}
                placeholder="Please enter a float number"
            />

            <Form.Item style={{ marginBottom: "0px" }}>
                <Row type="flex" justify="end">
                    <Button type="default" htmlType="button" onClick={onReset}>
                        Close
                    </Button>
                    <Button className='ml10' disabled={loading} type="primary" htmlType="submit" style={{ minWidth: "120px" }}>
                        {!loading ? "Submit" : "Submiting...."}
                    </Button>

                </Row>

            </Form.Item>
        </Form>
    );
};

export default CreateNewHealthCategory;