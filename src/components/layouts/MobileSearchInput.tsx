'use client'
import React, { useState } from 'react'

import { Button } from '../ui/button'
import SearchInput from './SearchInput'
import { Icons } from './icons'

type Props = {}

function MobileSearchInput({}: Props) {
    const [openSearchBar, setOpenSearchBar] = useState(false)
    return (
        <>
            {openSearchBar ? (
                <div className="container absolute w-full max-w-xl">
                    <div className="relative">
                        <Icons.chevronLeft className="absolute left-5 top-0" size={14} />
                        <SearchInput />
                    </div>
                </div>
            ) : (
                <Button onClick={() => setOpenSearchBar(true)}>
                    <Icons.search size={18} />
                </Button>
            )}
        </>
    )
}

export default MobileSearchInput
