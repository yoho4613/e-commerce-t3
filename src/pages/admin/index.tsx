import { FC } from "react";

// interface indexProps {

// }

const index: FC = ({}) => {
  return (
    <div>
      <div className="flex h-screen flex-col p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mb-5 mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">This Week</h2>
              <div className="mt-2 text-sm text-gray-600">
                {/* <Bookings
                bookings={bookings || []}
                thisWeekBooking={thisWeekBooking}
              /> */}
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Revenue</h2>
              <div className="mt-2 text-sm text-gray-600">
                <p>Your total revenue</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Orders</h2>
              <div className="mt-2 text-sm text-gray-600">
                <p>You have 5678 orders this month.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* <Statistics bookings={bookings || []} filteredBooking={filteredBooking || []} /> */}
        </div>

        <div>
          <div className="flex md:ml-6">
            <button
              // onClick={() => setChartName("weekly")}
              className="md:text-md mr-2 rounded border border-blue-700 bg-blue-500 px-2 py-1 text-sm font-bold text-white hover:bg-blue-700 md:px-4 md:py-2"
            >
              Weekly
            </button>
            <button
              // onClick={() => setChartName("monthly")}
              className=" md:text-md mr-2 rounded border border-blue-700 bg-blue-500 px-2 py-1 text-sm font-bold text-white hover:bg-blue-700 md:px-4 md:py-2"
            >
              Monthly
            </button>
            <button
              // onClick={() => setChartName("yearly")}
              className=" md:text-md mr-2 rounded border border-blue-700 bg-blue-500 px-2 py-1 text-sm font-bold text-white hover:bg-blue-700 md:px-4 md:py-2"
            >
              Yearly
            </button>
            <button
              // onClick={() => setChartName("total")}
              className=" md:text-md mr-2 rounded border border-blue-700 bg-blue-500 px-2 py-1 text-sm font-bold text-white hover:bg-blue-700 md:px-4 md:py-2"
            >
              Total
            </button>
          </div>
          {/* <h2 className="mt-4 text-center text-2xl font-bold">{chartName.toUpperCase()}</h2> */}
          {/* <DayOfWeekRatio bookings={filteredBooking || []} /> */}
        </div>
      </div>
    </div>
  );
};

export default index;
