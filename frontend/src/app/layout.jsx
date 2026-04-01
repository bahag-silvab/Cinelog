import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: '#0a0a0f', margin: 0, padding: 0  }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
