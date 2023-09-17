import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/Spinner.css";
import Head from "next/head";
import TopBanner from "~/components/banners/TopBanner";
import Navbar from "~/components/navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import Provider from "~/context/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminNavBar from "~/components/navbar/AdminNavbar";
import { StateContext } from "~/context/userDetailContext";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    router.pathname.includes("/admin") ? setIsAdmin(true) : setIsAdmin(false);
  }, [router]);

  return (
    <>
      <Head>
        <title>E-Market Online Store</title>
        <meta name="description" content="E Market - Online Smart Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StateContext>
        <Provider>
          <Toaster />
          {!isAdmin && <TopBanner />}
          <div className="m-auto max-w-[1280px]">
            {isAdmin ? <AdminNavBar /> : <Navbar />}
            <div className="absolute left-0 w-[100vw] border-b-2" />
          </div>
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </StateContext>
    </>
  );
};

export default api.withTRPC(MyApp);
