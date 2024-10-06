import React, { useState, useEffect } from "react";
import { Input, notification, Button, Select } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { Error } from "../../ErrorHandeling";
import { controllerAccount } from './../../controllerAccount';
const { Option } = Select;

const AddConnectedAccount = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        phone: "",
        country: "ca",
        city: "",
        address1: "",
        postalCode: "",
        state: "",
        billing_type: "express",
        statement_descriptor: ""
    });

    const [formError, setFormError] = useState({
        email: {
            massage: "",
            status: true
        },
        phone: {
            massage: "",
            status: true
        },
        country: {
            massage: "",
            status: true
        },
        city: {
            massage: "",
            status: true
        },
        address1: {
            massage: "",
            status: true
        },
        postalCode: {
            massage: "",
            status: true
        },
        state: {
            massage: "",
            status: true
        },
        statement_descriptor: {
            massage: "",
            status: true
        },
    })

    const handleChange = (fieldName, value) => {

        if (fieldName == "phone") {
            value = value.replace(/ /g, "")
            if (value.length < 10) {
                if (value.length == 8) {
                    value = value.replace(/ /g, "")
                    setData((prevData) => ({
                        ...prevData,
                        phone: value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6,),
                    }));
                }
                else {
                    value = value.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
                    setData((prevData) => ({
                        ...prevData,
                        phone: value,
                    }));
                }
            }
            if (value.length == 10) {


                value = value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6,)
                setData((prevData) => ({
                    ...prevData,
                    phone: value,
                }));
            }
        } else {
            setData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        }


    };

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

    const handleSubmit = async () => {
        setLoading(true)
        const statement_valid = await Error.StatementValid(data.statement_descriptor)
        const email_valid = await Error.EmailHandling(data.email)
        const phone_valid = await Error.PhoneHandling(data.phone.replace(/ /g, ""))
        const country_valid = await Error.SelectItem(data.country)
        const city_valid = await Error.NameHandling(data.city)
        const address1_valid = await Error.NameHandling(data.address1)
        const postalCode_valid = await Error.NameHandling(data.postalCode)
        const state_valid = await Error.state(data.state)

        setFormError({
            statement_descriptor: statement_valid,
            email: email_valid,
            phone: phone_valid,
            country: country_valid,
            city: city_valid,
            address1: address1_valid,
            postalCode: postalCode_valid,
            state: state_valid,

        })

        if (
            statement_valid.status &&
            email_valid.status &&
            phone_valid.status &&
            country_valid.status &&
            city_valid.status &&
            address1_valid.status &&
            postalCode_valid.status &&
            state_valid.status
        ) {
            var myData = {
                ...data,
                client_id: localStorage.getItem("selectedOffice"),
                phone: data.phone ? data.phone.replace(/ /g, "") : ""
            }

            const response = await controllerAccount.createPaymentBusiness(myData);

            if (response.status < 250) {
                setData(
                    {
                        statement_descriptor: "",
                        email: "",
                        phone: "",
                        country: "ca",
                        city: "",
                        address1: "",
                        postalCode: "",
                        state: "",
                        billing_type: "express"
                    }
                )
                openNotification('bottom',
                    response && response.message ?
                        response.message
                        :
                        "Done"
                    , "Successful")
                props.submitConnectedAccount(data)
            } else {
                openNotification('bottom', response.detail ? response.detail[0] : response.massage ? response.massage : "Error", "Error");

                setFormError({
                    email: {
                        massage: response.email && response.email[0] ? response.email[0] : "",
                        status: response.email && response.email[0] ? false : true
                    },
                    phone: {
                        massage: response.phone && response.phone[0] ? response.phone[0] : "",
                        status: response.phone && response.phone[0] ? false : true
                    },
                    country: {
                        massage: response.country && response.country[0] ? response.country[0] : "",
                        status: response.country && response.country[0] ? false : true
                    },
                    city: {
                        massage: response.city && response.city[0] ? response.city[0] : "",
                        status: response.city && response.city[0] ? false : true
                    },
                    address1: {
                        massage: response.address1 && response.address1[0] ? response.address1[0] : "",
                        status: response.address1 && response.address1[0] ? false : true
                    },
                    postalCode: {
                        massage: response.postalCode && response.postalCode[0] ? response.postalCode[0] : "",
                        status: response.postalCode && response.postalCode[0] ? false : true
                    },
                    state: {
                        massage: response.state && response.state[0] ? response.state[0] : "",
                        status: response.state && response.state[0] ? false : true
                    },
                    statement_descriptor: {
                        massage: response.statement_descriptor && response.statement_descriptor[0] ? response.statement_descriptor[0] : "",
                        status: response.statement_descriptor && response.statement_descriptor[0] ? false : true
                    },
                })
            }

            setLoading(false)
        }
        setLoading(false)

    };

    function checkOfficeName(str) {
        if (!str || str.length === 0) {
            return "smilepass";
        } else if (str.length > 20) {
            return str.substring(0, 20);
        } else {
            return str;
        }
    }


    const readOfficeInfo = async () => {
        const response = await controllerAccount.officeprofile()
        console.log(response)
        setData({
            ...data,
            statement_descriptor: response.name ? checkOfficeName(response.name) : "smilepass"
        })
    }


    useEffect(() => {
        // read office information for filling statement descriptor
        readOfficeInfo()
    }, [])

    return (
        <div>

            <label className='formLabel'>Email</label>
            <Input

                className={formError.email.status ? "inputs" : "inputs-error"}
                placeholder="example@test.com"
                value={data.email} onChange={(e) => handleChange("email", e.target.value)} />
            {
                formError && formError.email &&
                    formError.email.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.email.massage}
                    </div>
            }
            <label className='formLabel'>Phone</label>
            <Input
                className={formError.phone.status ? "" : "inputs-error"}
                placeholder="812 111 1111"
                prefix={<PhoneOutlined />}
                value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            {
                formError && formError.phone &&
                    formError.phone.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.phone.massage}
                    </div>
            }
            {/* <label className='formLabel'>Statement Descriptor </label>
            <Input
                className={formError.statement_descriptor.status ? "inputs" : "inputs-error"}
                placeholder="Statement Descriptor"
                value={data.statement_descriptor} onChange={(e) => handleChange("statement_descriptor", e.target.value)} />
            {
                formError && formError.statement_descriptor &&
                    formError.statement_descriptor.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.statement_descriptor.massage}
                    </div>
            } */}
            <label className='formLabel'>Address 1</label>
            <Input
                className={formError.address1.status ? "inputs" : "inputs-error"}
                placeholder="581 wfi street"
                value={data.address1} onChange={(e) => handleChange("address1", e.target.value)} />
            {
                formError && formError.ssn &&
                    formError.address1.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.address1.massage}
                    </div>
            }
            <label className='formLabel'>City</label>
            <Input
                className={formError.city.status ? "inputs" : "inputs-error"}
                placeholder="Buffalo"
                value={data.city} onChange={(e) => handleChange("city", e.target.value)} />
            {
                formError && formError.city &&
                    formError.city.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.city.massage}
                    </div>
            }
            <label className='formLabel'>Billing Type</label>
            <Select
                className={"inputs"}
                value={data.billing_type}
                style={{ width: "100%" }}
                onChange={(value) => handleChange("billing_type", value)}>
                <Option value="express">Express</Option>
                <Option value="custom">Custom</Option>
                <Option value="helcim">Helcim</Option>
            </Select>
            <label className='formLabel'>Country</label>
            <Select
                className={formError.country.status ? "inputs" : "inputs-error"}
                value={data.country}
                style={{ width: "100%" }}
                onChange={(value) => handleChange("country", value)}>
                <Option value="us">United States</Option>
                <Option value="ca">Canada</Option>
            </Select>
            {
                formError && formError.country &&
                    formError.country.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.country.massage}
                    </div>
            }

            <label className='formLabel'>State</label>
            <Input
                className={formError.state.status ? "inputs" : "inputs-error"}
                placeholder="NY"
                value={data.state} onChange={(e) => handleChange("state", e.target.value)} />
            {
                formError && formError.state &&
                    formError.state.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.state.massage}
                    </div>
            }

            <label className='formLabel'>Postal Code</label>
            <Input
                className={formError.postalCode.status ? "inputs" : "inputs-error"}
                placeholder="12354"
                value={data.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} />

            {
                formError && formError.postalCode &&
                    formError.postalCode.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.postalCode.massage}
                    </div>
            }
            <div className='modalButton'>

                <Button type="primary"
                    style={{ minWidth: "120px" }}
                    htmlType="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {
                        loading ?
                            "..." : "Submit"
                    }
                </Button>

            </div>

        </div>
    );
};

export default AddConnectedAccount;
