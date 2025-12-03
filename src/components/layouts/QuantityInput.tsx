'use client'
import React from 'react'

import { cn } from '@/lib/utils'

import { Icons } from './icons'

export interface QuantitiyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange?: (...event: any[]) => void
    value: number
    addOneHandler: () => void
    minusOneHandler: () => void
}

const QuantityInput = React.forwardRef<HTMLInputElement, QuantitiyInputProps>(
    ({ onChange, addOneHandler, minusOneHandler, value, className, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'relative flex h-12 max-w-36 items-center justify-between rounded-full border-2 border-input px-4 py-2',
                    className,
                )}
            >
                <input
                    {...props}
                    aria-label="quantity"
                    type="number"
                    value={value}
                    ref={ref}
                    onChange={(event) => onChange(event.target.valueAsNumber)}
                    className="order-2 h-8 w-6 max-w-6 flex-1 text-center shadow-none focus:border-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 active:ring-0"
                />
                <button type="button" className="order-1 text-xl" onClick={minusOneHandler}>
                    <Icons.minus aria-label="minus" />
                </button>
                <button type="button" className="order-3 text-xl" onClick={addOneHandler}>
                    <Icons.add aria-label="add" />
                </button>
            </div>
        )
    },
)

QuantityInput.displayName = 'QuantityInput'

export { QuantityInput }
export default QuantityInput
