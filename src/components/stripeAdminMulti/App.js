import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "../../config";
import CheckoutForm from "./CheckoutForm";
import CheckoutFormPayID from "./CheckoutFormPayID";
import "./App.css";
import { controller } from '../../controller';
import { Paymentcontroller } from "../../Paymentcontroller";

export default function App({ payId, handleDonePaymentByAdmin }) {

  const [status, setStatus] = useState("loading")
  const [data, setData] = useState({})

  const checkStatus = async () => {


    fetch(config.apiGateway.URL + "/billpay/create-installment/"
      , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "interval_count": localStorage.getItem("wizard_recurring_interval_count"),
          "payment_request": payId,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        if (data.client_secret) {

          setStatus("with")
        } else {

          setStatus("without")
        }
      });

  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <>
      {
        status == "loading" ?
          <p>loading...</p>
          :
          status == "with" ?
            <AppWithClient data={data} handleDonePaymentByAdmin={handleDonePaymentByAdmin} />
            :
            <AppWithOutClient data={data} handleDonePaymentByAdmin={handleDonePaymentByAdmin} />
      }
    </>
  )
}

function AppWithClient(props) {

  const [clientSecret, setClientSecret] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [stripeKey, setStripeKey] = useState("")



  const getStripeKey = async () => {
    const response = await controller.getStripeKey();
    setStripeKey(response.public_key)


    setAccount_id(props.data.account_id)
    setClientSecret(props.data.client_secret)


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

  const handlePaymentDone = (e) => {
    props.handleDonePaymentByAdmin()
  }

  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="App">

      {clientSecret && (
        <Elements options={options} stripe={stripePromise1}>
          <CheckoutForm paymentDone={handlePaymentDone} />
        </Elements>
      )}
    </div>
  );
}

function AppWithOutClient(props) {
  const [stripePromise, setStripePromise] = useState(loadStripe("",
    {
      stripeAccount: ""
    }
  ));
  const [clientSecret, setClientSecret] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [stripeKey, setStripeKey] = useState("")

  const getStripeKey = async () => {
    const response = await controller.getStripeKey();
    setStripeKey(response.public_key)
    if (window.location.href.split("/") &&
      window.location.href.split("/")[window.location.href.split("/").length - 1]
    ) {
      setAccount_id(props.data.account_id)
      setClientSecret(props.data.client_secret)
      setStripePromise(
        loadStripe(response.public_key,
          {
            stripeAccount: props.data.account_id
          }
        )
      )
    }
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
  const handlePaymentDone = (e) => {
    props.handleDonePaymentByAdmin()
  }
  return (
    <div className="App">

      {clientSecret ? (
        <Elements options={options} stripe={stripePromise1}>
          <CheckoutForm paymentDone={handlePaymentDone} />
        </Elements>
      )
        :
        account_id ?
          (
            <Elements stripe={stripePromise1}>
              <CheckoutFormPayID paymentDone={handlePaymentDone} />
            </Elements>
          )

          :
          <>Loading...</>
      }
    </div>
  );
}