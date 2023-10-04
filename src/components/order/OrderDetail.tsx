import { useElements, useStripe } from "@stripe/react-stripe-js";
import { FC, useEffect } from "react";
import { api } from "~/utils/api";

interface OrderDetailProps {
  clientSecret: string;
}

const OrderDetail: FC<OrderDetailProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: order } = api.order.findOrder.useQuery({paymentId: clientSecret})

  useEffect(() => {
    if (!stripe) return;
    // console.log(stripe.confirmPayment());

    const customerSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!customerSecret) return;

    stripe
      .retrievePaymentIntent(customerSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            console.log("paymentIntent", paymentIntent);
            // setMessage("Payment succeeded!");
            break;
          case "processing":
            // setMessage("Payment is processing.");
            break;
          case "requires_payment_method":
            // setMessage("Your payment was not successful. please try again.");
            break;

          default:
            // setMessage("Something went wrong");
            break;
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }, [stripe]);

  return <div>{clientSecret}</div>;
};

export default OrderDetail;
