'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { login as loginApi } from '@/services/authService'
import ThreeBackground from '@/components/ui/ThreeBackground'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login }               = useAuth()
  const router                  = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await loginApi(email, password)
      login(token, user)
      router.push('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex font-serif">
      <ThreeBackground />

      {/* ── Left panel — branding ── */}
      <div className="flex-1 flex flex-col justify-between p-10 relative z-10">

        <div
          className="text-xl font-bold tracking-widest text-[#d4af37] uppercase cursor-pointer"
          onClick={() => router.push('/')}
        >
          Cine<span className="text-white font-light">Log</span>
        </div>

        <div>
          <p className="text-xs tracking-[.25em] text-[#d4af37] uppercase mb-4">
            Welcome back
          </p>
          <h1 className="text-5xl font-light leading-tight text-white mb-5">
            Your cinema<br />
            <em className="text-[#d4af37]">awaits.</em>
          </h1>
          <p className="text-sm text-white/35 leading-relaxed max-w-sm">
            Pick up where you left off. Your watchlist, ratings, and recommendations are right here.
          </p>
        </div>

        {/* Decorative film strip */}
        <div className="flex gap-2">
          {['#1a0a2e', '#0d1f0d', '#1f0d0d', '#001a2e', '#1a0a00'].map((bg, i) => (
            <div
              key={i}
              className="rounded border border-white/5"
              style={{ background: bg, opacity: 0.6 + i * 0.08, width: 52, height: 72 }}
            />
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="w-full max-w-[480px] flex items-center justify-center px-8 py-10 relative z-10 border-l border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <div className="w-full max-w-[360px]">

          <h2 className="text-2xl font-normal tracking-wide text-white mb-2">
            Sign in
          </h2>
          <p className="text-sm text-white/35 tracking-wide mb-9">
            Don't have an account?{' '}
            <span
              className="text-[#d4af37] cursor-pointer hover:underline"
              onClick={() => router.push('/register')}
            >
              Create one
            </span>
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 rounded px-4 py-3 mb-5 text-sm text-red-400 tracking-wide">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Field label="Email"    type="email"    value={email}    onChange={e => setEmail(e.target.value)}    placeholder="you@example.com" required />
            <Field label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"        required />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-2 rounded text-xs tracking-[.14em] uppercase font-bold font-serif transition-all
                ${loading
                  ? 'bg-[#d4af37]/50 text-[#0a0a0f] cursor-not-allowed'
                  : 'bg-[#d4af37] text-[#0a0a0f] cursor-pointer hover:bg-[#e8c84a]'
                }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.07]">
            <p className="text-[11px] text-white/20 text-center tracking-wide">
              By signing in you agree to our terms of service
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

function Field({ label, type, value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="mb-5">
      <label className="block text-[11px] tracking-[.12em] uppercase text-white/45 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-4 py-3 bg-white/[0.04] rounded text-white text-sm font-serif outline-none transition-colors placeholder:text-white/20
          ${focused ? 'border border-[#d4af37]/50' : 'border border-white/10'}`}
      />
    </div>
  )
}
