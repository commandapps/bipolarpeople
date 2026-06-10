import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand, TextLink } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'BipolarAware — Early Warning App — BipolarPeople',
  description:
    'BipolarAware runs quietly in the background, learning your patterns and flagging subtle shifts that tend to come before a mood episode.',
}

const features = [
  {
    title: 'Passive monitoring',
    description:
      'No daily logging required. The app learns from sleep, activity, and other signals your phone already tracks.',
  },
  {
    title: 'Pattern recognition',
    description:
      "Over time, BipolarAware learns what's normal for you — and notices when things start to shift.",
  },
  {
    title: 'Early warnings',
    description:
      'Get a heads-up when subtle changes suggest an episode might be coming — days before you might notice on your own.',
  },
  {
    title: 'Your data, your control',
    description:
      'Everything stays on your device unless you choose to share it for research — and you can delete it anytime.',
  },
]

export default function AppPage() {
  return (
    <>
      <section className="relative overflow-hidden py-[clamp(3.5rem,7vw,5.5rem)]">
        <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 80% at 50% 100%, var(--amber) 0%, var(--accent) 20%, transparent 50%)',
            }}
          />
        </div>
        <PageWrap className="relative z-10">
          <div className="grid md:grid-cols-2 gap-[clamp(1.5rem,5vw,4rem)] items-center">
            <Reveal>
              <Eyebrow>The app</Eyebrow>
              <h1 className="mt-3 text-[clamp(2.4rem,5.6vw,4rem)] max-w-[16ch]">
                What if you could see an episode <em className="italic text-accent">coming?</em>
              </h1>
              <p className="mt-5 text-muted text-[clamp(1.05rem,1.6vw,1.25rem)] max-w-[50ch]">
                Mood episodes are easier to manage when you catch them early — but the early signs are
                easy to miss in the moment. BipolarAware runs quietly in the background, learning your
                patterns and flagging the subtle shifts that tend to come before an episode.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/research">Join the research →</Button>
                <Button href="#how-it-works" variant="ghost">
                  How it works
                </Button>
              </div>
            </Reveal>
            <Reveal>
              <div
                className="rounded-[var(--radius)] min-h-[380px] shadow-[var(--shadow-lg)] grid place-items-center bg-gradient-to-br from-ground to-ground-2"
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
                    <span className="w-2.5 h-2.5 rounded-full bg-amber animate-[pulse-ring_2.4s_infinite]" />
                    Sleep shifted earlier — worth a look
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </section>

      <SectionBand id="how-it-works">
        <PageWrap>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] mb-10">Built for the days you can&apos;t log.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <Reveal key={feature.title}>
                <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
                  <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-ground text-[#EAF0F8]">
        <PageWrap className="max-w-[780px] text-center">
          <Reveal>
            <Eyebrow className="!text-amber">Research phase</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.7rem)] text-white">
              BipolarAware is being tested in research.
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-[#C4D2E4]">
              We&apos;re studying whether passive signals can flag mood episodes earlier than
              current methods. Joining starts with a conversation, not a commitment.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-8">
              <Button href="/research">Express interest in the research →</Button>
            </div>
          </Reveal>
          <Reveal>
            <p className="mt-6">
              <TextLink href="/research">Learn about the research →</TextLink>
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <CrisisBand />
    </>
  )
}
