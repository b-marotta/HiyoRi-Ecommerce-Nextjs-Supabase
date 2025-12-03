'use client'
import React, { Suspense } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useFormField } from '@/components/ui/form'
import ImagePreviewCard from '@/features/medias/components/ImagePreviewCard'

import UploadMediaContainer from './UploadMediaContainer'

type Props = {
    onChange: (data: string) => void
    defaultValue?: string
    multiple?: boolean
    modalOpen?: boolean
    value?: string
}

function ImageDialog({ modalOpen = false, onChange, value, defaultValue }: Props) {
    const [dialogOpen, setDialogOpen] = React.useState(modalOpen)
    // const { control, setError, getValues, setValue } = useFormContext()
    // const { fields, remove, append, update, move, swap } = useFieldArray({
    //   control,
    //   name: "",
    // })
    const onClickHandler = (mediaId: string) => {
        onChange(mediaId)
        setDialogOpen(false)
    }

    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger>
                    <div>
                        {value ? (
                            <ImagePreviewCard key={value} onClick={() => {}} mediaId={value} />
                        ) : (
                            'Select / Add Image'
                        )}
                    </div>
                </DialogTrigger>

                <DialogContent className="min-h-full max-w-[1080px] md:min-h-[480px]">
                    <DialogHeader>
                        <DialogTitle className="mb-5">Image Gallery</DialogTitle>
                        <Suspense>
                            <UploadMediaContainer
                                onClickItemsHandler={onClickHandler}
                                defaultImageId={defaultValue}
                            />
                        </Suspense>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ImageDialog
