import React from 'react'

import Link from 'next/link'

import { Icons } from '@/components/layouts/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function EmptyCart() {
    return (
        <section className="flex min-h-[450px] w-full flex-col items-center justify-center gap-5 border border-foreground">
            <p className="text-sm text-muted-foreground">Your Cart is empty.</p>
            <Link href="/shop" className={cn(buttonVariants({ size: 'lg' }), 'font-semibold')}>
                <Icons.cart className="mr-3 h-5 w-5" />
                Continue shopping
            </Link>
        </section>
    )
}

export default EmptyCart
