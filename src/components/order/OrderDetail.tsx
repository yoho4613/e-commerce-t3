import { useElements, useStripe } from "@stripe/react-stripe-js";
import { FC, useEffect } from "react";
import { CartItem, OrderType } from "~/config/type";
import { api } from "~/utils/api";

interface OrderDetailProps {
  clientSecret: string;
}

const OrderDetail: FC<OrderDetailProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: order } = api.order.findOrder.useQuery({
    paymentId: clientSecret,
  }) 
  const { mutateAsync: updateStatus } = api.order.updateStatus.useMutation();
  console.log(order);
  useEffect(() => {
    if (!stripe) return;
    // console.log(stripe.confirmPayment());

    const customerSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!customerSecret) return;

    stripe
      .retrievePaymentIntent(customerSecret)
      .then(async ({ paymentIntent }) => {
        if (
          paymentIntent?.status === "succeeded" &&
          order?.status === "received"
        ) {
          await updateStatus({ id: order.id, status: "processing" });
        }
      })
      .catch((err) => console.log(err));
  }, [stripe]);

  return (
    <div className="flex max-w-[1280px] justify-center">
      <div className="my-8">
        <h1 className="font-bold text-2xl">Your Order Successfully Received</h1>
        <div>
          <h2>Order Details:</h2>
          <div className="flex justify-between">
            {/* {order && (
              (order.products as CartItem[]).map((item) => (
                <div></div>
              ))
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
