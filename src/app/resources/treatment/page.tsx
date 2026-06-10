import Link from 'next/link'
import {
  ArrowLeftIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import { PageWrap } from '@/components/ui/PageElements'

export const metadata = {
  title: 'Treatment Options — BipolarPeople',
}

export default function TreatmentPage() {
  return (
    <>
      <PageWrap className="py-8">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-accent font-medium hover:opacity-80"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Resources
        </Link>
      </PageWrap>

      <PageWrap className="pb-16">
        <div className="bg-surface-2 border border-line rounded-[var(--radius)] shadow-[var(--shadow)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <HeartIcon className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-display font-medium text-ink">Treatment Options</h1>
          </div>

          <p className="text-xl text-muted mb-8 leading-relaxed">
            Effective treatment for bipolar disorder typically involves a combination of medication,
            therapy, and lifestyle management. This page is educational — not a treatment plan.
          </p>

          <div className="space-y-10">
            <section className="border-l-4 border-accent pl-6">
              <div className="flex items-center gap-3 mb-4">
                <BeakerIcon className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-display font-medium text-ink">Medication</h2>
              </div>
              <p className="text-muted mb-4">
                Medications are often the foundation of bipolar disorder treatment. Different types
                work for different people, and finding the right combination may take time.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { title: 'Mood stabilizers', text: 'Help control manic and depressive episodes' },
                  { title: 'Antipsychotics', text: 'Often used for severe manic episodes' },
                  { title: 'Antidepressants', text: 'Used carefully, usually with mood stabilizers' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-[color-mix(in_srgb,var(--indigo)_6%,var(--surface-2))] border border-line rounded-xl p-4"
                  >
                    <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                    <p className="text-muted text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm border-l-2 border-amber pl-4 text-muted">
                Work closely with your healthcare provider. Medication manages symptoms — it
                doesn&apos;t replace support, sleep, or therapy.
              </p>
            </section>

            <section className="border-l-4 border-indigo pl-6">
              <div className="flex items-center gap-3 mb-4">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo" />
                <h2 className="text-2xl font-display font-medium text-ink">Therapy</h2>
              </div>
              <p className="text-muted mb-4">
                Psychotherapy helps you understand your condition, develop coping strategies, and
                improve relationships.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ['Cognitive Behavioral Therapy (CBT)', 'Identify and change unhelpful thought patterns'],
                  ['Interpersonal Therapy', 'Improve relationships and social functioning'],
                  ['Family Therapy', 'Build support and communication at home'],
                  ['Group Therapy', 'Connect with others who understand'],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="bg-[color-mix(in_srgb,var(--indigo)_6%,var(--surface-2))] border border-line rounded-xl p-4"
                  >
                    <h3 className="font-semibold text-ink mb-2">{title}</h3>
                    <p className="text-muted text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-l-4 border-rose pl-6">
              <div className="flex items-center gap-3 mb-4">
                <SparklesIcon className="h-6 w-6 text-rose" />
                <h2 className="text-2xl font-display font-medium text-ink">Lifestyle management</h2>
              </div>
              <p className="text-muted mb-4">
                Daily habits play a crucial role in managing bipolar disorder symptoms.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-ink mb-3">Sleep hygiene</h3>
                  <p className="text-muted text-sm mb-3">
                    Sleep disruption is one of the most reliable early warning signs of an episode.
                  </p>
                  <ul className="text-muted text-sm space-y-1 list-disc pl-5">
                    <li>Consistent bed and wake times</li>
                    <li>Limit screens before sleep</li>
                    <li>Protect sleep during stress</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-3">Exercise & nutrition</h3>
                  <p className="text-muted text-sm mb-3">
                    Regular movement and balanced meals support mood stability.
                  </p>
                  <ul className="text-muted text-sm space-y-1 list-disc pl-5">
                    <li>Moderate activity most days</li>
                    <li>Regular meals; limit alcohol and caffeine</li>
                    <li>Hydration and routine matter</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface-2))] border border-line rounded-xl p-6 mt-10">
            <h2 className="text-lg font-semibold text-ink mb-3">Tracking between appointments</h2>
            <p className="text-muted mb-4">
              Mood and sleep tracking can help you and your clinician spot patterns early. The
              BipolarAware app is built for passive, early-warning monitoring — not daily logging
              homework.
            </p>
            <Button href="/app" variant="ghost">
              Learn about BipolarAware →
            </Button>
          </div>

          <p className="text-sm text-muted border-t border-line pt-6 mt-8">
            This page is educational only — not medical advice. For diagnosis or treatment, talk
            with your healthcare team.
          </p>
        </div>
      </PageWrap>

      <CrisisBand />
    </>
  )
}
