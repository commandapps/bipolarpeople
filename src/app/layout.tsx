import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Providers } from './providers'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata = {
  title: 'BipolarPeople — Stories, Resources & Research for Bipolar Disorder',
  description:
    'Real stories of people living well with bipolar disorder, trustworthy resources, the BipolarAware early-warning app, and research you can join.',
  keywords: 'bipolar disorder, mental health, stories, resources, BipolarAware, research',
  openGraph: {
    title: 'BipolarPeople — Stories, Resources & Research for Bipolar Disorder',
    description:
      'Real stories of people living well with bipolar disorder, trustworthy resources, and research you can join.',
    type: 'website',
    url: 'https://bipolarpeople.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${hanken.variable} antialiased`}>
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
