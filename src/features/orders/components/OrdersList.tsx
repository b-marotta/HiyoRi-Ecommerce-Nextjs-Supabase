'use client'
import React from 'react'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import { DocumentType, gql } from '@/gql'
import { cn, formatPrice, keytoUrl } from '@/lib/utils'

import { Button, buttonVariants } from '../../../components/ui/button'
import { Card, CardContent, CardHeader } from '../../../components/ui/card'

type OrdersListProps = {
    orders: DocumentType<typeof OrdersListFragment>[]
}

export const OrdersListFragment = gql(/* GraphQL */ `
    fragment OrdersListFragment on ordersEdge {
        node {
            id
            amount
            order_status
            created_at
            item: order_linesCollection {
                edges {
                    node {
                        id
                        products {
                            id
                            featured
                            price
                            name
                            slug
                            description
                            featuredImage: medias {
                                id
                                key
                                alt
                            }
                        }
                    }
                }
            }
        }
    }
`)

function OrdersList({ orders }: OrdersListProps) {
    if (orders.length === 0) return <div>There is no order.</div>
    return (
        <div className="grid gap-y-5">
            {orders.map(({ node: order }) => (
                <Card key={order.id}>
                    <CardHeader className="flex flex-row items-center justify-between bg-zinc-100 px-6 py-3">
                        <div>
                            <p className="text-xs font-medium">Order Placed</p>
                            <p className="text-sm">
                                {dayjs(order.created_at).format('MMMM DD, YYYY')}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium">Total</p>
                            <p className="text-sm">{formatPrice(order.amount)}</p>
                        </div>

                        <div>
                            <p className="text-xs font-medium">Order</p>
                            <p className="text-sm">#{order.id}</p>
                        </div>
                    </CardHeader>

                    <CardContent className="py-3">
                        <h2 className="col-span-12 text-xl font-semibold">
                            Arrive at Tomorrow 22:00{' '}
                        </h2>
                        <div className="grid grid-cols-12 gap-8 py-3">
                            <div className="col-span-12 flex flex-col gap-5 md:col-span-8">
                                {order.item.edges.map(({ node }) => {
                                    const product = node.products
                                    return (
                                        <div className="flex items-center gap-5" key={node.id}>
                                            <div className="relative h-[120px] w-[120px] min-w-[80px] grow">
                                                <Image
                                                    width={120}
                                                    height={120}
                                                    src={keytoUrl(product.featuredImage.key)}
                                                    alt={product.featuredImage.alt}
                                                    className="h-[120px] w-[120px] object-cover"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    href={`/shop/${product.slug}`}
                                                    className="text-blue-600"
                                                >
                                                    {product.name}
                                                </Link>
                                                <p className="line-clamp-2 leading-tight tracking-tighter">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <section className="col-span-12 flex w-full flex-col gap-3 md:col-span-4">
                                <Link
                                    href={`/orders/${order.id}`}
                                    className={cn(buttonVariants(), 'mb-3')}
                                >
                                    Track package
                                </Link>
                                <Button variant="outline" disabled>
                                    Leave seller feedback
                                </Button>

                                <Button variant="outline" disabled>
                                    write a product review
                                </Button>
                            </section>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default OrdersList
