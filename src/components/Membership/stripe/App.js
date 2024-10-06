import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "../../config";
import CheckoutForm from "./CheckoutForm";
import "./App.css";
import { controller } from '../../controller';



export default function App() {
  const [stripePromise, setStripePromise] = useState(loadStripe(""));
  const [clientSecret, setClientSecret] = useState("");
  const [stripeKey, setStripeKey] = useState("")

  const getStripeKey = async () => {
    const response = await controller.getStripeKey();
    setStripeKey(response.public_key)
    setStripePromise(loadStripe(response.public_key))
  }

  useEffect(() => {
    getStripeKey()
    if (window.location.href.split("/") &&
      window.location.href.split("/")[window.location.href.split("/").length - 1]
    ) {
      fetch(config.apiGateway.URL + "/clinics/pay/?id=" +
        window.location.href.split("/")[window.location.href.split("/").length - 1]
        , {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }

  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}