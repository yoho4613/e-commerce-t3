import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeLinkAuthenticationElementChangeEvent } from "@stripe/stripe-js";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BASE_URL } from "~/constant/config";
import Spinner from "../global/Spinner";
import { CartItem } from "~/config/type";

interface CheckoutFormProps {
  products: CartItem[];
  setClientSecret: Dispatch<SetStateAction<string>>;
}

const CheckoutForm: FC<CheckoutFormProps> = ({ setClientSecret, products }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const customerSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!customerSecret) return;

    stripe
      .retrievePaymentIntent(customerSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful. please try again.");
            break;

          default:
            setMessage("Something went wrong");
            break;
        }
      })
      .then((res) => res)
      .catch((err) => console.log(err));
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${BASE_URL}/success`,
      },
    });

    if (
      payment.error.type === "card_error" ||
      payment.error.type === "validation_error"
    ) {
      setMessage(payment.error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    return isLoading;
  };

  const handleEmailChange = (e: StripeLinkAuthenticationElementChangeEvent) => {
    console.log(e);
    console.log("yoho4613");
    return "yoho4613@gmai.com";
  };

  return (
    <div>
      {isLoading || !stripe || !elements ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            {products.map((product) => (
              <div key={product.id} className="">
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
          {/* eslint-disable-next-line */}
          <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => handleEmailChange(e)}
            />
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <div className="mt-4 flex justify-evenly">
              <button
                className="w-24 rounded-md  bg-buttonGreen py-1.5 hover:bg-green-400 sm:w-48"
                disabled={isLoading || !stripe || !elements}
              >
                Pay Now
              </button>
              <span
                onClick={() => setClientSecret("")}
                className="btn--red w-24  cursor-pointer py-1.5 text-center sm:w-48"
              >
                Cancel
              </span>
            </div>
          </form>
        </div>
      )}
      {message && <p className="text-redPrimary">{message}</p>}
    </div>
  );
};

export default CheckoutForm;
