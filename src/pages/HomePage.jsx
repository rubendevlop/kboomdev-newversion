import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  LayoutPanelTop,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import SectionHeading from '../components/ui/SectionHeading.jsx'
import { api, getErrorMessage } from '../lib/api.js'
import { formatCurrency } from '../lib/formatters.js'

function HomePage() {
  const [services, setServices] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadServices() {
      try {
        const { data } = await api.get('/services')
        setServices(data.services.slice(0, 3))
      } catch (requestError) {
        setError(getErrorMessage(requestError, 'No se pudieron cargar los servicios.'))
      }
    }

    loadServices()
  }, [])

  return (
    <>
      <section className="px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ember-300 bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-ember-700">
              <span className="h-2 w-2 rounded-full bg-ember-500" />
              MERN + Tailwind con identidad real
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.03] text-soot sm:text-6xl lg:text-7xl">
              Webs y sistemas que se sienten humanos, no generados en serie.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-soot/70">
              KBOOMDEV mezcla desarrollo MERN, una direccion visual mas calida y un
              portal privado para que cada cliente vea sus avances, pagos y entregas
              sin perseguir mensajes por todos lados.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-soot px-6 py-4 text-sm font-extrabold text-white transition hover:bg-soot/90"
              >
                Ver servicios
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/acceso"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-soot/10 bg-white/80 px-6 py-4 text-sm font-extrabold text-soot transition hover:border-ember-400 hover:text-ember-700"
              >
                Entrar al portal
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                'Diseño editorial, menos plantilla',
                'Login con correo, Google y roles',
                'Cobros en dos etapas por proyecto',
              ].map((item) => (
                <div key={item} className="rounded-[1.6rem] border border-soot/10 bg-white/70 p-4">
                  <p className="text-sm font-bold text-soot/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-8 top-4 -z-10 h-64 rounded-full bg-ember-300/30 blur-3xl" />
            <div className="rounded-[2rem] border border-soot/10 bg-[#fffaf4] p-5 shadow-glow sm:p-7">
              <div className="flex items-center justify-between border-b border-soot/10 pb-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-ember-700">
                    Portal cliente
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-soot">Ver mis proyectos</h2>
                </div>
                <img src="/brand/logo.png" alt="Logo KBOOMDEV" className="h-14 w-auto" />
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[1.8rem] border border-soot/10 bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-soot/45">
                        Proyecto activo
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold text-soot">
                        Sistema a medida
                      </h3>
                    </div>
                    <span className="rounded-full bg-ember-100 px-3 py-1 text-xs font-extrabold text-ember-700">
                      62%
                    </span>
                  </div>
                  <div className="mt-5 h-3 rounded-full bg-soot/8">
                    <div className="h-3 w-[62%] rounded-full bg-ember-500" />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-paper px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-soot/45">
                        Milestone
                      </p>
                      <p className="mt-2 text-sm font-bold text-soot">Panel admin en desarrollo</p>
                    </div>
                    <div className="rounded-2xl bg-paper px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-soot/45">
                        Pago
                      </p>
                      <p className="mt-2 text-sm font-bold text-soot">Anticipo aprobado</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: LayoutPanelTop,
                      title: 'Panel privado',
                      text: 'Cada cliente ve solo sus proyectos y pagos.',
                    },
                    {
                      icon: CircleDollarSign,
                      title: '2 cuotas claras',
                      text: 'Inicio con anticipo, cierre con saldo final.',
                    },
                    {
                      icon: ShieldCheck,
                      title: 'Control admin',
                      text: 'Los servicios y avances solo los gestionas tu.',
                    },
                  ].map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[1.6rem] border border-soot/10 bg-white px-4 py-5"
                    >
                      <item.icon className="h-5 w-5 text-ember-700" />
                      <h3 className="mt-3 text-sm font-extrabold text-soot">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-soot/65">{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-soot/10 bg-white/70 p-6 sm:p-10">
          <SectionHeading
            eyebrow="Como se trabaja"
            title="Un flujo simple: propuesta, desarrollo, seguimiento y entrega."
            description="La idea no es vender humo con animaciones. La idea es que el cliente entienda donde esta parado, cuanto falta y que se esta construyendo."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {[
              'Definimos el servicio y la propuesta.',
              'Creas el proyecto del cliente desde el admin.',
              'El cliente entra y ve avances, hitos y pagos.',
              'Cobras el saldo final antes de la entrega.',
            ].map((step, index) => (
              <article key={step} className="rounded-[1.8rem] border border-soot/10 bg-paper p-5">
                <p className="text-sm font-extrabold text-ember-700">0{index + 1}</p>
                <p className="mt-3 text-base font-bold leading-7 text-soot">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Servicios base"
            title="Servicios pensados para negocio real, no para impresionar cinco minutos."
            description="El superadmin puede crear nuevos servicios desde la web. Estos son los iniciales para arrancar la plataforma."
          />

          {error ? <p className="mt-6 text-sm font-semibold text-red-600">{error}</p> : null}

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service._id}
                className="rounded-[2rem] border border-soot/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-ember-700">
                    {service.category}
                  </p>
                  {service.featured ? (
                    <span className="rounded-full bg-ember-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-ember-700">
                      Destacado
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-3xl text-soot">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-soot/70">{service.summary}</p>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-soot/10 pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-soot/45">
                      Desde
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-soot">
                      {formatCurrency(service.priceFrom)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-soot/60">{service.turnaround}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.5rem] border border-soot/10 bg-soot px-6 py-8 text-white sm:px-10 lg:grid-cols-[0.95fr,1.05fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-ember-300">
              Cobro ordenado
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight">
              El sistema nace con pagos en dos etapas y metodos distintos por cliente.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
              Puedes habilitar un anticipo para iniciar y un pago final para entregar.
              Cada cuota queda asociada al proyecto y se puede resolver por Mercado Pago,
              transferencia o un link externo para Visa.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Anticipo',
                text: 'Activa el proyecto y asegura el inicio.',
              },
              {
                title: 'Seguimiento',
                text: 'El cliente ve hitos, notas y estado del trabajo.',
              },
              {
                title: 'Entrega',
                text: 'Cobras el saldo final antes de liberar el cierre.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[1.8rem] bg-white/10 p-5">
                <BadgeCheck className="h-5 w-5 text-ember-300" />
                <h3 className="mt-4 text-lg font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
