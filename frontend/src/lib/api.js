import axios from 'axios'
 
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
})
 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
 
// ─── AUTH ────────────────────────────────────────────────
 
// POST /api/auth/register
export async function register(name, email, password) {
  const { data } = await api.post('/auth/register', { name, email, password })
  return data
}
 
// POST /api/auth/login
// Automatically saves the token to localStorage
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
 
// GET /api/movies
export async function getMovies() {
  const { data } = await api.get('/movies')
  return data
}
 
// POST /api/movies
export async function createMovie(title) {
  const { data } = await api.post('/movies', { title })
  return data
}
 
// PUT /api/movies/:id
export async function updateMovie(id, fields) {
  // fields can include: { rating, review, status, ... }
  const { data } = await api.put(`/movies/${id}`, fields)
  return data
}
 
// DELETE /api/movies/:id
export async function deleteMovie(id) {
  const { data } = await api.delete(`/movies/${id}`)
  return data
}
 
export default api
 