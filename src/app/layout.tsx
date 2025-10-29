import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bipolar People - Community & Resources for Bipolar Disorder',
  description: 'A trusted, compassionate online community and resource hub for people living with bipolar disorder, their families, caregivers, and mental health professionals.',
  keywords: 'bipolar disorder, mental health, community, support, resources, mood tracking',
  openGraph: {
    title: 'Bipolar People - Community & Resources for Bipolar Disorder',
    description: 'A trusted, compassionate online community and resource hub for people living with bipolar disorder.',
    type: 'website',
    url: 'https://bipolarpeople.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bipolar People - Community & Resources for Bipolar Disorder',
    description: 'A trusted, compassionate online community and resource hub for people living with bipolar disorder.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
