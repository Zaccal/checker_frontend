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
  error => {
    console.log(error)
    if (error.response && error.response.status === 401) {
      authClient.signOut()
      redirect('/login')
    }
    return Promise.reject(error)
  },
)

export { axiosClient }
