import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import logo from "../../../public/logo.png";
import Link from "next/link";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false)
  const popupRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLUListElement) {
        if (popupRef.current && popupRef.current.contains(e.target)) {
          setMobileMenuOpened(false);

          document.removeEventListener("mousedown", handleClickOutside);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpened]);

  return (
    <nav className="flex items-center justify-between overflow-hidden ">
      <div className=" relative w-16 h-16 md:w-28 md:h-28 order-1">
        <Link href="/">
          <Image src={logo} alt="logo" fill />
        </Link>
      </div>
      <div className="md:w-1/3 order-4 md:order-2 ">
        <button className="md:hidden flex items-center" onClick={() => setMobileMenuOpened(prev => !prev)}>
          <RiMenu2Fill className="sm:text-3xl text-xl" />
        </button>
        <ul ref={popupRef} className={`flex flex-col w-full bg-[rgba(0,0,0,0.6)] md:bg-transparent h-screen md:h-auto md:top-0 md:w-full absolute z-50 left-0 top-32  md:relative md:justify-between text-xl md:flex-row transition md:transition-none md:translate-x-0 ${mobileMenuOpened ? "translate-x-0" : "translate-x-full"}`}>
          <li className="hover-underline-animation bg-slate-200 md:bg-transparent p-2.5 md:p-0">
            <Link className="w-full inline-block" href="/">Home</Link>
          </li>
          <li className="hover-underline-animation bg-slate-200 md:bg-transparent p-2.5 md:p-0">
            <Link className="w-full inline-block" href="/">Contact</Link>
          </li>
          <li className="hover-underline-animation bg-slate-200 md:bg-transparent p-2.5 md:p-0">
            <Link className="w-full inline-block" href="/">About</Link>
          </li>
          <li className="hover-underline-animation bg-slate-200 md:bg-transparent p-2.5 md:p-0">
            <Link className="w-full inline-block" href="/">Login</Link>
          </li>
      </ul>
      </div>
      <div className="flex items-center order-3 ">
        <div className="relative mr-2 md:mr-6">
          <input
            className="bg-secondary text-sm w-52 px-2 py-1 md:w-64 md:px-4 md:py-2"
            placeholder="What are you looking for?"
          />
          <button className="absolute right-2 top-1.5 text-xl">
            <FiSearch />
          </button>
        </div>
        <div className="flex items-center">
          <button className="sm:mr-4">
            <AiOutlineHeart className="sm:text-2xl text-lg" />
          </button>
          <button className="sm:mr-4">
            <AiOutlineShoppingCart className="sm:text-2xl text-lg" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
