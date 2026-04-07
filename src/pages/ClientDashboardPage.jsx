import {
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  FolderKanban,
  WalletCards,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { useAuth } from '../hooks/useAuth.js'
import { api, getErrorMessage } from '../lib/api.js'
import {
  formatCurrency,
  formatDate,
  paymentMethodLabels,
  paymentStatusLabels,
  projectStatusLabels,
} from '../lib/formatters.js'

function ClientDashboardPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activePayment, setActivePayment] = useState(null)
  const [processingPaymentId, setProcessingPaymentId] = useState('')

  useEffect(() => {
    async function loadProjects() {
      try {
        const { data } = await api.get('/projects/me')
        setProjects(data.projects)
      } catch (requestError) {
        setError(getErrorMessage(requestError, 'No se pudieron cargar tus proyectos.'))
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const stats = useMemo(() => {
    const payments = projects.flatMap((project) => project.payments || [])

    return {
      projectCount: projects.length,
      activeCount: projects.filter((project) => project.status !== 'entregado').length,
      pendingPayments: payments.filter((payment) => payment.status === 'pending').length,
    }
  }, [projects])

  async function handleCheckout(paymentId) {
    setProcessingPaymentId(paymentId)
    setError('')

    try {
      const { data } = await api.post(`/payments/${paymentId}/checkout`)
      const updatedPayment = data.payment

      setProjects((current) =>
        current.map((project) => ({
          ...project,
          payments: (project.payments || []).map((payment) =>
            payment._id === updatedPayment._id ? updatedPayment : payment,
          ),
        })),
      )
      setActivePayment(updatedPayment)

      if (updatedPayment.checkoutUrl) {
        window.open(updatedPayment.checkoutUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError, 'No se pudo iniciar el pago.'))
    } finally {
      setProcessingPaymentId('')
    }
  }

  return (
    <section className="px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 rounded-[2.5rem] border border-soot/10 bg-white/80 p-6 shadow-lg sm:p-8 lg:grid-cols-[1.15fr,0.85fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-ember-700">
              Hola {user?.name || 'cliente'}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-soot">
              Este es tu espacio para ver avances, hitos y pagos.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-soot/70">
              Cada proyecto aparece con su estado actual, los hitos cargados desde el
              admin y las cuotas habilitadas para comenzar o cerrar la entrega.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              {
                icon: FolderKanban,
                label: 'Proyectos',
                value: stats.projectCount,
              },
              {
                icon: BadgeCheck,
                label: 'Activos',
                value: stats.activeCount,
              },
              {
                icon: WalletCards,
                label: 'Pagos pendientes',
                value: stats.pendingPayments,
              },
            ].map((item) => (
              <article key={item.label} className="rounded-[1.8rem] bg-paper p-5">
                <item.icon className="h-5 w-5 text-ember-700" />
                <p className="mt-4 text-3xl font-extrabold text-soot">{item.value}</p>
                <p className="mt-1 text-sm font-semibold text-soot/60">{item.label}</p>
              </article>
            ))}
          </div>
        </div>

        {error ? (
          <p className="mt-6 rounded-[1.3rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        {activePayment ? (
          <div className="mt-6 rounded-[2rem] border border-ember-200 bg-ember-50 p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-ember-700">
              Pago seleccionado
            </p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-soot">{activePayment.title}</h2>
                <p className="mt-2 text-sm leading-7 text-soot/70">
                  {paymentMethodLabels[activePayment.method]} ·{' '}
                  {paymentStatusLabels[activePayment.status]}
                </p>
              </div>
              <p className="text-xl font-extrabold text-soot">
                {formatCurrency(activePayment.amount, activePayment.currency)}
              </p>
            </div>
            {activePayment.instructions ? (
              <p className="mt-4 text-sm leading-7 text-soot/75">
                {activePayment.instructions}
              </p>
            ) : null}
            {activePayment.checkoutUrl ? (
              <a
                href={activePayment.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-soot px-5 py-3 text-sm font-extrabold text-white"
              >
                Abrir enlace de pago
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        ) : null}

        {loading ? (
          <p className="mt-10 text-sm font-semibold text-soot/60">Cargando proyectos...</p>
        ) : null}

        {!loading && projects.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-soot/20 bg-white/70 p-8 text-center">
            <p className="text-lg font-bold text-soot">Todavia no tienes proyectos cargados.</p>
            <p className="mt-2 text-sm text-soot/60">
              Cuando el superadmin cree tu proyecto, aparecera aqui con sus hitos y pagos.
            </p>
          </div>
        ) : null}

        <div className="mt-10 space-y-6">
          {projects.map((project) => (
            <article
              key={project._id}
              className="rounded-[2.5rem] border border-soot/10 bg-white/80 p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-ember-700">
                    {project.service?.title || 'Proyecto personalizado'}
                  </p>
                  <h2 className="mt-3 font-display text-4xl text-soot">{project.name}</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-soot/70">
                    {project.summary || 'Sin resumen cargado todavia.'}
                  </p>
                </div>
                <div className="rounded-[1.8rem] bg-paper px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-soot/45">Estado</p>
                  <p className="mt-2 text-lg font-extrabold text-soot">
                    {projectStatusLabels[project.status] || project.status}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1fr,0.95fr]">
                <div className="rounded-[2rem] border border-soot/10 bg-paper p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-extrabold text-soot">Progreso general</p>
                    <span className="text-sm font-extrabold text-ember-700">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="mt-4 h-3 rounded-full bg-soot/10">
                    <div
                      className="h-3 rounded-full bg-ember-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-soot/45">Inicio</p>
                      <p className="mt-2 text-sm font-bold text-soot">
                        {formatDate(project.startDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-soot/45">Objetivo</p>
                      <p className="mt-2 text-sm font-bold text-soot">
                        {formatDate(project.targetDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-soot/45">Presupuesto</p>
                      <p className="mt-2 text-sm font-bold text-soot">
                        {formatCurrency(project.budgetAmount, project.budgetCurrency)}
                      </p>
                    </div>
                  </div>
                  {project.notes ? (
                    <div className="mt-5 rounded-[1.5rem] bg-white px-4 py-4 text-sm leading-7 text-soot/70">
                      {project.notes}
                    </div>
                  ) : null}
                </div>

                <div className="rounded-[2rem] border border-soot/10 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-soot">
                    <Clock3 className="h-4 w-4 text-ember-700" />
                    Hitos del proyecto
                  </div>
                  <div className="mt-5 space-y-4">
                    {(project.milestones || []).length ? (
                      project.milestones.map((milestone) => (
                        <div key={milestone._id} className="flex gap-4 rounded-[1.5rem] bg-paper p-4">
                          <div
                            className={[
                              'mt-1 h-3 w-3 rounded-full',
                              milestone.status === 'done'
                                ? 'bg-emerald-500'
                                : milestone.status === 'in_progress'
                                  ? 'bg-ember-500'
                                  : 'bg-soot/25',
                            ].join(' ')}
                          />
                          <div>
                            <p className="text-sm font-extrabold text-soot">{milestone.title}</p>
                            {milestone.description ? (
                              <p className="mt-1 text-sm leading-6 text-soot/65">
                                {milestone.description}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="rounded-[1.5rem] bg-paper px-4 py-4 text-sm text-soot/60">
                        Todavia no se cargaron hitos para este proyecto.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-soot/10 bg-paper p-5">
                <div className="flex items-center gap-2 text-sm font-extrabold text-soot">
                  <CircleDollarSign className="h-4 w-4 text-ember-700" />
                  Pagos habilitados
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {(project.payments || []).map((payment) => (
                    <div key={payment._id} className="rounded-[1.8rem] bg-white p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-extrabold text-soot">{payment.title}</p>
                          <p className="mt-2 text-sm text-soot/60">
                            {paymentMethodLabels[payment.method]} ·{' '}
                            {paymentStatusLabels[payment.status]}
                          </p>
                        </div>
                        <span className="text-lg font-extrabold text-soot">
                          {formatCurrency(payment.amount, payment.currency)}
                        </span>
                      </div>
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-soot/45">
                        Vence {formatDate(payment.dueDate)}
                      </p>
                      {payment.instructions ? (
                        <p className="mt-3 text-sm leading-6 text-soot/65">
                          {payment.instructions}
                        </p>
                      ) : null}
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        {payment.status === 'paid' ? (
                          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-5 py-3 text-sm font-extrabold text-emerald-700">
                            Pago registrado
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleCheckout(payment._id)}
                            disabled={processingPaymentId === payment._id}
                            className="rounded-full bg-soot px-5 py-3 text-sm font-extrabold text-white transition hover:bg-soot/90 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {processingPaymentId === payment._id
                              ? 'Procesando...'
                              : payment.method === 'mercado_pago'
                                ? 'Pagar ahora'
                                : 'Ver instrucciones'}
                          </button>
                        )}
                        {payment.checkoutUrl ? (
                          <a
                            href={payment.checkoutUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-soot/10 px-5 py-3 text-sm font-extrabold text-soot transition hover:border-ember-400 hover:text-ember-700"
                          >
                            Abrir link
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientDashboardPage
