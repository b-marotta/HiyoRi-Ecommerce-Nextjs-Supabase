import React, { Suspense } from 'react'

import Link from 'next/link'

import { Shell } from '@/components/layouts/Shell'
import { RecommendationProducts, RecommendationProductsSkeleton } from '@/features/products'

type Props = {}

function WishListPage({}: Props) {
    return (
        <Shell>
            <section className="flex items-center justify-between py-8">
                <h1 className="text-3xl">Your Wishlist</h1>
                <Link href="/shop">Continue shopping</Link>
            </section>
            {/* 
      <Suspense fallback={<CartSectionSkeleton />}>
        <CartSection />
      </Suspense> */}

            <Suspense fallback={<RecommendationProductsSkeleton />}>
                <RecommendationProducts />
            </Suspense>
        </Shell>
    )
}

export default WishListPage
