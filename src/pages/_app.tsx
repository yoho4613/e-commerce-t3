import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import TopBanner from "~/components/banners/TopBanner";
import Navbar from "~/components/navbar/Navbar";
import Footer from "~/components/Footer/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>E-Market Online Store</title>
        <meta name="description" content="E Market - Online Smart Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <TopBanner />
        <div className="max-w-[1280px] m-auto">
          <Navbar />
          <div className="absolute left-0 w-[100vw] border-b-2" />
        </div>
        <Component {...pageProps} />
        <Footer />  
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
