import Link from 'next/link'
import { notFound } from 'next/navigation'

import AdminShell from '@/components/admin/AdminShell'
import { buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/features/cms'
import { CollectionsColumns } from '@/features/collections'
import { gql } from '@/gql'
import { getClient } from '@/lib/urql'
import { cn } from '@/lib/utils'

type AdminCollectionsPageProps = {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const AdminCollectionsPageQuery = gql(/* GraphQL */ `
    query AdminCollectionsPageQuery {
        collectionsCollection(orderBy: [{ title: AscNullsLast }]) {
            edges {
                node {
                    __typename
                    id
                    ...CollectionColumnsFragment
                }
            }
        }
    }
`)

async function collectionsPage({ searchParams }: AdminCollectionsPageProps) {
    const { data } = await getClient().query(AdminCollectionsPageQuery, {})

    if (!data) return notFound()

    return (
        <AdminShell heading="Collections" description={'Edit collections from the dashboard. '}>
            <section className="flex w-full items-center justify-end pb-5">
                <Link href="/admin/collections/new" className={cn(buttonVariants())}>
                    New Collection
                </Link>
            </section>

            <DataTable
                columns={CollectionsColumns}
                data={data.collectionsCollection?.edges || []}
            />
        </AdminShell>
    )
}

export default collectionsPage
