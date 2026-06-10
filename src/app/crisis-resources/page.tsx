import {
  ClockIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'

export const metadata = {
  title: 'Crisis Resources — BipolarPeople',
}

const immediateHelp = [
  {
    name: '988 Suicide & Crisis Lifeline',
    description: '24/7 free and confidential support for people in distress',
    phone: '988',
    website: 'https://988lifeline.org',
    available: '24/7',
  },
  {
    name: 'Crisis Text Line',
    description: 'Text-based crisis support for anyone in crisis',
    phone: 'Text HOME to 741741',
    website: 'https://crisistextline.org',
    available: '24/7',
  },
  {
    name: 'Emergency Services',
    description: 'For immediate life-threatening emergencies',
    phone: '911',
    available: '24/7',
  },
]

const bipolarResources = [
  {
    name: 'Depression and Bipolar Support Alliance (DBSA)',
    description: 'Peer support groups and resources for bipolar disorder',
    phone: '(800) 826-3632',
    website: 'https://dbsalliance.org',
    available: 'Business hours',
    services: ['Support groups', 'Online resources', 'Wellness tools'],
  },
  {
    name: 'International Bipolar Foundation',
    description: 'Education and support for the bipolar community',
    website: 'https://ibpf.org',
    available: 'Online 24/7',
    services: ['Educational materials', 'Support groups', 'Webinars'],
  },
  {
    name: 'NAMI',
    description: 'Mental health support and advocacy',
    phone: '(800) 950-6264',
    website: 'https://nami.org',
    available: 'Business hours',
    services: ['Support groups', 'Education', 'Helpline'],
  },
]

const warningSigns = [
  {
    category: 'Severe depression',
    signs: [
      'Thoughts of suicide or self-harm',
      'Feeling hopeless or unable to function',
      'Extreme fatigue or isolation',
      'Unable to care for basic needs',
    ],
  },
  {
    category: 'Severe mania',
    signs: [
      'Dangerous or reckless behavior',
      'Severe agitation or aggression',
      'Psychotic symptoms',
      'Going days without sleep',
    ],
  },
  {
    category: 'Mixed episodes',
    signs: [
      'High energy with depressed mood',
      'Extreme irritability with suicidal thoughts',
      'Agitation and hopelessness together',
    ],
  },
]

export default function CrisisResourcesPage() {
  return (
    <>
      <div className="bg-accent text-white py-4">
        <PageWrap>
          <div className="flex items-center justify-center gap-3 text-center">
            <ExclamationTriangleIcon className="h-6 w-6 flex-none" />
            <p className="font-semibold">
              If you are in immediate danger, call 911 or go to your nearest emergency room
            </p>
          </div>
        </PageWrap>
      </div>

      <SectionBand>
        <PageWrap>
          <Reveal>
            <Eyebrow>Crisis support</Eyebrow>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-display font-medium max-w-[20ch]">
              Help is available 24/7
            </h1>
            <p className="mt-5 max-w-[54ch] text-muted text-lg">
              You are not alone. These resources are here during difficult times — whether you are
              in crisis or supporting someone who is.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button href="tel:988">Call 988</Button>
              <Button href="sms:741741&body=HOME" variant="ghost">
                Text HOME to 741741
              </Button>
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="pt-0">
        <PageWrap>
          <h2 className="font-display text-2xl font-semibold mb-6">Immediate help</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {immediateHelp.map((r) => (
              <ResourceCard key={r.name} resource={r} urgent />
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-[color-mix(in_srgb,var(--amber)_10%,var(--surface))]">
        <PageWrap>
          <h2 className="font-display text-2xl font-semibold mb-6 text-center">
            When to seek crisis support
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {warningSigns.map((cat) => (
              <div
                key={cat.category}
                className="bg-surface-2 border border-line rounded-[var(--radius)] p-5 shadow-[var(--shadow)]"
              >
                <h3 className="font-semibold text-ink mb-3">{cat.category}</h3>
                <ul className="space-y-2 text-sm text-muted">
                  {cat.signs.map((sign) => (
                    <li key={sign} className="flex gap-2">
                      <span className="text-accent">•</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-muted text-sm max-w-[52ch] mx-auto">
            Trust your instincts. Early intervention can prevent a situation from becoming more
            dangerous. Crisis support is available immediately.
          </p>
        </PageWrap>
      </SectionBand>

      <SectionBand>
        <PageWrap>
          <h2 className="font-display text-2xl font-semibold mb-6 text-center">
            Bipolar-specific support
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {bipolarResources.map((r) => (
              <ResourceCard key={r.name} resource={r} />
            ))}
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand className="bg-ground text-[#EAF0F8]">
        <PageWrap>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <HeartIcon className="h-10 w-10 text-amber mb-4" />
              <h2 className="font-display text-2xl font-semibold text-white mb-4">
                Supporting someone in crisis
              </h2>
              <p className="text-[#C4D2E4]">
                Listen without judgment. Take threats of self-harm seriously. Stay calm, help them
                contact crisis resources, and don&apos;t promise to keep suicidal plans secret.
              </p>
            </div>
            <div className="grid gap-4">
              <TipsBlock
                title="What helps"
                tips={[
                  'Stay with them or ensure someone else can',
                  'Help them reach 988 or emergency services',
                  'Remove means of harm if you safely can',
                  'Follow up after the immediate crisis',
                ]}
                positive
              />
              <TipsBlock
                title="What to avoid"
                tips={[
                  "Don't leave them alone if actively suicidal",
                  "Don't argue about whether life is worth living",
                  "Don't act shocked or judgmental",
                  "Don't neglect your own self-care",
                ]}
              />
            </div>
          </div>
        </PageWrap>
      </SectionBand>

      <SectionBand>
        <PageWrap className="max-w-[780px] text-center">
          <h2 className="font-display text-2xl font-semibold mb-4">Your life has value</h2>
          <p className="text-muted mb-6">
            Crisis is temporary. Recovery is possible. You deserve support, and help is always
            available.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="tel:988">Call 988 now</Button>
            <Button href="/" variant="ghost">
              Return home
            </Button>
          </div>
        </PageWrap>
      </SectionBand>

      <CrisisBand showMoreResources={false} />
    </>
  )
}

function ResourceCard({
  resource,
  urgent = false,
}: {
  resource: {
    name: string
    description: string
    phone?: string
    website?: string
    available: string
    services?: string[]
  }
  urgent?: boolean
}) {
  return (
    <div
      className={`bg-surface-2 border rounded-[var(--radius)] p-6 shadow-[var(--shadow)] h-full ${
        urgent ? 'border-accent/40' : 'border-line'
      }`}
    >
      <h3 className="font-semibold text-ink mb-2">{resource.name}</h3>
      <p className="text-muted text-sm mb-4">{resource.description}</p>
      <div className="space-y-2 text-sm">
        {resource.phone && (
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-4 w-4 text-muted flex-none" />
            {resource.phone.match(/^\d/) ? (
              <a href={`tel:${resource.phone.replace(/\D/g, '')}`} className="font-semibold text-accent">
                {resource.phone}
              </a>
            ) : (
              <span className="text-ink">{resource.phone}</span>
            )}
          </div>
        )}
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-semibold hover:underline"
          >
            Visit website →
          </a>
        )}
        <div className="flex items-center gap-2 text-muted">
          <ClockIcon className="h-4 w-4 flex-none" />
          {resource.available}
        </div>
        {resource.services && (
          <ul className="text-muted list-disc pl-5 mt-2">
            {resource.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function TipsBlock({
  title,
  tips,
  positive = false,
}: {
  title: string
  tips: string[]
  positive?: boolean
}) {
  return (
    <div
      className={`rounded-[var(--radius)] p-5 border ${
        positive
          ? 'bg-white/10 border-white/20'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <h3 className="font-semibold text-white mb-3">{title}</h3>
      <ul className="space-y-2 text-[#C4D2E4] text-sm">
        {tips.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span>{positive ? '✓' : '·'}</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}
