import api from './api'

export const getMovies = async (status = '') => {
  const res = await api.get(`/movies${status ? `?status=${status}` : ''}`)
  return res.data.movies
}

export const addMovie = async (movieData) => {
  const res = await api.post('/movies', movieData)
  return res.data.movie
}

export const updateMovie = async (id, updates) => {
  const res = await api.put(`/movies/${id}`, updates)
  return res.data.movie
}

export const deleteMovie = async (id) => {
  await api.delete(`/movies/${id}`)
}