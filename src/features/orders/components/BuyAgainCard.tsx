'use client'
import Image from 'next/image'
import Link from 'next/link'

import { DocumentType, gql } from '@/gql'
import { keytoUrl } from '@/lib/utils'

import { Card, CardContent, CardHeader } from '../../../components/ui/card'

type BuyAgainCardProps = {
    products: DocumentType<typeof BuyAgainCardFragment>[]
}

export const BuyAgainCardFragment = gql(/* GraphQL */ `
    fragment BuyAgainCardFragment on productsEdge {
        node {
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
`)

function BuyAgainCard({ products }: BuyAgainCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between bg-zinc-100 px-6 py-3">
                <h2 className="text-lg">Buy again</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5 py-5">
                {products.map(({ node }) => (
                    <div key={node.id} className="grid grid-cols-5">
                        <div className="relative col-span-2">
                            <Image
                                src={keytoUrl(node.featuredImage.key)}
                                alt={node.featuredImage.alt}
                                className="h-[80px] w-[80px] object-cover"
                                width={80}
                                height={80}
                            />
                        </div>

                        <div className="col-span-3">
                            <Link
                                href={'/shop/' + node.slug}
                                className="line-clamp-3 text-blue-500"
                            >
                                {node.name}
                            </Link>
                            <Link href={node.slug} className="text-red-700">
                                <p>${node.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default BuyAgainCard
