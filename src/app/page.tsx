import Link from 'next/link'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand, TextLink } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'
import { getFeaturedStory } from '@/lib/stories-data'

const famousChips = [
  { name: 'Mariah Carey', role: 'Musician' },
  { name: 'Carrie Fisher', role: 'Actor & writer' },
  { name: 'Stephen Fry', role: 'Writer' },
  { name: 'Catherine Zeta-Jones', role: 'Actor' },
  { name: 'Ted Turner', role: 'Founder, CNN' },
  { name: 'Kay Redfield Jamison', role: 'Psychologist' },
  { name: 'Gregg Martin', role: 'U.S. Army general (ret.)' },
]

const pillars = [
  {
    title: 'Stories',
    description:
      'Real experiences — famous names and everyday lives — all carrying the same message: this is survivable, and more than survivable.',
    href: '/stories',
    cta: 'Read the stories →',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 5h16v12H8l-4 3V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Resources',
    description:
      'Plain-language guides, a curated reading list, crisis help, and printable tools to take to your next appointment.',
    href: '/resources',
    cta: 'Browse resources →',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h14v16l-7-3-7 3V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'BipolarAware',
    description:
      'A passive early-warning app that watches for the signs of a mood episode before it takes hold — so you can act earlier.',
    href: '/app',
    cta: 'See how it works →',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Research',
    description:
      "We're testing whether subtle, passive signals can predict mood episodes earlier than today's tools. You can help.",
    href: '/research',
    cta: 'Join the research →',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 3v6l-4 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-4-8V3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M8 3h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function HomePage() {
  const featured = getFeaturedStory()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-[clamp(3.5rem,8vw,6.5rem)] pb-[clamp(4rem,9vw,7rem)]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-50 dark:opacity-[0.62] saturate-[1.05]"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 118%, var(--amber) 0%, var(--rose) 22%, var(--accent) 30%, transparent 58%), radial-gradient(140% 100% at 50% 135%, var(--indigo) 12%, transparent 60%)',
            }}
          />
          <div
            className="absolute left-1/2 -bottom-[42%] w-[min(78vw,720px)] aspect-square -translate-x-1/2 rounded-full blur-[2px] animate-[rise_26s_ease-in-out_infinite_alternate]"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--amber) 90%, #fff) 0%, var(--accent) 34%, transparent 62%)',
            }}
          />
        </div>
        <PageWrap className="relative z-10">
          <Reveal>
            <h1 className="text-[clamp(2.55rem,6.2vw,4.7rem)] font-medium max-w-[16ch]">
              Living well with bipolar disorder is{' '}
              <em className="italic text-accent font-medium">more common</em> than you&apos;ve been
              told.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-[46ch] text-[clamp(1.1rem,1.8vw,1.32rem)] text-muted">
              Real stories of people who&apos;ve built full lives. Resources to help you build
              yours. And the research working to catch episodes earlier.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/stories">Read their stories →</Button>
              <Button href="/resources" variant="ghost">
                Explore resources
              </Button>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-14 flex flex-wrap gap-2 items-center max-w-[760px]">
              <span className="w-full text-[0.8rem] tracking-wide uppercase text-muted font-semibold mb-1">
                People who&apos;ve spoken openly about living with bipolar disorder
              </span>
              {famousChips.map((person) => (
                <span
                  key={person.name}
                  className="text-[0.86rem] font-medium px-3 py-1.5 rounded-full bg-surface-2 border border-line shadow-[var(--shadow)] whitespace-nowrap"
                >
                  <b className="font-semibold">{person.name}</b>{' '}
                  <span className="text-muted font-normal">· {person.role}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </PageWrap>
      </section>

      {/* Featured story */}
      <SectionBand>
        <PageWrap>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(1.5rem,4vw,3.5rem)] items-center">
            <Reveal>
              <div className="relative bg-surface-2 border border-line rounded-[var(--radius)] p-[clamp(1.6rem,3vw,2.6rem)] shadow-[var(--shadow-lg)]">
                <div
                  className="absolute left-0 top-6 bottom-6 w-1 rounded bg-gradient-to-b from-amber via-accent to-indigo"
                  aria-hidden="true"
                />
                <p className="font-display italic text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug pl-5">
                  {featured.excerpt}
                </p>
                <div className="pl-5 mt-5 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full grid place-items-center font-bold text-white text-sm bg-gradient-to-br from-indigo to-accent">
                    {featured.authorInitials}
                  </span>
                  <div>
                    <b className="block">{featured.author}</b>
                    <span className="text-muted text-sm">{featured.detail}</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Eyebrow>A story worth reading</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.7rem)]">
                {featured.title}
              </h2>
              <p className="mt-4 text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
                A story about disclosure, career, and what changed when the secret came down.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 items-center">
                <TextLink href={`/stories/${featured.id}`}>Read the full story →</TextLink>
                <TextLink href="/stories" muted>
                  See all stories →
                </TextLink>
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </SectionBand>

      {/* Mission */}
      <SectionBand className="bg-ground text-[#EAF0F8]">
        <PageWrap>
          <Reveal>
            <Eyebrow className="!text-amber">Why this exists</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.1rem)] max-w-[18ch] text-white">
              We&apos;re here to change the story people tell about bipolar disorder.
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[60ch] text-[#C4D2E4] text-[1.12rem]">
              Too many people hear &ldquo;bipolar&rdquo; and picture the worst day of someone&apos;s
              life. We&apos;d rather show you the fuller picture: people who were terrified the
              diagnosis would cost them everything — their careers, their relationships, their sense
              of who they were — and who went on to build lives worth keeping. Sharing those stories
              is how stigma loses its grip.
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      {/* Pillars */}
      <SectionBand id="resources">
        <PageWrap>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] mb-10">Find what you came for.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar) => (
              <Reveal key={pillar.title}>
                <article className="group relative bg-surface-2 border border-line rounded-[var(--radius)] p-7 shadow-[var(--shadow)] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-250"
                    aria-hidden="true"
                  />
                  <div className="w-[46px] h-[46px] rounded-[13px] grid place-items-center bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-accent mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="font-display text-[1.32rem] font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-[0.97rem] text-muted">{pillar.description}</p>
                  <Link href={pillar.href} className="mt-4 inline-flex font-semibold text-accent text-[0.95rem] gap-1">
                    {pillar.cta}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      {/* App feature */}
      <SectionBand id="app" className="bg-[color-mix(in_srgb,var(--ground)_5%,var(--surface))]">
        <PageWrap>
          <div className="grid md:grid-cols-2 gap-[clamp(1.5rem,5vw,4rem)] items-center">
            <Reveal>
              <div
                className="rounded-[var(--radius)] min-h-[300px] shadow-[var(--shadow-lg)] grid place-items-center bg-gradient-to-br from-ground to-ground-2"
                aria-hidden="true"
              >
                <div className="relative w-[188px] h-[380px] rounded-[34px] bg-[#0d1626] border-[7px] border-[#060c16] shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden">
                  <div
                    className="absolute inset-[7px] rounded-[26px] p-[18px_14px] text-[#dde7f5]"
                    style={{
                      background:
                        'radial-gradient(120% 70% at 50% -10%, var(--accent), transparent 55%), #101b2e',
                    }}
                  >
                    <div className="text-[0.62rem] tracking-widest uppercase opacity-70">This week</div>
                    <div className="font-display text-2xl mt-1.5 leading-tight">Steady</div>
                  </div>
                  <div
                    className="absolute left-0 right-0 bottom-[60px] h-[70px]"
                    style={{
                      background:
                        'radial-gradient(60% 100% at 20% 80%, color-mix(in srgb, var(--amber) 70%, transparent), transparent 70%), radial-gradient(60% 100% at 75% 30%, color-mix(in srgb, var(--rose) 70%, transparent), transparent 70%)',
                    }}
                  />
                  <div className="absolute left-3.5 right-3.5 bottom-4 bg-white/8 border border-white/14 rounded-[14px] px-3 py-2.5 text-[0.7rem] flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-amber animate-[pulse-ring_2.4s_infinite]"
                      aria-hidden="true"
                    />
                    Sleep shifted earlier — worth a look
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Eyebrow>The app</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)]">
                What if you could see an episode coming?
              </h2>
              <p className="mt-4 text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
                Mood episodes are easier to manage when you catch them early — but the early signs are
                easy to miss in the moment. BipolarAware runs quietly in the background, learning your
                patterns and flagging the subtle shifts that tend to come before an episode. No
                constant logging. No effort on a hard day.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/app">Get BipolarAware →</Button>
                <Button href="/app" variant="ghost">
                  Learn more
                </Button>
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </SectionBand>

      {/* Research feature */}
      <SectionBand id="research" className="bg-ground text-[#EAF0F8]">
        <PageWrap>
          <div className="grid md:grid-cols-2 gap-[clamp(1.5rem,5vw,4rem)] items-center">
            <Reveal className="md:order-2">
              <Eyebrow className="!text-amber">Help the science</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)] text-white">
                Help us find the signal sooner.
              </h2>
              <p className="mt-4 text-[#C4D2E4]">
                We&apos;re researching whether passive signals — the kind a phone or wearable can pick
                up — can flag a mood episode earlier than current methods do. If it works, it could
                give people days of warning instead of none.
              </p>
              <p className="mt-4 text-[#9FB0C6] text-[0.98rem]">
                Joining starts with a conversation, not a commitment. Participation always requires
                your informed consent, and the research is conducted under appropriate oversight.
              </p>
              <div className="mt-7">
                <Button href="/research">Express interest →</Button>
              </div>
            </Reveal>
            <Reveal className="md:order-1">
              <div
                className="rounded-[var(--radius)] min-h-[300px] shadow-[var(--shadow-lg)] border border-white/12 bg-white/5 grid place-items-center p-8"
                aria-hidden="true"
              >
                <svg viewBox="0 0 320 120" className="w-4/5 h-[120px]" preserveAspectRatio="none">
                  <polyline
                    points="0,80 40,78 80,82 120,70 160,72 200,55 240,40 280,30 320,18"
                    fill="none"
                    stroke="#F2B25C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="0,90 40,92 80,88 120,95 160,90 200,93 240,85 280,88 320,84"
                    fill="none"
                    stroke="rgba(233,138,160,0.8)"
                    strokeWidth="2"
                    strokeDasharray="2 5"
                    strokeLinecap="round"
                  />
                  <circle cx="200" cy="55" r="5" fill="#ED7350" />
                </svg>
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </SectionBand>

      {/* Community + reading */}
      <SectionBand>
        <PageWrap>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <Reveal>
              <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-[clamp(1.6rem,3vw,2.4rem)] shadow-[var(--shadow)]">
                <h3 className="font-display text-2xl font-semibold">Find people who get it.</h3>
                <p className="mt-3 text-muted">
                  Connecting with others who understand bipolar disorder can be steadying in a way
                  little else is. We&apos;ll point you to warm, active peer communities — including
                  the Bipolar Social Club — and to trusted organizations that run support groups
                  across the country.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Bipolar Social Club', 'DBSA', 'Intl. Bipolar Foundation', 'NAMI', '988 Lifeline'].map(
                    (org) => (
                      <span
                        key={org}
                        className="text-[0.82rem] font-semibold px-3 py-1.5 rounded-full border border-line bg-surface"
                      >
                        {org}
                      </span>
                    )
                  )}
                </div>
                <p className="mt-5">
                  <TextLink href="/community">Find your people →</TextLink>
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-[clamp(1.6rem,3vw,2.4rem)] shadow-[var(--shadow)]">
                <h3 className="font-display text-2xl font-semibold">Books that helped.</h3>
                <p className="mt-3 text-muted">
                  Memoirs, practical guides, and the science — including books by members of our own
                  community.
                </p>
                <div className="mt-5 flex gap-2" aria-hidden="true">
                  {[
                    { title: 'A Truck Full of Money', bg: 'linear-gradient(150deg,#1b3150,#3A4F7A)' },
                    { title: 'Brain Storm', bg: 'linear-gradient(150deg,#7a3b2e,#ED7350)' },
                    { title: 'Bipolar General', bg: 'linear-gradient(150deg,#3a3a55,#E98AA0)' },
                  ].map((book) => (
                    <span
                      key={book.title}
                      className="w-[60px] h-[86px] rounded-[5px] shadow-[var(--shadow)] grid place-items-end p-1.5 text-white text-[0.5rem] font-bold leading-tight"
                      style={{ background: book.bg }}
                    >
                      {book.title}
                    </span>
                  ))}
                </div>
                <p className="mt-5">
                  <TextLink href="/resources">See the reading list →</TextLink>
                </p>
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </SectionBand>

      <CrisisBand />
    </>
  )
}
