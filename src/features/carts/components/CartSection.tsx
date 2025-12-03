'use client'
import { useAuth } from '@/providers/AuthProvider'

import GuestCartSection from './GuestCartSection'
import UserCartSection from './UserCartSection'

function CartSection() {
    const { user } = useAuth()

    return <>{user ? <UserCartSection user={user} /> : <GuestCartSection />}</>
}

export default CartSection
