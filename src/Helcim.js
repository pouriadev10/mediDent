import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import config from "./config"
const FindIP = () => {
    const [formData, setFormData] = React.useState({});
    const handleReadData = async (event) => {

        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const userIp = ipData.ip;

            console.log(userIp)

            const postData = {
                ...formData,
                userIp: userIp
            };

            // Send data to your Django backend
            fetch('YOUR_DJANGO_BACKEND_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            // Handle response from your backend

        } catch (error) {
            console.error('Error fetching IP address:', error);
        }
    };

    React.useState(() => {
        handleReadData();
    }, [])

    return (
        <>

        </>
    )
}

const PaymentForm = () => {
    const [cardToken, setCardToken] = useState('1');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiryMonth, setCardExpiryMonth] = useState('');
    const [cardExpiryYear, setCardExpiryYear] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardHolderAddress, setCardHolderAddress] = useState('');
    const [cardHolderPostalCode, setCardHolderPostalCode] = useState('');
    const [amount, setAmount] = useState(100.0);

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


        let intervalId;
        intervalId = setInterval(() => {
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
        }, 20000);

        return () => {
            clearInterval(intervalId);
        };


    }, []);

    const handleProcessClick = () => {
        // Handle the processing logic here
        window.helcimProcess();
    };

    return (
        <div>
            <FindIP />
            <form
                name="helcimForm"
                id="helcimForm"
            //   action="your-checkout-page.php"
            //   method="POST"
            >
                <input type="hidden" id="token" value="698ccdf958d62284602d90" />
                <input type="hidden" id="language" value="en" />
                {/* CARD-INFORMATION */}
                <div>
                    <label htmlFor="cardToken">Card Token:</label>
                    <Input
                        id="cardToken"
                        value={cardToken}
                        onChange={(e) => setCardToken(e.target.value)}
                        placeholder="Card Token"
                    />
                </div>

                <div>
                    <label htmlFor="cardNumber">Credit Card Number:</label>
                    <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Credit Card Number"
                    />
                </div>

                <div>
                    <label htmlFor="cardExpiryMonth">Expiry Month:</label>
                    <Input
                        id="cardExpiryMonth"
                        value={cardExpiryMonth}
                        onChange={(e) => setCardExpiryMonth(e.target.value)}
                        placeholder="Expiry Month"
                    />
                </div>

                <div>
                    <label htmlFor="cardExpiryYear">Expiry Year:</label>
                    <Input
                        id="cardExpiryYear"
                        value={cardExpiryYear}
                        onChange={(e) => setCardExpiryYear(e.target.value)}
                        placeholder="Expiry Year"
                    />
                </div>

                <div>
                    <label htmlFor="cardCVV">CVV:</label>
                    <Input
                        id="cardCVV"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                        placeholder="CVV"
                    />
                </div>

                {/* AVS- INFORMATION */}
                <div>
                    <label htmlFor="cardHolderName">Card Holder Name:</label>
                    <Input
                        id="cardHolderName"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        placeholder="Card Holder Name"
                    />
                </div>

                <div>
                    <label htmlFor="cardHolderAddress">Card Holder Address:</label>
                    <Input
                        id="cardHolderAddress"
                        value={cardHolderAddress}
                        onChange={(e) => setCardHolderAddress(e.target.value)}
                        placeholder="Card Holder Address"
                    />
                </div>

                <div>
                    <label htmlFor="cardHolderPostalCode">Card Holder Postal Code:</label>
                    <Input
                        id="cardHolderPostalCode"
                        value={cardHolderPostalCode}
                        onChange={(e) => setCardHolderPostalCode(e.target.value)}
                        placeholder="Card Holder Postal Code"
                    />
                </div>

                {/* OPTIONAL-AMOUNT */}
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <Input
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                    />
                </div>
                <input type="hidden" id="g-recaptcha-response" value={grecaptcha} />
                {/* BUTTON */}
                <div>
                    <Button type="primary" onClick={handleProcessClick}>
                        Process
                    </Button>
                </div>

                <div id="helcimResults"></div>


            </form>
        </div>
    );
};

export default PaymentForm;
