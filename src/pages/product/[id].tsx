import { Product } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import {
  BsArrowRepeat,
  BsPlusLg,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import Spinner from "~/components/Global/Spinner";
import RelatedItems from "~/components/Products/RelatedItems";
import { getAverage } from "~/lib/helper";
import { api } from "~/utils/api";

interface IProductDetailProps {
  id: string;
}

const ProductDetail: FC<IProductDetailProps> = ({ id }) => {
  // const router = useRouter();
  // const {id} = router.query

  const { data: product } = api.product.findProduct.useQuery({ id });
  const { data: relatedProducts } = api.product.findRelatedProducts.useQuery({
    id,
  });
  const [attributes, setAttributes] = useState();

  console.log(product);
  console.log(relatedProducts);

  if (!product) {
    return <Spinner />;
  }

  console.log(Object.entries(product.attributes!));

  return (
    <main className="m-auto mt-4 sm:mt-12 w-screen max-w-[1280px] px-2 sm:px-10">
      <div className="flex  flex-col md:flex-row">
        {/* Gallery */}
        <div className="grid w-full mb-8 md:mb-0 md:w-3/5 gap-4 mr-8">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
              alt=""
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Detail */}
        <div className="space-y-2 mb-10 md:mb-0">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <div className="flex items-center">
            {[...Array(5)].map((star, i) =>
              i < getAverage(product.star) &&
              i + 1 > getAverage(product.star) ? (
                <BsStarHalf
                  key={i}
                  size={15}
                  className="text-[#ffc107] sm:mr-1"
                />
              ) : i > getAverage(product.star) ? (
                <BsStar key={i} size={15} className="text-[#ffc107] sm:mr-1" />
              ) : (
                <BsStarFill
                  key={i}
                  size={15}
                  className="text-[#ffc107] sm:mr-1"
                />
              ),
            )}
            <span className="ml-2 text-sm text-grayPrimary">
              ({product && product.review.length} Reviews)
            </span>
            <span className="mx-4 text-grayPrimary">|</span>
            {product.stock > 0 ? (
              <span className="text-sm text-green-500">In Stock</span>
            ) : (
              <span className="text-sm text-redPrimary">Out of Stock</span>
            )}
          </div>
          <h3 className="text-xl tracking-wider">${product.price}</h3>
          <p className="border-b-2 border-grayPrimary py-6">
            {product.description}
          </p>
          <div className="pt-6">
            {product.attributes &&
              Object.entries(product.attributes).map((attributes) => (
                <div className="mb-4 flex flex-wrap sm:flex-nowrap items-center space-x-2">
                  {attributes.map((att, i) =>
                    i === 0 ? (
                      <h3 className="text-base sm:text-xl">
                        {att[0].toUpperCase()}
                        {att.slice(1)}:
                      </h3>
                    ) : (
                      att.map((value: string) => (
                        <button className="rounded-md border-2 px-2.5 py-1 text-xs sm:text-sm">
                          {value}
                        </button>
                      ))
                    ),
                  )}
                </div>
              ))}
          </div>
          <div className="flex justify-start gap-4 md:gap-0 md:justify-between py-6">
            <div className="flex items-center">
              <button className="rounded-l-md border-2 p-1 sm:p-2 hover:border-transparent hover:bg-redPrimary hover:text-whitePrimary">
                <BsPlusLg className="text-sm sm:text-xl" />
              </button>
              <input
                type="number"
                className="number-input sm:h-full w-10 sm:w-16 border-y-2 p-1 sm:p-2 text-xs sm:text-base text-center outline-0"
              />
              <button className="rounded-r-md border-2 p-1 sm:p-2 hover:border-transparent hover:bg-redPrimary hover:text-whitePrimary">
                <AiOutlineMinus className="text-sm sm:text-xl" />
              </button>
            </div>
            <button className="btn--red w-24 sm:w-36 text-xs sm:text-base">Buy Now</button>
            <button className="rounded-md border-2 p-1 sm:p-2 hover:border-transparent hover:bg-redPrimary hover:text-whitePrimary">
              <BiHeart />
            </button>
          </div>
          <div>
            <div className="flex items-center rounded-sm border-2 px-2.5 py-4">
              <TbTruckDelivery className="mr-4" size={35} />
              <div>
                <h3 className="font-bold">Fast Delivery</h3>
                <p className="text-xs"> Delivery is available for <strong>${product.delivery}</strong></p>
              </div>
            </div>
            <div className="flex items-center rounded-sm border-2 border-t-0 px-2.5 py-4">
              <BsArrowRepeat className="mr-4" size={35} />
              <div>
                <h3 className="font-bold">Return Delivery</h3>
                <p className="text-xs">
                  Free 30 Days Delivery Returns. <Link href={"/"}>Details</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Item */}
      <div>
        {relatedProducts && <RelatedItems products={relatedProducts} />}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      id: query.id,
    },
  };
};

export default ProductDetail;
