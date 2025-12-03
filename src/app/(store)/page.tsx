import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Shell } from '@/components/layouts/Shell'
import { Icons } from '@/components/layouts/icons'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
    CollectionCardFragment,
    CollectionsCard,
    CollectionsCardSkeleton,
} from '@/features/collections'
import { ProductCard, ProductCardFragment, ProductCardSkeleton } from '@/features/products'
import { getCurrentUser } from '@/features/users/actions'
import { DocumentType, gql } from '@/gql'
import { getClient } from '@/lib/urql'
import { cn, keytoUrl } from '@/lib/utils'

const LandingRouteQuery = gql(/* GraphQL */ `
    query LandingRouteQuery($user_id: UUID) {
        products: productsCollection(
            filter: { featured: { eq: true } }
            first: 4
            orderBy: [{ created_at: DescNullsLast }]
        ) {
            edges {
                node {
                    id
                    ...ProductCardFragment
                }
            }
        }

        wishlistCollection(filter: { user_id: { eq: $user_id } }) {
            edges {
                node {
                    product_id
                }
            }
        }

        cartsCollection(filter: { user_id: { eq: $user_id } }) {
            edges {
                node {
                    product_id
                    quantity
                }
            }
        }

        collectionScrollCards: collectionsCollection(
            first: 6
            orderBy: [{ order: DescNullsLast }]
        ) {
            edges {
                node {
                    id
                    ...CollectionCardFragment
                }
            }
        }
    }
`)

export default async function Home() {
    const currentUser = await getCurrentUser()

    const { data } = await getClient().query(LandingRouteQuery, {
        user_id: currentUser?.id,
    })

    if (data === null) return notFound()

    return (
        <main>
            <HeroSection />

            <Shell>
                {data.products && data.products.edges ? (
                    <ProductSubCollectionsCircles collections={data.collectionScrollCards.edges} />
                ) : null}

                {data.products && data.products.edges ? (
                    <FeaturedProductsCards products={data.products.edges} />
                ) : null}

                <CollectionGrid />

                <DifferentFeatureCards />

                <LessIsMoreCard />
            </Shell>
        </main>
    )
}

function HeroSection() {
    return (
        <section className="mx-auto flex h-screen w-full justify-center md:h-[800px]">
            <div className="relative h-full w-full md:h-[800px]">
                <Image
                    alt="Furniture"
                    src="https://hiyori-backpack.s3.us-west-2.amazonaws.com/public/hero-image.jpg"
                    width={1920}
                    height={1200}
                    priority={true}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="container absolute h-screen w-full py-8 md:h-[800px]">
                <div className="z-30 flex h-full flex-col justify-center">
                    <p className="md:text-md text-sm uppercase tracking-widest text-white">
                        hugolam
                    </p>
                    <h1 className="my-4 text-5xl font-bold text-white shadow-md md:text-9xl">
                        Utilized with
                        <br />
                        GraphQL:
                    </h1>

                    <div className="max-w-screen mt-5 flex space-x-4">
                        <Link
                            href="/shop"
                            className={cn(
                                buttonVariants({ variant: 'outline', size: 'lg' }),
                                'rounded border-2 border-white px-8 py-3 text-white',
                                'md:px-16 md:py-6',
                                'hover:bg-white hover:text-zinc-600',
                            )}
                        >
                            New in
                        </Link>

                        <Link
                            href="https://github.com/clonglam/HIYORI-master"
                            target="_blank"
                            className={cn(
                                buttonVariants({ variant: 'default', size: 'lg' }),
                                'rounded border-2 border-primary px-8 py-3 text-white',
                                'md:px-16 md:py-6',
                            )}
                        >
                            View the Code
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

interface FeaturedProductsCards {
    products: { node: DocumentType<typeof ProductCardFragment> }[]
}

interface CollectionsCardsProps {
    collections: { node: DocumentType<typeof CollectionCardFragment> }[]
}

function ProductSubCollectionsCircles({ collections }: CollectionsCardsProps) {
    return (
        <section className="flex items-center justify-start gap-x-10 overflow-auto py-12">
            {collections.map(({ node }) => (
                <Link href={`/collections/${node.slug}`} key={`collection_circle_${node.id}`}>
                    <div
                        className={cn(
                            'relative flex items-center justify-center rounded-full bg-secondary',
                            'h-[280px] w-[280px]',
                            // "md:w-[320px] md:h-[320px]"
                            // "lg:w-[360px] lg:h-[360px]"
                        )}
                    >
                        <Image
                            src={keytoUrl(node.featuredImage.key)}
                            alt={node.featuredImage.alt}
                            width={320}
                            height={320}
                            className={cn(
                                'object-cover object-center transition-all duration-500 hover:scale-105',
                                'h-[240px] w-[240px]',
                                // "md:w-[280px] md:h-[280px]",
                                // "lg:w-[320px] lg:h-[320px]"
                            )}
                        />
                    </div>
                    <p className="mt-3 text-center font-semibold text-black">{node.label}</p>
                </Link>
            ))}
        </section>
    )
}

interface FeaturedProductsCardsProps {
    products: { node: DocumentType<typeof ProductCardFragment> }[]
}

function FeaturedProductsCards({ products }: FeaturedProductsCardsProps) {
    return (
        <section className="container mt-12">
            <div className="">
                <h2 className="mb-1 text-2xl font-semibold md:mb-3 md:text-3xl">
                    Featured Products
                </h2>
                <p className="md:text-md mb-2 max-w-4xl text-sm leading-[1.5] tracking-[-2%]">
                    Ideas to help Bring Home to Life based on your recently viewed products. Share
                    your space on Instagram and tag @Penpengrian
                </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-12 overflow-auto py-5 md:grid-cols-4">
                <Suspense
                    fallback={[...Array(4)].map((_, index) => (
                        <ProductCardSkeleton key={`Product-Skeleton-${index}`} />
                    ))}
                >
                    {products.map(({ node }) => (
                        <ProductCard key={`product-card-${node.id}`} product={node} />
                    ))}
                </Suspense>
            </div>
        </section>
    )
}

function CollectionGrid() {
    return (
        <section className="relative grid max-h-[840px] grid-cols-1 space-y-5 lg:grid-cols-3 lg:space-x-5 lg:space-y-0">
            <div className="relative col-span-2 h-[840px] w-full">
                <Image
                    src={keytoUrl('public/zPiCx79oGe5X4rVBLg0Ss.jpeg')}
                    width={1080}
                    height={1080}
                    className="h-full w-full object-cover"
                    alt="1"
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-zinc-800/20 text-white">
                    <p className="mb-3 text-5xl">Bath Room</p>
                    <p className="mb-8 font-light">Designed for enhanchment</p>
                    <Link
                        className={cn(buttonVariants({ size: 'lg' }), 'px-10 py-8 text-xl')}
                        href={'/collections/bathroom'}
                    >
                        DiscoverNow
                    </Link>
                </div>
            </div>

            <div className="flex h-[840px] w-full flex-col space-y-5">
                <div className="relative h-[340px] w-full">
                    <Image
                        src={keytoUrl('public/E2MWE99uGyOZLd76UEixy.jpeg')}
                        width={800}
                        height={900}
                        className="h-full w-full object-cover"
                        alt="1"
                    />
                </div>

                <div className="relative overflow-hidden">
                    <Image
                        src={keytoUrl('public/YPO3VwJvjvlkWzNtIv9FS.jpeg')}
                        width={800}
                        height={900}
                        className="h-full w-full object-cover"
                        alt="1"
                    />
                </div>
            </div>
        </section>
    )
}

function CollectionRectCard({ collections }: CollectionsCardsProps) {
    return (
        <ScrollArea className="container relative whitespace-nowrap">
            <div className="flex w-max space-x-10 overflow-auto py-5">
                <Suspense
                    fallback={[...Array(6)].map((_, index) => (
                        <CollectionsCardSkeleton key={`Collections-sekelton-${index}`} />
                    ))}
                >
                    {collections.map(({ node }) => (
                        <CollectionsCard collection={node} key={node.id} />
                    ))}
                </Suspense>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

function DifferentFeatureCards() {
    const features = [
        {
            Icon: Icons.cart,
            title: 'Responsible Design',
            description: 'Designed with integrity and durably crafted for everyday use.',
        },
        {
            Icon: Icons.tag,
            title: 'Transparent Pricing',
            description:
                'We believe in accessible pricing and full transparency. Our pricing model is an open book.',
        },
        {
            Icon: Icons.package,
            title: 'Sustainable Sourcing',
            description: 'We only partner with people who put the earth, and its people, first.',
        },
        {
            Icon: Icons.award,
            title: 'Giving Back',
            description:
                'Thanks to Mealshare, every purchase directly donates a meal to a youth in need.',
        },
    ]
    return (
        <section className="mx-auto grid grid-cols-1 gap-x-5 gap-y-8 pt-5 md:grid-cols-2 md:gap-x-12 lg:grid-cols-4">
            {features.map(({ Icon, title, description }, index) => (
                <div className="max-w-[18rem] text-center" key={`FeatureCards_${index}`}>
                    <div className="flex items-center justify-center p-5">
                        <Icon width={45} height={45} className="mb-5 font-light text-zinc-400" />
                    </div>

                    <h4 className="mb-3 font-serif text-xl font-extralight">{title}</h4>
                    <p className="text-lg text-muted-foreground">{description}</p>
                </div>
            ))}
        </section>
    )
}

function LessIsMoreCard() {
    return (
        <section className="mx-auto my-16 grid h-[620px] max-w-[1920px] grid-cols-12 bg-[#FFF8EE] md:h-[580px]">
            <div className="relative col-span-12 h-[340px] w-full overflow-hidden md:col-span-8 md:h-[580px]">
                <Image
                    src={'/assets/cutingcardImage.jpg'}
                    alt=""
                    fill
                    className="object-cover object-center"
                />
            </div>

            <div className="col-span-12 px-6 pb-6 md:col-span-4 md:px-16 md:py-20">
                <h2 className="mb-3 text-xl font-semibold md:text-3xl">Less is More. Minimal.</h2>
                <p className="mb-5 max-w-md text-left text-xs leading-[1.5] tracking-tight md:mb-12 md:text-lg">
                    We believe no one should have to choose between the quality they want, and the
                    price they can afford. That’s why we make sure our products stand up to only the
                    highest quality and sustainability standards - and produce them in a way that
                    keeps great design affordable for everyone.
                </p>
                <Link
                    href="/shop"
                    className={cn(buttonVariants(), 'md:text-md rounded-full text-xs')}
                >
                    Shop now
                </Link>
            </div>
        </section>
    )
}
