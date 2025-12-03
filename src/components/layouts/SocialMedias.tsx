import React from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from './icons'

type Props = {
    containerClassName?: string
    itemsClassName?: string
}

function SocialMedias({ containerClassName, itemsClassName }: Props) {
    return (
        <div className={cn('flex gap-x-5', containerClassName)}>
            <Link href="https://github.com/clonglam/HIYORI-master" target="_blank">
                <Icons.gitHub
                    className={cn(
                        'h-4 w-4 text-muted-foreground hover:text-primary md:h-5 md:w-5',
                        itemsClassName,
                    )}
                />
            </Link>

            <Link href="https://twitter.com/ClongLam" target="_blank">
                <Icons.twitter
                    className={cn(
                        'h-4 w-4 text-muted-foreground hover:text-primary md:h-5 md:w-5',
                        itemsClassName,
                    )}
                />
            </Link>

            <Link href="https://hugo-coding.com" target="_blank">
                <Icons.globe
                    className={cn(
                        'h-4 w-4 text-muted-foreground hover:text-primary md:h-5 md:w-5',
                        itemsClassName,
                    )}
                />
            </Link>
        </div>
    )
}

export default SocialMedias
