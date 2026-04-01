import { useState } from 'react'
import { getRecommendations } from '@/services/recommendService'

export default function RecommendPanel({ movies }) {
  const [recs, setRecs]       = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const watched = movies.filter(m => m.status === 'watched')

  const handleFetch = async () => {
    if (!watched.length) return setError('Watch and rate some movies first!')
    setLoading(true)
    try {
      const result = await getRecommendations(watched)
      setRecs(result)
    } catch {
      setError('Could not get recommendations')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>AI Recommendations</h2>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Thinking...' : 'Recommend me movies'}
      </button>
      {error && <p>{error}</p>}
      {recs.map((r, i) => (
        <div key={i}>
          <strong>{r.title}</strong> ({r.year})
          <p>{r.reason}</p>
        </div>
      ))}
    </div>
  )
}