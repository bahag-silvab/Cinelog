import { useState, useEffect } from 'react'
import { getMovies } from '@/services/movieService'

export function useMovies(filter = '') {
  const [movies, setMovies]   = useState([])
  const [loading, setLoading] = useState(true)
  const [tick, setTick]       = useState(0)

  useEffect(() => {
    setLoading(true)
    getMovies(filter)
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [filter, tick])

  const reload = () => setTick(t => t + 1)

  return { movies, loading, reload }
}