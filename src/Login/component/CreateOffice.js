import React from 'react';
import { Row, Form, Input, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { controller } from '../controller';
import { PopupMessage } from "./PopupMessage";
import { useDropzone } from 'react-dropzone';
// icon
import dragDropIcon from "../assets/icon/export.png"
import checkIcon from "../assets/icon/size-keeper.png"

const CreateOffice = (props) => {
    const [form] = Form.useForm();
    const [filePreview, setFilePreview] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
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
            const response = await controller.createOffice(formData, props.practiceId)
            if (response.status < 250) {
                props.readOnboardingStatus()
                //localStorage.setItem("user", JSON.stringify(response))
                message.success(

                    "office created successfully",

                )
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
                                    "Error during creating practice",

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
            <Row align={"middle"}>
                <img width={24} height={24} src={checkIcon} alt="practice" style={{marginRight: 7}} />
                <span style={{ color: "#6B43B5", fontSize: "20px" }}> Practice created.       </span>
            </Row>

            <br />
            <p style={{ fontSize: "20px", fontWeight: "500", marginBottom: 37 }}>Basic Information of your Office</p>


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
                    style={{marginBottom: 20}}
                >
                    <Input style={{ width: '100%', height: 39 }} placeholder="Enter your name" />
                </Form.Item>

                <div className='input-lable'>Email</div>
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                    style={{marginBottom: 20}}
                >
                    <Input style={{ width: '100%', height: 39 }} placeholder="Enter your email" />
                </Form.Item>

                <div className='input-lable'>Phone</div>
                <Form.Item
                    label=""
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                    style={{marginBottom: 20}}
                >
                      <Input prefix="+1 " style={{ width: '100%', height: 39 }} placeholder="Enter your phone number" />
                </Form.Item>

                <div className='input-lable'>Logo</div>
                <div {...getRootProps()} className="drop-zone" style={{marginBottom: 40}}>
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

export default CreateOffice;
