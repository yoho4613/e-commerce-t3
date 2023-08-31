import Image from "next/image";
import React, { FC } from "react";
import bannerImg from "../../../public/heroBanner.png";

interface IHeroBannerProps {}

const HeroBanner: FC<IHeroBannerProps> = ({}) => {
  return (
    <div className=" h-[32rem] relative my-12">
        <Image src={bannerImg} alt="banner" fill sizes="cover" />
        <button className="absolute left-12 bottom-12 bg-buttonGreen text-whitePrimary px-6 py-2.5 rounded-md">Buy Now!</button>
    </div>
  );
};

export default HeroBanner;
