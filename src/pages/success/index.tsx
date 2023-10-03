import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'

// interface successProps {
//   id: string
// }

const Success: FC = () => {
  const router = useRouter();

  console.log(router.query)
  return (
     <div>
       success
     </div>
)
}


// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   return {
//     props: {
//      id: query.id
//     },
//   };
// };

export default Success




