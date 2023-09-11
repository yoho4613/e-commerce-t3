import { Product } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import CategoryNavBar from "~/components/navbar/CategoryNavBar";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

interface FilterProps {
  // query: { filter: string };
}

const index: FC<FilterProps> = () => {
  const router = useRouter()
  const filter = router.query
  const {data: categories} = api.category.withSubcategory.useQuery();
  const {data: products } = api.product.getAllProducts.useQuery()
  console.log(router.query)
  console.log(filter)
  return (
    <div className="flex">
      {categories && <CategoryNavBar categories={categories} />}
      <div>
        
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   console.log("server",query)

//   return {
//     props: {
//       query,
//     },
//   };
// };

export default index;
