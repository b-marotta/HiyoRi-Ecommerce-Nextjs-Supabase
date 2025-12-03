import React, { ReactNode } from 'react'

interface HeaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    heading: string
    description?: string
    children?: ReactNode
}

function SectionHeading({ heading, description, children, ...props }: HeaderProps) {
    return (
        <section className="pb-[30px] pt-[20px]" {...props}>
            <h1 className="mb-8 text-4xl font-semibold">{heading}</h1>
            <p className="mb-2 max-w-4xl text-lg leading-[1.8] tracking-wide text-zinc-700">
                {description}
            </p>
            {/* {children} */}
        </section>
    )
}

export default SectionHeading
