import React from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

type Props = { className?: string }

function Branding({ className }: Props) {
    return (
        <Link href="/" className={cn('align-middle text-2xl font-medium', className)}>
            HIYORI
        </Link>
    )
}

export default Branding
