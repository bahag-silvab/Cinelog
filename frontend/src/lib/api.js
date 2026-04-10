import axios from 'axios'
 
const api = axios.create({
  baseURL: 'https://cinelog-beatriz-630243095989.europe-west1.run.app/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ─── AUTH ────────────────────────────────────────────────

export async function register(name, email, password) {
  const { data } = await api.post('/auth/register', { name, email, password })
  return data
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  if (data.token) {
    localStorage.setItem('token', data.token)
  }
  return data
}

export function logout() {
  localStorage.removeItem('token')
}

// ─── MOVIES ──────────────────────────────────────────────

export async function getMovies() {
  const { data } = await api.get('/movies')
  return data
}

export async function createMovie(title) {
  const { data } = await api.post('/movies', { title })
  return data
}

export async function updateMovie(id, fields) {
  const { data } = await api.put(`/movies/${id}`, fields)
  return data
}

export async function deleteMovie(id) {
  const { data } = await api.delete(`/movies/${id}`)
  return data
}

export default api