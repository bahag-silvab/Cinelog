import api from './api'

export const getRecommendations = async (movies) => {
  const res = await api.post('/recommendations', { movies })
  return res.data.recommendations
}
