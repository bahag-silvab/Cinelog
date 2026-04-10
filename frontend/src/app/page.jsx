'use client'
import { useRouter } from 'next/navigation'
import ThreeBackground from '@/components/ui/ThreeBackground'

export default function Home() {
  const router = useRouter()
  // ── Sample data ─────────────────────────────────────────────
  const SAMPLE_MOVIES = [
  { letter: 'I', title: 'Inception',      year: 2010, genre: 'Sci-Fi',   stars: '★★★★★', watched: true,  bg: 'linear-gradient(135deg,#1a0a2e,#2d1458)' , poster: '/posters/Inception.jpeg'},
  { letter: 'M', title: 'Spirited Away',     year: 2001, genre: 'Animation',   stars: '★★★★☆', watched: true,  bg: 'linear-gradient(135deg,#0d1f0d,#1a3d1a)', poster: '/posters/spirited-away.jpeg' },
  { letter: 'D', title: 'Dune: Part Two', year: 2024, genre: 'Epic',     stars: '— — — —', watched: false, bg: 'linear-gradient(135deg,#1f1000,#3d2200)', poster: '/posters/inception.jpg' },
  { letter: 'A', title: 'Arrival',        year: 2016, genre: 'Sci-Fi',   stars: '★★★★★', watched: true,  bg: 'linear-gradient(135deg,#001a2e,#003d5c)',poster: '/posters/inception.jpg' },
  { letter: 'B', title: 'Blade Runner',   year: 2049, genre: 'Neo-noir', stars: '★★★★☆', watched: true,  bg: 'linear-gradient(135deg,#1a0a00,#3d1f00)',poster: '/posters/inception.jpg' },
  { letter: 'E', title: 'Ex Machina',     year: 2014, genre: 'Thriller', stars: '— — — —', watched: false, bg: 'linear-gradient(135deg,#0a1a0a,#1a3320)' ,poster: '/posters/inception.jpg'},
]

   const movies = [
  { id: 1, title: "Project Hail Mary", poster: "/posters/kill-bill.jpeg" },
  { id: 2, title: "Hoppers", poster: "/posters/the-shining.jpeg" },
  { id: 3, title: "Ready or Not 2", poster: "/posters/taxi-driver.jpeg" },
  { id: 4, title: "Undertone", poster: "/posters/breaking-bad.jpeg" },
  { id: 5, title: "Peaky Blinders: The Immortal Man", poster: "/posters/taste of cherry.jpeg" },
  { id: 6, title: "Heel", poster: "/posters/chungking express.jpeg" },
]

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white font-serif overflow-x-hidden w-full">
      <ThreeBackground />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b border-[#d4af37]/10 bg-[#0a0a0f]/75 backdrop-blur-xl">
        <div className="text-xl font-bold tracking-widest text-[#d4af37] uppercase">
          Cine<span className="text-white font-light">Log</span>
        </div>
        <div className="flex items-center gap-8">
          <span
            className="text-xs tracking-widest text-white/45 uppercase cursor-pointer hover:text-[#d4af37] transition-colors"
            onClick={() => router.push('/login')}
          >
            Sign in
          </span>
          <button
            className="px-7 py-3 bg-[#d4af37] text-[#0a0a0f] text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-[#e8c84a] transition-all cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 pt-32 pb-8 text-center">
        <p className="text-xs tracking-[.25em] text-[#d4af37] uppercase mb-5">
          Your personal cinema
        </p>
        <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-wide max-w-3xl mb-6">
          Every film you've loved.<br />
          <em className="text-[#d4af37]">Every film you should.</em>
        </h1>
        <p className="text-base text-white/40 tracking-widest max-w-md leading-relaxed mb-12">
          Track your watchlist, rate what you've seen, and let AI recommend what's next — all in one cinematic space.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            className="px-8 py-3 bg-[#d4af37] text-[#0a0a0f] text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-[#e8c84a] transition-all cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Start your list
          </button>
          <button
            className="px-8 py-3 bg-transparent text-white/60 text-xs tracking-widest uppercase border border-white/15 rounded-sm hover:border-white/40 hover:text-white transition-all cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Sign in
          </button>
        </div>

        {/* Scroll hint */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-[#d4af37]" />
          <span className="text-[10px] tracking-[.2em] text-[#d4af37] uppercase">Scroll</span>
        </div>
      </section>

      {/* ── Features ── */}
<section className="relative z-10 w-full" style={{ paddingLeft: '64px', paddingRight: '64px', paddingTop: '80px', paddingBottom: '40px' }}>
  <Divider label="What you get" />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
    <FeatureCard number="01" title="Track every film"   desc="Add movies to your personal watchlist. Mark them as watched or in your queue. Your list, your way." />
    <FeatureCard number="02" title="Rate & review"      desc="Give each film a star rating and write your own review. Build a diary of everything you've watched." />
    <FeatureCard number="03" title="AI recommendations" desc="Based on what you've rated, our AI suggests films you'll actually love — not just what's trending." />
  </div>
</section>

{/* ── Sample watchlist ── */}
<section className="relative z-10 w-full" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
  <div className="flex justify-center gap-4 px-4">
    {movies.map((movie, index) => (
      <div
        key={movie.id}
        className={`relative flex-shrink-0 w-48 rounded-lg overflow-hidden cursor-pointer
          transition-transform duration-200 hover:scale-105
          ${index === 1 ? "ring-2 ring-orange-400" : ""}`}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      </div>
    ))}
  </div>
</section>

      {/* ── CTA ── */}
      <section className="relative z-10 text-center px-6 border-t border-[#d4af37]/10" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
        <p className="text-xs tracking-[.25em] text-[#d4af37] uppercase mb-5">Ready to start?</p>
        <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-10">
          Build your cinema diary today.
        </h2>
        <button
          className="px-10 py-4 bg-[#d4af37] text-[#0a0a0f] text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-[#e8c84a] transition-all cursor-pointer"
          onClick={() => router.push('/register')}
        >
          Create free account
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 flex items-center justify-between flex-wrap gap-3 px-10 py-6 border-t border-white/5">
        <div className="text-base font-bold tracking-widest text-[#d4af37] uppercase">
          Cine<span className="text-white/30 font-light">Log</span>
        </div>
        <p className="text-[11px] text-white/20 tracking-widest">
          © 2026 CineLog — Built with Next.js
        </p>
      </footer>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────

function Divider({ label }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-[#d4af37]/12" />
      <span className="text-[10px] tracking-[.2em] text-[#d4af37]/50 uppercase">{label}</span>
      <div className="flex-1 h-px bg-[#d4af37]/12" />
    </div>
  )
}

function FeatureCard({ number, title, desc }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded p-7 transition-all duration-300 hover:border-[#d4af37]/30 group">
      <div className="text-[11px] text-[#d4af37] tracking-[.2em] mb-4">{number}</div>
      <h3 className="text-base font-normal tracking-wide mb-3 text-white">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </div>
  )
}

function SampleCard({ movie }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded overflow-hidden transition-all duration-300 hover:border-[#d4af37]/30 hover:-translate-y-1">
      <div
        className="h-40 flex items-center justify-center text-4xl font-bold text-white/15 font-serif"
        style={{ background: movie.bg }}
      >
        {movie.letter}
      </div>
      <div className="p-3">
        <div className="text-xs font-semibold tracking-wide mb-1 text-white">{movie.title}</div>
        <div className="text-[11px] text-white/35 mb-2 tracking-wide">{movie.year} · {movie.genre}</div>
        <div className="text-[11px] text-[#d4af37]">{movie.stars}</div>
        <div className={`inline-block mt-2 text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm border
          ${movie.watched
            ? 'bg-[#d4af37]/12 text-[#d4af37] border-[#d4af37]/20'
            : 'bg-white/5 text-white/35 border-white/8'
          }`}>
          {movie.watched ? 'Watched' : 'In queue'}
        </div>
      </div>
    </div>
  )
}

 
 
