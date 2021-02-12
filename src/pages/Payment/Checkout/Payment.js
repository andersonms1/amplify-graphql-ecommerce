import React, { useContext, useEffect, useState } from "react";
import { PaymentCard } from "baseui/payment-card";
import { SIZE, ADJOINED } from "baseui/input";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, KIND, SIZE as BTSIZE, SHAPE } from "baseui/button";

import CheckoutContext from "../../../context/CheckoutContext";
import { H2, H4 } from "baseui/typography";

function Payment() {
  const {
    current,
    setCurrentStep,
    cart,
    getAddress,
    setCart,
    address,
    updateAddress,
    postOrder,
  } = useContext(CheckoutContext);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripePromise = loadStripe(
    "pk_test_51HHhHvHw6iNN0REoJkcsW0E1UvgN12nyu7QW7ydg62kC74QtmNsycKIaGF1kqhSjlbjEnh337UJjzygI16Qrbdny00PIsjy4Td"
  );

  const Form = () => {
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      window
        .fetch("/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }, []);

    const cardStyle = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

    const handleChange = async (event) => {
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (ev) => {
      ev.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    };
    return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </form>
    );
  };

  // return (
  //   <div>
  //     <Elements stripe={stripePromise}>
  //       <Form />
  //     </Elements>
  //   </div>
  // );

  const handlePost = async () => {
    const res = await postOrder(cart);
    Promise.resolve(res);
    if (res?.data) {
      alert("Pagamento efetuado com sucesso!");
    } else {
      console.log(res);
      alert("Erro no post");
    }
  };

  return (
    <div>
      <H4>Em desenvolvimento!</H4>

      <Button
        onClick={() => setCurrentStep(1)}
        kind={KIND.secondary}
        size={SIZE.default}
        shape={SHAPE.default}
      >
        Anterior
      </Button>

      <Button
        onClick={() => handlePost()}
        startEnhancer={undefined}
        endEnhancer={undefined}
        kind={KIND.primary}
        size={SIZE.default}
        shape={SHAPE.default}
      >
        Emular pagamento
      </Button>
    </div>
  );
}

export default Payment;
