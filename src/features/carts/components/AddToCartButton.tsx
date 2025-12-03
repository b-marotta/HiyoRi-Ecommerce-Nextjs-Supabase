'use client'

import { Suspense } from 'react'

import { Icons } from '@/components/layouts/icons'
import { Button, ButtonProps } from '@/components/ui/button'
import { useAuth } from '@/providers/AuthProvider'

import useCartActions from '../hooks/useCartActions'

interface AddToCartButtonProps extends ButtonProps {
    productId: string
    quantity?: number
    cartId?: string
}

function AddToCartButton({ productId, quantity = 1 }: AddToCartButtonProps) {
    const { user } = useAuth()
    const { addProductToCart } = useCartActions(user, productId)

    return (
        <Suspense>
            <Button className="h-8 w-8 rounded-full p-0" onClick={() => addProductToCart(quantity)}>
                <Icons.basket className="h-5 w-5 md:h-4 md:w-4" />
            </Button>
        </Suspense>
    )
}

export default AddToCartButton
