import { Menu, ShieldCheck, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth.js'

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Portal cliente', to: '/panel' },
]

const linkClass = ({ isActive }) =>
  [
    'transition-colors duration-200',
    isActive ? 'text-ember-700' : 'text-soot/70 hover:text-soot',
  ].join(' ')

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  async function handleLogout() {
    await logout()
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-paper text-soot">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grain bg-[size:14px_14px] opacity-30" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(255,116,8,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(23,19,16,0.07),transparent_35%)]" />

      <header className="sticky top-0 z-40 px-3 py-3 sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-soot/10 bg-white/85 px-4 py-3 shadow-[0_10px_30px_rgba(23,19,16,0.08)] backdrop-blur sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/brand/logo.png"
              alt="KBOOMDEV"
              className="h-11 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="font-display text-lg leading-none text-soot">KBOOMDEV</p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-soot/55">
                desarrollo con criterio
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                {user.role === 'superadmin' ? (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-2 rounded-full border border-soot/10 px-4 py-2 text-sm font-bold text-soot transition hover:border-ember-400 hover:text-ember-700"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </Link>
                ) : (
                  <Link
                    to="/panel"
                    className="inline-flex items-center gap-2 rounded-full border border-soot/10 px-4 py-2 text-sm font-bold text-soot transition hover:border-ember-400 hover:text-ember-700"
                  >
                    <UserRound className="h-4 w-4" />
                    Mi panel
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-soot px-5 py-2 text-sm font-bold text-white transition hover:bg-soot/90"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/acceso"
                className="rounded-full bg-soot px-5 py-2 text-sm font-bold text-white transition hover:bg-soot/90"
              >
                Iniciar sesion
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="rounded-full border border-soot/10 p-2 text-soot lg:hidden"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-soot/10 bg-white/90 p-5 shadow-lg backdrop-blur lg:hidden">
            <div className="flex flex-col gap-4 text-sm font-semibold">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="h-px bg-soot/10" />
              {user ? (
                <>
                  <Link
                    to={user.role === 'superadmin' ? '/admin' : '/panel'}
                    className="rounded-full border border-soot/10 px-4 py-3 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    {user.role === 'superadmin' ? 'Ir al admin' : 'Ir a mi panel'}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-soot px-4 py-3 text-white"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <Link
                  to="/acceso"
                  className="rounded-full bg-soot px-4 py-3 text-center text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Iniciar sesion
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-soot/10 px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr,0.8fr,0.8fr]">
          <div>
            <img src="/brand/logo.png" alt="KBOOMDEV" className="h-12 w-auto" />
            <p className="mt-4 max-w-md text-sm leading-7 text-soot/65">
              Desarrollo web con una estetica mas humana, procesos claros y un
              portal privado para que cada cliente vea el avance real de su proyecto.
            </p>
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-ember-700">
              Contacto
            </p>
            <div className="mt-4 space-y-2 text-sm text-soot/70">
              <a href="mailto:rrlopez@kboomdev.com" className="block hover:text-soot">
                rrlopez@kboomdev.com
              </a>
              <a
                href="https://wa.me/5493815624585"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-soot"
              >
                WhatsApp directo
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-ember-700">
              Cobros
            </p>
            <p className="mt-4 text-sm leading-7 text-soot/70">
              Anticipo para iniciar, saldo para entregar. Metodos: Mercado Pago,
              transferencia y link Visa cuando lo configures desde el admin.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
