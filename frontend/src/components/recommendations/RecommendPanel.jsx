'use client'
import { useState, useEffect } from 'react'
import { getRecommendations } from '@/services/recommendService'

function RecCard({ rec }) {
  const [poster, setPoster] = useState(null)

  useEffect(() => {
    fetch(`/api/poster?title=${encodeURIComponent(rec.title)}&year=${rec.year}`)
      .then(r => r.json())
      .then(d => { if (d.poster) setPoster(d.poster) })
      .catch(() => {})
  }, [rec.title, rec.year])

  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded overflow-hidden transition-all duration-300 hover:border-[#d4af37]/30 hover:-translate-y-1 flex-shrink-0 w-44">
      {/* Poster */}
      <div className="h-56 relative overflow-hidden bg-white/5">
        {poster
          ? <img src={poster} alt={rec.title} className="w-full h-full object-cover" />
          : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white/10 font-serif">
              {rec.title[0]}
            </div>
          )
        }
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-xs font-semibold tracking-wide text-white mb-1 line-clamp-1">{rec.title}</div>
        <div className="text-[11px] text-white/35 mb-2">{rec.year}</div>
        <p className="text-[11px] text-white/50 leading-relaxed line-clamp-3">{rec.reason}</p>
      </div>
    </div>
  )
}

export default function RecommendPanel({ movies }) {
  const [recs, setRecs]       = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const watched = movies.filter(m => m.status === 'watched')

  const handleFetch = async () => {
    setError('')
    if (!watched.length) return setError('Watch and rate some movies first!')
    setLoading(true)
    try {
      const result = await getRecommendations(watched)
      setRecs(result)
    } catch {
      setError('Could not get recommendations. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-10 border border-white/[0.07] rounded p-6 bg-white/[0.01]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] tracking-[.2em] text-[#d4af37] uppercase mb-1">Powered by AI</p>
          <h2 className="text-xl font-light tracking-wide text-white">Recommendations for you</h2>
        </div>
        <button
          onClick={handleFetch}
          disabled={loading}
          className={`px-6 py-2 text-[11px] tracking-widest uppercase font-bold rounded-sm border transition-all
            ${loading
              ? 'border-[#d4af37]/30 text-[#d4af37]/30 cursor-not-allowed'
              : 'border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0f] cursor-pointer'
            }`}
        >
          {loading ? 'Thinking...' : 'Recommend me movies'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400/70 tracking-wide mb-4">{error}</p>
      )}

      {/* Empty state */}
      {!recs.length && !loading && !error && (
        <p className="text-sm text-white/25 tracking-wide">
          * Rate some watched movies and click the button to get personalised recommendations.
        </p>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex gap-3 mt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-44 h-72 rounded bg-white/[0.03] animate-pulse flex-shrink-0" />
          ))}
        </div>
      )}

      {/* Results */}
      {recs.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {recs.map((r, i) => (
            <RecCard key={i} rec={r} />
          ))}
        </div>
      )}
    </div>
  )
}