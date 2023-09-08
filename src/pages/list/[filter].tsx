import { Product } from "@prisma/client";
import { GetServerSideProps } from "next";
import { FC } from "react";
import CategoryNavBar from "~/components/navbar/CategoryNavBar";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

interface indexProps {
  query: { filter: string };
  products: Product[];
}

const index: FC<indexProps> = ({ query, products }) => {
  const { filter } = query;
  const {data: categories} = api.category.withSubcategory.useQuery();
  console.log(filter);
  console.log(products)
  return (
    <div className="flex">
      {categories && <CategoryNavBar categories={categories} />}
      <div>
        
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products = await prisma.product.findMany();
  return {
    props: {
      query,
      products,
    },
  };
};

export default index;
