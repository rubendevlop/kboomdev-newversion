import { useEffect, useMemo, useState } from 'react'

import AdminPaymentList from '../components/admin/AdminPaymentList.jsx'
import AdminProjectForm from '../components/admin/AdminProjectForm.jsx'
import AdminProjectList from '../components/admin/AdminProjectList.jsx'
import AdminServiceForm from '../components/admin/AdminServiceForm.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { api, getErrorMessage } from '../lib/api.js'
import { formatCurrency } from '../lib/formatters.js'

const initialServiceForm = {
  title: '',
  category: 'desarrollo web',
  summary: '',
  description: '',
  idealFor: '',
  deliverablesText: '',
  priceFrom: '',
  turnaround: '',
  featured: true,
  active: true,
}

const initialProjectForm = {
  clientName: '',
  clientEmail: '',
  clientPassword: '',
  clientCompany: '',
  clientPhone: '',
  name: '',
  summary: '',
  serviceId: '',
  status: 'descubrimiento',
  progress: 5,
  notes: '',
  startDate: '',
  targetDate: '',
  budgetAmount: '',
  budgetCurrency: 'ARS',
  depositAmount: '',
  depositMethod: 'mercado_pago',
  depositDueDate: '',
  finalAmount: '',
  finalMethod: 'transferencia',
  finalDueDate: '',
  milestonesText:
    'Descubrimiento y alcance\nDiseño de estructura\nDesarrollo principal\nRevision final\nEntrega',
}

function normalizeProjectDrafts(projects) {
  return projects.reduce((acc, project) => {
    acc[project._id] = {
      status: project.status,
      progress: project.progress,
      notes: project.notes || '',
      targetDate: project.targetDate ? project.targetDate.slice(0, 10) : '',
    }
    return acc
  }, {})
}

function normalizePaymentDrafts(payments) {
  return payments.reduce((acc, payment) => {
    acc[payment._id] = {
      method: payment.method,
      status: payment.status,
      instructions: payment.instructions || '',
      checkoutUrl: payment.checkoutUrl || '',
      dueDate: payment.dueDate ? payment.dueDate.slice(0, 10) : '',
    }
    return acc
  }, {})
}

function AdminDashboardPage() {
  const { user } = useAuth()
  const [overview, setOverview] = useState({
    services: [],
    clients: [],
    projects: [],
    payments: [],
  })
  const [serviceForm, setServiceForm] = useState(initialServiceForm)
  const [projectForm, setProjectForm] = useState(initialProjectForm)
  const [projectDrafts, setProjectDrafts] = useState({})
  const [paymentDrafts, setPaymentDrafts] = useState({})
  const [loading, setLoading] = useState(true)
  const [savingService, setSavingService] = useState(false)
  const [creatingProject, setCreatingProject] = useState(false)
  const [feedback, setFeedback] = useState({ error: '', success: '' })

  async function loadOverview() {
    const { data } = await api.get('/admin/overview')
    setOverview(data)
    setProjectDrafts(normalizeProjectDrafts(data.projects))
    setPaymentDrafts(normalizePaymentDrafts(data.payments))
  }

  useEffect(() => {
    async function bootstrap() {
      try {
        await loadOverview()
      } catch (error) {
        setFeedback({
          success: '',
          error: getErrorMessage(error, 'No se pudo cargar el panel admin.'),
        })
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  const stats = useMemo(
    () => ({
      services: overview.services.length,
      clients: overview.clients.length,
      projects: overview.projects.length,
      pendingPayments: overview.payments.filter((payment) => payment.status === 'pending').length,
    }),
    [overview],
  )

  async function handleCreateService(event) {
    event.preventDefault()
    setSavingService(true)
    setFeedback({ error: '', success: '' })

    try {
      await api.post('/admin/services', {
        ...serviceForm,
        deliverables: serviceForm.deliverablesText
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        priceFrom: Number(serviceForm.priceFrom || 0),
      })
      setServiceForm(initialServiceForm)
      await loadOverview()
      setFeedback({ error: '', success: 'Servicio creado y publicado.' })
    } catch (error) {
      setFeedback({
        success: '',
        error: getErrorMessage(error, 'No se pudo crear el servicio.'),
      })
    } finally {
      setSavingService(false)
    }
  }

  async function handleCreateProject(event) {
    event.preventDefault()
    setCreatingProject(true)
    setFeedback({ error: '', success: '' })

    try {
      const milestones = projectForm.milestonesText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((title, index) => ({
          title,
          order: index,
          status: index === 0 ? 'in_progress' : 'pending',
        }))

      const payments = [
        projectForm.depositAmount
          ? {
              title: 'Primer pago para comenzar',
              installmentType: 'anticipo',
              amount: Number(projectForm.depositAmount),
              method: projectForm.depositMethod,
              dueDate: projectForm.depositDueDate || null,
            }
          : null,
        projectForm.finalAmount
          ? {
              title: 'Pago final para entregar',
              installmentType: 'entrega',
              amount: Number(projectForm.finalAmount),
              method: projectForm.finalMethod,
              dueDate: projectForm.finalDueDate || null,
            }
          : null,
      ].filter(Boolean)

      await api.post('/admin/projects', {
        ...projectForm,
        budgetAmount: Number(projectForm.budgetAmount || 0),
        progress: Number(projectForm.progress || 0),
        milestones,
        payments,
      })

      setProjectForm(initialProjectForm)
      await loadOverview()
      setFeedback({ error: '', success: 'Proyecto creado y vinculado al cliente.' })
    } catch (error) {
      setFeedback({
        success: '',
        error: getErrorMessage(error, 'No se pudo crear el proyecto.'),
      })
    } finally {
      setCreatingProject(false)
    }
  }

  async function handleUpdateProject(projectId) {
    try {
      await api.put(`/admin/projects/${projectId}`, projectDrafts[projectId])
      await loadOverview()
      setFeedback({ error: '', success: 'Proyecto actualizado.' })
    } catch (error) {
      setFeedback({
        success: '',
        error: getErrorMessage(error, 'No se pudo actualizar el proyecto.'),
      })
    }
  }

  async function handleUpdatePayment(paymentId) {
    try {
      await api.put(`/admin/payments/${paymentId}`, paymentDrafts[paymentId])
      await loadOverview()
      setFeedback({ error: '', success: 'Pago actualizado.' })
    } catch (error) {
      setFeedback({
        success: '',
        error: getErrorMessage(error, 'No se pudo actualizar el pago.'),
      })
    }
  }

  async function handleMarkPaymentPaid(paymentId) {
    try {
      await api.patch(`/admin/payments/${paymentId}/mark-paid`)
      await loadOverview()
      setFeedback({ error: '', success: 'Pago marcado como abonado.' })
    } catch (error) {
      setFeedback({
        success: '',
        error: getErrorMessage(error, 'No se pudo marcar el pago.'),
      })
    }
  }

  return (
    <section className="px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.6rem] border border-soot/10 bg-soot p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-ember-300">
            Superadmin
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight">
            Servicios, proyectos y cobros desde un solo panel.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
            Sesion actual: {user?.email}. Desde aqui cargas tus servicios, creas proyectos
            por cliente y habilitas la cuota inicial y final de cada trabajo.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Servicios', stats.services],
              ['Clientes', stats.clients],
              ['Proyectos', stats.projects],
              ['Pagos pendientes', stats.pendingPayments],
            ].map(([label, value]) => (
              <article key={label} className="rounded-[1.7rem] bg-white/10 p-4">
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="mt-1 text-sm text-white/65">{label}</p>
              </article>
            ))}
          </div>
        </div>

        {feedback.error ? (
          <p className="mt-6 rounded-[1.3rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {feedback.error}
          </p>
        ) : null}
        {feedback.success ? (
          <p className="mt-6 rounded-[1.3rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {feedback.success}
          </p>
        ) : null}

        {loading ? <p className="mt-8 text-sm font-semibold text-soot/60">Cargando dashboard...</p> : null}

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
          <AdminServiceForm
            form={serviceForm}
            saving={savingService}
            onChange={(field, value) =>
              setServiceForm((current) => ({ ...current, [field]: value }))
            }
            onSubmit={handleCreateService}
          />
          <AdminProjectForm
            form={projectForm}
            services={overview.services}
            saving={creatingProject}
            onChange={(field, value) =>
              setProjectForm((current) => ({ ...current, [field]: value }))
            }
            onSubmit={handleCreateProject}
          />
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
          <div className="rounded-[2.4rem] border border-soot/10 bg-white/80 p-6 shadow-sm">
            <h2 className="font-display text-3xl text-soot">Servicios y clientes</h2>
            <div className="mt-6 space-y-4">
              {overview.services.map((service) => (
                <article key={service._id} className="rounded-[1.7rem] bg-paper p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-extrabold text-soot">{service.title}</p>
                      <p className="mt-1 text-sm text-soot/60">{service.summary}</p>
                    </div>
                    <p className="text-sm font-extrabold text-soot">
                      {formatCurrency(service.priceFrom)}
                    </p>
                  </div>
                </article>
              ))}
              {overview.clients.map((client) => (
                <article key={client._id} className="rounded-[1.7rem] bg-white p-5">
                  <p className="text-sm font-extrabold text-soot">{client.name}</p>
                  <p className="mt-1 text-sm text-soot/60">{client.email}</p>
                </article>
              ))}
            </div>
          </div>
          <AdminProjectList
            projects={overview.projects}
            drafts={projectDrafts}
            setDrafts={setProjectDrafts}
            onUpdate={handleUpdateProject}
          />
        </div>

        <div className="mt-10">
          <AdminPaymentList
            payments={overview.payments}
            drafts={paymentDrafts}
            setDrafts={setPaymentDrafts}
            onSave={handleUpdatePayment}
            onMarkPaid={handleMarkPaymentPaid}
          />
        </div>
      </div>
    </section>
  )
}

export default AdminDashboardPage
