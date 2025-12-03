import React, { ReactNode } from 'react'

interface HeaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    heading: string
    description?: string
    children?: ReactNode
}

function Header({ heading, description, children, ...props }: HeaderProps) {
    return (
        <section className="pb-[30px] pt-[80px]" {...props}>
            <h1 className="mb-8 text-center text-2xl font-semibold">{heading}</h1>
            <p className="md:text-md mb-2 max-w-4xl text-sm leading-[1.5] tracking-[-2%]">
                {description}
            </p>
            {children}
        </section>
    )
}

export default Header
