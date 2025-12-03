import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

function ImageGridSkeleton() {
    return (
        <div className="mx-auto grid h-[560px] max-w-[1200px] grid-cols-3 gap-x-3 gap-y-5 overflow-hidden md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
            {[...Array(30)].map((_, index) => (
                <Skeleton className="h-[120px] w-[120px]" key={`skeleton ${index}`} />
            ))}
        </div>
    )
}

export default ImageGridSkeleton
