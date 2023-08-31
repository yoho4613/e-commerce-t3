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
        <h2 className="text-redPrimary font-bold">Today's</h2>
      </div>
      <div className="my-6 flex w-full items-center justify-between">
        <h2 className="text-3xl tracking-widest">Flash Sales</h2>

        <div>
          <button className="btn--red w-36 py-4 ">View All</button>
        </div>
      </div>
      <div className="flex justify-between ">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>

    </div>
  );
};

export default MonthDeal;
