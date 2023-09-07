import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { GiCancel } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

interface NavbarProps {}

interface User {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

const Navbar: FC<NavbarProps> = ({}) => {

  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const popupRef = useRef<HTMLUListElement>(null);
  const [user, setUser] = useState<User | { id: string } | null>(null);
  const session = useSession();


  useEffect(() => {
    if (session.status === "authenticated") {
      setUser(session.data.user);
    }

  }, [session]);

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
    <nav className="flex items-center justify-between sm:px-4 ">
      <div className="relative order-1 h-16 w-16 md:h-20 md:w-20">
        <Link href="/">
          <Image src={logo} alt="logo" fill />
        </Link>
      </div>
      <div className="order-4 md:order-2 md:w-1/3 ">
        <button
          className="flex items-center md:hidden"
          onClick={() => setMobileMenuOpened((prev) => !prev)}
        >
          <RiMenu2Fill className="text-xl sm:text-3xl" />
        </button>

        <ul
          ref={popupRef}
          className={`absolute left-0 top-32 z-50 flex h-screen w-full flex-col bg-[rgba(0,0,0,0.6)] text-lg transition md:relative md:top-0  md:h-auto md:w-full md:translate-x-0 md:flex-row md:justify-between md:bg-transparent md:transition-none ${
            mobileMenuOpened ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
            <Link className="inline-block w-full" href="/">
              Home
            </Link>
          </li>
          <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
            <Link className="inline-block w-full" href="/contact">
              Contact
            </Link>
          </li>
          <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
            <Link className="inline-block w-full" href="/">
              About
            </Link>
          </li>
          {!user && (
            <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
              <Link className="inline-block w-full" href="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="order-3 flex items-center ">
        <div className="relative mr-2 md:mr-6">
          <input
            className="w-52 bg-secondary px-2 py-1 text-sm md:w-64 md:px-4 md:py-2"
            placeholder="What are you looking for?"
          />
          <button className="absolute right-2 top-1.5 text-xl">
            <FiSearch />
          </button>
        </div>
        <div className="relative flex items-center">
          <button className="sm:mr-4">
            <AiOutlineHeart className="text-lg sm:text-2xl" />
          </button>
          <button className="sm:mr-4">
            <AiOutlineShoppingCart className="text-lg sm:text-2xl" />
          </button>
          {user && (
            <button onClick={() => setProfileOpened((prev) => !prev)}>
             {(user as User).image ? (
              <Image src={(user as User).image!} alt="avatar" width={100} height={100} className="rounded-full w-5 sm:w-6" />
             ) : (
              <RxAvatar color="#DB4444" className=" text-lg sm:text-2xl" />
             )}
            </button>
          )}
          {profileOpened && (
            <div
              className="absolute right-0 top-6 z-[999] flex w-32 flex-col rounded-sm px-2.5 text-sm text-whitePrimary sm:w-[20rem] sm:text-lg"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <Link href="/" className="flex w-full items-center p-2 text-left">
                <BsPerson color="white" className="mr-2 text-xl" />
                Manage My Profile
              </Link>
              <Link href="/" className="flex w-full items-center p-2 text-left">
                <PiShoppingBagOpenLight
                  color="white"
                  className="mr-2 text-xl"
                />
                My Order
              </Link>
              <Link href="/" className="flex w-full items-center p-2 text-left">
                <GiCancel color="white" className="mr-2 text-xl" />
                My Cancellations
              </Link>
              <Link href="/" className="flex w-full items-center p-2 text-left">
                <AiOutlineStar color="white" className="mr-2 text-xl" />
                My Reviews
              </Link>
              <button
                onClick={() => signOut()}
                className="flex w-full items-center p-2 text-left"
              >
                <BiLogOut color="white" className="mr-2 text-xl" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
