import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import ClientDashboardPage from './pages/ClientDashboardPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/acceso" element={<AuthPage />} />
          <Route
            path="/panel"
            element={
              <ProtectedRoute roles={['client', 'superadmin']}>
                <ClientDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['superadmin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
