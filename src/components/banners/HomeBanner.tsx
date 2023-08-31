import React, { FC, useState } from "react";
import defaultImg from "../../../public/BannerImg.png";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

interface HomeBannerProps {}

const HomeBanner: FC<HomeBannerProps> = ({}) => {
  const [banners, setBanners] = useState([1, 2, 3, 4, 5]);
  const [currentBanner, setCurrentBanner] = useState(1);

  return (
    <div className="relative m-auto  w-full ">
      <div className="bg-buttonBlack relative h-56 overflow-hidden rounded-lg md:h-96 md:px-4">
        {banners.map((banner) => (
          <div
            key={banner}
            className={`${
              currentBanner !== banner && "hidden"
            }  flex h-full w-full items-center duration-700 ease-in-out`}
          >
            <div className="text-whitePrimary hidden w-1/2 flex-col justify-center p-12 md:flex ">
              <h2>iPhone 14 Series</h2>
              <p className="my-6 text-4xl">Up to 10% off Voucher</p>
              <Link href="/" className="text-lg underline">
                Shop Now
                <MdArrowForward className="inline" />
              </Link>
            </div>
            <div className="grow relative">
              <Image sizes="cover"  src={defaultImg}  alt="..." />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
        {banners.map((banner) => (
          <button
            key={banner}
            type="button"
            className={`h-3 w-3 rounded-full ${
              currentBanner === banner ? "bg-slate-200" : "bg-slate-400"
            } hover:bg-slate-200`}
            onClick={() => setCurrentBanner(banner)}
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
