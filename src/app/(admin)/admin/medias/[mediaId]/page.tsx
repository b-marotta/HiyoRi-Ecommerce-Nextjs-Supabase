import React from 'react'

import { redirect } from 'next/navigation'

type Props = {}

function MediaPage({}: Props) {
    redirect('/admin/medias')
    return <div>MediaPage</div>
}

export default MediaPage
