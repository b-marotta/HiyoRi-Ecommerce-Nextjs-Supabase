// TagsInput.tsx
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

import { Icons } from '../layouts/icons'
import { Badge } from './badge'
import { Input } from './input'

interface TagsInputProps {
    tags: string[]
    setTags: (newTags: string[]) => void
    onBlur: () => void
    placeholder?: string
}

const TagsInput: FC<TagsInputProps> = ({ tags, setTags, onBlur, placeholder }) => {
    const [input, setInput] = useState<string>('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const addTag = () => {
        if (input && !tags.includes(input)) {
            // Prevent adding duplicates and empty tags
            setTags([...tags, input])
            setInput('') // Clear input field after adding
        }
    }

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault() // Prevent form submission
            addTag()
        }
    }

    // Call onBlur when the input loses focus
    const handleBlur = () => {
        onBlur()
    }

    return (
        <div className="relative flex flex-wrap items-center gap-x-3 gap-y-4 border border-black p-2">
            {tags.map((tag, index) => (
                <Badge key={index} className="rounded-full">
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-white"
                    >
                        <Icons.close height={10} width={10} />
                    </button>
                </Badge>
            ))}

            <Input
                variant="ghost"
                className="mx-2 h-6 w-12 flex-grow"
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || 'Project Tag'}
                onBlur={handleBlur} // Notify React Hook Form on blur
            />
            <button type="button" onClick={addTag}>
                {/* Add Tag */}
            </button>
        </div>
    )
}

export default TagsInput
