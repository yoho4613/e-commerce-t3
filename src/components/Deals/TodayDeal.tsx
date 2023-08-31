import React, { FC, useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import ProductCard from "../Products/ProductCard";

interface TodayDealProps {}

const TodayDeal: FC<TodayDealProps> = ({}) => {
  const [cardLocation, setCardLocation] = useState(0);
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
      <div className="my-6 flex flex-col gap-4 sm:gap-0 sm:flex-row pl-4 sm:pl-0 items-start w-full sm:items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl tracking-widest">Flash Sales</h2>
        <div className="sm:mx-24 flex grow items-end space-x-6 ">
          <div>
            <span className="text-xs sm:text-sm">Days</span>
            <p className="text-xl sm:text-2xl font-bold">03</p>
          </div>
          <span className="text-redPrimary pb-1 text-xl font-bold">:</span>
          <div>
            <span className="text-xs sm:text-sm">Hours</span>
            <p className="text-xl sm:text-2xl font-bold">23</p>
          </div>
          <span className="text-redPrimary pb-1 text-xl font-bold">:</span>
          <div>
            <span className="text-xs sm:text-sm">Minutes</span>
            <p className="text-xl sm:text-2xl font-bold">19</p>
          </div>
          <span className="text-redPrimary pb-1 text-xl font-bold">:</span>
          <div>
            <span className="text-xs sm:text-sm">Seconds</span>
            <p className="text-xl sm:text-2xl font-bold">56</p>
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              setCardLocation((prev) => (prev === 0 ? prev : prev - 20))
            }
            className="bg-secondary mr-4 rounded-full p-2"
          >
            <IoMdArrowBack size={25} />
          </button>
          <button
            onClick={() =>
              setCardLocation((prev) => ( prev + 20))
            }
            className="bg-secondary rounded-full p-2"
          >
            <IoMdArrowForward size={25} />
          </button>
        </div>
      </div>
      <div className="flex gap-6 transition" style={{transform: `translateX(-${cardLocation}%)`}}>
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
      <div className="my-12 text-center">
        <button className="btn--red w-48 sm:w-64 sm:py-4 py-2 text-sm sm:text-base ">View All Products</button>
      </div>
    </div>
  );
};

export default TodayDeal;
