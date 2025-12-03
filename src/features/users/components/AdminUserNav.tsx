'use client'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function AdminUserNav() {
    return (
        <section className="mb-3 flex justify-end">
            <Link className={cn(buttonVariants())} href="/admin/users/new">
                Create New User
            </Link>
        </section>
    )
}

export default AdminUserNav
