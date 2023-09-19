import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { CartItem } from "~/config/type";

import { useStateContext } from "~/context/userDetailContext";
import { getTotalPrice } from "~/lib/helper";
import { api } from "~/utils/api";

// interface CartProps {}

const Cart: FC = ({}) => {
  const { userDetail } = useStateContext();
  const { data: products } = api.product.findProducts.useQuery(userDetail.cart);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    if (products) {
      setCartItems(products.map((product) => ({ ...product, quantity: 1 })));
    }
  }, [products]);
  console.log(products);
  return (
    <div className="m-auto max-w-[1280px] py-12">
      <table className="relative w-full space-y-2 sm:mx-auto  ">
        <thead>
          <tr className="mx-6 border-2">
            <th className="px-4 text-start">Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {cartItems.map((product) => (
            <tr
              key={product.id}
              className="mx-6 h-24 overflow-hidden border-2 text-center"
            >
              <th className="px-4 text-start">
                <Image
                  className="mr-4 inline h-full"
                  src={product.imgUrl[0]!}
                  alt={product.title}
                  width={100}
                  height={100}
                />
                <span>{product.title}</span>
              </th>
              <td>${product.price}</td>
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
              <td>${Number(product.price) * product.quantity}</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-8 flex justify-between">
        <button className="rounded-sm border-2 px-4 py-2">
          Return To Shop
        </button>
        <button className="rounded-sm border-2 px-4 py-2">Update Cart</button>
      </div>
      <div className="mt-12 flex w-full justify-between">
        <div>
          <input
            type="text"
            className="mr-2 w-64 rounded-sm border-2 p-1"
            placeholder="Coupon Code"
          />
          <button className="btn--red px-7 py-2">Apply Coupon</button>
        </div>
        <div className="flex w-96 flex-col rounded-sm border-2 border-buttonBlack p-4">
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
          <Link href="" className="btn--red px-4 py-2 text-center">
            Process to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
