import { useState } from 'react'
import { addMovie } from '@/services/movieService'

export default function AddMovieModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: '', year: '', genre: ''
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addMovie(form)
    onSave()
    onClose()
  }

  return (
    <div> {/* add your modal overlay styles here */}
      <form onSubmit={handleSubmit}>
        <h2>Add movie</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="year"  value={form.year}  onChange={handleChange} placeholder="Year"  type="number" />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  )
}