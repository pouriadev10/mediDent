import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import { Error } from "../../ErrorHandeling";
import { useEffect } from "react";
const { Option } = Select;

const CreateFundingSourceForm = (props) => {
    const [data, setData] = useState({
        account_number: "",
        routing_number: "",
        account_holder_name: "",
        fundingsource_name: "",
        account_holder_type: "",
        country: "",
        currency: ""
    });

    const [formError, setFormError] = useState({
        account_number: {
            massage: "",
            status: true
        },
        routing_number: {
            massage: "",
            status: true
        },
        account_holder_name: {
            massage: "",
            status: true
        },
        fundingsource_name: {
            massage: "",
            status: true
        },
        account_holder_type: {
            massage: "",
            status: true
        },
        country: {
            massage: "",
            status: true
        },
        currency: {
            massage: "",
            status: true
        },

    })

    const handleChange = (fieldName, value) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async () => {
        const account_number_valid = await Error.BankAccounts(data.account_number)
        const routing_number_valid = await Error.BankAccounts(data.routing_number)
        const account_holder_name_valid = await Error.NameHandling(data.account_holder_name)
        const fundingsource_name_valid = await Error.NameHandling(data.fundingsource_name)
        const country_valid = await Error.SelectItem(data.country)
        const currency_valid = await Error.SelectItem(data.currency)
        const account_holder_type_valid = await Error.SelectItem(data.account_holder_type)

        setFormError({
            account_number: account_number_valid,
            routing_number: routing_number_valid,
            account_holder_name: account_holder_name_valid,
            fundingsource_name: fundingsource_name_valid,
            account_holder_type: account_holder_type_valid,
            country: country_valid,
            currency: currency_valid,
        })

        if (
            account_number_valid.status &&
            routing_number_valid.status &&
            account_holder_name_valid.status &&
            fundingsource_name_valid.status &&
            country_valid.status &&
            currency_valid.status &&
            account_holder_type_valid.status
        ) {
            props.submitNewFundingSource(data)
        }
    };

    useEffect(() => {
        if (props.openAddAccountModal) {
            setData({
                account_number: "",
                routing_number: "",
                account_holder_name: "",
                fundingsource_name: "",
                account_holder_type: "",
                country: "",
                currency: ""
            })
        }
    }, [props.openAddAccountModal])

    return (
        <div>
            <label className='formLabel'>Name</label>

            <Input
                placeholder="Funding Source Name"
                className={formError.fundingsource_name.status ? "inputs" : "inputs-error"}
                value={data.fundingsource_name} onChange={(e) => handleChange("fundingsource_name", e.target.value)} />
            {
                formError && formError.fundingsource_name &&
                    formError.fundingsource_name.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.fundingsource_name.massage}
                    </div>
            }

            <label className='formLabel'>Account Number</label>
            <Input
                className={formError.account_number.status ? "inputs" : "inputs-error"}
                placeholder="000123456789" value={data.account_number} onChange={(e) => handleChange("account_number", e.target.value)} />

            {
                formError && formError.account_number &&
                    formError.account_number.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.account_number.massage}
                    </div>
            }

            <label className='formLabel'>Routing Number</label>
            <Input
                className={formError.routing_number.status ? "inputs" : "inputs-error"}
                placeholder="110000000" value={data.routing_number} onChange={(e) => handleChange("routing_number", e.target.value)} />
            {
                formError && formError.routing_number &&
                    formError.routing_number.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.routing_number.massage}
                    </div>
            }


            <label className='formLabel'>Account Holder Name</label>
            <Input
                placeholder="Account Holder Name"
                className={formError.account_holder_name.status ? "inputs" : "inputs-error"}
                value={data.account_holder_name} onChange={(e) => handleChange("account_holder_name", e.target.value)} />
            {
                formError && formError.account_holder_name &&
                    formError.account_holder_name.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.account_holder_name.massage}
                    </div>
            }

            <label className='formLabel'>Account Holder Type</label>
            <Select value={data.account_holder_type}
                className={formError.account_holder_type.status ? "inputs" : "inputs-error"}
                style={{ width: "100%" }}
                onChange={(value) => handleChange("account_holder_type", value)}>
                <Option value="individual">Individual</Option>
                <Option value="company">Company</Option>
            </Select>
            {
                formError && formError.account_holder_type &&
                    formError.account_holder_type.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.account_holder_type.massage}
                    </div>
            }
            <label className='formLabel'>Country</label>
            <Select value={data.country}
                className={formError.country.status ? "inputs" : "inputs-error"}
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

            <label className='formLabel'>Currency</label>
            <Select value={data.currency}
                className={formError.currency.status ? "inputs" : "inputs-error"}
                style={{ width: "100%" }}
                onChange={(value) => handleChange("currency", value)}>
                <Option value="usd">USD</Option>
                <Option value="cad">CAD</Option>
            </Select>
            {
                formError && formError.currency &&
                    formError.currency.status ?
                    <></>
                    :
                    <div className='error-text'>
                        {formError.currency.massage}
                    </div>
            }

            <div className='modalButton'>

                <Button type="primary" htmlType="submit"
                    onClick={handleSubmit}
                >
                    Create
                </Button>

            </div>

        </div>
    );
};

export default CreateFundingSourceForm;
