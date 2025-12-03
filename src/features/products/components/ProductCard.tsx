import React, { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Icons } from '@/components/layouts/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { AddToCartButton } from '@/features/carts'
import { AddToWishListButton } from '@/features/wishlists'
import { DocumentType, gql } from '@/gql'
import { BadgeType } from '@/lib/supabase/schema'
import { cn, keytoUrl } from '@/lib/utils'

type CardProps = React.ComponentProps<typeof Card>

export type ProductCardProps = CardProps & {
    product: DocumentType<typeof ProductCardFragment>
}

export const ProductCardFragment = gql(/* GraphQL */ `
    fragment ProductCardFragment on products {
        id
        name
        description
        rating
        slug
        badge
        price
        featuredImage: medias {
            id
            key
            alt
        }
        collections {
            id
            label
            slug
        }
    }
`)

export function ProductCard({ className, product, ...props }: ProductCardProps) {
    const { id, name, slug, featuredImage, badge, price } = product

    return (
        <Card className={cn('w-full rounded-lg border-0 py-3', className)} {...props}>
            <CardContent className="relative mb-5 overflow-hidden p-0">
                <Link href={`/shop/${slug}`}>
                    <Image
                        src={keytoUrl(featuredImage.key)}
                        alt={featuredImage.alt}
                        width={400}
                        height={400}
                        className="aspect-[1/1] object-cover object-center transition-all duration-500 hover:scale-[1.02] hover:opacity-70"
                    />
                </Link>
                {badge && (
                    <Badge className="absolute left-0 top-0" variant={badge as BadgeType}>
                        {badge}
                    </Badge>
                )}
            </CardContent>

            <CardHeader className="mb-3 p-0 md:mb-5">
                <CardTitle>
                    <Link href={`/shop/${slug}`} className="hover:underline">
                        {name}
                    </Link>
                </CardTitle>

                <div className="hidden md:block">
                    <CardDescription className="line-clamp-2 max-w-[240px]">
                        {product.description}
                    </CardDescription>
                </div>

                <div className="">${price}</div>

                <div className="hidden md:block">
                    <Rating value={product.rating} precision={0.5} readOnly />
                </div>
            </CardHeader>

            <CardFooter className="gap-x-2 p-0 md:gap-x-5">
                <Suspense
                    fallback={
                        <Button className="h-8 w-8 rounded-full p-0" disabled>
                            <Icons.basket className="h-5 w-5 md:h-4 md:w-4" />
                        </Button>
                    }
                >
                    <AddToCartButton productId={id} />
                </Suspense>

                <Suspense
                    fallback={
                        <Button className="rounded-full p-3" variant="ghost" disabled>
                            <Icons.heart className={'h-4 w-4 fill-none'} />
                        </Button>
                    }
                >
                    <AddToWishListButton productId={product.id} />
                </Suspense>
            </CardFooter>
        </Card>
    )
}

export default ProductCard
