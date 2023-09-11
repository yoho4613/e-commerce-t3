import React, { FC } from "react";
import { api } from "~/utils/api";
import Spinner from "../Global/Spinner";
import Link from "next/link";

interface FeaturedProps {}

const Featured: FC<FeaturedProps> = ({}) => {
  const { data: banners } = api.banner.getNewBanners.useQuery(4);
  console.log(banners);
  return (
    <div className="mb-24">
      <div className="flex items-center">
        <span className="mr-4 inline-block h-12 w-6 rounded-md bg-redPrimary" />
        <h2 className="font-bold text-redPrimary">Featured</h2>
      </div>
      <div className="my-6 flex w-full items-start justify-between gap-4 pl-4 sm:flex-row sm:items-center sm:gap-0 sm:pl-0">
        <h2 className="text-xl tracking-widest sm:text-2xl md:text-3xl">
          New Arrivals
        </h2>
      </div>
      <div className="flex w-full flex-col gap-4 text-textPrimary sm:flex-row">
        {banners ? (
          <>
            <div
              style={{
                background: `url("${banners[0]?.imgUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`flex h-[30rem] w-full flex-col items-start justify-end gap-4 p-6 sm:w-1/2`}
            >
              <h3 className="text-2xl">{banners[0]?.title}</h3>
              <h4 className="w-1/2 text-sm">{banners[0]?.description}</h4>
              <Link href={banners[0]?.link!} className="underline">
                Shop Now
              </Link>
            </div>
            <div className="flex h-[30rem] w-full flex-col gap-4 sm:w-1/2">
              <div
                style={{
                  background: `url("${banners[1]?.imgUrl}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className={`flex h-[14rem] flex-col items-start justify-end gap-4 p-6`}
              >
                <h3 className="text-2xl">{banners[1]?.title}</h3>
                <h4 className="w-1/2 text-sm">{banners[1]?.description}</h4>
                <Link href={banners[1]?.link!} className="underline">
                  Shop Now
                </Link>
              </div>
              <div className="flex grow gap-4">
                <div
                  style={{
                    background: `url("${banners[2]?.imgUrl}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={
                    "flex w-1/2 flex-col items-start justify-end gap-4 p-6"
                  }
                >
                  <h3 className="text-2xl">{banners[2]?.title}</h3>
                  <h4 className="w-1/2 text-sm">{banners[2]?.description}</h4>
                  <Link href={banners[2]?.link!} className="underline">
                    Shop Now
                  </Link>
                </div>
                <div
                  style={{
                    background: `url("${banners[3]?.imgUrl}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`flex grow flex-col items-start justify-end gap-4 p-6`}
                >
                  <h3 className="text-2xl">{banners[3]?.title}</h3>
                  <h4 className="w-1/2 text-sm">{banners[3]?.description}</h4>
                  <Link href={banners[3]?.link!} className="underline">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Spinner />
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
