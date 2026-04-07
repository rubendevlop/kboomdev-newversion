import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const app = (
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)

createRoot(document.getElementById('root')).render(
  googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>{app}</GoogleOAuthProvider>
  ) : (
    app
  ),
)
