import Link from "next/link";
import React, { FC } from "react";
import { MdArrowForwardIos } from 'react-icons/md'

interface CategoryNavBarProps {}

const CategoryNavBar: FC<CategoryNavBarProps> = ({}) => {

  return (
    <div className="border-r-2">
      <ul className="pt-8 text-sm md:text-base w-44 md:w-56">
        <li className="relative w-full hover:bg-slate-100 px-4 py-1.5 group/item"><Link className="flex justify-between w-full" href="/"><span>Woman's Fashion</span> <span><MdArrowForwardIos className="inline" /></span></Link> 
          <ul className="absolute z-10  right-0 top-0 group-hover/item:visible invisible translate-x-full">
            <li className=" bg-slate-100 hover:bg-slate-200 px-4 py-1.5 w-48"><Link className="w-full" href="/">Skirt</Link></li>
            <li className=" bg-slate-100 hover:bg-slate-200 px-4 py-1.5 w-48"><Link className="w-full" href="/">Dress</Link></li>
          </ul>
        </li>
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Men's Fashion</Link></li>
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Eletronics</Link></li>
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Home & Lifestyle</Link></li>
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Mdicine</Link></li>
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Sports & Outdoor</Link></li>
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Baby's & Toy</Link></li>
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Groceries & Pets</Link></li>
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Health & Beauty</Link></li>
      </ul>
    </div>
  );
};

export default CategoryNavBar;
