import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
 import { Button} from "antd";

import { Paymentcontroller } from "../../Paymentcontroller";
import "./App.css";

function CheckoutFormPayID(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),

    });

    if (error) {
      console.error(error.message);
    } else {
      const response = await Paymentcontroller.sendPaymentIntentId(
        {
          "payment_method_token": paymentMethod.id,
          "payment_request_id": eval(localStorage.getItem("payAdminId"))
        }
      )

      if (response.status < 250) {
        props.paymentDone(true)
      }
    }
    setIsLoading(false)
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button className="login-btn mt15 w100p" type="primary" size="large"
        onClick={handleSubmit} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? "Waiting ..." : "Authorize Payment"}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutFormPayID;