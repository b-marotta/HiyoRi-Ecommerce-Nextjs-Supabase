import React from 'react'

import Header from '@/components/layouts/Header'

import { ProductCardSkeleton } from './ProductCardSkeleton'

function RecommendationProductsSkeleton() {
    return (
        <Header heading={`We Think You'll Love`}>
            <div className="container grid grid-cols-2 gap-x-8 lg:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        </Header>
    )
}

export default RecommendationProductsSkeleton
