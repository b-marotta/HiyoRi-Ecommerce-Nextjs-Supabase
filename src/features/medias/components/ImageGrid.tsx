'use client'
import { ReactNode } from 'react'

import Image from 'next/image'

import { Spinner } from '@/components/ui/spinner'
import { DocumentType, gql } from '@/gql'
import { cn, keytoUrl } from '@/lib/utils'
import { FileWithPreview } from '@/types'

type ImagesGridProps = {
    AddMediaButtonComponent?: ReactNode
    UploadingMediaComponent?: ReactNode
    containerClassName?: string
    defaultImageId?: string
    onClickHandler?: (mediaId: string) => void
    uploadingFiles?: FileWithPreview[]
    medias: { node: DocumentType<typeof ImageGridFragment> }[]
}

function ImagesGrid({
    AddMediaButtonComponent,
    containerClassName,
    onClickHandler,
    defaultImageId,
    medias,
    UploadingMediaComponent,
    uploadingFiles = [],
}: ImagesGridProps) {
    return (
        <div
            className={cn(
                'mx-auto grid max-w-[1200px] grid-cols-3 gap-x-3 gap-y-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8',
                containerClassName,
            )}
        >
            {AddMediaButtonComponent}
            {UploadingMediaComponent}

            {uploadingFiles.map((file, index) => (
                <div
                    key={`uploadingImage_${index}`}
                    className="relative h-[120px] w-[120px] opacity-50"
                >
                    <Image
                        width={120}
                        height={120}
                        src={file.preview}
                        alt={`uploadingImage_${index}`}
                        className="h-[100px] w-[100px] object-cover"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                        <Spinner />
                    </div>
                </div>
            ))}

            {medias.map(({ node: media }) => (
                <button
                    key={media.id}
                    type="button"
                    className={cn(
                        'group relative h-[120px] w-[120px] object-center',
                        defaultImageId === media.id && 'ring-2 ring-offset-2',
                    )}
                    onClick={() => onClickHandler(media.id)}
                >
                    <Image
                        src={keytoUrl(media.key)}
                        alt={media.alt}
                        width={120}
                        height={120}
                        className={cn(
                            'h-[120px] w-[120px] object-cover transition-all duration-300 group-hover:opacity-30',
                        )}
                    />
                </button>
            ))}
        </div>
    )
}

export default ImagesGrid

export const ImageGridFragment = gql(/* GraphQL */ `
    fragment ImageGridFragment on medias {
        id
        key
        alt
    }
`)
