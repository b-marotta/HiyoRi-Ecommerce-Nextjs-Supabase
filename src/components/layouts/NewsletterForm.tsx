'use client'
import React from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

function NewsletterForm() {
    return (
        <form className="">
            <h3 className="mb-5 text-xl font-light">Sign up to Our Newsletter</h3>
            <div className="mb-5 space-y-3">
                <Label>Email*</Label>
                <Input placeholder="Email" />
            </div>
            <Button type="submit" variant={'outline'} size="lg">
                Submit
            </Button>
        </form>
    )
}

export default NewsletterForm
