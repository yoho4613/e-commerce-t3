import { FC } from "react";
import { api } from "~/utils/api";

interface categoryProps {}

const category: FC<categoryProps> = ({}) => {
  const {data: categories, refetch} = api.category.getAllCategories.useQuery();
  return (
    <div>
      <div className="p-6">
        <div className="mx-auto flex max-w-xl flex-col gap-2">
          <input
            name="name"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="text"
            placeholder="name"
            // onChange={(e) =>
            //   setInput((prev) => ({ ...prev, name: e.target.value }))
            // }
            // value={input.name}
          />

          <button
            className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
            // disabled={!input.file || !input.name}
            // onClick={() => {
            //   addMenuItem()
            //     .then((res) => res)
            //     .catch((err: Error) => console.log(err));
            // }}
          >
            Add Category
          </button>
        </div>
      </div>
      <table className="w-full mb-6 text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Booking Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                SubCategories
              </th>
              <th scope="col" className="px-6 py-3">
                Cancel
              </th>
            </tr>
          </thead>
          <tbody>
          {categories && categories.length ? categories.map((category) => (
                <tr
                  key={category.id}
                  className={`border-b bg-white  decoration-red-600 dark:border-gray-700 dark:bg-gray-800`}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium dark:text-white"
                  >
                    {category.id}
                  </th>
                  <td className="px-6 py-4 font-bold">{category.name}</td>
                  <td className="px-6 py-4">
                    {/* {category.subcategories.find((table) => table.id === category.tableId)?.name} */}
                  </td>
                  
                
                  <td className="px-6 py-4">
                  
                      <button
                        // onClick={() => cancelBooking(booking.id)}
                        type="button"
                        className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Update
                      </button>
                    
                  </td>
                </tr>
              )) : <tr><td className="px-6 py-4 font-bold text-lg">No Booking...</td></tr>}
          </tbody>
        </table>
    </div>
  );
};

export default category;
