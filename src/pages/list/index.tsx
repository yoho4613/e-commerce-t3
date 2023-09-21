import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { ImSortAmountDesc } from "react-icons/im";
import Searchbar from "~/components/global/Searchbar";
import ProductCard from "~/components/Products/ProductCard";
import CategoryNavBar from "~/components/navbar/CategoryNavBar";
import { api } from "~/utils/api";
import Spinner from "~/components/global/Spinner";
import { GetServerSideProps } from "next";

import { FC } from "react";
import { useRouter } from "next/router";

const ListPage = () => {
  const { data: categories } = api.category.withSubcategory.useQuery();
  const { data: products } = api.product.getAllProducts.useQuery();
  const [productLength, setProductLength] = useState(20);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null,
  );
  const [category, setCategory] = useState<string | string[]>("all");
  const [subcategory, setSubcategory] = useState<string | string[]>("all");
  const [search, setSearch] = useState<string | string[]>("all");
  const router = useRouter();

  useEffect(() => {
    if (router.query) {
      const { category, subcategory, search } = router.query;

      if (!category) {
        setCategory("all");
      } else {
        setCategory(category);
      }
      if (!subcategory) {
        setSubcategory("all");
      } else {
        setSubcategory(subcategory);
      }
      if (!search) {
        setSearch("all");
      } else {
        setSearch(search);
      }

      console.log(category);
      console.log(subcategory);
      console.log(search);

      
    }
  }, [router]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products.slice(0, productLength));
    }
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row">
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
        <div className="flex flex-wrap items-start justify-between gap-4 ">
          {filteredProducts ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <Spinner />
          )}
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

export default ListPage;
