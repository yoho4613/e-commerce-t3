import Image from "next/image";
import React, { FC } from "react";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

import { BsStarHalf, BsStarFill, BsStar } from 'react-icons/bs'

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    rrp: number;
    price: number;
    rate: number;
    imgUrl: string;
    review: string[]
  };
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-32 sm:w-64 group/item shrink-0">
      <div className="relative border-2 overflow-y-hidden rounded-md h-24 sm:h-48">
        <img
          className="m-auto w-3/5"
          src={product.imgUrl}
          alt={product.title}
        />
        <button className="btn--red absolute left-1 sm:left-2 top-1 sm:top-2 py-1 sm:px-2 px-0.5 sm:py-1 text-xs sm:text-sm">
          -40%
        </button>
        <button className="absolute right-2 top-2 p-1 ">
          <AiOutlineHeart size={20} />
        </button>
        <button className="absolute right-2 top-10 p-1 ">
          <AiOutlineEye size={20} />
        </button>
        <button className="absolute z-10 py-1.5 bg-buttonBlack text-whitePrimary text-xs sm:text-base w-full right-0 bottom-0 group-hover/item:translate-y-0 translate-y-full transition">Add To Cart</button>
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <h3 className="font-bold text-sm sm:text-base">{product.title}</h3>
        <p>
          <span className="text-redPrimary text-sm sm:text-base mr-2">${product.price}</span>{" "}
          <span className="text-grayPrimary text-sm sm:text-base line-through">${product.rrp}</span>
        </p>
        <div className="flex">
          {[...Array(5)].map((star, i) => 
            i < product.rate && i + 1 > product.rate ? (
              <BsStarHalf key={i} size={20} className="text-[#ffc107] sm:mr-2" />
            ) : i > product.rate ? (
              <BsStar key={i} size={20} className="text-[#ffc107] sm:mr-2" />
            ) : (
              <BsStarFill key={i} size={20} className="text-[#ffc107] sm:mr-2" />
            )
          )}
          <span className="text-grayPrimary">({product.review.length})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
