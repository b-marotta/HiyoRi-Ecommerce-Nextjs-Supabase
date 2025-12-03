import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getMedia } from '@/_actions/medias'
import Modal from '@/components/ui/Modal'
import { UpdateMediaForm } from '@/features/medias'
import { keytoUrl } from '@/lib/utils'

type Props = { params: { mediaId: string } }

async function EditMediaModals({ params: { mediaId } }: Props) {
    // TODO: Change from server Action to GrahpQL
    const media = await getMedia(mediaId)
    if (!media) return notFound()

    return (
        <Modal header="Modify Image" containerClassName="px-5">
            <div className="flex flex-col gap-x-5 gap-y-5 md:flex-row">
                <div className="w-[640px] flex-1">
                    <Image
                        src={keytoUrl(media.key)}
                        alt={media.alt}
                        width={640}
                        height={640}
                        className="h-auto w-full max-w-[640px] object-cover"
                    />
                </div>
                <div className="border-t border-zinc-600 pt-5 md:border-l md:border-t-0">
                    <UpdateMediaForm media={media} />
                </div>
            </div>
        </Modal>
    )
}

export default EditMediaModals
