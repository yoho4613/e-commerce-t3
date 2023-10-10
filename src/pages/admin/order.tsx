import { Order, OrderStatus } from "@prisma/client";
import { JsonArray, JsonObject } from "@prisma/client/runtime/library";
import { FC, useEffect, useState } from "react";
import Spinner from "~/components/global/Spinner";
import { CartItem, OrderType } from "~/config/type";
import { api } from "~/utils/api";



const OrderPage: FC = ({}) => {
  const { data: orders, isLoading } = api.order.getAllOrders.useQuery();
  // const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const [openForm, setOpenForm] = useState<Order | null>(null);
  // console.log(orders);

  useEffect(() => {
    // if(orders) setFilteredOrders(orders)
  }, [orders]);
  return (
    <div className="relative overflow-auto ">
      {/* {openForm && (
        <div className="fixed top-0 max-h-screen w-full overflow-scroll bg-whitePrimary">
          <div className="pr-8 pt-4 text-right">
            <button onClick={() => setOpenForm(null)}>
              <AiFillCloseCircle size={35} color="red" />
            </button>
          </div>
          <ProductForm
            setOpenForm={setOpenForm}
            product={openForm}
            refetch={refetch}
          />
        </div>
      )} */}
      {/* {openPopup && (
        <div>
          <DeletePopup />
        </div>
      )} */}

      <div className="mb-6 flex items-end justify-between px-6">
        <div>
          <h3 className="font-bold">View by Status</h3>
        </div>
        <div className="flex flex-col items-center">
          <label>Status</label>
          <select
            // onChange={(e) =>
            //   setSelectedCategory((prev) => ({
            //     categoryId: e.target.value,
            //     subcategoryId: null,
            //   }))
            // }
            defaultValue=""
            className="h-12 bg-gray-200 p-1"
          >
            <option value="all">All</option>
            {Object.values(OrderStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
        </div>
        <div>
          <button
            // onClick={() => setOpenPopup(true)}
            className="rounded-md border-2 px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
      <table className="mb-6 text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order Id
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Products
            </th>
            <th scope="col" className="px-6 py-3">
              Payment
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              CreatedAt
            </th>
            <th scope="col" className="px-6 py-3">
              Last Update
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>
                <Spinner />
              </td>
            </tr>
          )}
          {orders?.map((order) => (
            <tr
              key={order.id}
              className={`border-b bg-white  decoration-red-600 dark:border-gray-700 dark:bg-gray-800`}
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium dark:text-white"
              >
                <label className=" line-clamp-3" htmlFor={order.id}>
                  <input
                    className="mr-"
                    name={order.id}
                    type="checkbox"
                    id={order.id}
                    value="value"
                    // onChange={(e) =>
                    //   e.target.checked
                    //     ? setSelectedproducts((prev) => [...prev, product])
                    //     : setSelectedproducts((prev) =>
                    //         prev.filter((p) => p.id !== product.id),
                    //       )
                    // }
                  />
                  {order.id.slice(0, 10)}...
                </label>
              </th>
              <td className="px-6 py-4">{order.user.name}</td>
              <td className="px-6 py-4">
                {(order.products as JsonObject[])
                  .map((item) => item.title)
                  .join(",")}
              </td>
              <td className="px-6 py-4">{order.paymentId.slice(0, 10)}...</td>
              <td className="px-6 py-4">
                {Object.values(order.user.address as JsonObject).join(",")}
              </td>
              <td className="px-6 py-4">
                <select
                  className="border-2 p-1.5"
                  name="status"
                  defaultValue={order.status}
                  id="status"
                >
                  {Object.values(OrderStatus).map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4">{order.status}</td>
              <td className="px-6 py-4">{order.createdAt.toLocaleString()}</td>
              <td className="px-6 py-4">{order.updatedAt.toLocaleString()}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setOpenForm(order)}
                  type="button"
                  className="rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        {/* {slicedProducts &&
          products &&
          slicedProducts.length < products.length && (
            <button
              onClick={() => {
                if (products) {
                  setSlicedProducts(
                    (products as ProductType[]).slice(0, productLength + 20),
                  );
                  setProductLength((prev) => prev + 20);
                }
              }}
              type="button"
              className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              More Products...
            </button>
          )} */}
      </div>
    </div>
  );
};

export default OrderPage;
