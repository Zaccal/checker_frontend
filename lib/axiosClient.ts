import axios from 'axios'
import { authClient } from './auth'
import { redirect } from 'next/navigation'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => redirect('/login'),
        },
      })
    }
    return Promise.reject(error)
  },
)

export { axiosClient }
