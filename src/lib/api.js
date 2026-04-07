import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

export function getErrorMessage(error, fallback = 'Ocurrio un error inesperado.') {
  return error?.response?.data?.message || fallback
}
