import React, { FC, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { getAverage, shuffle } from "~/lib/helper";
import { Sale } from "~/config/type";
import { Product } from "@prisma/client";

interface MonthDealProps {
  deal: Sale | null;
}

const MonthDeal: FC<MonthDealProps> = ({ deal }) => {
  const suffledProducts = (deal &&
    shuffle(deal.Products.slice(0, 12))) as Product[];
  return (
    <div>
      <div className="flex items-center">
        <span className="mr-4 inline-block h-12 w-6 rounded-md bg-redPrimary" />
        <h2 className="font-bold text-redPrimary">This Month</h2>
      </div>
      <div className="my-6 flex w-full items-start justify-between gap-4 pl-4 sm:flex-row sm:items-center sm:gap-0 sm:pl-0">
        <h2 className="text-xl tracking-widest sm:text-2xl md:text-3xl">
          Best Selling Products
        </h2>
        <div>
          <button className="btn--red w-24 py-2 sm:w-36 sm:py-4 ">
            View All
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between ">
        {suffledProducts &&
          deal &&
          suffledProducts.map((product, i) => (
            <ProductCard
              key={i}
              product={product}
              average={getAverage(product.star)}
              deal={deal}
            />
          ))}
      </div>
    </div>
  );
};

export default MonthDeal;
