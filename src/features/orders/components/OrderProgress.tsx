'use client'
import React from 'react'

import { Progress } from '@/components/ui/progress'

type Props = {}

function OrderProgress({}: Props) {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(18), 200)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section className="relative min-h-[120px] w-[80%] py-8 text-center">
            <div className="absolute left-0 z-30 h-5 w-5 rounded-full bg-muted-foreground" />
            <div className="absolute left-1/3 z-30 h-5 w-5 rounded-full bg-zinc-200" />
            <div className="absolute left-2/3 z-30 h-5 w-5 rounded-full bg-zinc-200" />
            <div className="absolute right-0 z-30 h-5 w-5 rounded-full bg-zinc-200" />

            <div className="absolute bottom-0 h-12 w-full">
                <span className="absolute left-0 -translate-x-1/2 text-center">Ordered</span>
                <div className="absolute left-1/3 -translate-x-1/2">Shipped</div>
                <div className="absolute left-2/3 -translate-x-1/2">Out for delivery</div>
                <div className="absolute right-0 translate-x-1/2">Delivered</div>
            </div>
            <Progress value={progress} className="my-2" />
        </section>
    )
}

export default OrderProgress
