import React from 'react'

import Image from 'next/image'

import { DocumentType, gql } from '@/gql'
import { keytoUrl } from '@/lib/utils'

const CollectionBannerFragment = gql(/* GraphQL */ `
    fragment CollectionBannerFragment on collections {
        id
        label
        slug
        featuredImage: medias {
            id
            key
            alt
        }
    }
`)

function CollectionBanner({
    collectionBannerData,
}: {
    collectionBannerData: DocumentType<typeof CollectionBannerFragment>
}) {
    const { label, featuredImage } = collectionBannerData
    return (
        <div className="md:container-2xl relative mx-auto mb-8 h-[220px] w-full overflow-hidden object-cover object-center md:h-[280px]">
            <Image
                src={keytoUrl(featuredImage.key)}
                alt={featuredImage.alt}
                width={720}
                height={400}
                className="h-[290px] w-full object-cover object-center opacity-50"
            />
            <h1 className="z-8 absolute bottom-8 left-8 text-2xl font-medium md:text-5xl">
                {label}
            </h1>
        </div>
    )
}

export default CollectionBanner
