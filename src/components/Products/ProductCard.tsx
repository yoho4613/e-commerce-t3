import { Product, Sale } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { useStateContext } from "~/context/userDetailContext";
import { api } from "~/utils/api";
import Heart from "../global/Heart";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

interface ProductCardProps {
  product: Product;
  average: number;
  deal?: Sale;
}

const ProductCard: FC<ProductCardProps> = ({ product, average, deal }) => {
  const router = useRouter();
  // eslint-disable-next-line
  const { data: image } = api.image.getRandomImage.useQuery({
    page: 1,
    query: product?.title,
  });
  const { mutate: updateCart } = api.cart.updateCart.useMutation({
    onError: async (err) => {
      toast.error("You must be logged in in order to add or remove cart");
      await router.push("/login");
      return err;
    },
  });
  const { userDetail, updateCartContext } = useStateContext();
  const starArr = [1, 2, 3, 4, 5];
  return (
    <div className="group/item w-32 shrink-0 sm:w-64">
      <div className="relative h-24 overflow-y-hidden rounded-md border-2 sm:h-48">
        <Link href={`/product/${product.id}`}>
          <img
            className="m-auto h-full w-full"
            src={(image as string) || ""}
            alt={product.title}
          />
        </Link>
        {deal && (
          <button className="btn--red absolute left-1 top-1 px-0.5 py-1 text-xs sm:left-2 sm:top-2 sm:px-2 sm:py-1 sm:text-sm">
            {deal.method === "percentDiscount" ? `-${deal.value}%` : ""}
          </button>
        )}
        <div className="absolute right-2 top-2 ">
          <Heart productId={product.id} />
        </div>

        <button
          onClick={() => {
            updateCart({ userId: userDetail.id, productId: product.id });
            updateCartContext(product.id);
          }}
          className={`absolute bottom-0 right-0 z-10 w-full translate-y-full bg-buttonBlack py-1.5 text-xs text-whitePrimary transition group-hover/item:translate-y-0 sm:text-base ${
            userDetail.cart.includes(product.id) && "bg-redPrimary"
          }`}
        >
          {userDetail.cart.includes(product.id)
            ? "Remove From Cart"
            : "Add To Cart"}
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
          {starArr.map((star, i) =>
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
    </div>
  );
};

export default ProductCard;
