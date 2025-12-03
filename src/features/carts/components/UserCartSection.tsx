'use client'
import { useMemo, useState } from 'react'

import { User } from '@supabase/supabase-js'
import { useMutation, useQuery } from '@urql/next'
import { notFound } from 'next/navigation'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import CartItemCard from '@/features/carts/components/CartItemCard'
import EmptyCart from '@/features/carts/components/EmptyCart'
import { DocumentType, gql } from '@/gql'
import { expectedErrorsHandler } from '@/lib/urql'

import { RemoveCartsMutation, updateCartsMutation } from '../query'
import { CartItems } from '../useCartStore'
import CheckoutButton from './CheckoutButton'

export const FetchCartQuery = gql(/* GraphQL */ `
    query FetchCartQuery($userId: UUID, $first: Int, $after: Cursor) {
        cartsCollection(first: $first, filter: { user_id: { eq: $userId } }, after: $after) {
            __typename
            edges {
                __typename
                node {
                    __typename
                    product_id
                    user_id
                    quantity
                    product: products {
                        ...CartItemCardFragment
                    }
                }
            }
        }
    }
`)

type UserCartSectionProps = { user: User }

function UserCartSection({ user }: UserCartSectionProps) {
    const [{ data, fetching, error }, reexecuteQuery] = useQuery({
        query: FetchCartQuery,
        variables: {
            userId: user.id,
        },
    })

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [, updateCartProduct] = useMutation(updateCartsMutation)
    const [, removeCart] = useMutation(RemoveCartsMutation)

    const cart = data && data.cartsCollection ? data.cartsCollection.edges : []
    const subtotal = useMemo(() => calcSubtotal(cart), [cart])
    const productCount = useMemo(() => calcProductCount(cart), [cart])

    if (fetching) {
        return <LoadingCartSection />
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!data || !data.cartsCollection) return notFound()

    const addOneHandler = async (productId: string, quantity: number) => {
        if (quantity < 8) {
            setIsLoading(true)

            const res = await updateCartProduct({
                productId: productId,
                userId: user.id,
                newQuantity: quantity + 1,
            })

            if (res.error)
                toast({
                    title: 'Error',
                    description: expectedErrorsHandler({ error: res.error }),
                })

            setIsLoading(false)
        } else {
            toast({ title: 'Proudct Limit is reached.' })
        }
    }

    const minusOneHandler = async (productId: string, quantity: number) => {
        if (quantity > 1) {
            setIsLoading(true)

            const res = await updateCartProduct({
                productId: productId,
                userId: user.id,
                newQuantity: quantity - 1,
            })

            if (res.error)
                toast({
                    title: 'Error',
                    description: expectedErrorsHandler({ error: res.error }),
                })

            setIsLoading(false)
        } else {
            toast({ title: 'Minimum is reached.' })
        }
    }

    const removeHandler = async (productId: string) => {
        setIsLoading(true)

        const res = await removeCart({ productId, userId: user.id })
        reexecuteQuery({ requestPolicy: 'network-only' })

        toast({ title: 'Removed a Product.' })

        if (res.error) {
            toast({
                title: 'Error',
                description: expectedErrorsHandler({ error: res.error }),
            })
        }

        setIsLoading(false)
    }

    const createCartObject = (data: DocumentType<typeof FetchCartQuery>): CartItems => {
        const cart: CartItems = {}
        data.cartsCollection.edges.forEach((item) => {
            cart[item.node.product.id] = {
                quantity: item.node.quantity,
            }
        })
        return cart
    }

    return (
        <>
            {data.cartsCollection && data.cartsCollection.edges.length > 0 ? (
                <section aria-label="Cart Section" className="grid grid-cols-12 gap-x-6 gap-y-5">
                    <div className="col-span-12 max-h-[420px] overflow-y-auto md:col-span-9">
                        {data.cartsCollection?.edges.map(({ node }) => (
                            <CartItemCard
                                key={node.product_id}
                                id={node.product_id}
                                product={node.product}
                                quantity={node.quantity}
                                addOneHandler={() => addOneHandler(node.product_id, node.quantity)}
                                minusOneHandler={() =>
                                    minusOneHandler(node.product_id, node.quantity)
                                }
                                removeHandler={() => removeHandler(node.product_id)}
                                disabled={isLoading}
                            />
                        ))}
                    </div>

                    <Card className="col-span-12 h-[180px] w-full px-3 md:col-span-3">
                        <CardHeader className="text-md px-3 pb-0 pt-2">
                            <CardTitle className="mb-0 text-lg">Subtotoal: </CardTitle>
                            <CardDescription>{`${productCount} Items`}</CardDescription>
                        </CardHeader>
                        <CardContent className="relative overflow-hidden px-3 py-2">
                            <p className="text-3xl font-bold md:text-lg lg:text-2xl">{`$ ${subtotal.toFixed(2).toString()}`}</p>
                        </CardContent>

                        <CardFooter className="gap-x-2 px-3 md:gap-x-5">
                            <CheckoutButton
                                guest={false}
                                disabled={isLoading}
                                order={createCartObject(data)}
                            />
                        </CardFooter>
                    </Card>
                </section>
            ) : (
                <EmptyCart />
            )}
        </>
    )
}

export default UserCartSection

const LoadingCartSection = () => (
    <section className="grid grid-cols-12 gap-x-6 gap-y-5" aria-label="Loading Skeleton">
        <div className="col-span-12 space-y-8 md:col-span-9">
            {[...Array(4)].map((_, index) => (
                <div
                    className="flex items-center justify-between gap-x-6 gap-y-8 border-b p-5"
                    key={index}
                >
                    <Skeleton className="h-[120px] w-[120px]" />
                    <div className="w-full space-y-3">
                        <Skeleton className="h-6 max-w-xs" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-full max-w-xl" />
                        <Skeleton className="h-4 w-full max-w-lg" />
                    </div>
                </div>
            ))}
        </div>
        <div className="col-span-12 h-[180px] w-full border p-5 px-3 md:col-span-3">
            <div className="w-full space-y-3">
                <Skeleton className="h-6 max-w-xs" />
                <Skeleton className="h-4" />
                <Skeleton className="mb-6 h-4" />
                <Skeleton className="mb-6 h-4 max-w-[280px]" />
            </div>
        </div>
    </section>
)

export const calcProductCount = (data: { node: { quantity: number } }[]) => {
    return data.reduce((acc, cur) => acc + cur.node.quantity, 0)
}

const calcSubtotal = (data: { node: { quantity: number; product: { price: number } } }[]) => {
    return data.reduce((acc, cur) => acc + cur.node.quantity * cur.node.product.price, 0)
}
