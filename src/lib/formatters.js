export function formatCurrency(value, currency = 'ARS') {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

export const projectStatusLabels = {
  descubrimiento: 'Descubrimiento',
  planificacion: 'Planificacion',
  diseno: 'Diseno',
  desarrollo: 'Desarrollo',
  revision: 'Revision',
  listo_para_entrega: 'Listo para entrega',
  entregado: 'Entregado',
}

export const paymentMethodLabels = {
  mercado_pago: 'Mercado Pago',
  transferencia: 'Transferencia',
  visa: 'Visa',
}

export const paymentStatusLabels = {
  pending: 'Pendiente',
  paid: 'Pagado',
  cancelled: 'Cancelado',
}

export function formatDate(value) {
  if (!value) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
