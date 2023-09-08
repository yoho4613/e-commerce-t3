import { isSameMonth, isToday } from "date-fns";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Categories from "~/components/Categories/Categories";
import Featured from "~/components/Deals/Featured";
import MonthDeal from "~/components/Deals/MonthDeal";
import TodayDeal from "~/components/Deals/TodayDeal";
import Spinner from "~/components/Global/Spinner";
import HotProducts from "~/components/Products/HotProducts";
import Service from "~/components/Service/Service";
import HeroBanner from "~/components/banners/HeroBanner";
import HomeBanner from "~/components/banners/HomeBanner";
import CategoryNavBar from "~/components/navbar/CategoryNavBar";
import { Sale } from "~/config/type";
import { api } from "~/utils/api";

export default function Home() {
  const { data: withSubCategory } = api.category.withSubcategory.useQuery();
  const { data: sales } = api.sale.getAllSales.useQuery();
  const [todayDeal, setTodayDeal] = useState<Sale | null>(null);
  const [monthDeal, setMonthDeal] = useState<Sale | null>(null);

  useEffect(() => {
    if (sales && sales.length) {
      if (todayDeal === null) {
        setTodayDeal(sales[sales.length - 1]!);
      }
      if (monthDeal === null) {
        setMonthDeal(sales[0]!);
      }
      sales.map((sale) => {
        if (isToday(sale.expire)) {
          setTodayDeal(sale);
        }
        if (isSameMonth(new Date(), sale.expire)) {
          setMonthDeal(sale);
        }
      });
    }
  }, [sales]);

  return (
    <>
      <main className="m-auto max-w-[1280px] md:px-6">
        <div className="flex flex-col sm:flex-row">
          {withSubCategory ? (
            <CategoryNavBar categories={withSubCategory} />
          ) : (
            <div>
              <Spinner /> Loading...
            </div>
          )}
          <div className="pt-12 sm:pl-12">
            <HomeBanner />
          </div>
        </div>
        <div className="mt-24 space-y-10">
          <TodayDeal deal={todayDeal} />
          {withSubCategory ? (
            <Categories categories={withSubCategory} />
          ) : (
            <div>Loading...</div>
          )}
          <MonthDeal deal={monthDeal} />
          <HeroBanner />
          <HotProducts />
          <Featured />
        </div>
        <Service />
      </main>
    </>
  );
}
