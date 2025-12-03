import React, { ReactNode } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

import CloseButton from './CloseButton'

type Props = {
    header: string
    children: ReactNode
    containerClassName?: string
}

function Modal({ header, containerClassName, children }: Props) {
    return (
        <section
            className={cn(
                'fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50',
            )}
        >
            <Card
                className={cn(
                    'container relative inset-0 top-20 mx-auto min-h-[480px] w-full max-w-full rounded-md border bg-white p-5 shadow-lg md:inset-20 md:max-w-2xl lg:max-w-[960px] xl:max-w-[1080px]',
                    containerClassName,
                )}
            >
                <CardHeader className="mb-3 p-0 md:mb-5">
                    <h1 className="text-lg font-semibold leading-5 tracking-tight">{header}</h1>
                    <CloseButton />
                </CardHeader>

                <CardContent className="relative mb-5 overflow-hidden p-0">{children}</CardContent>
            </Card>
        </section>
    )
}

export default Modal
