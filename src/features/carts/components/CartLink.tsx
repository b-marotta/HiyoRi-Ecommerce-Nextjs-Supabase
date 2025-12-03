import React from 'react'

import Link from 'next/link'

import { Icons } from '@/components/layouts/icons'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type CartLinkProps = { productCount: number }

function CartLink({ productCount }: CartLinkProps) {
    return (
        <Link href={'/cart'}>
            <div className="relative h-4 w-4">
                <Icons.cart className="h-4 w-4" aria-label="cart" />
                <Badge
                    className={cn(
                        'absolute -right-2 -top-2 block h-4 w-4 rounded-full p-0 text-center align-middle text-[10px] transition-all duration-200',
                        productCount === 0 ? 'scale-0' : 'scale-100',
                    )}
                >
                    {productCount}
                </Badge>
            </div>
        </Link>
    )
}

export default CartLink
