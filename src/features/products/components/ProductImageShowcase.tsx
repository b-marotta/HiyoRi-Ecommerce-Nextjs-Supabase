'use client'
import React, { useState } from 'react'

import Image from 'next/image'

import { DocumentType, gql } from '@/gql'
import { keytoUrl } from '@/lib/utils'

import { Icons } from '../../../components/layouts/icons'

type ProductImageShowcaseProps = React.HTMLAttributes<HTMLDivElement> & {
    data: DocumentType<typeof ProductImageShowcaseFragment>
}

const ProductImageShowcaseFragment = gql(/* GraphQL */ `
    fragment ProductImageShowcaseFragment on products {
        id
        featuredImage: medias {
            id
            key
            alt
        }

        images: product_mediasCollection(orderBy: [{ priority: DescNullsLast }]) {
            edges {
                node {
                    media {
                        id
                        key
                        alt
                    }
                }
            }
        }
    }
`)

function ProductImageShowcase({ data }: ProductImageShowcaseProps) {
    const allImages = [
        data.featuredImage,
        ...(data.images?.edges.map(({ node }) => node.media) || []),
    ]

    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const nextImage = () => {
        if (activeImageIndex < allImages.length - 1) {
            setActiveImageIndex((prevIndex) => prevIndex + 1)
        }
    }

    // Function to navigate to the previous image
    const prevImage = () => {
        if (activeImageIndex > 0) {
            setActiveImageIndex((prevIndex) => prevIndex - 1)
        }
    }
    return (
        <section className="flex flex-col items-center gap-x-8 gap-y-5 md:flex-row">
            {/* Active Image Display */}
            <div className="order-1 w-full max-w-2xl grow md:order-3">
                {allImages[activeImageIndex] && (
                    <Image
                        src={keytoUrl(allImages[activeImageIndex].key)}
                        alt={allImages[activeImageIndex].alt || 'Product image'}
                        className="mb-5 aspect-square h-auto w-full object-cover"
                        width={1024}
                        height={1024}
                    />
                )}
            </div>

            {/* Thumbnails */}
            <div className="relative order-2 h-full w-full overflow-x-auto md:w-[100px]">
                <div className="gapy-y-5 order-2 flex flex-row justify-center gap-x-5 overflow-x-auto md:flex-col">
                    {allImages.map((image, index) => (
                        <Image
                            key={image.id}
                            src={keytoUrl(image.key)}
                            alt={image.alt || 'Product image thumbnail'}
                            width={100}
                            height={100}
                            className={`aspect-[1/1] cursor-pointer object-cover p-1 ${activeImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                            onClick={() => setActiveImageIndex(index)}
                        />
                    ))}
                </div>

                <div className="block md:hidden">
                    <button
                        onClick={prevImage}
                        className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-gray-800 p-2 text-white"
                    >
                        <Icons.chevronLeft />
                    </button>

                    <button
                        onClick={nextImage}
                        className="md:top-unset absolute right-0 top-1/2 -translate-y-1/2 transform bg-gray-800 p-2 text-white"
                    >
                        <Icons.chevronRight />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductImageShowcase
