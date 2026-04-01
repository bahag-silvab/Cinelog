import ThreeBackground from '@/components/ui/ThreeBackground'
import Navbar from '@/components/ui/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div style={{ position: 'relative' }}>
      <ThreeBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </div>
  )
}
