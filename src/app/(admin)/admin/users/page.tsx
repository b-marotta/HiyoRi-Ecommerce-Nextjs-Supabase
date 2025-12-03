import AdminShell from '@/components/admin/AdminShell'
import ErrorToaster from '@/components/layouts/ErrorToaster'
import { ProductsDataTable } from '@/features/products'
import { AdminUserNav, UsersColumns, getCurrentUser, listUsers } from '@/features/users'

// TODO: CREATE New Data Table for golbaluse

type AdminUsersPageProps = {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

async function UsersPage({ searchParams }: AdminUsersPageProps) {
    const currentUser = await getCurrentUser()

    const users = await listUsers({})

    return (
        <AdminShell heading="Users" description="Edit/Create new user by admin.">
            <AdminUserNav />
            <ProductsDataTable columns={UsersColumns} data={users || []} />
            <ErrorToaster />
        </AdminShell>
    )
}

export default UsersPage
