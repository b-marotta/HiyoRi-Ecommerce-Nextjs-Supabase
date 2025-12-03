'use client'
import React from 'react'

import { UseQueryExecute } from '@urql/next'
import Image from 'next/image'
import Link from 'next/link'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { DocumentType, gql } from '@/gql'
import { keytoUrl } from '@/lib/utils'

import QuantityInput from '../../../components/layouts/QuantityInput'
import { Icons } from '../../../components/layouts/icons'
import { Button } from '../../../components/ui/button'

export const CartItemCardFragment = gql(/* GraphQL */ `
    fragment CartItemCardFragment on products {
        id
        slug
        name
        price
        description
        featuredImage: medias {
            id
            key
            alt
        }
    }
`)

type CartItemCardProps = React.ComponentProps<typeof Card> & {
    product: DocumentType<typeof CartItemCardFragment>
    disabled?: boolean
    addOneHandler: () => void
    minusOneHandler: () => void
    removeHandler: () => void
    quantity: number
}

function CartItemCard({
    product,
    disabled,
    addOneHandler,
    minusOneHandler,
    removeHandler,
    quantity,
}: CartItemCardProps) {
    return (
        <Card className="flex items-center justify-between gap-x-6 gap-y-8 border-0 border-b px-5 py-3 shadow-none">
            <CardContent className="relative mb-5 overflow-hidden p-0">
                <Image
                    src={keytoUrl(product.featuredImage.key)}
                    alt={product.featuredImage.alt}
                    width={150}
                    height={150}
                    className="aspect-square object-cover"
                />
            </CardContent>

            <CardHeader className="mb-3 max-w-lg grow p-0 md:mb-5">
                <CardTitle>
                    <Link href={`/shop/${product.slug}`} className="hover:underline">
                        {product.name}
                    </Link>
                </CardTitle>

                <CardDescription className="line-clamp-2 grow">
                    {product.description}
                </CardDescription>

                <QuantityInput
                    value={quantity}
                    addOneHandler={addOneHandler}
                    minusOneHandler={minusOneHandler}
                    disabled={disabled}
                />
            </CardHeader>

            <CardFooter className="gap-x-2 p-0 md:gap-x-5">
                <p>$ {product.price}</p>

                <Button aria-label="Remove Item Button" variant="ghost" onClick={removeHandler}>
                    <Icons.close size={20} />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CartItemCard
