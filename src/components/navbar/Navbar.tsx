import Image from "next/image";
import React, { FC } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import logo from "../../../public/logo.png";
import Link from "next/link";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className=" flex items-center justify-between border-b-2">
      <div className=" h-28">
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
      <ul className="flex text-xl w-1/3 justify-between">
        <li><Link href="/">Home</Link> </li>
        <li><Link href="/">Contact</Link> </li>
        <li><Link href="/">About</Link> </li>
        <li><Link href="/">Login</Link> </li>
      </ul>
      <div className="relative">
        <input
          className="bg-secondary px-4 py-1.5 w-64"
          placeholder="What are you looking for?"
        />
        <button className="absolute right-2 top-2 text-xl" >
          <FiSearch />
        </button>
      </div>
      <div>
        <AiFillHeart />
        <AiOutlineShoppingCart />
      </div>
    </nav>
  );
};

export default Navbar;
