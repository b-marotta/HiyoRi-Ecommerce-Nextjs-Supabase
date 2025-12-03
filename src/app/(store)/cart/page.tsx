import { Suspense } from 'react'

import Link from 'next/link'

import { Shell } from '@/components/layouts/Shell'
import CartSection from '@/features/carts/components/CartSection'
import CartSectionSkeleton from '@/features/carts/components/CartSectionSkeleton'
import { RecommendationProducts, RecommendationProductsSkeleton } from '@/features/products'

async function CartPage() {
    return (
        <Shell>
            <section className="flex items-center justify-between py-8">
                <h1 className="text-3xl">Your Cart</h1>
                <Link href="/shop">Continue shopping</Link>
            </section>

            <Suspense fallback={<CartSectionSkeleton />}>
                <CartSection />
            </Suspense>

            <Suspense fallback={<RecommendationProductsSkeleton />}>
                <RecommendationProducts />
            </Suspense>
        </Shell>
    )
}

export default CartPage
