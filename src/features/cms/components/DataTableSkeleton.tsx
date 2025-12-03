import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

function DataTableSkeleton() {
    return (
        <div className="flex w-full flex-col gap-y-3 border p-2">
            <div className="grid grid-cols-8 gap-x-5">
                <Skeleton className="h-6" />
                <Skeleton className="col-span-3 h-6" />
                <Skeleton className="col-span-2 h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
            </div>

            <Skeleton className="h-8" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
        </div>
    )
}

export default DataTableSkeleton
