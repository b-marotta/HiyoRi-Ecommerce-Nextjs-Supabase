import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { NavItemWithOptionalChildren } from '@/types'

import Branding from './Branding'
import NewsletterForm from './NewsletterForm'
import SocialMedias from './SocialMedias'

type Props = {}

function MainFooter({}: Props) {
    const footerSiteMap: NavItemWithOptionalChildren[] = [
        {
            title: 'Shop',
            items: [
                {
                    title: 'Furniture',
                    href: '/collections/furniture',
                    items: [],
                },
                {
                    title: 'Lighting',
                    disabled: true,
                    items: [],
                },
                {
                    title: 'Rugs',
                    disabled: true,
                    items: [],
                },
                {
                    title: 'New',
                    disabled: true,
                    items: [],
                },
                {
                    title: 'Sale',
                    disabled: true,
                    items: [],
                },
            ],
        },
        {
            title: 'Customer Service',
            items: [
                {
                    title: 'Shipping & Returns',
                    disabled: true,
                    items: [],
                },
                {
                    title: 'Store Policy',
                    disabled: true,
                    items: [],
                },
                {
                    title: 'Payment Methods',
                    disabled: true,
                    items: [],
                },
                {
                    title: 'FAQ',
                    disabled: true,
                    items: [],
                },
            ],
        },
        {
            title: 'About HIYORI',
            items: [
                {
                    title: 'Our Story',
                    href: 'https://github.com/clonglam/HIYORI-master',
                    items: [],
                },
                {
                    title: 'Brands & Designers',
                    disabled: true,
                    items: [],
                },
                {
                    title: 'Stores',
                    disabled: true,
                    items: [],
                },
                {
                    title: 'Contact',
                    disabled: true,
                    items: [],
                },
            ],
        },
    ]

    return (
        <footer className="bg-muted-background mt-[80px] border-t border-zinc-600 md:mt-[180px]">
            <div className="container pb-10 pt-4 md:pt-8">
                <div className="mb-[80px] hidden grid-cols-5 place-content-between gap-x-[100px] space-y-9 md:grid">
                    <div className="col-span-5 max-w-md lg:col-span-2">
                        <NewsletterForm />
                    </div>

                    <div className="col-span-5 grid max-w-[680px] grid-cols-3 gap-x-6 lg:col-span-3">
                        {footerSiteMap.map(({ title, items }, index) => (
                            <div key={index}>
                                <p className="mb-3 font-semibold">{title}</p>
                                <div className="flex flex-col flex-wrap gap-y-2">
                                    {items?.map((i, index) => (
                                        <Link href={i.href || ''} key={index} className="text-sm">
                                            {i.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-start justify-between gap-x-5 md:flex-row md:items-center">
                    {/* <div className="grid gap-x-5 justify-between items-center"> */}
                    <div className="mb-4 flex flex-col items-start gap-x-5 md:mb-0 md:flex-row md:items-center">
                        <Branding className="text-3xl" />
                        <div className="text-[10px] font-light">
                            <p>{siteConfig.address}</p>
                            <p>
                                {siteConfig.phone} /{' '}
                                <Link
                                    className="hover:text-primary hover:underline"
                                    href={`mailto:${siteConfig.email}`}
                                >
                                    {siteConfig.email}
                                </Link>
                            </p>
                        </div>
                    </div>

                    <SocialMedias containerClassName="mr-12" />
                </div>
            </div>
        </footer>
    )
}

export default MainFooter
