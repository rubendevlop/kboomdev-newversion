import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-soot/10 bg-white/80 p-10 text-center shadow-lg">
        <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-ember-700">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl text-soot">Esta pagina no existe.</h1>
        <p className="mt-4 text-base leading-8 text-soot/65">
          Vuelve al inicio o entra al portal si buscas el seguimiento de un proyecto.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-full bg-soot px-6 py-4 text-sm font-extrabold text-white"
          >
            Ir al inicio
          </Link>
          <Link
            to="/panel"
            className="rounded-full border border-soot/10 px-6 py-4 text-sm font-extrabold text-soot"
          >
            Abrir mi panel
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
