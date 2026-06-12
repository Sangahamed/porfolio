import { Syne, Courier_Prime, JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { CrtGrid } from '@/components/CrtGrid'
import { CustomCursor } from '@/components/CustomCursor'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})
const courierPrime = Courier_Prime({
  variable: '--font-courier-prime',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bakayoko Sanga Hamed — Lead Technicien',
  description: 'Portfolio d’administration système, réseaux et développement full-stack.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${courierPrime.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="antialiased">
        {/* <CrtGrid /> */}
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}