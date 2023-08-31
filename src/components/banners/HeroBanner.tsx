import Image from "next/image";
import React, { FC } from "react";
import bannerImg from "../../../public/heroBanner.png";

interface IHeroBannerProps {}

const HeroBanner: FC<IHeroBannerProps> = ({}) => {
  return (
    <div className=" h-[16rem] sm:h-[32rem] relative my-12">
        <Image src={bannerImg} alt="banner" fill sizes="cover" />
        <button className="absolute sm:left-12 sm:bottom-12 left-6 bottom-6 bg-buttonGreen text-whitePrimary text-xs sm:text-base px-2 py-1 sm:px-6 sm:py-2.5 rounded-md">Buy Now!</button>
    </div>
  );
};

export default HeroBanner;

