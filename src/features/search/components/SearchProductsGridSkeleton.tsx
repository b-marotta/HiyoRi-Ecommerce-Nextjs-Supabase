import React from 'react'

import { Skeleton } from '../../../components/ui/skeleton'
import { ProductCardSkeleton } from '../../products/components/ProductCardSkeleton'

function SearchProductsGridSkeleton() {
    return (
        <div>
            <Skeleton className="mb-5" />

            <section className="grid w-full grid-cols-2 gap-x-3 gap-y-8 py-5 lg:grid-cols-4">
                {[...Array(24)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </section>
        </div>
    )
}

export default SearchProductsGridSkeleton
