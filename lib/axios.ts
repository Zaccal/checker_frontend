import axios from 'axios'

const Axios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

// Enable cookies to be sent with requests
Axios.interceptors.request.use(
	config => {
		// No need to manually add authorization header
		// Better Auth will handle cookies automatically
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

Axios.interceptors.response.use(
	response => {
		return response
	},
	error => {
		// Handle errors globally
		if (error.response && error.response.status === 401) {
			// Handle unauthorized access, e.g., redirect to login
			console.error('Unauthorized access - redirecting to login')
		}
		return Promise.reject(error)
	}
)

export default Axios
