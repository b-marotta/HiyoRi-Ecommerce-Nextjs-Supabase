'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'

import Branding from './Branding'
import SocialMedias from './SocialMedias'
import { Icons } from './icons'

export function SideMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="p-0">
                    <Icons.menu />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="left"
                className="w-full pr-[4rem] md:max-w-xl"
                closeButtonClassName="w-6 h-6 md:w-10 md:h-10"
            >
                <div className="ml-12 mt-[120px] grid gap-y-3 py-8 md:ml-[96px]">
                    {siteConfig.mainNav.map(({ title, href }, index) => (
                        <Link key={index} href={href} className="text-xl md:text-3xl">
                            {title}
                        </Link>
                    ))}
                </div>

                <SheetFooter className="fixed bottom-[96px] ml-12 grid space-x-0 md:ml-[96px]">
                    <Branding className="text-xl md:mb-3 md:text-4xl" />

                    <div className="mb-8 text-muted-foreground">
                        <p className="ml-0 text-xs md:text-sm">{siteConfig.address}</p>
                        <p className="ml-0 text-xs md:text-sm">
                            <span>{siteConfig.phone}</span> {` / `}
                            <Link
                                className="hover:text-primary hover:underline"
                                href={`mailto:${siteConfig.email}`}
                            >
                                {siteConfig.email}
                            </Link>
                        </p>
                    </div>

                    <SocialMedias />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
