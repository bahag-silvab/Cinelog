export const getRecommendations = async (movies) => {
  const res = await fetch('/api/recommendations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movies })
  })
  const data = await res.json()
  console.log('response:', data)
  if (!data.recommendations) throw new Error('No recommendations')
  return data.recommendations
}