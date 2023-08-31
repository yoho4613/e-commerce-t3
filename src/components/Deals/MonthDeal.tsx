import React, { FC, useState } from "react";
import ProductCard from "../Products/ProductCard";

interface MonthDealProps {}

const MonthDeal: FC<MonthDealProps> = ({}) => {
  const products = [
    {
      id: 123,
      title: "IPS LCD Gaming Monitor",
      rrp: 400,
      price: 370,
      rate: 2.5,
      imgUrl:
        "https://www.pbtech.co.nz/imgprod/M/O/MONSAM72534__10.jpg?h=2637858417",
      review: ["2", "2", "2"],
    },
    {
      id: 123,
      title: "IPS LCD Gaming Monitor",
      rrp: 400,
      price: 370,
      rate: 2.5,
      imgUrl:
        "https://www.pbtech.co.nz/imgprod/M/O/MONSAM72534__10.jpg?h=2637858417",
      review: ["2", "2", "2"],
    },
    {
      id: 123,
      title: "IPS LCD Gaming Monitor",
      rrp: 400,
      price: 370,
      rate: 2.5,
      imgUrl:
        "https://www.pbtech.co.nz/imgprod/M/O/MONSAM72534__10.jpg?h=2637858417",
      review: ["2", "2", "2"],
    },
    {
      id: 123,
      title: "IPS LCD Gaming Monitor",
      rrp: 400,
      price: 370,
      rate: 2.5,
      imgUrl:
        "https://www.pbtech.co.nz/imgprod/M/O/MONSAM72534__10.jpg?h=2637858417",
      review: ["2", "2", "2"],
    },
   
  ];

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
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>

    </div>
  );
};

export default MonthDeal;
