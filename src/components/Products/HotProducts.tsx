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
      <div className="my-6 flex w-full justify-between items-center">
        <h2 className="text-3xl tracking-widest">Flash Sales</h2>
       
        <div>
          <button onClick={() => setCardLocation(prev => prev === 0 ? prev : prev - 20)} className="bg-secondary mr-4 rounded-full p-2">
            <IoMdArrowBack size={25} />
          </button>
          <button onClick={() => setCardLocation(prev => prev === 100 ? 0 : prev + 20)} className="bg-secondary rounded-full p-2">
            <IoMdArrowForward size={25} />
          </button>
        </div>
      </div>
      <div className={`flex flex-wrap justify-between gap-6 transition -translate-x-[${cardLocation}%]`}>
        {products.map((product, i) => ( 
          <ProductCard key={i} product={product} />
        ))}
      </div>
      <div className="my-12 text-center">
        <button className="btn--red w-64 py-4 ">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default HotProducts;
