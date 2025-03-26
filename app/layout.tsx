import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Islamic books',
  description: 'Islamic Books'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
