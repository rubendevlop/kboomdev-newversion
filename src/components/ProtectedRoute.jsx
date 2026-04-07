import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth.js'

function ProtectedRoute({ children, roles }) {
  const { authReady, user } = useAuth()
  const location = useLocation()

  if (!authReady) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="rounded-[2rem] border border-soot/10 bg-white/80 px-8 py-6 text-sm font-semibold text-soot shadow-lg">
          Cargando tu espacio...
        </div>
      </section>
    )
  }

  if (!user) {
    return <Navigate to="/acceso" replace state={{ from: location.pathname }} />
  }

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to={user.role === 'superadmin' ? '/admin' : '/panel'} replace />
  }

  return children
}

export default ProtectedRoute
