import { Product, Sale } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { api } from "~/utils/api";

interface ProductCardProps {
  product: Product;
  average: number;
  deal?: Sale;
}

const ProductCard: FC<ProductCardProps> = ({ product, average, deal }) => {
  const { data: image } = api.image.getRandomImage.useQuery({
    page: 1,
    query: product?.title,
  });

  return (
    <Link href={`/product/${product.id}`} className="group/item w-32 shrink-0 sm:w-64">
      <div className="relative h-24 overflow-y-hidden rounded-md border-2 sm:h-48">
        <img
          className="m-auto h-full w-full"
          src={image || ""}
          alt={product.title}
        />
        {deal && (
          <button className="btn--red absolute left-1 top-1 px-0.5 py-1 text-xs sm:left-2 sm:top-2 sm:px-2 sm:py-1 sm:text-sm">
            {deal.method === "percentDiscount" ? `-${deal.value}%` : ""}
          </button>
        )}
        <button className="absolute right-2 top-2 p-1 ">
          <AiOutlineHeart color="white" size={20} />
        </button>
        <button className="absolute right-2 top-10 p-1 ">
          <AiOutlineEye color="white" size={20} />
        </button>
        <button className="absolute bottom-0 right-0 z-10 w-full translate-y-full bg-buttonBlack py-1.5 text-xs text-whitePrimary transition group-hover/item:translate-y-0 sm:text-base">
          Add To Cart
        </button>
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <h3 className="text-sm font-bold sm:text-base">{product.title}</h3>
        <p>
          <span className="mr-2 text-sm text-redPrimary sm:text-base">
            ${product.price}
          </span>
          <span className="text-sm text-grayPrimary line-through sm:text-base">
            ${product.rrp}
          </span>
        </p>
        <div className="flex">
          {[...Array(5)].map((star, i) =>
            i < average && i + 1 > average ? (
              <BsStarHalf
                key={i}
                size={20}
                className="text-[#ffc107] sm:mr-2"
              />
            ) : i > average ? (
              <BsStar key={i} size={20} className="text-[#ffc107] sm:mr-2" />
            ) : (
              <BsStarFill
                key={i}
                size={20}
                className="text-[#ffc107] sm:mr-2"
              />
            ),
          )}
          <span className="text-grayPrimary">({product.review.length})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
