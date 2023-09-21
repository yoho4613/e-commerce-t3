import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Spinner from "~/components/global/Spinner";
import { CartItem } from "~/config/type";
import { BASE_URL } from "~/constant/config";

import { useStateContext } from "~/context/userDetailContext";
import { getTotalPrice } from "~/lib/helper";
import { api } from "~/utils/api";

// interface CartProps {}

const Cart: FC = ({}) => {
  const router = useRouter();
  const { userDetail, addNewAddressContext } = useStateContext();
  const {
    data: products,
    isLoading,
    isError,
  } = api.product.findProducts.useQuery(userDetail.cart);

  const { mutate: checkout } = api.checkout.checkoutSession.useMutation({
    onSuccess: (res) => router.push(res.url),
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addressForm, setAddressForm] = useState({
    name: "",
    address: "",
    city: "",
    code: "",
    country: "New Zealand",
    contact: "",
  });
  const [formOpened, setFormOpened] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  useEffect(() => {
    if (products) {
      setCartItems(
        products.map((product) => ({ ...product, quantity: 1, checked: true })),
      );
    }
  }, [products]);

  const submitAddress = () => {
    if (
      !addressForm.name ||
      !addressForm.address ||
      !addressForm.city ||
      !addressForm.code ||
      !addressForm.contact ||
      !addressForm.country
    ) {
      return setWarning("Missing Information. Please fill all the fields");
    }
    addNewAddressContext(addressForm);
    setFormOpened(false);
  };

  /* eslint-disable */
  const submitCheckout = () => {
    if (!userDetail.address.length) {
      return toast.error("Please Check Your Delivery Address");
    } else {
      checkout({
        email: userDetail.email,
        address: userDetail.address[0]!,
        products: cartItems,
        url: BASE_URL,
      });
    }
  };

  return (
    <div className="m-auto max-w-[1280px] py-12">
      <table className="relative w-full space-y-2 sm:mx-auto  ">
        <thead>
          <tr className="mx-6 border-2 text-sm sm:text-base">
            <th className="px-4 text-start">Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td className="flex w-screen justify-center">
                <Spinner />
              </td>
            </tr>
          )}
          {cartItems.map((product) => (
            <tr
              key={product.id}
              className="mx-6 h-24 overflow-hidden border-2 text-center"
            >
              <th className="px-4 text-start">
                <Link href={`/product/${product.id}`}>
                  <Image
                    className="mr-4 h-full sm:inline"
                    src={product.imgUrl[0]!}
                    alt={product.title}
                    width={100}
                    height={100}
                  />
                  <span className="line-clamp-3 text-sm sm:text-base">
                    {product.title}
                  </span>
                </Link>
              </th>
              <td className="text-sm sm:text-base">${product.price}</td>
              <td>
                <input
                  className="w-12 rounded-md border-2 p-1"
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    setCartItems((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, quantity: Number(e.target.value) }
                          : p,
                      ),
                    )
                  }
                />
              </td>
              <td className="text-sm sm:text-base">
                ${Number(product.price) * product.quantity}
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={product.checked}
                  onChange={(e) =>
                    setCartItems((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, checked: e.target.checked }
                          : p,
                      ),
                    )
                  }
                />
              </td>
            </tr>
          ))}
          {isError && (
            <tr>
              <td className="flex w-screen justify-center">
                No Data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="my-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <button className="rounded-sm border-2 px-4 py-2">
          Return To Shop
        </button>
        <div className="order-3 sm:-order-none">
          <input
            type="text"
            className="mr-2 w-60 rounded-sm border-2 p-1"
            placeholder="Coupon Code"
          />
          <button className="btn--red px-7 py-2">Apply Coupon</button>
        </div>
        <button className="rounded-sm border-2 px-4 py-2">Update Cart</button>
      </div>
      <div className="mt-12 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        {userDetail.address.length && !formOpened ? (
          <div className="flex w-4/5 flex-col rounded-sm border-2 border-buttonBlack p-4 md:w-96">
            <h3 className="pb-4 font-bold">Delivery Detail</h3>
            <div className="flex justify-between border-b-2 pb-4">
              <p className="">Name:</p>
              <span>{userDetail.address[0]?.name}</span>
            </div>
            <div className="flex justify-between border-b-2 pb-4">
              <p className="">Adress:</p>
              <span>
                {userDetail.address[0]?.address},{userDetail.address[0]?.city},
                {userDetail.address[0]?.code}, {userDetail.address[0]?.city},{" "}
                {userDetail.address[0]?.country}
              </span>
            </div>
            <div className="flex justify-between border-b-2 pb-4">
              <p className="pb-4">Contact:</p>
              <span>{userDetail.address[0]?.contact}</span>
            </div>
            <button
              onClick={() => setFormOpened(true)}
              className="bg-buttonBlack px-4 py-2 text-whitePrimary"
            >
              Update Delivery Detail
            </button>
          </div>
        ) : (
          <div className="flex w-4/5 flex-col rounded-sm border-2 border-buttonBlack p-4 md:w-96">
            {formOpened ? (
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Jiho Park"
                    value={addressForm.name}
                    onChange={(e) =>
                      setAddressForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="large-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    placeholder="000/1000 Great South Road, Avondale"
                    value={addressForm.address}
                    onChange={(e) =>
                      setAddressForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="small-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    placeholder="Auckland"
                    value={addressForm.city}
                    onChange={(e) =>
                      setAddressForm((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="small-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Post Code
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    placeholder="1010"
                    value={addressForm.code}
                    onChange={(e) =>
                      setAddressForm((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="small-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    placeholder="New Zealand"
                    value={addressForm.country}
                    onChange={(e) =>
                      setAddressForm((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="small-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    placeholder="021-000-0000"
                    value={addressForm.contact}
                    onChange={(e) =>
                      setAddressForm((prev) => ({
                        ...prev,
                        contact: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                  />
                </div>
                {warning && <p className="text-redPrimary">{warning}</p>}
                <div className="flex justify-between">
                  <button
                    onClick={submitAddress}
                    className="rounded-md bg-green-500 px-2.5 py-1 text-sm text-whitePrimary"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => setFormOpened(false)}
                    className="rounded-md bg-redPrimary px-2.5 py-1 text-sm text-whitePrimary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setFormOpened(true)}
                className="bg-buttonBlack px-4 py-2 text-whitePrimary"
              >
                Register New Address
              </button>
            )}
          </div>
        )}

        <div className="flex w-4/5 flex-col rounded-sm border-2 border-buttonBlack p-4 md:w-96">
          <h3 className="pb-4 font-bold">Cart Total</h3>
          <div className="flex justify-between border-b-2 pb-4">
            <p className="">Subtotal:</p>
            <span>${getTotalPrice(cartItems).subtotal}</span>
          </div>
          <div className="flex justify-between border-b-2 pb-4">
            <p className="">Shipping:</p>
            <span>${getTotalPrice(cartItems).totalDelivery}</span>
          </div>
          <div className="flex justify-between border-b-2 pb-4">
            <p className="pb-4">Total:</p>
            <span>${getTotalPrice(cartItems).totalPrice}</span>
          </div>
          <button onClick={submitCheckout} className="btn--red px-4 py-2">
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
