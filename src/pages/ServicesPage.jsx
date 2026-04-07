import { Search } from 'lucide-react'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import SectionHeading from '../components/ui/SectionHeading.jsx'
import { api, getErrorMessage } from '../lib/api.js'
import { formatCurrency } from '../lib/formatters.js'

function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    async function loadServices() {
      try {
        const { data } = await api.get('/services')
        setServices(data.services)
      } catch (requestError) {
        setError(getErrorMessage(requestError, 'No se pudieron cargar los servicios.'))
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const filteredServices = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return services
    }

    return services.filter((service) =>
      [service.title, service.summary, service.description, service.idealFor]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [deferredQuery, services])

  return (
    <section className="px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Servicios"
          title="Una base comercial clara y un stack tecnico listo para crecer."
          description="Aqui viven los servicios que despues podras administrar desde el panel superadmin. Estan pensados para mostrar valor real, no para sonar grandilocuentes."
        />

        <div className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-soot/10 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex flex-1 items-center gap-3 rounded-full border border-soot/10 bg-paper px-4 py-3">
            <Search className="h-4 w-4 text-soot/45" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por tipo de proyecto, servicio o necesidad"
              className="w-full border-none bg-transparent text-sm text-soot outline-none placeholder:text-soot/40"
            />
          </label>
          <Link
            to="/acceso"
            className="inline-flex items-center justify-center rounded-full bg-soot px-5 py-3 text-sm font-extrabold text-white transition hover:bg-soot/90"
          >
            Entrar al portal
          </Link>
        </div>

        {loading ? (
          <p className="mt-8 text-sm font-semibold text-soot/60">Cargando servicios...</p>
        ) : null}
        {error ? <p className="mt-8 text-sm font-semibold text-red-600">{error}</p> : null}

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {filteredServices.map((service) => (
            <article
              key={service._id}
              className="rounded-[2.2rem] border border-soot/10 bg-white/80 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-ember-700">
                    {service.category}
                  </p>
                  <h2 className="mt-3 font-display text-4xl text-soot">{service.title}</h2>
                </div>
                <span className="rounded-full border border-soot/10 px-3 py-1 text-xs font-bold text-soot/55">
                  {service.turnaround}
                </span>
              </div>

              <p className="mt-5 text-base leading-8 text-soot/70">{service.description}</p>

              <div className="mt-6 rounded-[1.7rem] bg-paper p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-soot/45">
                  Ideal para
                </p>
                <p className="mt-2 text-sm leading-7 text-soot/70">{service.idealFor}</p>
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.deliverables?.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-soot/10 bg-white px-4 py-3 text-sm font-semibold text-soot/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 border-t border-soot/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-soot/45">Desde</p>
                  <p className="mt-2 text-2xl font-extrabold text-soot">
                    {formatCurrency(service.priceFrom)}
                  </p>
                </div>
                <Link
                  to="/acceso"
                  className="inline-flex items-center justify-center rounded-full border border-soot/10 px-5 py-3 text-sm font-extrabold text-soot transition hover:border-ember-400 hover:text-ember-700"
                >
                  Quiero este servicio
                </Link>
              </div>
            </article>
          ))}
        </div>

        {!loading && !error && filteredServices.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-soot/20 bg-white/70 p-8 text-center">
            <p className="text-lg font-bold text-soot">No hay servicios que coincidan.</p>
            <p className="mt-2 text-sm text-soot/60">
              Prueba otra busqueda o agrega uno nuevo desde el panel superadmin.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ServicesPage
