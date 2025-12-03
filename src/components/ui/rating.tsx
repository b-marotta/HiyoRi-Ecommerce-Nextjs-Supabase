import React from 'react'

import { cn } from '@/lib/utils'

import { Icons } from '../layouts/icons'

type Props = {
    readOnly?: boolean
    value: number
    precision: number
}

export interface RatingProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readOnly?: boolean
    value: number
    precision: number
    max?: number
}

const Rating = React.forwardRef<HTMLInputElement, RatingProps>(
    ({ className, value, max = 5, ...props }, ref) => {
        return (
            <div aria-label="" ref={ref} className={cn('flex')}>
                {[...Array(max)].map((_, index) => (
                    <Icons.star
                        size={12}
                        key={index}
                        className={index < value ? 'fill-foreground' : 'fill-none'}
                    />
                ))}
            </div>
        )
    },
)

Rating.displayName = 'Rating'

export { Rating }
