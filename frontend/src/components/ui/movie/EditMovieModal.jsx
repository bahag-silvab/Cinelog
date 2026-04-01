import { useState } from 'react'
import { updateMovie } from '@/services/movieService'

export default function EditMovieModal({ movie, onClose, onSave }) {
  const [form, setForm] = useState({
    rating: movie.rating || '',
    review: movie.review || '',
    status: movie.status,
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateMovie(movie.id, form)
    onSave()
    onClose()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit: {movie.title}</h2>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="want_to_watch">Want to watch</option>
          <option value="watched">Watched</option>
        </select>
        <select nname="rating" value={form.rating} onChange={handleChange}>
          <option value="">No rating</option>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{'★'.repeat(n)}</option>)}
        </select>
        <textarea name="review" value={form.review} onChange={handleChange} placeholder="Your review..." />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  )
}