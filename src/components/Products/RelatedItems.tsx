import { FC } from 'react'
import { getAverage, shuffle } from '~/lib/helper'
import ProductCard from './ProductCard'
import { Product } from '@prisma/client'

interface RelatedItemsProps {
  products: Product[]
}

const RelatedItems: FC<RelatedItemsProps> = ({products}) => {
  return (
    <div>
    <div className="flex items-center">
      <span className="bg-redPrimary mr-4 inline-block h-12 w-6 rounded-md" />
      <h2 className="text-redPrimary font-bold">Related Item</h2>
    </div>
    <div className="my-6 flex w-full items-start gap-4 pl-4 sm:flex-row justify-between sm:items-center sm:gap-0 sm:pl-0">
      <h2 className="text-xl tracking-widest sm:text-2xl md:text-3xl">Best Selling Products</h2>
    </div>
    <div className="flex flex-wrap justify-between ">
      {shuffle(products?.slice(0, 12)).map((product, i) => (
        <ProductCard key={i} product={product} average={getAverage(product.star)} />
      ))}
    </div>
  </div>
)
}

export default RelatedItems