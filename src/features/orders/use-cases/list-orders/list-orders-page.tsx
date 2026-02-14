import dayjs from 'dayjs'
import 'dayjs/locale/fr-ca'
import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useListOrders } from './use-list-orders.use-case'
import {
  ORDER_TYPE_LABELS,
  ORDER_STATUS_LABELS,
} from '@/features/orders/domain/order.types'
import type { OrderStatus } from '@/features/orders/domain/order.types'

const STATUS_VARIANT: Record<OrderStatus, 'default' | 'secondary' | 'outline'> = {
  open: 'default',
  in_progress: 'secondary',
  completed: 'outline',
}

function formatDate(iso: string): string {
  return dayjs(iso).locale('fr-ca').format('D MMMM YYYY')
}

export function ListOrdersPage() {
  const { orders, isPending, error } = useListOrders()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commandes</h1>
        <Button asChild>
          <Link to="/admin/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle commande
          </Link>
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      {isPending ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground">Aucune commande pour le moment.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Date cible</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Créé le</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{ORDER_TYPE_LABELS[order.type]}</TableCell>
                <TableCell>{formatDate(order.targetDate)}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[order.status]}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.description || '—'}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(order.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
