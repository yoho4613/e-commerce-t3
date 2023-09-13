import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { ImSortAmountDesc } from "react-icons/im";
import Searchbar from "~/components/Global/Searchbar";
import ProductCard from "~/components/Products/ProductCard";
import CategoryNavBar from "~/components/navbar/CategoryNavBar";
import { getAverage } from "~/lib/helper";
import { api } from "~/utils/api";

interface FilterProps {
  // query: { filter: string };
}

const index: FC<FilterProps> = () => {
  const router = useRouter();
  const filter = router.query;
  const { data: categories } = api.category.withSubcategory.useQuery();
  const { data: products } = api.product.getAllProducts.useQuery();
  const [productLength, setProductLength] = useState(20);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null,
  );
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  console.log(filter);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products.slice(0, productLength));
    }
  }, [products]);

  return (
    <div className="flex">
      {categories && <CategoryNavBar categories={categories} />}
      <div className="w-full p-4">
        <div className="relative mb-6 flex grow">
          <div className="relative grow">
            <Searchbar />
          </div>
          <div className="ml-2 flex items-center space-x-2">
            <button>
              <ImSortAmountDesc className="text-2xl text-grayPrimary" />
            </button>
            <button>
              <BiFilterAlt className="text-3xl" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap space-y-2 justify-between">
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                average={getAverage(product.star)}
              />
            ))}
        </div>
        <div className="text-center">
          {filteredProducts &&
            products &&
            filteredProducts.length < products.length && (
              <button
                onClick={() => {
                  if (products) {
                    setFilteredProducts(products?.slice(0, productLength + 20));
                    setProductLength((prev) => prev + 20);
                  }
                }}
                type="button"
                className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                More Products...
              </button>
            )}
        </div>
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
