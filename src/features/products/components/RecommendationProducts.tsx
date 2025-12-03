'use client'
import React from 'react'

import { useQuery } from '@urql/next'

import Header from '@/components/layouts/Header'
import { ProductCard } from '@/features/products'
import { gql } from '@/gql'

import ProductCardSkeleton from './RecommendationProductsSkeleton'

export type RecommendationProductsProps = React.HTMLAttributes<HTMLDivElement> & {}

const RecomendationProductsQuery = gql(/* GraphQL */ `
    query RecomendationProductsQuery($first: Int!) {
        recommendations: productsCollection(first: $first) {
            edges {
                node {
                    id
                    ...ProductCardFragment
                }
            }
        }
    }
`)

function RecommendationProducts({}: RecommendationProductsProps) {
    const [{ data, fetching, error }, refetch] = useQuery({
        query: RecomendationProductsQuery,
        variables: {
            first: 4,
        },
    })

    if (fetching)
        return (
            <Header heading={`We Think You'll Love`}>
                <div className="container grid grid-cols-2 gap-x-8 lg:grid-cols-4">
                    {[...Array(6)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </Header>
        )

    if (!data || error) return <></>

    return (
        <Header heading={`We Think You'll Love`}>
            <div className="container grid grid-cols-2 gap-x-8 lg:grid-cols-4">
                {data.recommendations &&
                    data.recommendations.edges.map(({ node }) => (
                        <ProductCard key={node.id} product={node} />
                    ))}
            </div>
        </Header>
    )
}

export default RecommendationProducts
