'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'
import { Icons } from './icons'

function BackButton() {
    const router = useRouter()
    return (
        <Button onClick={() => router.back()} className="" variant="link">
            <Icons.chevronLeft />
        </Button>
    )
}

export default BackButton
