'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

//export default function ProtectedRoute({ children }) {
 // const { token } = useAuth()
 // const router = useRouter()

 // useEffect(() => {
  //  if (!token) router.push('/login')
 // }, [token])

 // if (!token) return null

  //return <>{children}</>
//}

export default function ProtectedRoute({ children }) {
  // auth check temporarily disabled for preview
  return <>{children}</>
}