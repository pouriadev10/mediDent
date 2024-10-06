import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "../../config";
import CheckoutForm from "./CheckoutForm";
import "./App.css";
import { controller } from '../../controller';



export default function App({ paymentId, handleDonePaymentByAdmin }) {


  const [stripePromise, setStripePromise] = useState(loadStripe("pk_test_51MAqq8CNeee53AsqwaTVMANFg6c63QIvRIwOP6TpZf3AupUR2iGiwDOOrPTLIDq8KW5vFkHFpBu5ZNqkzTdGwjik00DnjnWTLd",
    {
      stripeAccount: "acct_1NXNiWFtOAJzYLFh"
    }
  ));
  const [clientSecret, setClientSecret] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [stripeKey, setStripeKey] = useState("")
  const [pKey, setPKey] = useState("")


  const getStripeKey = async () => {
    const response = await controller.getStripeKey();
    setStripeKey(response.public_key)

    fetch(config.apiGateway.URL + "/billpay/pay/?id=" +
      paymentId
      , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.json())
      .then((data) => {
        setAccount_id(data.account_id)
        setClientSecret(data.client_secret)
      });

  }

  useEffect(() => {
    getStripeKey()
  }, []);
  const appearance = {
    theme: 'stripe',
  };

  const stripePromise1 =
    loadStripe(stripeKey,
      {
        stripeAccount: account_id
      }
    )


  const options = {
    clientSecret,
    appearance
  };

const handlePaymentDone=(e)=>{
  handleDonePaymentByAdmin()
}

  return (
    <div className="App">

      {clientSecret && (
        <Elements options={options} stripe={stripePromise1}>
          <CheckoutForm paymentDone={handlePaymentDone}/>
        </Elements>
      )}
    </div>
  );
}