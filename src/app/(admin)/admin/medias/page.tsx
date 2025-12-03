import { Suspense } from 'react'

import AdminShell from '@/components/admin/AdminShell'
import { ImageGridSkeleton, MediasPageContent } from '@/features/medias'

type Props = {}

async function MediasPage({}: Props) {
    return (
        <AdminShell heading="Medias" description="You can add/edit the medias from the dashboard">
            <Suspense fallback={<ImageGridSkeleton />}>
                <MediasPageContent />
            </Suspense>
        </AdminShell>
    )
}

export default MediasPage
