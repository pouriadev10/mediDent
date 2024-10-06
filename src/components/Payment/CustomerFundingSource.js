import React, { useEffect, useState } from "react"
import {
    Row,
    Col,
    Input,
    Button
} from 'antd'
import { Paymentcontroller } from "../../Paymentcontroller";
const CustomerFundingSource = (props) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const handleChange = (fieldName, value) => {
        if (fieldName == "card_number") {
            if (value[4] && value[4] != " ") {
                var a = value.substring(0, 4)
                var b = value.substring(4,)

                value = a + " " + b
            }
            if (value[9] && value[9] != " ") {
                var a = value.substring(0, 9)
                var b = value.substring(9,)

                value = a + " " + b
            }
            if (value[14] && value[14] != " ") {
                var a = value.substring(0, 14)
                var b = value.substring(14,)
                value = a + " " + b
            } if (value.length <= 19) {
                let myObject = Object.assign({}, data);
                myObject[fieldName] = value;
                setData(myObject);
            }
        } else {
            setData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        }

    };



    const handlePayment = async () => {
        if (
            data.card_number &&
            data.cvc &&
            data.fundingsource_name &&
            data.exp_month &&
            data.exp_year
        ) {
            setLoading(true)

            var myData = {
                ...data,
                card_number: data.card_number.replace(/ /g, ""),
                customer: props.customer
            }

            const response1 = await Paymentcontroller.createFundingSource(
                myData
            )


            if (response1.status < 250) {
                const response = await Paymentcontroller.paySinglePayment(
                    window.location.href.split("/")[window.location.href.split("/").length - 1]
                )

                if (response.status < 250) {
                    localStorage.setItem("Payment-Receipt", true)
                    window.location.href = "#/payment-Done"
                } else {
                    this.openNotification('bottom', response.error ? response.error : "Error", "Error");
                }

            }



            setLoading(false)
        }

    }

    const handleSubmit = () => {
        props.submitNewFundingSource(data)

    };

    return (
        <React.Fragment>
            <label className='formLabel'>Name</label>
            <Input
                type="text"
                name="fundingsource_name"
                placeholder="Funding Source Name"
                value={data.fundingsource_name} onChange={(e) => handleChange("fundingsource_name", e.target.value)} />

            <label className='formLabel'>Card Number</label>
            <Input
                type="text"
                name="card_number"
                placeholder="5105 1051 0510 5100"
                value={data.card_number} onChange={(e) => handleChange("card_number", e.target.value)} />

            <label className='formLabel'>Card CVC</label>
            <Input
                type="text"
                name="cvc"
                placeholder="123"
                value={data.cvc} onChange={(e) => handleChange("cvc", e.target.value)} />

            <label className='formLabel'>Card Exp Month</label>
            <Input
                type="text"
                name="exp_month"
                placeholder="1-12"
                value={data.exp_month} onChange={(e) => handleChange("exp_month", e.target.value)} />

            <label className='formLabel'>Card Exp Year</label>
            <Input
                type="text"
                name="exp_month"
                placeholder="2023"
                value={data.exp_year} onChange={(e) => handleChange("exp_year", e.target.value)} />

            <div className='modalButton'>
                <Button style={{ minWidth: "120px" }}
                    onClick={handlePayment}
                    disabled={loading}
                    type="primary"
                >
                    {
                        !loading ? "Submit" : "..."
                    }
                </Button>
            </div>

        </React.Fragment>
    )
}

export default CustomerFundingSource;