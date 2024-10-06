import React, { useEffect, useState } from 'react';
import { Popconfirm, Form, Input, Select, Button, Row, notification, InputNumber } from 'antd';
import { controller } from '../../controller';
import { useForm } from 'antd';
const { Option } = Select;

const CreateAppointment = (props) => {
    const [form] = Form.useForm();
    const [providers, setProviders] = useState([])

    const handleCloseCreateAppointment = async () => {
        props.form.resetFields();
        props.closeCreateModal(true);
    }

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

    const onFinish = async (values) => {


        console.log('Received values:', values);
        const response = await controller.createNewAppointmentType(values)
        if (response.status < 250) {
            props.closeCreateModal()
            form.resetFields();
            openNotification(
                "bottom",
                response && response.message ? response.message : "Done",
                "Successful"
            );
        } else {
            openNotification(
                "bottom",
                response.detail ? JSON.stringify(response.detail[0]) : "Error",
                "Error"
            );
        }

    };

    const getlistOfProvider = async () => {
        try {
            const response = await controller.listOfProviderForCreateAppointment()
            setProviders(response.json)
        } catch (error) {
            console.error('Error fetching providers:', error);
        }
    }

    useEffect(() => {
        getlistOfProvider()
    }, [])


    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item label="Service" name="service" rules={[{ required: true, message: 'Please input the service!' }]} style={{marginBottom: 25}}>
                <Input placeholder="Service" style={{width: 290, height: 39, border: '1px solid #6B43B5'}} />
            </Form.Item>

            <Form.Item label="Length" name="length" rules={[{ required: true, message: 'Please input the length!' }]}  style={{marginBottom: 25}}>
                <Input placeholder="Length (minute)" type="number" style={{width: 290, height: 39, border: '1px solid #6B43B5'}} />
            </Form.Item>

            <Form.Item
                label="Provider"
                name="provider"
                rules={[{ required: true, message: 'Please select the provider!' }]}
                style={{marginBottom: 25}}
            >
                <Select mode="multiple" placeholder="Select a provider" style={{width: 290, height: 39, border: '1px solid #6B43B5', borderRadius: 7}}>
                    {providers.map((provider) => (
                        <Option key={provider.id} value={provider.id}>
                            {provider.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Row type="flex" justify="center" style={{marginTop: 35}}>
                {/* <Form.Item>
                    <Button onClick={handleCloseCreateAppointment} className="mr8 white-btn create-payment-request-btn">
                        Close
                    </Button>
                </Form.Item> */}
                <Form.Item style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20}} >
                    <Button type="primary" htmlType="submit" style={{width: 139, height:39, borderRadius: 5000, fontSize: 16, backgroundColor: '#6B43B5'}}>
                        Add
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    //     <Form
    //     id="newAppointmentForm"
    //     form={form}
    //     layout="vertical"
    //     onFinish={onFinish}
    //   >
    //     <Form.Item
    //       label="Service"
    //       name="service"
    //       rules={[{ required: true, message: 'Please input the service!' }]}
    //     >
    //       <InputNumber placeholder="Service" min={0} style={{ width: '100%' }} />
    //     </Form.Item>

    //     <Form.Item
    //       label="Length"
    //       name="length"
    //       rules={[{ required: true, message: 'Please input the length!' }]}
    //     >
    //       <InputNumber placeholder="Length (minute)" min={0} style={{ width: '100%' }} />
    //     </Form.Item>

    //     <Form.Item
    //       label="Provider"
    //       name="provider"
    //       rules={[{ required: true, message: 'Please select the provider!' }]}
    //     >
    //       <Select
    //         mode="multiple"
    //         placeholder="Select a provider"
    //         style={{ width: '100%' }}
    //       >
    //         {providers.map((provider) => (
    //           <Option key={provider.id} value={provider.id}>
    //             {provider.name}
    //           </Option>
    //         ))}
    //       </Select>
    //     </Form.Item>
    //   </Form>
    );
};

export default CreateAppointment;
