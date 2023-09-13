import React, { FC, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { getAverage, shuffle } from "~/lib/helper";
import { Sale } from "~/config/type";

interface MonthDealProps {
  deal: Sale | null;
}

const MonthDeal: FC<MonthDealProps> = ({deal}) => {
 

  return (
    <div>
      <div className="flex items-center">
        <span className="bg-redPrimary mr-4 inline-block h-12 w-6 rounded-md" />
        <h2 className="text-redPrimary font-bold">This Month</h2>
      </div>
      <div className="my-6 flex w-full items-start gap-4 pl-4 sm:flex-row justify-between sm:items-center sm:gap-0 sm:pl-0">
        <h2 className="text-xl tracking-widest sm:text-2xl md:text-3xl">Best Selling Products</h2>
        <div>
          <button className="btn--red w-24 sm:w-36 py-2 sm:py-4 ">View All</button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between ">
        {deal && shuffle(deal?.Products?.slice(0, 12)).map((product, i) => (
          <ProductCard key={i} product={product} average={getAverage(product.star)} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default MonthDeal;
