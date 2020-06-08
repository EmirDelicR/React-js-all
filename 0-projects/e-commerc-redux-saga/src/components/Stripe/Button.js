import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  /** Price must be in cents */
  const priceForStripe = price * 100;
  const publicKey = process.env.REACT_APP_STRIPE_KEY;

  const onToken = token => {
    console.log("Stripe Token: ", token);
    /** Process payment here  */
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN SHOP GmbH"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publicKey}
    />
  );
};

export default StripeButton;
