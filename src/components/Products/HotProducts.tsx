import React, { FC, useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import ProductCard from "../Products/ProductCard";

interface HotProductsProps {}

const HotProducts: FC<HotProductsProps> = ({}) => {
  const [cardLocation, setCardLocation] = useState(0)
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
        <h2 className="text-redPrimary font-bold">Our Products</h2>
      </div>
      <div className="my-6 flex w-full flex-col items-start gap-4 pl-4 sm:flex-row sm:items-center sm:gap-0 sm:pl-0">
        <h2 className="text-xl tracking-widest sm:text-2xl md:text-3xl">Explore Our Products</h2>
       
       
      </div>
      <div className={`flex flex-wrap justify-between gap-6 transition -translate-x-[${cardLocation}%]`}>
        {products.map((product, i) => ( 
          <ProductCard key={i} product={product} />
        ))}
      </div>
      <div className="my-12 text-center">
        <button className="btn--red py-2 w-36 text-xs sm:text-base sm:w-64 sm:py-4 ">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default HotProducts;
