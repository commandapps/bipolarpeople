import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'
import ResearchInterestForm from '@/components/research/ResearchInterestForm'

export const metadata: Metadata = {
  title: 'Join the Research — BipolarPeople',
  description:
    'Volunteer for research testing whether passive signals can flag a mood episode earlier than current methods. Interest only — informed consent always required.',
}

const steps = [
  {
    title: "Tell us you're interested",
    description: 'A short form below — just a way to reach you. No health details.',
  },
  {
    title: 'We follow up',
    description:
      "We'll explain the study in plain language, answer your questions, and check whether it's a fit for you.",
  },
  {
    title: 'You give informed consent',
    description:
      "Nothing begins until you've reviewed exactly what's involved and agreed, in writing. Taking part is always voluntary.",
  },
  {
    title: 'You take part',
    description:
      'Typically by using BipolarAware on your own device so it can learn your patterns, plus occasional check-ins. [Specifics confirmed at consent.]',
  },
  {
    title: 'You can stop anytime',
    description:
      'Withdraw and request deletion of your data whenever you want, for any reason, with no penalty.',
  },
]

const eligibility = [
  <>You&apos;re <strong>18 or older</strong></>,
  <>You have a diagnosis of <strong>bipolar I or II</strong></>,
  <>You use a <strong>compatible smartphone</strong> (and optionally a wearable)</>,
  <>You&apos;re willing to share passive data <strong>under consent</strong> <em>[criteria TBD]</em></>,
]

const rights = [
  { icon: '🔒', title: 'Your data is protected', description: 'Stored securely and handled under strict safeguards. [Encryption / de-identification details — to confirm.]' },
  { icon: '✋', title: 'You can withdraw anytime', description: 'Leave the study and request deletion of your data whenever you like — no penalty, no questions required.' },
  { icon: '📝', title: 'Consent comes first', description: "Nothing starts until you've understood what's involved and agreed in writing." },
  { icon: '🚫', title: 'Never sold', description: 'Your data is never sold or shared with advertisers — full stop.' },
  { icon: '⚖️', title: 'Independent oversight', description: 'Conducted under appropriate ethics oversight. [IRB / institution — e.g., University of South Carolina — to confirm.]' },
  { icon: '💬', title: 'Not a treatment', description: "Participating doesn't replace your care, and it may not benefit you directly. The goal is knowledge that helps people in the future." },
]

const faqs = [
  {
    q: 'Is this medical treatment?',
    a: "No. This is research. It won't diagnose or treat you, and it's not a substitute for your care team. If you need care, please talk with a clinician.",
  },
  {
    q: 'Will it help me?',
    a: "Maybe not directly. The point of the research is to build knowledge that could help people in the future. Some participants may find the app useful, but there's no guarantee of personal benefit.",
  },
  {
    q: 'What data would you collect?',
    a: "Passive signals such as sleep and activity patterns gathered by the app — finalized and described in full before you consent. [Exact data scope to confirm; we don't read the content of your messages.]",
  },
  {
    q: 'How is my privacy protected?',
    a: 'Your data is stored securely and handled under strict safeguards, and you can request deletion at any time. [Encryption / de-identification specifics to confirm.]',
  },
  {
    q: 'Who runs the research?',
    a: '[Principal investigator and institution — e.g., in partnership with the University of South Carolina — to confirm.] The work is conducted under appropriate ethics oversight.',
  },
  {
    q: 'Can I change my mind after I start?',
    a: 'Yes — anytime, for any reason, with no penalty, and you can ask us to delete your data.',
  },
]

export default function ResearchPage() {
  return (
    <>
      <section className="relative overflow-hidden py-[clamp(3.5rem,7vw,5.5rem)] pb-[clamp(3rem,6vw,4.5rem)]">
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-50" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 80% at 80% -10%, var(--amber) 0%, var(--accent) 16%, transparent 46%), radial-gradient(120% 90% at 10% 110%, var(--indigo) 6%, transparent 55%)',
            }}
          />
        </div>
        <PageWrap className="relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[0.82rem] font-semibold px-3 py-1.5 rounded-full bg-surface-2 border border-line shadow-[var(--shadow)] mb-5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Volunteer research · informed consent always required
            </span>
          </Reveal>
          <Reveal>
            <h1 className="text-[clamp(2.4rem,5.6vw,4rem)] max-w-[18ch]">
              Could a mood episode come with a <em className="italic text-accent">warning?</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[50ch] text-[clamp(1.08rem,1.7vw,1.28rem)] text-muted">
              We&apos;re studying whether subtle, passive signals can flag a manic or depressive
              episode earlier than today&apos;s methods. We&apos;re looking for volunteers to help
              us find out.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#interest">Express interest →</Button>
              <Button href="#how" variant="ghost">
                See what&apos;s involved
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 bg-surface-2 border border-line rounded-[var(--radius)] p-[clamp(1.3rem,3vw,2rem)] shadow-[var(--shadow)]">
              <strong className="font-display text-[1.15rem]">The head start we&apos;re looking for</strong>
              <svg
                viewBox="0 0 760 220"
                className="w-full mt-4"
                role="img"
                aria-label="A timeline showing mood rising into an episode. Subtle signals may appear several days before the point where an episode is usually noticed."
              >
                <line x1="20" y1="170" x2="740" y2="170" stroke="var(--line)" strokeWidth="1.5" />
                <text x="20" y="200" fill="var(--muted)" fontSize="13" fontFamily="Hanken Grotesk, sans-serif">
                  days before an episode
                </text>
                <text x="690" y="200" fill="var(--muted)" fontSize="13" fontFamily="Hanken Grotesk, sans-serif">
                  episode
                </text>
                <rect x="360" y="40" width="210" height="130" fill="var(--amber)" opacity="0.16" />
                <path
                  d="M20,150 C140,148 250,150 360,140 C460,130 520,95 570,60 C610,40 660,34 740,30"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line x1="360" y1="40" x2="360" y2="170" stroke="var(--rose)" strokeWidth="2.5" strokeDasharray="4 5" />
                <circle cx="360" cy="140" r="6" fill="var(--rose)" />
                <text x="368" y="60" fill="var(--ink)" fontSize="13.5" fontWeight="600" fontFamily="Hanken Grotesk, sans-serif">
                  Subtle signals appear
                </text>
                <text x="368" y="78" fill="var(--muted)" fontSize="12.5" fontFamily="Hanken Grotesk, sans-serif">
                  (what we&apos;re studying)
                </text>
                <line x1="570" y1="40" x2="570" y2="170" stroke="var(--indigo)" strokeWidth="2.5" />
                <circle cx="570" cy="60" r="6" fill="var(--indigo)" />
                <text x="430" y="158" fill="var(--ink)" fontSize="13.5" fontWeight="600" fontFamily="Hanken Grotesk, sans-serif" textAnchor="middle">
                  usually noticed here →
                </text>
              </svg>
              <div className="flex flex-wrap gap-5 mt-4 text-[0.86rem] text-muted">
                <span><span className="inline-block w-5 border-t-[3px] border-dashed border-rose mr-2 align-middle" />Possible early signal</span>
                <span><span className="inline-block w-5 border-t-[3px] border-indigo mr-2 align-middle" />When it&apos;s usually noticed today</span>
                <span><span className="inline-block w-5 h-3 bg-[color-mix(in_srgb,var(--amber)_35%,transparent)] rounded-sm mr-2 align-middle" />The warning window we hope to find</span>
              </div>
            </div>
          </Reveal>
        </PageWrap>
      </section>

      <SectionBand id="how">
        <PageWrap className="max-w-[780px]">
          <Reveal>
            <Eyebrow>What we&apos;re trying to find out</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)]">The idea, in plain language.</h2>
            <p className="mt-4 text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
              Right now, many people only realize they&apos;re entering a manic or depressive episode
              once it&apos;s well underway — when it&apos;s hardest to act. Our hypothesis is that the
              body and behavior shift in small, measurable ways <em>before</em> that point: changes in
              sleep, movement, and other &ldquo;digital phenotype&rdquo; signals a phone or wearable
              can pick up passively, without daily logging.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-5 p-4 pl-5 border-l-[3px] border-amber bg-[color-mix(in_srgb,var(--amber)_10%,transparent)] rounded-r-[10px] text-[0.98rem]">
              <strong>This is research, not a finished tool.</strong> We don&apos;t yet know whether
              it works — that&apos;s exactly what we&apos;re trying to learn.
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-ground text-[#EAF0F8]">
        <PageWrap className="max-w-[780px]">
          <Reveal><Eyebrow className="!text-amber">Why it matters</Eyebrow></Reveal>
          <Reveal>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.7rem)] text-white">
              A few days can change everything.
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-[#C4D2E4] text-[1.12rem]">
              Catching an episode early can mean protecting your sleep, reaching your care team, or
              putting safeguards in place before things escalate — instead of picking up the pieces
              afterward.
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand>
        <PageWrap className="max-w-[780px]">
          <Reveal>
            <Eyebrow>What taking part looks like</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)]">Five steps, at your pace.</h2>
          </Reveal>
          <div className="mt-9 grid gap-4">
            {steps.map((step, i) => (
              <Reveal key={step.title}>
                <div className="grid grid-cols-[auto_1fr] gap-4 items-start bg-surface-2 border border-line rounded-[var(--radius)] p-5 shadow-[var(--shadow)]">
                  <span className="w-10 h-10 rounded-full grid place-items-center font-display font-semibold text-white bg-gradient-to-br from-indigo to-accent">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[1.18rem]">{step.title}</h3>
                    <p className="mt-1 text-muted text-[0.98rem]">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-[color-mix(in_srgb,var(--ground)_5%,var(--surface))]">
        <PageWrap className="max-w-[780px]">
          <Reveal>
            <Eyebrow>Who can take part</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)]">You might be a fit if…</h2>
          </Reveal>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3 list-none p-0 m-0">
            {eligibility.map((item, i) => (
              <Reveal key={i}>
                <li className="flex gap-3 items-start bg-surface-2 border border-line rounded-[var(--radius-sm)] p-4">
                  <span className="flex-none w-6 h-6 rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-accent grid place-items-center text-sm">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </PageWrap>
      </SectionBand>

      <SectionBand>
        <PageWrap>
          <Reveal className="max-w-[780px]">
            <Eyebrow>Your privacy & your rights</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)]">You stay in control.</h2>
          </Reveal>
          <div className="mt-9 grid md:grid-cols-3 gap-4">
            {rights.map((card) => (
              <Reveal key={card.title}>
                <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
                  <div className="text-2xl mb-3">{card.icon}</div>
                  <h3 className="font-semibold text-[1.1rem]">{card.title}</h3>
                  <p className="mt-2 text-muted text-[0.95rem]">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-[color-mix(in_srgb,var(--ground)_5%,var(--surface))]">
        <PageWrap className="max-w-[780px]">
          <Reveal>
            <Eyebrow>Questions, answered</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)]">Honest answers.</h2>
          </Reveal>
          <div className="mt-8 border-t border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="border-b border-line group">
                <summary className="cursor-pointer list-none py-4 font-semibold text-[1.08rem] flex justify-between items-center gap-4">
                  {faq.q}
                  <span className="flex-none w-[26px] h-[26px] rounded-full border-[1.5px] border-line grid place-items-center group-open:rotate-45 group-open:border-accent group-open:text-accent transition-all">
                    +
                  </span>
                </summary>
                <div className="pb-5 text-muted max-w-[70ch]">{faq.a}</div>
              </details>
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand id="interest">
        <PageWrap>
          <Reveal className="max-w-[780px] mb-7">
            <Eyebrow>Register your interest</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)]">
              Start with a hello, not a commitment.
            </h2>
          </Reveal>
          <Reveal>
            <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-[clamp(1.6rem,3.5vw,2.8rem)] shadow-[var(--shadow-lg)] max-w-[680px]">
              <div className="p-4 rounded-xl bg-[color-mix(in_srgb,var(--indigo)_9%,transparent)] border border-[color-mix(in_srgb,var(--indigo)_22%,transparent)] text-[0.95rem] mb-6">
                <strong>This form only tells us you&apos;re interested.</strong> Please don&apos;t
                share any health information here.
              </div>
              <ResearchInterestForm />
              <p className="mt-5 text-[0.85rem] text-muted">
                This research is conducted under appropriate ethics oversight. Questions?{' '}
                <a href="/contact" className="text-accent font-semibold">
                  Contact us
                </a>
                .
              </p>
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <CrisisBand
        subtitle="This research is not a crisis service. If you're struggling, please reach out — help is available 24/7."
        showMoreResources={false}
      />
    </>
  )
}
