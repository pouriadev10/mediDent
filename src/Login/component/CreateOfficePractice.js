import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { controller } from '../controller';
import { PopupMessage } from "./PopupMessage";
import { useDropzone } from 'react-dropzone';

// icon
import dragDropIcon from "../assets/icon/export.png"

const { Dragger } = Upload;

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const CreatePractice = (props) => {
    const [form] = Form.useForm();
    const [filePreview, setFilePreview] = React.useState(null);
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = React.useState(null);

    const onDrop = React.useCallback((acceptedFiles) => {
        // Do something with the dropped files
        if (acceptedFiles && acceptedFiles.length > 0) {
            setLogo(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/png, image/jpeg',
    });
    const onFinish = async (values) => {
        setLoading(true)
        console.log('Submitted values:', values);
        if (logo) {
            let formData = new FormData();
            formData.append("name", values.name);
            formData.append("phone", values.phone);
            formData.append("email", values.email);
            formData.append("logo", logo);
            const response = await controller.createOfficePractice(formData)
            if (response.status < 250) {
                //localStorage.setItem("user", JSON.stringify(response))
                props.readOnboardingStatus()
                message.success("Created practice was successful")
            } else {
                message.error(

                    response.email ?
                        response.email :
                        response.phone ?
                            response.phone :
                            response.detail ?
                                response.detail :
                                response.error ?
                                    response.error :
                                    "Error during creating practice"
                )
            }
        } else {
            message.error("Upload logo")
        }
        form.resetFields();
        // Reset the file preview
        setFilePreview(null);
        setLoading(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (event) => {
        setLogo(event.target.files[0])
    };


    return (
        <div className="your-component-container">
            <p style={{ fontSize: "24px", fontWeight: "600" }}>Create an Account</p>
            <p style={{ fontSize: "20px", fontWeight: "500"}}>Basic Information of your Practice</p>


            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='input-lable'>Name</div>
                <Form.Item
                    label=""
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input style={{ width: '100%' }} placeholder="Enter your name" />
                </Form.Item>

                <div className='input-lable'>Email</div>
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                >
                    <Input style={{ width: '100%' }} placeholder="Enter your email" />
                </Form.Item>

                <div className='input-lable'>Phone</div>
                <Form.Item
                    label=""
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input prefix="+1 " style={{ width: '100%' }} placeholder="Enter your phone number" />
                </Form.Item>

                <div className='input-lable'>Logo</div>
                <div {...getRootProps()} className="drop-zone">
                    <input {...getInputProps()} id="inputImageFile" type="file" name="file" />
                    <div className="tac">
                        {logo ? (
                            <img width="150" height="100" alt="avatar" src={URL.createObjectURL(logo)} />
                        ) : (
                            <div>
                                <img src={dragDropIcon} width={20} alt="drag" />
                                <p className='dragDroptext mt15'>Drag and drop or <span className='dragDropBtn'>Browse</span> your files</p>
                            </div>

                        )}
                    </div>
                </div>
                <div className='mt15'></div>
                <Form.Item>
                    <Button htmlType="submit" className='login-button' loading={loading}>
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreatePractice;
