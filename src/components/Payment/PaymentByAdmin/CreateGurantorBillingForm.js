import React, { useEffect, useState } from 'react';
import { Row, Col, notification, Input, Select, DatePicker, Button } from 'antd';
import { Paymentcontroller } from '../../../Paymentcontroller';
import { Error } from '../../../ErrorHandeling'
const { Option } = Select;

const CreateGurantorBillingForm = (props) => {


    const [formError, setFormError] = useState({
        emailOrPhone: {
            massage: '',
            status: true,
            type: ""
        },
    })

    const [data, setData] = useState({

        billing_type: 'customer',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        dateOfBirth: null,

        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        postalCode: null,
    });

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

    const handleChange = (field, value) => {
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleFormSubmit = async () => {
        const email_or_phone_validation = await Error.EmailOrPhoneHandling(data.email, data.phone)
        if (
            email_or_phone_validation.status
        ) {
            const response = await Paymentcontroller.createBillingCustomer(data,
                localStorage.getItem("payAdminId")
            )
            if (response.status < 250) {
                openNotification('bottom',
                    response.message ?
                        response.message
                        :
                        "Done"
                    , "Successful");
                props.handleSubmit2()
            } else {
                openNotification('bottom',
                    response.message ?
                        response.message
                        :
                        response.state ?
                            "state : " + response.state
                            :
                            response.client_name ?
                                "client_name : " + response.client_name
                                :
                                response.first_name ?
                                    "first_name : " + response.first_name
                                    :
                                    response.last_name ?
                                        "last_name : " + response.last_name
                                        :
                                        response.phone ?
                                            "phone : " + response.phone
                                            :
                                            response.dateOfBirth ?
                                                "dateOfBirth : " + response.dateOfBirth
                                                :
                                                response.ssn ?
                                                    "ssn : " + response.ssn
                                                    :
                                                    response.address1 ?
                                                        "address1 : " + response.address1
                                                        :
                                                        response.address2 ?
                                                            "address2 : " + response.address2
                                                            :
                                                            response.city ?
                                                                "city : " + response.city
                                                                :
                                                                response.country ?
                                                                    "country : " + response.country
                                                                    :
                                                                    response.postalCode ?
                                                                        "postalCode : " + response.postalCode
                                                                        :


                                                                        "Error"
                    , "Error");
            }
        } else {
            setFormError({
                emailOrPhone: email_or_phone_validation
            })
        }




    };


    const checkData = async () => {
        if (
            localStorage.getItem("payAdminId")
        ) {

            const response = await Paymentcontroller.get_payment_wizard_data(
                localStorage.getItem("payAdminId")
            )
            const myData = {
                billing_type: 'customer',
                first_name: response.firstname,
                last_name: response.lastname,
                email: response.email,
                phone: response.cell,
                dateOfBirth: null,
                address1: response.address_line1,
                address2: '',
                city: response.city,
                state: response.state,
                country: '',
                postalCode: response.zipcode,
            }
            setData(myData)

        }
    }

    useEffect(() => {
        checkData()
    }, [])

    return (
        <>

            <div className='main_container_card ' style={{ display: "block", marginTop: "15px" }}>
                <Row type='flex' justify="space-between" >
                    <Col span={11}>
                        <label className='formLabel'>First Name</label>
                        <Input
                            value={data.first_name}
                            onChange={(e) => handleChange('first_name', e.target.value)}
                            placeholder="Enter first name"
                        />
                    </Col>
                    <Col span={11}>
                        <label className='formLabel'>Last Name</label>
                        <Input
                            value={data.last_name}
                            onChange={(e) => handleChange('last_name', e.target.value)}
                            placeholder="Enter last name"
                        />
                    </Col>
                </Row>
                <Row type='flex' justify="space-between" className='two-line-forms'>
                    <Col span={11}>
                        <label className='formLabel'>Email</label>
                        <Input
                            className={
                                formError.emailOrPhone && !formError.emailOrPhone.status &&
                                    formError.emailOrPhone.type == "email"
                                    ? 'inputs-error' : ''}
                            value={data.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="Enter email"
                        />
                        {
                            formError.emailOrPhone && !formError.emailOrPhone.status &&
                            formError.emailOrPhone.type == "email" &&
                            <div className='error-text'>
                                {formError.emailOrPhone.massage}
                            </div>
                        }
                    </Col>
                    <Col span={11}>
                        <label className='formLabel'>Phone</label>
                        <Input
                            className={
                                formError.emailOrPhone && !formError.emailOrPhone.status &&
                                    formError.emailOrPhone.type == "phone"
                                    ? 'inputs-error' : ''}
                            value={data.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="Enter phone"
                        />
                        {
                            formError.emailOrPhone && !formError.emailOrPhone.status &&
                            formError.emailOrPhone.type == "phone" &&
                            <div className='error-text'>
                                {formError.emailOrPhone.massage}
                            </div>
                        }
                    </Col>
                </Row>
                <label className='formLabel'>Date of Birth</label>
                <DatePicker
                    onChange={(date, value) => handleChange('dateOfBirth', value)}
                    placeholder="Select date of birth"
                />

                <label className='formLabel'>Address 1</label>
                <Input
                    value={data.address1}
                    onChange={(e) => handleChange('address1', e.target.value)}
                    placeholder="Enter address 1"
                />

                <label className='formLabel'>Address 2</label>
                <Input
                    value={data.address2}
                    onChange={(e) => handleChange('address2', e.target.value)}
                    placeholder="Enter address 2"
                />

                <Row type='flex' justify="space-between" className='two-line-forms'>
                    <Col span={11}>
                        <label className='formLabel'>City</label>
                        <Input
                            value={data.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            placeholder="Enter city"
                        />
                    </Col>
                    <Col span={11}>
                        <label className='formLabel'>State</label>
                        <Input
                            value={data.state}
                            onChange={(e) => handleChange('state', e.target.value)}
                            placeholder="Enter state"
                        />
                    </Col>

                </Row>


                <label className='formLabel'>Country</label>
                <Select
                    style={{ width: "100%" }}
                    value={data.country}
                    onChange={(value) => handleChange('country', value)}
                    placeholder="Select country"
                >
                    <Option key="US" value="US">United States of America</Option>
                    <Option key="CA" value="CA">Canada</Option>
                </Select>

                <label className='formLabel'>Postal Code</label>
                <Input
                    value={data.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    placeholder="Enter postal code"
                />

            </div>
            <hr className='endline_payment' />

            <Button
                onClick={handleFormSubmit}

                className="login-btn submit-wizard-btn" type="submit" fullWidth >

                Submit
            </Button>
        </>
    );
};

export default CreateGurantorBillingForm;
