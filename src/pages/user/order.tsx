import Image from "next/image";
import { FC } from "react";
import Spinner from "~/components/global/Spinner";
import { useStateContext } from "~/context/userDetailContext";
import { api } from "~/utils/api";



const Order: FC = ({}) => {
  const { userDetail } = useStateContext();
  const { data: orders, isError } = api.order.getUserOrder.useQuery({
    userId: userDetail.id,
  });

  if (isError) {
    return (
      <div>
        <h2>You have No Order processing</h2>
      </div>
    );
  }

  return (
    <div className="my-4 max-w-[1280px] sm:my-12">
      <h1 className="text-center text-xl font-bold sm:text-2xl">My Order</h1>
      <div className="space-y-2 px-4">
        {orders ? (
          orders.map((order) => (
            <div key={order.id} className="border-2 p-2">
              <div className="flex flex-wrap justify-between">
                <div>
                  <h3 className="font-bold">Order ID</h3>
                  <p>{order.id}</p>
                </div>
                <div>
                  <h3 className="font-bold">Order Created At</h3>
                  <p>{order.createdAt.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-bold">Estimated Delivery Date</h3>
                  <p>
                    {new Date(
                      order.createdAt.getTime() + 1000 * 60 * 60 * 24 * 3,
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Order Status</h3>
                  <p>{order.status}</p>
                </div>
              </div>
              <div className="flex gap-6">
                {order.products.map((product) => (
                  <div key={product.id} className="">
                    <Image
                      src={product.url[0]!}
                      alt={product.title}
                      width={100}
                      height={100}
                    />
                    <p>Quantity: {product.quantity}</p>
                    <p>${Number(product.price) * product.quantity}</p>
                    <button  className="px-0.5 py-2 border-2 rounded-sm hover:bg-gray-400">Review Product</button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Order;
