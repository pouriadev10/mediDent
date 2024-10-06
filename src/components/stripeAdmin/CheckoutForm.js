import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {  Button} from 'antd'
import "./App.css";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com",
      },
      redirect: 'if_required'
    });
    
    


    if (error && error.type && (error.type === "card_error" || error.type === "validation_error")) {
     console.log("rrr")
      setMessage(error.message);
    } else {
      console.log("zz")
      props.paymentDone(true)
      //setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form className="db" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button className="login-btn w100p" type="primary" size="large"
        onClick={handleSubmit} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? "Waiting ..." : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}