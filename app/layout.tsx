import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Line Bot Webhook Endpoint',
  description: 'Webhook endpoint for receiving events from a Line Bot and replying to them, with feature to store incoming messages in Vercel KV.',
  creator: 'Mangle Kuo',
  authors: [
    {
      name: 'Mangle Kuo',
      url: 'https://github.com/ghcpuman902/',
    }
  ],
  applicationName: 'LineBotWebhookEndpoint',
  keywords: ['webhook', 'Vercel', 'Line Bot', 'JavaScript', 'Node.js', 'Next.js'],
  publisher: 'Mangle Kuo',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}