'use client'

import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import { Breadcrumb, Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'

const categories = [
  { id: 'diagnosis', label: 'Newly diagnosed' },
  { id: 'work', label: 'Work & career' },
  { id: 'family', label: 'Family & relationships' },
  { id: 'treatment', label: 'Treatment' },
  { id: 'hospital', label: 'Hospitalization' },
  { id: 'recovery', label: 'Recovery & hope' },
  { id: 'disclosure', label: 'Disclosure & stigma' },
  { id: 'other', label: 'Other' },
]

const inputClass =
  'w-full px-4 py-3 rounded-xl border-[1.5px] border-line bg-surface text-ink font-inherit focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_22%,transparent)]'

export default function ShareStoryPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.currentTarget
    const data = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLSelectElement).value,
      story: (form.elements.namedItem('story') as HTMLTextAreaElement).value,
      authorName: (form.elements.namedItem('authorName') as HTMLInputElement).value,
      useRealName: (form.elements.namedItem('useRealName') as HTMLInputElement).checked,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      agreeToTerms: (form.elements.namedItem('agreeToTerms') as HTMLInputElement).checked,
    }

    try {
      const res = await fetch('/api/stories/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'Submission failed. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <>
        <SectionBand>
          <PageWrap className="max-w-[640px] text-center">
            <div className="w-14 h-14 rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-accent grid place-items-center mx-auto mb-4 text-xl">
              ✓
            </div>
            <h1 className="font-display text-3xl font-medium">Thank you — we&apos;ve got it.</h1>
            <p className="mt-4 text-muted">
              Every story is read before it&apos;s published. We&apos;ll be in touch at the email
              you provided if we have questions. Your email is never shown publicly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button href="/stories">Back to stories</Button>
              <Button href="/" variant="ghost">
                Home
              </Button>
            </div>
          </PageWrap>
        </SectionBand>
        <CrisisBand />
      </>
    )
  }

  return (
    <>
      <SectionBand className="pb-0">
        <PageWrap className="max-w-[720px]">
          <Breadcrumb items={[{ label: 'Stories', href: '/stories' }, { label: 'Share your story' }]} />
          <Reveal>
            <Eyebrow>Add your voice</Eyebrow>
            <h1 className="mt-3 text-[clamp(2rem,4vw,2.8rem)]">Share your story</h1>
          </Reveal>
          <Reveal>
            <p className="mt-4 text-muted">
              You don&apos;t have to be a writer. A few honest paragraphs about what helped, what
              you wish you&apos;d known, or simply that you&apos;re still here — that&apos;s enough.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex gap-3 items-start bg-surface-2 border border-line rounded-[var(--radius)] p-5 text-[0.96rem] text-muted">
              <span className="flex-none w-[30px] h-[30px] rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-accent grid place-items-center font-bold">
                i
              </span>
              <span>
                Use your name, a pseudonym, or &ldquo;Anonymous.&rdquo; We review every submission
                before publishing. You can ask us to remove your story anytime. We never publish
                without your consent.
              </span>
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="pt-6">
        <PageWrap className="max-w-[720px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block font-semibold text-sm mb-1.5">
                Story title *
              </label>
              <input type="text" id="title" name="title" required className={inputClass} />
            </div>

            <div>
              <label htmlFor="category" className="block font-semibold text-sm mb-1.5">
                Category *
              </label>
              <select id="category" name="category" required className={inputClass}>
                <option value="">Select a category…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="story" className="block font-semibold text-sm mb-1.5">
                Your story *
              </label>
              <textarea
                id="story"
                name="story"
                required
                rows={12}
                className={inputClass}
                placeholder="Share your experience in your own words…"
              />
              <p className="text-xs text-muted mt-1">
                Focus on your journey and hope. Avoid specific medical advice for others.
              </p>
            </div>

            <div>
              <label htmlFor="authorName" className="block font-semibold text-sm mb-1.5">
                Name to display *
              </label>
              <input
                type="text"
                id="authorName"
                name="authorName"
                required
                placeholder="Your name, pseudonym, or Anonymous"
                className={inputClass}
              />
            </div>

            <label className="flex gap-3 items-start text-muted text-sm">
              <input
                type="checkbox"
                id="useRealName"
                name="useRealName"
                className="mt-1 w-[18px] h-[18px] accent-accent"
              />
              <span>This is my real name (optional)</span>
            </label>

            <div>
              <label htmlFor="email" className="block font-semibold text-sm mb-1.5">
                Email address * <span className="font-normal text-muted">(never published)</span>
              </label>
              <input type="email" id="email" name="email" required autoComplete="email" className={inputClass} />
            </div>

            <label className="flex gap-3 items-start text-muted text-sm">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                required
                className="mt-1 w-[18px] h-[18px] accent-accent"
              />
              <span>
                I agree my story may be reviewed for publication on BipolarPeople.com. I confirm
                this is based on my personal experience. I understand nothing is published without
                my approval. *
              </span>
            </label>

            {error && (
              <p className="text-accent-press font-medium text-sm" role="alert">
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" className={loading ? 'opacity-60 pointer-events-none' : ''}>
                {loading ? 'Sending…' : 'Submit for review →'}
              </Button>
              <Button href="/stories" variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        </PageWrap>
      </SectionBand>

      <CrisisBand subtitle="If you're in crisis while writing, please reach out — help is available 24/7." />
    </>
  )
}
