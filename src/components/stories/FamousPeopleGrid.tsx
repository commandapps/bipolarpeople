'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { famousPeople, fieldFilters, monoGradients } from '@/lib/famous-people-data'
import Reveal from '@/components/ui/Reveal'

export default function FamousPeopleGrid() {
  const [filter, setFilter] = useState('all')

  const visible = famousPeople.filter(
    (person) => filter === 'all' || person.field === filter
  )

  return (
    <>
      <div className="flex flex-wrap gap-2 my-10" role="group" aria-label="Filter people by field">
        {fieldFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={clsx(
              'font-semibold text-[0.9rem] px-4 py-2 rounded-full border-[1.5px] cursor-pointer transition-all',
              filter === f.id
                ? 'bg-accent-press border-accent-press text-white'
                : 'bg-surface-2 border-line text-ink hover:border-accent'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((person) => (
          <Reveal key={person.name}>
            <article className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)] flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
              <div className="flex items-center gap-3.5 mb-4">
                <span
                  className="flex-none w-[52px] h-[52px] rounded-full grid place-items-center text-white font-bold text-[1.05rem]"
                  style={{ background: monoGradients[person.fieldClass] }}
                  aria-hidden="true"
                >
                  {person.initials}
                </span>
                <div>
                  <div className="font-display text-[1.2rem] font-semibold leading-tight">
                    {person.name}
                  </div>
                  <span className="inline-block mt-1 text-[0.74rem] font-semibold tracking-wide uppercase text-accent">
                    {person.fieldLabel}
                  </span>
                </div>
              </div>
              <p className="text-[0.96rem] text-muted flex-1">{person.description}</p>
              <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                <span className="font-semibold text-[0.88rem] text-accent">Read their words →</span>
                {person.community && (
                  <span className="text-[0.7rem] font-bold tracking-wide uppercase px-2 py-1 rounded-full bg-[color-mix(in_srgb,var(--amber)_20%,transparent)] text-[#9a6a13] border border-[color-mix(in_srgb,var(--amber)_40%,transparent)] dark:text-amber">
                    Community
                  </span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  )
}
