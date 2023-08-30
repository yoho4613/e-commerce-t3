import React, { FC } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import ProductCard from "../Products/ProductCard";

interface TodayDealProps {}

const TodayDeal: FC<TodayDealProps> = ({}) => {
  const products = [
    {
      id: 123,
      title: "IPS LCD Gaming Monitor",
      rrp: 400,
      price: 370,
      rate: 2.5,
      imgUrl:
        "https://www.pbtech.co.nz/imgprod/M/O/MONSAM72534__10.jpg?h=2637858417",
      review: ["2","2","2"]
    },
  ];

  return (
    <div>
      <div className="flex items-center">
        <span className="bg-redPrimary mr-4 inline-block h-12 w-6 rounded-md" />
        <h2 className="text-redPrimary font-bold">Today's</h2>
      </div>
      <div className="mt-4 flex w-full items-center">
        <h2 className="text-3xl tracking-widest">Flash Sales</h2>
        <div className="mx-24 flex grow items-end space-x-6 ">
          <div>
            <span className="text-sm">Days</span>
            <p className="text-2xl font-bold">03</p>
          </div>
          <span className="text-redPrimary pb-1 text-xl font-bold">:</span>
          <div>
            <span className="text-sm">Hours</span>
            <p className="text-2xl font-bold">23</p>
          </div>
          <span className="text-redPrimary pb-1 text-xl font-bold">:</span>
          <div>
            <span className="text-sm">Minutes</span>
            <p className="text-2xl font-bold">19</p>
          </div>
          <span className="text-redPrimary pb-1 text-xl font-bold">:</span>
          <div>
            <span className="text-sm">Seconds</span>
            <p className="text-2xl font-bold">56</p>
          </div>
        </div>
        <div>
          <button className="bg-secondary mr-4 rounded-full p-2">
            <IoMdArrowBack size={25} />
          </button>
          <button className="bg-secondary rounded-full p-2">
            <IoMdArrowForward size={25} />
          </button>
        </div>
      </div>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="my-6 text-center">
        <button className="btn--red w-64 py-4 ">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default TodayDeal;
