import Categories from "~/components/Categories/Categories";
import Featured from "~/components/Deals/Featured";
import MonthDeal from "~/components/Deals/MonthDeal";
import TodayDeal from "~/components/Deals/TodayDeal";
import HotProducts from "~/components/Products/HotProducts";
import Service from "~/components/Service/Service";
import HeroBanner from "~/components/banners/HeroBanner";
import HomeBanner from "~/components/banners/HomeBanner";
import CategoryNavBar from "~/components/navbar/CategoryNavBar";

export default function Home() {


  return (
    <>
      <main className="m-auto max-w-[1280px] md:px-6">
        <div className="flex flex-col sm:flex-row">
          <CategoryNavBar />
          <div className="sm:pl-12 pt-12">
            <HomeBanner />
          </div>
        </div>
        <div className="mt-24 space-y-10">
          <TodayDeal />
          <Categories />
          <MonthDeal />
          <HeroBanner />
          <HotProducts />
          <Featured />
        </div>
        <Service />
      </main>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
