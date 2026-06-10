import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import FamousPeopleGrid from '@/components/stories/FamousPeopleGrid'
import { Breadcrumb, Eyebrow, PageWrap, SectionBand, TextLink } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'
import { historicalFigures } from '@/lib/famous-people-data'

export const metadata: Metadata = {
  title: 'Famous People with Bipolar Disorder — Stories — BipolarPeople',
  description:
    'Musicians, founders, writers, a general, a Johns Hopkins psychiatrist — people who chose to speak openly about living with bipolar disorder.',
}

export default function FamousPeoplePage() {
  return (
    <>
      <section className="relative overflow-hidden py-[clamp(2rem,4vw,3rem)] pb-[clamp(2.5rem,5vw,3.5rem)]">
        <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(110% 80% at 85% -20%, var(--amber) 0%, var(--accent) 14%, transparent 46%)',
            }}
          />
        </div>
        <PageWrap className="relative z-10">
          <Breadcrumb items={[{ label: 'Stories', href: '/stories' }, { label: 'Famous people' }]} />
          <Reveal>
            <h1 className="mt-4 text-[clamp(2.3rem,5.4vw,3.9rem)] max-w-[17ch]">
              You already admire people who <em className="italic text-accent">live with bipolar disorder.</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[54ch] text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
              Musicians, founders, writers, a wartime general, a Johns Hopkins psychiatrist. Each one
              feared what the word would cost them — and each one decided to say it out loud.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex gap-3 items-start bg-surface-2 border border-line rounded-[var(--radius)] p-5 shadow-[var(--shadow)] max-w-[760px] text-[0.96rem] text-muted">
              <span className="flex-none w-[30px] h-[30px] rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-accent grid place-items-center font-bold">
                i
              </span>
              <span>
                Everyone on this page chose to speak publicly about their diagnosis. We don&apos;t out
                anyone and we don&apos;t guess. Where someone is no longer living, we say so — and where
                a diagnosis is debated, we say that too.
              </span>
            </div>
          </Reveal>
        </PageWrap>
      </section>

      <SectionBand className="pt-0">
        <PageWrap>
          <Reveal>
            <Eyebrow>Living openly</Eyebrow>
            <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,2.5rem)]">People speaking for themselves.</h2>
          </Reveal>
          <FamousPeopleGrid />
          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-4 bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface-2))] border border-line rounded-[var(--radius)] p-5">
              <p className="flex-1">
                <strong>Several of them wrote the book on it.</strong> Memoirs and guides by the
                people above — and others in our community.
              </p>
              <TextLink href="/resources">See the reading list →</TextLink>
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-[color-mix(in_srgb,var(--ground)_5%,var(--surface))]">
        <PageWrap>
          <Reveal>
            <Eyebrow>Across history</Eyebrow>
            <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,2.5rem)]">
              Recognized, long before it had a name.
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-5 p-5 pl-5 border-l-[3px] border-amber bg-[color-mix(in_srgb,var(--amber)_10%,transparent)] rounded-r-xl max-w-[760px] text-[0.98rem]">
              These figures lived before modern psychiatry. Every attribution below is{' '}
              <strong>retrospective and debated</strong>. We include them because their letters and
              lives describe experiences many people recognize — not to claim certainty.
            </div>
          </Reveal>
          <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {historicalFigures.map((figure) => (
              <Reveal key={figure.name}>
                <article className="border border-dashed border-line rounded-[var(--radius)] p-5">
                  <div className="font-display text-[1.12rem] font-semibold">{figure.name}</div>
                  <div className="text-[0.74rem] uppercase tracking-wide text-muted font-semibold mt-0.5">
                    {figure.era}
                  </div>
                  <p className="mt-3 text-[0.92rem] text-muted">{figure.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-[color-mix(in_srgb,var(--accent)_7%,var(--surface))]">
        <PageWrap>
          <Reveal>
            <Eyebrow>A different lens</Eyebrow>
            <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,2.5rem)]">
              When the same traits that hurt can also help.
            </h2>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-[280px_1fr] gap-[clamp(1.6rem,4vw,3.5rem)] items-center">
            <Reveal>
              <div
                className="w-[230px] aspect-[2/3] rounded-[5px_10px_10px_5px] shadow-[var(--shadow-lg)] text-white p-6 flex flex-col justify-between mx-auto -rotate-2 relative"
                style={{ background: 'linear-gradient(155deg,#16263f,#3A4F7A 55%,var(--accent))' }}
                aria-hidden="true"
              >
                <div className="font-display text-[1.55rem] leading-tight font-semibold pl-1">
                  A First-Rate Madness
                </div>
                <div className="pl-1">
                  <div className="text-[0.78rem] leading-snug opacity-90">
                    Uncovering the Links Between Leadership and Mental Illness
                  </div>
                  <div className="text-[0.8rem] opacity-80 mt-2">S. Nassir Ghaemi</div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <p className="text-[1.18rem] text-muted">
                Psychiatrist <strong>S. Nassir Ghaemi</strong> makes a provocative argument: in a
                genuine crisis, leaders who have lived with mood disorders often do better — drawing
                on realism, empathy, resilience, and creativity sharpened by their experiences.
              </p>
              <div className="mt-5 p-4 pl-5 border-l-[3px] border-amber bg-[color-mix(in_srgb,var(--amber)_10%,transparent)] rounded-r-xl text-[0.98rem]">
                <strong>A note on this one.</strong> These are historical interpretations, and
                they&apos;re debated — and not all involve bipolar disorder.
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-ground text-[#EAF0F8] text-center">
        <PageWrap>
          <Reveal>
            <Eyebrow className="!text-amber">You don&apos;t have to be famous</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.7rem)] text-white max-w-[18ch] mx-auto">
              Your story belongs here too.
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-4 max-w-[52ch] mx-auto text-[#C4D2E4]">
              The most powerful stories on this site aren&apos;t from celebrities — they&apos;re from
              people like you.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Button href="/stories/community">Read community stories →</Button>
              <Button href="/stories/share" variant="on-dark">
                Share your story
              </Button>
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <CrisisBand />
    </>
  )
}
