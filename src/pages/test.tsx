import { Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";

const Home =  ({}) => {
  // const userSession = async () => await getServerSession(authOptions);
  // const session = userSession()
  // const{ data: userSession} = api.user.getSession.useQuery()
  const {data: session} = useSession()
  console.log(session);
  // console.log(userSession)

  return (
    <div>
      <h1>home</h1>
      <h1>server side rendered</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

// export async function getServerSideProps() {
//   const session = await getServerSession(authOptions);
//   console.log(session)
//   return { props: { session } };
// }

export default Home;


