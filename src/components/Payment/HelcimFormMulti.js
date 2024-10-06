import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import config from "../../config"
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



    // const checkStatus = async () => {


    //     fetch(config.apiGateway.URL + "/billpay/create-installment/"
    //         , {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 "interval_count": localStorage.getItem("wizard_recurring_interval_count"),
    //                 "payment_request": window.location.href.split("/")[window.location.href.split("/").length - 1],
    //             }),
    //         })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data)
    //         });

    // }
    // const checkStatus = async (selectedId) => {


    //     if (!selectedId) {
    //         console.error("Selected ID is missing for the payment request.");
    //         return;
    //     }

    //     // Retrieve the interval count from localStorage and parse it as an integer
    //     const intervalCount = parseInt(localStorage.getItem("wizard_recurring_interval_count"), 10);

    //     // Check if the parsed value is a valid number
    //     if (isNaN(intervalCount)) {
    //         console.error("Invalid interval count retrieved from localStorage.");
    //         return; // Exit the function if interval count is not a valid number
    //     }

    //     fetch(config.apiGateway.URL + "/billpay/create-installment/", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             "interval_count": props.selectedIntervalId,  // Use the parsed integer
    //             "payment_request": selectedId,
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error submitting payment request:", error);
    //         });
    // };

    const checkStatus = async () => {
        // Extract the payment ID from the URL or use the one from props if not available in the URL
        const url = window.location.hash; // Gets the hash part of the URL which includes everything after '#'
        const match = url.match(/payment\/(\d+)/); // Regular expression to find 'payment/{id}'
        const selectedId = match ? match[1] : localStorage.getItem("paymentId"); // If match is found use it, otherwise use props

        if (!selectedId) {
            console.error("Selected ID is missing for the payment request.");
            return;
        }

        // Retrieve the interval count from localStorage and parse it as an integer
        const intervalCount = parseInt(localStorage.getItem("wizard_recurring_interval_count"), 10);

        // Check if the parsed value is a valid number
        if (isNaN(intervalCount)) {
            console.error("Invalid interval count retrieved from localStorage.");
            return; // Exit the function if interval count is not a valid number
        }

        fetch(config.apiGateway.URL + "/billpay/create-installment/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "interval_count": props.selectedIntervalId, // Use the parsed integer
                "payment_request": selectedId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error submitting payment request:", error);
            });
    };





    useEffect(() => {
        checkStatus(props.selectedId);
    }, [])

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


    const Clinic = JSON.parse(localStorage.getItem("officeLogo"));
    const name = Clinic ? Clinic.name : "-";


    return (
        <div className=''>

            <form
                onSubmit={handleProcessClick}
                name="helcimForm"
                id="helcimForm"
                action={helcimResponse}
                style={{ marginTop: 25 }}
            >
                <input type="hidden" id="token"
                    value={props.helcimConfig.token}
                />
                <input type="hidden" id="language" value="en" />
                {/* <input type="hidden" id="test" value="1" /> */}
                <Input
                    id="customerCode"
                    type="hidden"
                    value={props.helcimConfig.customerCode}
                    placeholder="Card Token"
                />

                <div className='mt8'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 25 }} className='modal-resp'>
                        <div style={{ width: "48%" }} className='cvv-resp'>
                            <label htmlFor="cardNumber">Credit Card Number</label>
                            <Input
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="Credit Card Number"
                                style={{ width: "100%", border: '1px solid #6B43B5' }}
                            />
                        </div>
                        <div style={{ width: "13%" }} className='cvv-resp'>
                            <label htmlFor="cardExpiryMonth">Expiry Month</label>
                            <Input
                                id="cardExpiryMonth"
                                value={cardExpiryMonth}
                                onChange={(e) => setCardExpiryMonth(e.target.value)}
                                placeholder="MM"
                                style={{ width: "100%", border: '1px solid #6B43B5' }}
                            />
                        </div>
                        <div style={{ width: "13%" }} className='cvv-resp'>
                            <label htmlFor="cardExpiryYear">Expiry Year</label>
                            <Input
                                id="cardExpiryYear"
                                value={cardExpiryYear}
                                onChange={(e) => setCardExpiryYear(e.target.value)}
                                placeholder="YYYY"
                                style={{ width: "100%", border: '1px solid #6B43B5' }}
                            />
                        </div>
                        <div style={{ width: "13%" }} className='cvv-resp'>
                            <label htmlFor="cardCVV">CVV</label>
                            <Input
                                id="cardCVV"
                                value={cardCVV}
                                onChange={(e) => setCardCVV(e.target.value)}
                                placeholder="CVV"
                                style={{ width: "100%", border: '1px solid #6B43B5' }}
                            />
                        </div>
                    </div>
                </div>

                {/* AVS- INFORMATION */}
                <div className='mt8' style={{ marginBottom: 25 }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className='modal-resp'>
                        <div style={{ width: "48%" }} className='cvv-resp'>
                            <label htmlFor="cardHolderName">Card Holder Name</label>
                            <Input
                                id="cardHolderName"
                                value={cardHolderName}
                                onChange={(e) => setCardHolderName(e.target.value)}
                                placeholder="Card Holder Name"
                                style={{ width: "100%", border: '1px solid #6B43B5' }}
                            />
                        </div>
                        <div style={{ width: "48%" }} className='cvv-resp'>
                            <label htmlFor="cardHolderAddress">Card Holder Address</label>
                            <Input
                                id="cardHolderAddress"
                                value={cardHolderAddress}
                                onChange={(e) => setCardHolderAddress(e.target.value)}
                                placeholder="Card Holder Address"
                                style={{ width: "100%", border: '1px solid #6B43B5' }}
                            />
                        </div>
                    </div>
                </div>

                <div className='mt8'>
                    <label htmlFor="cardHolderPostalCode">Card Holder Postal Code</label>
                    <Input
                        id="cardHolderPostalCode"
                        value={cardHolderPostalCode}
                        onChange={(e) => setCardHolderPostalCode(e.target.value)}
                        placeholder="Card Holder Postal Code"
                        style={{ width: "100%", border: '1px solid #6B43B5' }}
                    />
                </div>

                <Input
                    type="hidden"
                    id="amount"
                    value="0.00"
                    placeholder="Amount"
                />

                <input type="hidden" id="g-recaptcha-response" value={grecaptcha} />
                {/* BUTTON */}
                <div>
                    <Button
                        htmlType="submit"
                        style={{
                            width: "100%",
                            marginTop: "15px",
                            height: 39
                        }}
                        type="primary"
                        loading={loading}
                    >
                        {
                            loading ? "Processing..." : "Pay"
                        }

                    </Button>
                </div>

                <div
                    ref={resultRef}
                    id="helcimResults">
                </div>
            </form>


        </div >
    );
};

export default PaymentForm;
