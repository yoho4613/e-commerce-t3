import { Category, Subcategory } from "@prisma/client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { CategoryWithSubCategory } from "~/config/type";

interface CategoryNavBarProps {
  categories: CategoryWithSubCategory[];
}

const CategoryNavBar: FC<CategoryNavBarProps> = ({ categories }) => {
  return (
    <div className="border-r-2">
      <ul className="w-44 pt-8 text-sm md:w-56 md:text-base">
        {categories.map((category) => (
          <li
            key={category.id}
            className="group/item relative w-full px-4 py-1.5 hover:bg-slate-100"
          >
            <Link
              className="flex w-full justify-between"
              href={`/list/${category.name}`}
            >
              <span>{category.name}</span>
              {category.Subcategory.length ? (
                <span>
                  <MdArrowForwardIos className="inline" />
                </span>
              ) : (
                ""
              )}
            </Link>
            {category.Subcategory && (
              <ul className="invisible absolute  right-0 top-0 z-10 translate-x-full group-hover/item:visible">
                {category.Subcategory.map((sub) => (
                  <li key={sub.id} className=" w-48 bg-slate-100 px-4 py-1.5 hover:bg-slate-200">
                    <Link className="w-full" href={`/${sub.name}`}>
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {/* <li className="relative w-full hover:bg-slate-100 px-4 py-1.5 group/item"><Link className="flex justify-between w-full" href="/"><span>Woman's Fashion</span> <span><MdArrowForwardIos className="inline" /></span></Link> 
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
        <li className="w-full hover:bg-slate-100 px-4 py-1.5"><Link className="w-full" href="/">Health & Beauty</Link></li> */}
      </ul>
    </div>
  );
};

export default CategoryNavBar;
