import { useState } from 'react'
import { deleteMovie } from '@/services/movieService'
import EditMovieModal  from './EditMovieModal'

export default function MovieCard({ movie, onUpdate }) {
  const [editing, setEditing] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Remove this movie?')) return
    await deleteMovie(movie.id)
    onUpdate()
  }

  return (
    <div>
      {movie.poster_url && <img src={movie.poster_url} alt={movie.title} />}
      <h3>{movie.title}</h3>
      <p>{movie.year} · {movie.genre}</p>
      <p>Status: {movie.status}</p>
      {movie.rating && <p>Rating: {'★'.repeat(movie.rating)}</p>}
      {movie.review && <p>"{movie.review}"</p>}

      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>

      {editing && (
        <EditMovieModal
          movie={movie}
          onClose={() => setEditing(false)}
          onSave={onUpdate}
        />
      )}
    </div>
  )
}
