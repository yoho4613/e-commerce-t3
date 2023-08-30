import Image from "next/image";
import React, { FC } from "react";
import loginBanner from "../../public/loginBanner.png";

const Login: FC = ({}) => {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="mb-12 mt-12 flex w-full flex-col items-center justify-start sm:mt-40 md:mb-0 md:w-1/2">
        <div className="mb-12 w-3/5">
          <h2 className="mb-2 text-2xl">Welcome to E-Market</h2>
          <p>Enter your Credentials to access your account</p>
        </div>
        <form className="w-3/5">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6 flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#3A5B22] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#2e491b] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 ">
        <Image src={loginBanner} alt="banner" objectFit="cover" />
      </div>
    </div>
  );
};

export default Login;
