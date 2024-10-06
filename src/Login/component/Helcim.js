import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import config from '../../config';
const helcimResponse = (e) => {
    console.log(e)
    return (
        <>hi</>
    )
}

const PaymentForm = (props) => {
    const [cardToken, setCardToken] = useState('1');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiryMonth, setCardExpiryMonth] = useState('');
    const [cardExpiryYear, setCardExpiryYear] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardHolderAddress, setCardHolderAddress] = useState('');
    const [cardHolderPostalCode, setCardHolderPostalCode] = useState('');
    const [amount, setAmount] = useState("0.00");
    const [userIp, setUserIp] = useState("")
    const [loading, setLoading] = useState(false)
    const [grecaptcha, setGrecaptcha] = useState("")
    useEffect(() => {
        // console.log(sessionStorage.getItem("GoogleRecaptcha"))
        // if (document.getElementById('g-recaptcha-response')) {
        //     setGrecaptcha(sessionStorage.getItem("GoogleRecaptcha"))
        // }
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js?render=" + config.googleCaptch.code;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(config.googleCaptch.code, { action: 'helcimJSCheckout' })
                    .then(token => {
                        setGrecaptcha(token);
                    });
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const handleProcessClick = async (e) => {
        // Handle the processing logic here
        setLoading(true)
        e.preventDefault();
        console.log(e)
        window.helcimProcess()


        try {
            // Your processing logic goes here

            // Access the result element using the ref
            const resultElement = resultRef.current;

            if (resultElement) {
                // Get the text content from the result element
                const resultText = resultElement.textContent;

                // Log the result text to the console
                console.log('Result Text:', resultText);
            } else {
                console.error('Result element not found');
            }
            setLoading(false)
        } catch (error) {
            console.error('Error processing payment:', error);
            setLoading(false)
        }

    };

    const handleReadDataIP = async () => {

        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const userIp0 = ipData.ip;

            console.log(userIp0)
            setUserIp(userIp0)
            // Handle response from your backend

        } catch (error) {
            console.error('Error fetching IP address:', error);
        }
    };

    React.useState(() => {
        handleReadDataIP();
    }, [])

    React.useState(() => {
        handleReadDataIP()
        console.log(props.helcimConfig)
    }, [props.helcimConfig])

    const resultRef = React.useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        window.helcimProcess();
        try {
            // Your processing logic goes here

            // Access the result element using the ref
            const resultElement = resultRef.current;

            if (resultElement) {
                // Get the text content from the result element
                const resultText = resultElement.textContent;

                // Log the result text to the console
                console.log('Result Text:', resultText);
            } else {
                console.error('Result element not found');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };
    function search(formData) {
        const query = formData.get("query");
        alert(`You searched for '${query}'`);
    }

    return (
        <div className=''>
            <p style={{fontSize: 20, fontWeight: '500', marginBottom: 37}}>Purchase Subscription Tier</p>
        <form
            onSubmit={handleProcessClick}
            name="helcimForm"
            id="helcimForm"
            action={helcimResponse}
        >
            <input type="hidden" id="token" value={props.helcimConfig["helcim js token"]} />
            <input type="hidden" id="language" value="en" />
    
            <Input
                id="customerCode"
                type="hidden"
                value={props.helcimConfig.customerCode}
                placeholder="Card Token"
            />
    
            <div className='mt8'>
                <label htmlFor="cardNumber" className='input-lable'>Credit Card Number</label>
                <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter the 16 digit card number on the card"
                    style={{ width: "100%" }}
                />
            </div>
            <br />
    
            <div className='mt8' style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label htmlFor="cardExpiryMonth" className='input-lable'>Expiry Date</label>
                    <Input
                        id="cardExpiryMonth"
                        value={cardExpiryMonth}
                        onChange={(e) => setCardExpiryMonth(e.target.value)}
                        placeholder="Enter Month"
                    />
                </div>
                <div style={{ flex: 1 , display: 'flex', alignItems: 'flex-end'}}>
                    <label htmlFor="cardExpiryYear"></label>
                    <Input
                        id="cardExpiryYear"
                        value={cardExpiryYear}
                        onChange={(e) => setCardExpiryYear(e.target.value)}
                        placeholder="Enter Year"
                    />
                </div>
            </div>
            <br />
    
            <div className='mt8'>
                <label htmlFor="cardCVV" className='input-lable'>CVV</label>
                <Input
                    id="Enter CVV"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value)}
                    placeholder="CVV"
                    style={{ width: "100%" }}
                />
            </div>
            <br />
    
            <div className='mt8' style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label htmlFor="cardHolderName" className='input-lable'>Card Holder Name</label>
                    <Input
                        id="cardHolderName"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        placeholder="Enter Name"
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label htmlFor="cardHolderPostalCode" className='input-lable'>Card Holder Postal Code</label>
                    <Input
                        id="cardHolderPostalCode"
                        value={cardHolderPostalCode}
                        onChange={(e) => setCardHolderPostalCode(e.target.value)}
                        placeholder="Enter Postal Code"
                    />
                </div>
            </div>
            <br />
    
            <div className='mt8'>
                <label htmlFor="cardHolderAddress" className='input-lable'>Card Holder Address</label>
                <Input
                    id="cardHolderAddress"
                    value={cardHolderAddress}
                    onChange={(e) => setCardHolderAddress(e.target.value)}
                    placeholder="Enter Address"
                    style={{ width: "100%" }}
                />
            </div>
            <br />
    
            <Input type="hidden" id="amount" value={"0.00"} placeholder="Amount" />
            <input type="hidden" id="g-recaptcha-response" value={grecaptcha} />
    
            <div className='mt10'>
                <Button
                    htmlType="submit"
                    style={{
                        width: "100%",
                        marginTop: "15px",
                        height: 39
                    }}
                    type="primary"
                    loading={loading}
                    onClick={handleProcessClick}

                >
                    {loading ? "Processing..." : "Pay"}
                </Button>
            </div>
    
            <div ref={resultRef} id="helcimResults"></div>
        </form>
    </div>
    
    );
};

export default PaymentForm;
