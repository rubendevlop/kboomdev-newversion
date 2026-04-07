import { GoogleLogin } from '@react-oauth/google'
import { LockKeyhole, MailCheck, UserRoundPlus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth.js'

const initialRegisterForm = {
  name: '',
  company: '',
  phone: '',
  email: '',
  password: '',
}

function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, register, loginWithGoogle, getErrorMessage } = useAuth()

  const [mode, setMode] = useState('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState(initialRegisterForm)
  const [pending, setPending] = useState(false)
  const [feedback, setFeedback] = useState({ error: '', success: '' })

  const redirectTarget = useMemo(() => {
    if (user?.role === 'superadmin') return '/admin'
    if (location.state?.from) return location.state.from
    return '/panel'
  }, [location.state, user?.role])

  useEffect(() => {
    if (user) {
      navigate(redirectTarget, { replace: true })
    }
  }, [navigate, redirectTarget, user])

  async function handleSubmit(event) {
    event.preventDefault()
    setPending(true)
    setFeedback({ error: '', success: '' })

    try {
      if (mode === 'login') {
        const nextUser = await login(loginForm)
        navigate(nextUser.role === 'superadmin' ? '/admin' : redirectTarget, {
          replace: true,
        })
      } else {
        const nextUser = await register(registerForm)
        setFeedback({
          error: '',
          success: 'Tu acceso fue creado. Ya puedes ver tu panel privado.',
        })
        navigate(nextUser.role === 'superadmin' ? '/admin' : redirectTarget, {
          replace: true,
        })
      }
    } catch (error) {
      setFeedback({
        success: '',
        error: getErrorMessage(error, 'No se pudo iniciar sesion.'),
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div className="rounded-[2.5rem] border border-soot/10 bg-soot p-8 text-white sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-ember-300">
            Acceso privado
          </p>
          <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">
            Un portal para seguir el proyecto sin friccion.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
            Aqui los clientes entran con correo y contrasena o con Google, revisan
            avances, hitos, estado del proyecto y las cuotas habilitadas.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              {
                icon: MailCheck,
                title: 'Correo y Google',
                text: 'Dos formas de acceso seguras y simples.',
              },
              {
                icon: LockKeyhole,
                title: 'Roles separados',
                text: 'Clientes ven sus proyectos. Tu cuenta superadmin controla todo.',
              },
              {
                icon: UserRoundPlus,
                title: 'Alta flexible',
                text: 'Puedes crear clientes desde el admin o dejar que se registren.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[1.8rem] bg-white/10 p-5">
                <item.icon className="h-5 w-5 text-ember-300" />
                <h2 className="mt-4 text-lg font-extrabold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-soot/10 bg-white/85 p-6 shadow-lg sm:p-8">
          <div className="flex gap-3 rounded-full bg-paper p-1">
            {[
              { key: 'login', label: 'Entrar' },
              { key: 'register', label: 'Crear cuenta' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setMode(item.key)}
                className={[
                  'flex-1 rounded-full px-4 py-3 text-sm font-extrabold transition',
                  mode === item.key
                    ? 'bg-soot text-white'
                    : 'text-soot/65 hover:text-soot',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === 'register' ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-soot">Nombre</span>
                    <input
                      required
                      value={registerForm.name}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      className="w-full rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none transition focus:border-ember-400"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-soot">Empresa</span>
                    <input
                      value={registerForm.company}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          company: event.target.value,
                        }))
                      }
                      className="w-full rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none transition focus:border-ember-400"
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-soot">Telefono</span>
                    <input
                      value={registerForm.phone}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      className="w-full rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none transition focus:border-ember-400"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-soot">Correo</span>
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      className="w-full rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none transition focus:border-ember-400"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-soot">Contrasena</span>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={registerForm.password}
                    onChange={(event) =>
                      setRegisterForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    className="w-full rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none transition focus:border-ember-400"
                  />
                </label>
              </>
            ) : (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-soot">Correo</span>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(event) =>
                      setLoginForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="w-full rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none transition focus:border-ember-400"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-soot">Contrasena</span>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(event) =>
                      setLoginForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    className="w-full rounded-[1.2rem] border border-soot/10 bg-paper px-4 py-3 outline-none transition focus:border-ember-400"
                  />
                </label>
              </>
            )}

            {feedback.error ? (
              <p className="rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {feedback.error}
              </p>
            ) : null}
            {feedback.success ? (
              <p className="rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                {feedback.success}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-soot px-5 py-4 text-sm font-extrabold text-white transition hover:bg-soot/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending
                ? 'Procesando...'
                : mode === 'login'
                  ? 'Entrar al portal'
                  : 'Crear acceso y entrar'}
            </button>
          </form>

          {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
            <div className="mt-6 border-t border-soot/10 pt-6">
              <p className="mb-4 text-sm font-semibold text-soot/60">
                O continuar con Google
              </p>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (!credentialResponse.credential) return

                  try {
                    setPending(true)
                    const nextUser = await loginWithGoogle(credentialResponse.credential)
                    navigate(nextUser.role === 'superadmin' ? '/admin' : redirectTarget, {
                      replace: true,
                    })
                  } catch (error) {
                    setFeedback({
                      success: '',
                      error: getErrorMessage(error, 'No se pudo iniciar con Google.'),
                    })
                  } finally {
                    setPending(false)
                  }
                }}
                onError={() =>
                  setFeedback({
                    success: '',
                    error: 'No se pudo completar el inicio con Google.',
                  })
                }
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
                width="100%"
              />
            </div>
          ) : (
            <p className="mt-6 rounded-[1.2rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Google Login aparecera cuando completes <code>VITE_GOOGLE_CLIENT_ID</code> y{' '}
              <code>GOOGLE_CLIENT_ID</code>.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default AuthPage
