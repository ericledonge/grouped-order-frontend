import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin/orders')({
  component: AdminOrdersPage,
})

function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Commandes</h1>
      <p className="text-muted-foreground mt-2">
        Bientôt disponible.
      </p>
    </div>
  )
}
