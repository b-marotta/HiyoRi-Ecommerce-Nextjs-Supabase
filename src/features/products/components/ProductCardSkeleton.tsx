import { Skeleton } from '@/components/ui/skeleton'

export const ProductCardSkeleton = () => (
    <div className="w-full rounded-lg border">
        <Skeleton className="mb-5 h-[400px] w-full" />
        <div className="mb-8 space-y-2 px-5">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 w-[160px]" />
            <Skeleton className="h-4 w-[80px]" />
        </div>
    </div>
)

export default ProductCardSkeleton
