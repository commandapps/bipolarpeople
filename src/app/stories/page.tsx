import type { Metadata } from 'next'
import Link from 'next/link'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Stories — BipolarPeople',
  description:
    'Real stories of people living well with bipolar disorder — from famous names to everyday lives in our community.',
}

const storyTypes = [
  {
    title: 'Famous people',
    description:
      'Musicians, founders, writers, a general, a Johns Hopkins psychiatrist — people who chose to speak openly about living with bipolar disorder.',
    href: '/stories/famous-people',
    cta: 'Read famous stories →',
  },
  {
    title: 'Community stories',
    description:
      'Honest, hopeful accounts from members of our community. Some named, some anonymous — all shared with consent.',
    href: '/stories/community',
    cta: 'Read community stories →',
  },
  {
    title: 'Share your story',
    description:
      'Your experience matters. Share what helped, what you wish you\'d known, or simply that you\'re still here.',
    href: '/stories/share',
    cta: 'Share your story →',
  },
]

export default function StoriesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-[clamp(2.5rem,5vw,4rem)]">
        <div className="absolute inset-0 pointer-events-none opacity-35" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(110% 80% at 50% -20%, var(--rose) 0%, var(--accent) 14%, transparent 48%)',
            }}
          />
        </div>
        <PageWrap className="relative z-10">
          <Reveal>
            <h1 className="text-[clamp(2.3rem,5.4vw,3.9rem)] max-w-[16ch]">
              Stories that change how people see <em className="italic text-accent">bipolar disorder.</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[54ch] text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
              From people you already admire to neighbors who&apos;ve been where you are — real
              experiences carrying the same message: this is survivable, and more than survivable.
            </p>
          </Reveal>
        </PageWrap>
      </section>

      <SectionBand className="pt-0">
        <PageWrap>
          <div className="grid md:grid-cols-3 gap-4">
            {storyTypes.map((type) => (
              <Reveal key={type.title}>
                <Link
                  href={type.href}
                  className="group block bg-surface-2 border border-line rounded-[var(--radius)] p-7 shadow-[var(--shadow)] h-full transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
                >
                  <Eyebrow>{type.title}</Eyebrow>
                  <p className="mt-4 text-muted">{type.description}</p>
                  <span className="mt-5 inline-flex font-semibold text-accent group-hover:gap-2 transition-all gap-1">
                    {type.cta}
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
