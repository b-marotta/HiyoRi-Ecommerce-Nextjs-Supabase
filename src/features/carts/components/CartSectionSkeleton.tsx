import { Skeleton } from '../../../components/ui/skeleton'

const CartSectionSkeleton = () => (
    <section className="grid grid-cols-12 gap-x-6 gap-y-5" aria-label="Loading Skeleton">
        <div className="col-span-12 max-h-[420px] space-y-8 overflow-y-auto md:col-span-9 md:max-h-[640px]">
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

export default CartSectionSkeleton
