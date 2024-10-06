import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, notification, Select } from 'antd';
import { controller } from '../../controller';
const { Option } = Select;

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

const NumberInput = ({ label, name, min, max, required, placeholder, prefix }) => (
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
        <Input placeholder={placeholder}
            prefix={prefix}
        />
    </Form.Item>
);

const EditProcedure = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const [healthCats, setHealthCats] = useState([])

    const onFinish = async (values) => {
        setLoading(true)
        console.log('Success:', values);
        console.log('Success:', props);
        values["procedure"] = props.procedure.id
        const response = await controller.EditProcedureImpact(values, props.data.id)

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

    const getAllCategory = async () => {
        const response = await controller.getHealthCategory(0);
        if (response.status < 250) {
            var temp = response.json.health_category && response.json.health_category.id;

            response.json["health_category"] = temp
            setHealthCats(response.json)
            // setTimeout(() => {
            //     var first_data = props.data
            //     first_data.health_category = first_data.health_category && first_data.health_category.id ? first_data.health_category.id : "-1"
            //     if (first_data.recovery_time && first_data.recovery_time) {
            //         first_data.recovery_time = first_data.recovery_time.split(":").reduce((acc, time) => (60 * acc) + +time)
            //     }
            //     form.setFieldsValue(first_data);
            //     form.setFieldsValue(first_data);
            // }, 500)


        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    useEffect(() => {
        const Myfirst_data = JSON.parse(JSON.stringify(props.data));

        if (Myfirst_data.health_category && Myfirst_data.health_category.id) {
            Myfirst_data.health_category = Myfirst_data.health_category.id;
        } else {
            Myfirst_data.health_category = "-1";
        }

        if (Myfirst_data.recovery_time) {
            Myfirst_data.recovery_time = Myfirst_data.recovery_time.split(":").reduce((acc, time) => (60 * acc) + +time);
        }

        form.setFieldsValue(Myfirst_data);
    }, [props.data]);

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Health Category"
                name="health_category"
                style={{ display: 'block' }} // Make the label appear on top
                rules={[
                    {
                        required: true,
                        message: 'Please select an item!',
                    },
                ]}
            >
                <Select
                    placeholder="selecte a health category"
                >
                    {
                        healthCats.map((item) => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
            </Form.Item>


            <NumberInput
                label="Health Score"
                name="health_score"
                required={true}
                min={0}
                max={100}
                placeholder="Please enter a float number"
            />

            <NumberInput
                label="Recovery Percent"
                name="recovery_percent"
                required={true}
                min={0}
                max={100}
                placeholder="Please enter a number"
                prefix="%"
            />

            <NumberInput
                label="Recovery Time (second)"
                name="recovery_time"
                required={true}
                min={0}
                max={100000}
                placeholder="Please enter a number"
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

export default EditProcedure;