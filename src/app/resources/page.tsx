import type { Metadata } from 'next'
import Link from 'next/link'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Resources — BipolarPeople',
  description:
    'Educational guides, a curated reading list, crisis help, and links to peer communities.',
}

const resourceCards = [
  {
    title: 'About Bipolar Disorder',
    description: 'Plain-language overview of types, common experiences, and what to know.',
    href: '/resources/about',
  },
  {
    title: 'Treatment Options',
    description: 'Medication, therapy, lifestyle approaches — educational, not prescriptive.',
    href: '/resources/treatment',
  },
  {
    title: 'For Families',
    description: 'How loved ones can support someone living with bipolar disorder.',
    href: '/resources/families',
  },
  {
    title: 'Reading List',
    description: 'Memoirs, practical guides, and science — including books by our community.',
    href: '/resources/reading-list',
  },
  {
    title: 'Find Your People',
    description: 'Peer communities and established support organizations.',
    href: '/community',
  },
  {
    title: 'Crisis Resources',
    description: '988, emergency numbers, and immediate help — available 24/7.',
    href: '/crisis-resources',
  },
]

export default function ResourcesIndexPage() {
  return (
    <>
      <SectionBand className="pb-0">
        <PageWrap>
          <Reveal>
            <Eyebrow>Resources</Eyebrow>
            <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.5rem)] max-w-[20ch]">
              Help that&apos;s honest, practical, and peer-informed.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[54ch] text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
              Educational content and curated links — not a substitute for your care team. For
              tracking and early-warning tools, see{' '}
              <Link href="/app" className="text-accent font-semibold hover:underline">
                BipolarAware
              </Link>
              .
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="pt-8">
        <PageWrap>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resourceCards.map((card) => (
              <Reveal key={card.title}>
                <Link
                  href={card.href}
                  className="group block h-full bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] transition-all"
                >
                  <h2 className="font-display text-xl font-semibold group-hover:text-accent transition-colors">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-muted text-[0.97rem]">{card.description}</p>
                  <span className="mt-4 inline-flex font-semibold text-accent text-sm gap-1 group-hover:gap-2 transition-all">
                    Read more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      <CrisisBand />
    </>
  )
}
