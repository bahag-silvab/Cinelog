'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ThreeBackground from '@/components/ui/ThreeBackground'
import ProtectedRoute from '@/components/ui/ProtectedRoute'
import RecommendPanel from '@/components/recommendations/RecommendPanel'
import { useAuth } from '@/hooks/useAuth'
import { useMovies } from '@/hooks/useMovies'
import { addMovie, updateMovie, deleteMovie } from '@/services/movieService'

export default function DashboardPage() {
  const { user, logout }            = useAuth()
  const router                      = useRouter()
  const [filter, setFilter]         = useState('')
  const { movies, loading, reload } = useMovies(filter)
  const [showAdd, setShowAdd]       = useState(false)
  const [editMovie, setEditMovie]   = useState(null)

  const handleLogout = () => { logout(); router.push('/') }

  const handleDelete = async (id) => {
    if (!confirm('Remove this movie?')) return
    await deleteMovie(id)
    reload()
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-[#0a0a0f] text-white font-serif">
        <ThreeBackground />

        {/* ── Navbar ── */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[#d4af37]/10 bg-[#0a0a0f]/80 backdrop-blur-xl"
          style={{ padding: '20px 64px' }}>
          <div className="text-xl font-bold tracking-widest text-[#d4af37] uppercase cursor-pointer"
            onClick={() => router.push('/')}>
            Cine<span className="text-white font-light">Log</span>
          </div>
          <div className="flex items-center" style={{ gap: 24 }}>
            <span className="text-xs tracking-widest text-white/40 uppercase">
              Hi, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs tracking-widest uppercase text-white/50 border border-white/10 rounded-sm hover:border-white/30 hover:text-white transition-all cursor-pointer"
              style={{ padding: '8px 20px' }}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* ── Main content ── */}
        <div className="relative z-10" style={{ padding: '120px 64px 80px' }}>

          {/* Header */}
          <div style={{ marginBottom: '16px' }}>
            <p className="text-xs tracking-[.25em] text-[#d4af37] uppercase" style={{ marginBottom: 8 }}>
              Your collection
            </p>
            <div className="flex items-center justify-between flex-wrap" style={{ gap: 16 }}>
              <h1 className="text-4xl font-light tracking-wide">My Watchlist</h1>
              <button
                onClick={() => setShowAdd(true)}
                className="bg-[#d4af37] text-[#0a0a0f] text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-[#e8c84a] transition-all cursor-pointer"
                style={{ padding: '12px 28px' }}
              >
                + Add movie
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap border-b border-white/5" style={{ gap: 8, marginBottom: 40, paddingBottom: 20 }}>
            {[
              { label: 'All',      value: '' },
              { label: 'Watched',  value: 'watched' },
              { label: 'In queue', value: 'want_to_watch' },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`text-xs tracking-widest uppercase rounded-sm border transition-all cursor-pointer
                  ${filter === f.value
                    ? 'bg-[#d4af37] text-[#0a0a0f] border-[#d4af37] font-bold'
                    : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                style={{ padding: '8px 20px' }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Movie grid */}
          {loading ? (
            <div className="flex items-center justify-center" style={{ padding: '80px 0' }}>
              <div className="text-xs tracking-[.25em] text-[#d4af37] uppercase animate-pulse">Loading...</div>
            </div>
          ) : movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center" style={{ padding: '80px 0', gap: 16 }}>
              <p className="text-white/20 text-sm tracking-widest uppercase">No movies yet</p>
              <button
                onClick={() => setShowAdd(true)}
                className="bg-[#d4af37] text-[#0a0a0f] text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-[#e8c84a] transition-all cursor-pointer"
                style={{ padding: '12px 28px' }}
              >
                Add your first movie
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gap: 16, marginBottom: 48 }}>
              {movies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onEdit={() => setEditMovie(movie)}
                  onDelete={() => handleDelete(movie.id)}
                />
              ))}
            </div>
          )}

          {/* ── AI Recommendations ── */}
          <RecommendPanel movies={movies} />

        </div>

        {/* ── Modals ── */}
        {showAdd && (
          <AddMovieModal
            onClose={() => setShowAdd(false)}
            onSave={() => { reload(); setShowAdd(false) }}
          />
        )}
        {editMovie && (
          <EditMovieModal
            movie={editMovie}
            onClose={() => setEditMovie(null)}
            onSave={() => { reload(); setEditMovie(null) }}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}

// ── Movie Card ──────────────────────────────────────────────
function MovieCard({ movie, onEdit, onDelete }) {
  const GRADIENTS = [
    'linear-gradient(135deg,#1a0a2e,#2d1458)',
    'linear-gradient(135deg,#0d1f0d,#1a3d1a)',
    'linear-gradient(135deg,#1f0d0d,#3d1a1a)',
    'linear-gradient(135deg,#001a2e,#003d5c)',
    'linear-gradient(135deg,#1a0a00,#3d1f00)',
    'linear-gradient(135deg,#0a1a0a,#1a3320)',
  ]
  const bg     = GRADIENTS[movie.id % GRADIENTS.length]
  const letter = movie.title?.[0]?.toUpperCase()

  return (
    <div className="rounded overflow-hidden group transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
    >
      <div className="relative flex items-center justify-center text-4xl font-bold text-white/15"
        style={{ height: 112, background: movie.poster_url ? undefined : bg }}>
        {movie.poster_url
          ? <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover" />
          : <span className="font-serif">{letter}</span>
        }
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.6)', gap: 8 }}>
          <button onClick={onEdit}
            className="text-[#0a0a0f] rounded-sm font-bold cursor-pointer bg-[#d4af37]"
            style={{ fontSize: 10, letterSpacing: '.1em', padding: '4px 10px' }}>
            Edit
          </button>
          <button onClick={onDelete}
            className="text-white rounded-sm cursor-pointer hover:bg-red-500/30 transition-colors"
            style={{ fontSize: 10, letterSpacing: '.1em', padding: '4px 10px', background: 'rgba(255,255,255,0.1)' }}>
            Del
          </button>
        </div>
      </div>
      <div style={{ padding: 12 }}>
        <div className="text-xs font-semibold tracking-wide text-white truncate" style={{ marginBottom: 4 }}>{movie.title}</div>
        <div className="text-white/35 tracking-wide" style={{ fontSize: 11, marginBottom: 6 }}>
          {movie.year}{movie.genre ? ` · ${movie.genre}` : ''}
        </div>
        {movie.rating && (
          <div className="text-[#d4af37]" style={{ fontSize: 11, marginBottom: 4 }}>
            {'★'.repeat(movie.rating)}{'☆'.repeat(5 - movie.rating)}
          </div>
        )}
        <div className="inline-block text-[9px] tracking-widest uppercase rounded-sm"
          style={{
            padding: '3px 8px',
            background: movie.status === 'watched' ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.05)',
            color:      movie.status === 'watched' ? '#d4af37' : 'rgba(255,255,255,0.35)',
            border:     `1px solid ${movie.status === 'watched' ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.08)'}`,
          }}>
          {movie.status === 'watched' ? 'Watched' : 'In queue'}
        </div>
      </div>
    </div>
  )
}

// ── Add Movie Modal ─────────────────────────────────────────
function AddMovieModal({ onClose, onSave }) {
  const [form, setForm]       = useState({ title: '', year: '', genre: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addMovie(form)
      onSave()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title="Add movie" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalField label="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Movie title"    required />
        <ModalField label="Year"  value={form.year}  onChange={e => setForm({...form, year: e.target.value})}  placeholder="2024"           type="number" />
        <ModalField label="Genre" value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} placeholder="Sci-Fi, Drama…" />
        <ModalSubmit loading={loading} label="Add to list" />
      </form>
    </Modal>
  )
}

// ── Edit Movie Modal ────────────────────────────────────────
function EditMovieModal({ movie, onClose, onSave }) {
  const [form, setForm]       = useState({ rating: movie.rating || '', review: movie.review || '', status: movie.status })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateMovie(movie.id, form)
      onSave()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title={movie.title} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label className="block text-[11px] tracking-[.12em] uppercase text-white/45" style={{ marginBottom: 8 }}>Status</label>
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
            className="w-full text-white text-sm font-serif outline-none rounded"
            style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <option value="want_to_watch">In queue</option>
            <option value="watched">Watched</option>
          </select>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label className="block text-[11px] tracking-[.12em] uppercase text-white/45" style={{ marginBottom: 8 }}>Rating</label>
          <select value={form.rating} onChange={e => setForm({...form, rating: e.target.value})}
            className="w-full text-white text-sm font-serif outline-none rounded"
            style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <option value="">No rating</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{'★'.repeat(n)} {n}/5</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label className="block text-[11px] tracking-[.12em] uppercase text-white/45" style={{ marginBottom: 8 }}>Review</label>
          <textarea value={form.review} onChange={e => setForm({...form, review: e.target.value})}
            placeholder="Your thoughts on this film..." rows={3}
            className="w-full text-white text-sm font-serif outline-none rounded resize-none placeholder:text-white/20"
            style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
        <ModalSubmit loading={loading} label="Save changes" />
      </form>
    </Modal>
  )
}

// ── Shared modal components ─────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ background: 'rgba(0,0,0,0.7)', padding: '0 16px' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full rounded font-serif"
        style={{ maxWidth: 440, background: '#0f0f18', border: '1px solid rgba(255,255,255,0.1)', padding: 32 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 28 }}>
          <h2 className="text-lg font-light tracking-wide text-white">{title}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white cursor-pointer" style={{ fontSize: 20 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ModalField({ label, value, onChange, placeholder, required, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 20 }}>
      <label className="block text-[11px] tracking-[.12em] uppercase text-white/45" style={{ marginBottom: 8 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="w-full text-white text-sm font-serif outline-none rounded placeholder:text-white/20 transition-colors"
        style={{
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${focused ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.1)'}`,
        }}
      />
    </div>
  )
}

function ModalSubmit({ loading, label }) {
  return (
    <button type="submit" disabled={loading}
      className="w-full rounded text-xs tracking-[.14em] uppercase font-bold font-serif transition-all cursor-pointer"
      style={{
        padding: '13px',
        marginTop: 8,
        background: loading ? 'rgba(212,175,55,0.5)' : '#d4af37',
        color: '#0a0a0f',
        cursor: loading ? 'not-allowed' : 'pointer',
      }}>
      {loading ? 'Saving...' : label}
    </button>
  )
}
