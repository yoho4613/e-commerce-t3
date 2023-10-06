import { User } from "@prisma/client";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { FC, useEffect } from "react";
import { CartItem, OrderType } from "~/config/type";
import { useStateContext } from "~/context/userDetailContext";
import { api } from "~/utils/api";

interface OrderDetailProps {
  clientSecret: string;
}

const OrderDetail: FC<OrderDetailProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: order } = api.order.findOrder.useQuery({
    paymentId: clientSecret,
  });
  const { mutateAsync: updateStatus } = api.order.updateStatus.useMutation();
  const { mutateAsync: updateUserCart } = api.cart.updateUserCart.useMutation();
  const { userDetail, setUserDetail } = useStateContext();

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
          const updatedUser = (await updateStatus({
            id: order.id,
            status: "processing",
          })) as User;

          if (updatedUser.cart) {
            setUserDetail((prev) => ({ ...prev, cart: updatedUser.cart }));
          }

          // const newUserWithCart = await updateUserCart({
          //   id: userDetail.id,
          //   productId: products.map((p) => p.id),
          // });
          // if (newUserWithCart) {
          //   setUserDetail((prev) => ({ ...prev, cart: newUserWithCart.cart }));
          // }
        }
      })
      .catch((err) => console.log(err));
  }, [stripe, order]);

  return (
    <div className="flex max-w-[1280px] justify-center">
      <div className="my-8">
        <h1 className="text-2xl font-bold">Your Order Successfully Received</h1>
        <div>
          <h2>Order Details:</h2>
          <div className="flex justify-between">
            {order &&
              (order.products as CartItem[]).map((item) => (
                <div key={item.id}>
                  <h2>{item.title}</h2>
                  <p>{item.quantity}</p>
                  <p>${Number(item.price) * item.quantity}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
