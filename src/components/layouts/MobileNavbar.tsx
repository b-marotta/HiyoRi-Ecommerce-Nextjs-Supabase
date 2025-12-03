import { Suspense } from 'react'

import CartLink from '../../features/carts/components/CartLink'
import CartNav from '../../features/carts/components/CartNav'
import Branding from './Branding'
import MobileSearchInput from './MobileSearchInput'
import { SideMenu } from './SideMenu'

type Props = { adminLayout: boolean }

function MobileNavbar({ adminLayout }: Props) {
    return (
        <div className="flex h-[64px] items-center justify-between gap-x-8 md:hidden">
            <div className="flex items-center gap-x-3">
                <SideMenu />
                <MobileSearchInput />
            </div>

            <Branding />
            <Suspense fallback={<CartLink productCount={0} />}>
                {!adminLayout && <CartNav />}
            </Suspense>
        </div>
    )
}

export default MobileNavbar
