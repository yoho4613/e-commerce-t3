import React, { FC } from "react";

interface FeaturedProps {}

const Featured: FC<FeaturedProps> = ({}) => {
  return (
    <div className="mb-24">
      <div className="flex items-center">
        <span className="bg-redPrimary mr-4 inline-block h-12 w-6 rounded-md" />
        <h2 className="text-redPrimary font-bold">Featured</h2>
      </div>
      <div className="my-6 flex w-full items-start justify-between gap-4 pl-4 sm:flex-row sm:items-center sm:gap-0 sm:pl-0">
        <h2 className="text-xl tracking-widest sm:text-2xl md:text-3xl">
          New Arrivals
        </h2>
      </div>
      <div className="text-textPrimary flex flex-col sm:flex-row w-full gap-4">
        <div
          className={`flex h-[30rem] w-full sm:w-1/2 flex-col items-start justify-end gap-4 bg-[url("https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F08%2FPlayStation-5-Drops-Its-Price-for-the-First-Time-1.jpg?cbr=1&q=90")] bg-cover bg-center p-6`}
        >
          <h3 className="text-2xl">PlayStation5</h3>
          <h4 className="w-1/2 text-sm">
            Black and White version of the PS5 coming out on sale.
          </h4>
          <button className="underline">Shop Now</button>
        </div>
        <div className="flex h-[30rem] w-full sm:w-1/2 flex-col gap-4">
          <div
            className={`flex h-[14rem] flex-col items-start justify-end gap-4 bg-[url(https://fq.co.nz/wp-content/uploads/2018/04/chic-cliques-power-dresses-image.jpg)] bg-cover bg-center p-6`}
          >
            <h3 className="text-2xl">Women's Collection</h3>
            <h4 className="w-1/2 text-sm">
              Featured woman collections that give you another vibe.
            </h4>
            <button className="underline">Shop Now</button>
          </div>
          <div className="flex grow gap-4">
            <div
              className={
                "flex w-1/2 flex-col items-start justify-end gap-4 bg-[url(https://relicsmusic.co.nz/cdn/shop/products/tex-tone-speakers-01-1.jpg?v=1599553427)] bg-cover bg-center p-6"
              }
            >
              <h3 className="text-2xl">Speakers</h3>
              <h4 className="w-1/2 text-sm">Amazon wireless speakers </h4>
              <button className="underline">Shop Now</button>
            </div>
            <div
              className={`flex grow flex-col items-start justify-end gap-4 bg-[url(https://pyxis.nymag.com/v1/imgs/764/073/c826fe528e9a1bacc4debf87cbf5eb82cb-bic-perfume.2x.rhorizontal.w1100.jpg)] bg-cover bg-center p-6`}
            >
              <h3 className="text-2xl">Perfume</h3>
              <h4 className="w-1/2 text-sm">GUCCi INTENSE OUD EDP </h4>
              <button className="underline">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
