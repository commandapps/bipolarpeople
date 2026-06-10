import Link from 'next/link'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/lib/site-config'

const BSC_JOIN_URL = siteConfig.bscJoinUrl || '/community'

const orgs = [
  {
    name: 'DBSA — Depression and Bipolar Support Alliance',
    description: 'Peer-led support groups, online and in person.',
    href: 'https://www.dbsalliance.org',
  },
  {
    name: 'International Bipolar Foundation',
    description: 'Education, resources, and community programs.',
    href: 'https://ibpf.org',
  },
  {
    name: 'NAMI — National Alliance on Mental Illness',
    description: 'Support groups, helpline, and local affiliates.',
    href: 'https://www.nami.org',
  },
  {
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential, 24/7. Call or text 988.',
    href: 'tel:988',
  },
]

export default function CommunityPage() {
  return (
    <>
      <SectionBand>
        <PageWrap>
          <Reveal>
            <Eyebrow>Community</Eyebrow>
            <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.5rem)] max-w-[18ch]">
              You&apos;re among people who get it.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[54ch] text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
              Connecting with others who understand bipolar disorder can be steadying in a way little
              else is. This page points you to peer communities where you can share, listen, and feel
              less alone.
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="pt-0 bg-[color-mix(in_srgb,var(--ground)_5%,var(--surface))]">
        <PageWrap className="max-w-[780px]">
          <Reveal>
            <h2 className="font-display text-2xl font-medium">How this community works</h2>
            <p className="mt-4 text-muted leading-relaxed">
              This is peer support — people living with bipolar disorder, and those who love them,
              showing up for each other. It runs on clear community guidelines and the care of its
              members. It is <strong>not</strong> moderated by clinicians, and nothing here is
              medical advice. For diagnosis or treatment, please talk with your own healthcare team.
              If you&apos;re in crisis, call or text 988.
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="pt-0">
        <PageWrap>
          <Reveal>
            <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-[clamp(1.6rem,3vw,2.4rem)] shadow-[var(--shadow-lg)] max-w-[780px]">
              <h2 className="font-display text-2xl font-medium">The Bipolar Social Club</h2>
              <p className="mt-4 text-muted leading-relaxed">
                A warm, active peer community that connects over email — sharing experiences,
                questions, books, research, and encouragement. Members include authors and advocates
                living openly with bipolar disorder.
              </p>
              <p className="mt-4 text-muted text-sm">
                To request to join, see the group&apos;s membership guidelines and signup process.
              </p>
              <div className="mt-6">
                <Button href={BSC_JOIN_URL}>Learn about joining →</Button>
              </div>
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="pt-0">
        <PageWrap>
          <Reveal>
            <h2 className="font-display text-2xl font-medium mb-8">Find a support community</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {orgs.map((org) => (
              <Reveal key={org.name}>
                <a
                  href={org.href}
                  target={org.href.startsWith('tel:') ? undefined : '_blank'}
                  rel={org.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  className="block h-full bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] transition-all"
                >
                  <h3 className="font-semibold text-ink">{org.name}</h3>
                  <p className="mt-2 text-muted text-sm">{org.description}</p>
                  <span className="mt-4 inline-flex text-accent font-semibold text-sm">
                    Visit →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-muted text-sm max-w-[60ch]">
              Want to share your story on this site?{' '}
              <Link href="/stories/share" className="text-accent font-semibold hover:underline">
                Submit a story with your consent
              </Link>{' '}
              — we never publish private words without permission.
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <CrisisBand />
    </>
  )
}
