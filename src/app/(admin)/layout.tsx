import { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import MainFooter from '@/components/layouts/MainFooter'
import Navbar from '@/components/layouts/MainNavbar'
import { getCurrentUser, isAdmin } from '@/features/users/actions'

type Props = { children: ReactNode }

async function AdminLayout({ children }: Props) {
    const currentUser = await getCurrentUser()

    if (!isAdmin(currentUser)) redirect(`/sign-in?error=Only authenticated users can access`)

    return (
        <main>
            <Navbar adminLayout={true} />
            {children}
            <MainFooter />
        </main>
    )
}

export default AdminLayout
