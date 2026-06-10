import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import CommunityStoriesGrid from '@/components/stories/CommunityStoriesGrid'
import { Breadcrumb, Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Community Stories — BipolarPeople',
  description:
    'Honest, hopeful stories of living with bipolar disorder, shared by members of our community. Some named, some anonymous — all shared with consent.',
}

import { getFeaturedStory } from '@/lib/stories-data'

const promises = [
  { icon: '🕶️', title: 'Stay anonymous', text: 'Use your name, a pseudonym, or none at all.' },
  { icon: '👀', title: 'Reviewed first', text: "Every story is read before it's ever published." },
  { icon: '🔒', title: 'Private contact', text: 'Your email is only used to reach you — never shown.' },
  { icon: '↩️', title: 'Yours to remove', text: 'Ask us to take it down anytime, for any reason.' },
]

export default function CommunityStoriesPage() {
  const featured = getFeaturedStory()

  return (
    <>
      <section className="relative overflow-hidden py-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(2.5rem,5vw,3.5rem)]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.34]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(110% 80% at 15% -20%, var(--rose) 0%, var(--accent) 14%, transparent 48%)',
            }}
          />
        </div>
        <PageWrap className="relative z-10">
          <Breadcrumb items={[{ label: 'Stories', href: '/stories' }, { label: 'Community stories' }]} />
          <Reveal>
            <h1 className="mt-4 text-[clamp(2.3rem,5.4vw,3.9rem)] max-w-[16ch]">
              The most powerful stories here come from <em className="italic text-accent">people like you.</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[54ch] text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
              Honest accounts of living with bipolar disorder — the hard parts and the hopeful ones —
              shared by members of our community. Some use their names. Some stay anonymous.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#share">Share your story →</Button>
              <Button href="/stories/famous-people" variant="ghost">
                Read famous people&apos;s stories
              </Button>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex gap-3 items-start bg-surface-2 border border-line rounded-[var(--radius)] p-5 shadow-[var(--shadow)] max-w-[780px] text-[0.96rem] text-muted">
              <span className="flex-none w-[30px] h-[30px] rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-accent grid place-items-center font-bold">
                i
              </span>
              <span>
                Every story here is shared with the author&apos;s permission, and many are anonymous.
                We never publish anyone&apos;s private words without consent. Your story stays yours;
                you can ask us to remove it anytime.
              </span>
            </div>
          </Reveal>
        </PageWrap>
      </section>

      <SectionBand className="pt-0">
        <PageWrap>
          <Reveal>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow-lg)] bg-ground">
              <div className="p-[clamp(1.8rem,4vw,3rem)] text-white relative flex flex-col justify-center">
                <span className="font-display text-[6rem] absolute top-0 left-5 text-amber/50 opacity-50 leading-none" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="font-display italic text-[clamp(1.4rem,2.6vw,2rem)] leading-snug relative z-10">
                  {featured.excerpt}
                </p>
              </div>
              <div className="bg-surface-2 p-[clamp(1.8rem,4vw,3rem)] flex flex-col justify-center">
                <span className="text-[0.74rem] font-bold tracking-wide uppercase text-accent">
                  Featured · {featured.category}
                </span>
                <h2 className="mt-2 text-[clamp(1.4rem,2.5vw,1.9rem)]">
                  &ldquo;{featured.title}&rdquo;
                </h2>
                <div className="mt-5 flex items-center gap-3">
                  <span className="w-[42px] h-[42px] rounded-full grid place-items-center text-white font-bold bg-gradient-to-br from-indigo to-accent">
                    {featured.authorInitials}
                  </span>
                  <div>
                    <b className="block">{featured.author}</b>
                    <span className="text-muted text-sm">{featured.detail}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <Button href={`/stories/${featured.id}`}>Read {featured.author}&apos;s story →</Button>
                </div>
              </div>
            </div>
          </Reveal>

          <CommunityStoriesGrid />
        </PageWrap>
      </SectionBand>

      <SectionBand id="share" className="bg-[color-mix(in_srgb,var(--accent)_7%,var(--surface))]">
        <PageWrap>
          <Reveal>
            <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-[clamp(1.8rem,4vw,3rem)] shadow-[var(--shadow-lg)] text-center max-w-[820px] mx-auto">
              <Eyebrow>Add your voice</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] max-w-[20ch] mx-auto">
                Your story could be the one someone needs today.
              </h2>
              <p className="mt-4 max-w-[52ch] mx-auto text-muted">
                You don&apos;t have to be a writer, and you don&apos;t have to share everything. A few
                honest paragraphs about what helped — that&apos;s enough to change someone&apos;s day.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                {promises.map((item) => (
                  <div key={item.title} className="flex gap-2 items-start text-[0.9rem]">
                    <span className="text-lg">{item.icon}</span>
                    <span>
                      <b className="block">{item.title}</b>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/stories/share">Share your story →</Button>
              </div>
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <CrisisBand />
    </>
  )
}
