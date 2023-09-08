import React, { FC, useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import ProductCard from "../Products/ProductCard";
import { Sale } from "~/config/type";
import { getAverage } from "~/lib/helper";

interface TodayDealProps {
  deal: Sale | null;
}

const TodayDeal: FC<TodayDealProps> = ({ deal }) => {
  const [cardLocation, setCardLocation] = useState(0);

  return (
    <div>
      <div className="flex items-center">
        <span className="mr-4 inline-block h-12 w-6 rounded-md bg-redPrimary" />
        <h2 className="font-bold text-redPrimary">Today's</h2>
      </div>
      <div className="my-6 flex w-full flex-col items-start gap-4 pl-4 sm:flex-row sm:items-center sm:gap-0 sm:pl-0">
        <h2 className="text-xl tracking-widest sm:text-2xl md:text-3xl">
          Flash Sales
        </h2>
        <div className="flex grow items-end space-x-6 sm:mx-24 ">
          <div>
            <span className="text-xs sm:text-sm">Days</span>
            <p className="text-xl font-bold sm:text-2xl">03</p>
          </div>
          <span className="pb-1 text-xl font-bold text-redPrimary">:</span>
          <div>
            <span className="text-xs sm:text-sm">Hours</span>
            <p className="text-xl font-bold sm:text-2xl">23</p>
          </div>
          <span className="pb-1 text-xl font-bold text-redPrimary">:</span>
          <div>
            <span className="text-xs sm:text-sm">Minutes</span>
            <p className="text-xl font-bold sm:text-2xl">19</p>
          </div>
          <span className="pb-1 text-xl font-bold text-redPrimary">:</span>
          <div>
            <span className="text-xs sm:text-sm">Seconds</span>
            <p className="text-xl font-bold sm:text-2xl">56</p>
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              setCardLocation((prev) => (prev === 0 ? prev : prev - 20))
            }
            className="mr-4 rounded-full bg-secondary p-2"
          >
            <IoMdArrowBack size={25} />
          </button>
          <button
            onClick={() => setCardLocation((prev) => prev + 20)}
            className="rounded-full bg-secondary p-2"
          >
            <IoMdArrowForward size={25} />
          </button>
        </div>
      </div>
      <div
        className="flex gap-6 transition"
        style={{ transform: `translateX(-${cardLocation}%)` }}
      >
        {deal?.products?.map((product, i) => (
          <ProductCard key={i} product={product} average={getAverage(product.star)} deal={deal} />
        ))}
      </div>
      <div className="my-12 text-center">
        <button className="btn--red w-48 py-2 text-sm sm:w-64 sm:py-4 sm:text-base ">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default TodayDeal;
