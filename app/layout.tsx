import Providers from '@/components/Providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppBar from '@/components/AppBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Appreciate Ya',
  description: 'Let us celebrate each other by encouraning and exchanging gifts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
