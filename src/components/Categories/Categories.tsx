import React, { FC, useState } from "react";
import { BsPhone } from "react-icons/bs";
import {
  IoMdArrowBack,
  IoMdArrowForward,
  IoMdWatch,
  IoLogoGameControllerB,
} from "react-icons/io";
import { HiOutlineDesktopComputer, HiOutlineCamera } from "react-icons/hi";
import { FiHeadphones } from "react-icons/fi";
interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  const [cardLocation, setCardLocation] = useState(0);

  return (
    <div className="border-b-2 border-t-2 py-24">
      <div className="flex items-center">
        <span className="bg-redPrimary mr-4 inline-block h-12 w-6 rounded-md" />
        <h2 className="text-redPrimary font-bold">Categories</h2>
      </div>
      <div className="my-6 flex w-full flex-col justify-between items-start gap-4 pl-4 sm:flex-row sm:items-center sm:gap-0 sm:pl-0">
        <h2 className="text-xl tracking-widest sm:text-2xl md:text-3xl">
          Browse By Category
        </h2>
        <div>
          <button
            onClick={() =>
              setCardLocation((prev) => (prev === 0 ? prev : prev - 20))
            }
            className="bg-secondary mr-4 rounded-full p-2"
          >
            <IoMdArrowBack size={25} />
          </button>
          <button
            onClick={() => setCardLocation((prev) => prev + 20)}
            className="bg-secondary rounded-full p-2"
          >
            <IoMdArrowForward size={25} />
          </button>
        </div>
      </div>
      <div
        className={`flex gap-6 transition`}
        style={{ transform: `translateX(-${cardLocation}%)` }}
      >
        <button>
          <div className="hover:bg-redPrimary hover:text-whitePrimary flex w-24 sm:w-48 shrink-0 flex-col items-center gap-4 rounded-sm border-2 p-4">
            <BsPhone className="text-[2.5rem] sm:text-[5rem]" />
            <span>Phones</span>
          </div>
        </button>
        <button>
          <div className="hover:bg-redPrimary hover:text-whitePrimary flex w-24 sm:w-48 shrink-0 flex-col items-center gap-4 rounded-sm border-2 p-4">
            <HiOutlineDesktopComputer className="text-[2.5rem] sm:text-[5rem]" />
            <span>Computers</span>
          </div>
        </button>
        <button>
          <div className="hover:bg-redPrimary hover:text-whitePrimary flex w-24 sm:w-48 shrink-0 flex-col items-center gap-4 rounded-sm border-2 p-4">
            <IoMdWatch className="text-[2.5rem] sm:text-[5rem]" />
            <span>SmartWatch</span>
          </div>
        </button>
        <button>
          <div className="hover:bg-redPrimary hover:text-whitePrimary flex w-24 sm:w-48 shrink-0 flex-col items-center gap-4 rounded-sm border-2 p-4">
            <HiOutlineCamera className="text-[2.5rem] sm:text-[5rem]" />
            <span>Camera</span>
          </div>
        </button>
        <button>
          <div className="hover:bg-redPrimary hover:text-whitePrimary flex w-24 sm:w-48 shrink-0 flex-col items-center gap-4 rounded-sm border-2 p-4">
            <FiHeadphones className="text-[2.5rem] sm:text-[5rem]" />
            <span>HeadPhones</span>
          </div>
        </button>
        <button>
          <div className="hover:bg-redPrimary hover:text-whitePrimary flex w-24 sm:w-48 shrink-0 flex-col items-center gap-4 rounded-sm border-2 p-4">
            <IoLogoGameControllerB className="text-[2.5rem] sm:text-[5rem]" />
            <span>Gaming</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Categories;
