import { signIn, signOut, useSession } from "next-auth/react";
import TodayDeal from "~/components/Deals/TodayDeal";
import HomeBanner from "~/components/banners/HomeBanner";
import CategoryNavBar from "~/components/navbar/CategoryNavBar";

export default function Home() {
  return (
    <>
      <main className="m-auto max-w-[1280px] md:px-6">
        <div className="flex flex-col sm:flex-row">
          <CategoryNavBar />
          <div className="pt-12 pl-12">
            <HomeBanner />
          </div>
        </div>
        <div>
          <TodayDeal />
        </div>
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
