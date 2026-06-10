'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ResearchInterestForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const consent = (form.elements.namedItem('consent') as HTMLInputElement).checked
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    if (!consent || !name || !email) {
      alert('Please add your name, email, and tick the consent box.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-accent grid place-items-center mx-auto mb-4 text-xl">
          ✓
        </div>
        <div className="font-display text-[1.6rem] mb-2">Thank you — we&apos;ve got it.</div>
        <p className="text-muted">
          We&apos;ll be in touch with the full details. There&apos;s nothing else you need to do
          right now.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold text-[0.92rem] mb-1.5">
          Your name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          className="w-full px-4 py-3 rounded-xl border-[1.5px] border-line bg-surface text-ink font-inherit focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold text-[0.92rem] mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          className="w-full px-4 py-3 rounded-xl border-[1.5px] border-line bg-surface text-ink font-inherit focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="region" className="block font-semibold text-[0.92rem] mb-1.5">
          Country / region{' '}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          type="text"
          id="region"
          name="region"
          autoComplete="country-name"
          className="w-full px-4 py-3 rounded-xl border-[1.5px] border-line bg-surface text-ink font-inherit focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
        />
      </div>
      <label className="flex gap-3 items-start text-muted text-[0.95rem] mb-4">
        <input type="checkbox" id="dx" name="dx" className="mt-1 w-[18px] h-[18px] accent-accent" />
        <span>
          I have a diagnosis of bipolar disorder{' '}
          <span className="opacity-80">(optional — helps us gauge fit)</span>
        </span>
      </label>
      <label className="flex gap-3 items-start text-muted text-[0.95rem] mb-4">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="mt-1 w-[18px] h-[18px] accent-accent"
        />
        <span>
          You may email me about this research. I understand this is not enrollment, and that
          taking part will require informed consent.
        </span>
      </label>
      <Button type="submit" className="w-full justify-center">
        Express interest →
      </Button>
    </form>
  )
}
