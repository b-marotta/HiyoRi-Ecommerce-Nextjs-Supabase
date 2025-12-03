import { Suspense } from 'react'

import Link from 'next/link'

import { UserNav } from '@/features/auth'
import { cn } from '@/lib/utils'

import { CartLink, CartNav } from '../../features/carts'
import Branding from './Branding'
import MobileNavbar from './MobileNavbar'
import SearchInput from './SearchInput'
import { SideMenu } from './SideMenu'
import { Icons } from './icons'

interface MainNavbarProps {
    adminLayout?: boolean
}

async function MainNavbar({ adminLayout = false }: MainNavbarProps) {
    return (
        <nav className="fixed z-50 w-full bg-background/95">
            <div
                className={cn(adminLayout ? 'mx-auto max-w-[2500px] px-[3rem] py-3' : 'container')}
            >
                <div className="hidden items-center justify-between gap-x-8 md:flex">
                    {/* Menu & branding */}
                    <div className="flex items-center gap-x-3">
                        <SideMenu />
                        <Branding />
                    </div>

                    {adminLayout ? (
                        <></>
                    ) : (
                        <Suspense>
                            <SearchInput />
                        </Suspense>
                    )}

                    {/* Nav Action */}
                    <div className="relative flex items-center gap-x-5">
                        <Suspense>
                            <UserNav />
                        </Suspense>

                        <Link href={'/wish-list'}>
                            <Icons.heart className="h-4 w-4" aria-label="wishlist" />
                        </Link>

                        <Suspense fallback={<CartLink productCount={0} />}>
                            {!adminLayout && <CartNav />}
                        </Suspense>
                    </div>
                </div>

                <MobileNavbar adminLayout={adminLayout} />
            </div>
        </nav>
    )
}

export default MainNavbar
