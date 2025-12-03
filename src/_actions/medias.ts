'use server'

import { eq } from 'drizzle-orm'

import db from '@/lib/supabase/db'
import { productMedias } from '@/lib/supabase/schema'

export async function getMedia(id: string) {
    return await db.query.medias.findFirst({ where: eq(productMedias.id, id) })
}
