'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav>
      <span>CineLog</span>
      {user && (
        <>
          <span>Hi, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  )
}