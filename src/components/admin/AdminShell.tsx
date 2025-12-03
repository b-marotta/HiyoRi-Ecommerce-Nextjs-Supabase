import React, { ReactNode } from 'react'

import Link from 'next/link'

import BackButton from '../layouts/BackButton'
import { Icons } from '../layouts/icons'
import { Button } from '../ui/button'

type AdminShellProps = {
    heading: string
    description: string
    showBackButton?: boolean
    children: ReactNode
}

function AdminShell({ heading, description, showBackButton, children }: AdminShellProps) {
    return (
        <section>
            <div className="mb-5 flex gap-x-3 border-b pb-3">
                {showBackButton && <BackButton />}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 w-[480px] text-2xl font-semibold leading-tight">
                            {heading}
                        </h1>
                        <p className="text-md w-[580px] max-w-xl leading-tight text-zinc-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {children}
        </section>
    )
}

export default AdminShell
