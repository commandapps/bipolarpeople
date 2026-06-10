import Link from 'next/link'
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import { PageWrap } from '@/components/ui/PageElements'

export const metadata = {
  title: 'For Families & Caregivers — BipolarPeople',
}

export default function FamiliesPage() {
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
            <UserGroupIcon className="h-8 w-8 text-indigo" />
            <h1 className="text-3xl font-display font-medium text-ink">For Families & Caregivers</h1>
          </div>

          <p className="text-xl text-muted mb-8 leading-relaxed">
            Supporting a loved one with bipolar disorder can be challenging. You&apos;re not alone,
            and there are ways to help while taking care of yourself.
          </p>

          <div className="space-y-10">
            <section className="border-l-4 border-indigo pl-6">
              <h2 className="text-2xl font-display font-medium text-ink mb-4">
                Understanding bipolar disorder
              </h2>
              <div className="space-y-4">
                {[
                  [
                    "It's not just mood swings",
                    'Episodes can last days or weeks and significantly affect daily functioning — not rapid same-day changes.',
                  ],
                  [
                    'Cognitive effects are real',
                    'Brain fog, memory issues, and concentration difficulties are common — not laziness.',
                  ],
                  [
                    'Episodes can feel uncontrollable',
                    'Many people describe feeling like a passenger during severe episodes.',
                  ],
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

            <section className="border-l-4 border-accent pl-6">
              <h2 className="text-2xl font-display font-medium text-ink mb-4">How to help</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-ink mb-3">During stable periods</h3>
                  <ul className="space-y-2 text-muted text-sm list-disc pl-5">
                    <li>Learn their triggers and early warning signs together</li>
                    <li>Support consistent sleep and routines</li>
                    <li>Encourage treatment without nagging</li>
                    <li>Plan for potential episodes before crisis hits</li>
                    <li>Celebrate achievements without attributing them to mania</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-3">During episodes</h3>
                  <ul className="space-y-2 text-muted text-sm list-disc pl-5">
                    <li>Stay calm; don&apos;t take behaviors personally</li>
                    <li>Reduce access to means of harm if safety is a concern</li>
                    <li>Contact their care team if symptoms worsen</li>
                    <li>Know when to seek emergency help</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="border-l-4 border-rose pl-6">
              <h2 className="text-2xl font-display font-medium text-ink mb-4">Healthy communication</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface-2))] border border-line rounded-xl p-4">
                  <h3 className="font-semibold text-ink mb-2">Helpful approaches</h3>
                  <ul className="text-muted text-sm space-y-1 list-disc pl-5">
                    <li>&ldquo;How are you feeling today?&rdquo;</li>
                    <li>&ldquo;What can I do to support you right now?&rdquo;</li>
                    <li>Specific observations, not diagnoses</li>
                    <li>Listen without trying to fix everything</li>
                  </ul>
                </div>
                <div className="bg-[color-mix(in_srgb,var(--rose)_10%,var(--surface-2))] border border-line rounded-xl p-4">
                  <h3 className="font-semibold text-ink mb-2">Often unhelpful</h3>
                  <ul className="text-muted text-sm space-y-1 list-disc pl-5">
                    <li>&ldquo;Are you manic right now?&rdquo;</li>
                    <li>&ldquo;Just think positive&rdquo;</li>
                    <li>&ldquo;Everyone has ups and downs&rdquo;</li>
                    <li>Medication policing unless safety requires it</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="border-l-4 border-amber pl-6">
              <h2 className="text-2xl font-display font-medium text-ink mb-4">Taking care of yourself</h2>
              <p className="text-muted mb-4">
                Caregiving is emotionally demanding. Your wellbeing matters too.
              </p>
              <ul className="text-muted text-sm space-y-2 list-disc pl-5">
                <li>Set boundaries — you cannot control their illness</li>
                <li>Consider a caregiver support group (NAMI, DBSA)</li>
                <li>Maintain your own friendships and activities</li>
                <li>Get your own support when you need it</li>
              </ul>
            </section>
          </div>

          <div className="bg-[color-mix(in_srgb,var(--rose)_12%,var(--surface-2))] border border-line rounded-xl p-6 mt-10">
            <div className="flex items-center gap-3 mb-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-accent" />
              <h2 className="text-lg font-semibold text-ink">Crisis resources</h2>
            </div>
            <p className="text-muted text-sm mb-4">
              If your loved one is in immediate danger or expressing thoughts of self-harm, get help
              now.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="tel:988">Call 988</Button>
              <Button href="/crisis-resources" variant="ghost">
                View all crisis resources
              </Button>
            </div>
          </div>
        </div>
      </PageWrap>

      <CrisisBand />
    </>
  )
}
