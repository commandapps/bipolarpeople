'use client'

import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import { getAllStoryListings, storyFilters } from '@/lib/stories-data'
import Reveal from '@/components/ui/Reveal'

export default function CommunityStoriesGrid() {
  const [filter, setFilter] = useState('all')
  const allStories = getAllStoryListings()

  const visible = allStories.filter(
    (story) => filter === 'all' || story.categoryId === filter
  )

  return (
    <>
      <div className="flex flex-wrap gap-2 my-10" role="group" aria-label="Filter stories by theme">
        {storyFilters.map((f) => (
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
        {visible.map((story) => {
          const card = (
            <article className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)] flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
              <div className="text-[0.72rem] font-bold tracking-wide uppercase text-accent mb-3">
                {story.category}
              </div>
              <h3 className="text-[1.22rem] font-semibold leading-snug">{story.title}</h3>
              <p className="font-display italic text-muted mt-3 text-[1.02rem] leading-snug">
                {story.excerpt}
              </p>
              <div className="mt-auto pt-5 flex items-center gap-2.5">
                <span className="w-[34px] h-[34px] rounded-full grid place-items-center text-white font-bold text-[0.8rem] bg-gradient-to-br from-indigo to-accent">
                  {story.authorInitials}
                </span>
                <div>
                  <b className="block text-[0.9rem]">{story.author}</b>
                  <span className="text-[0.78rem] text-muted">{story.detail}</span>
                </div>
                {story.community && (
                  <span className="text-[0.66rem] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--amber)_20%,transparent)] text-[#9a6a13] border border-[color-mix(in_srgb,var(--amber)_40%,transparent)] dark:text-amber">
                    Community
                  </span>
                )}
                <span className="ml-auto text-[0.78rem] text-muted">{story.readTime}</span>
              </div>
              {story.hasFullStory && (
                <p className="mt-4 text-accent font-semibold text-sm">Read full story →</p>
              )}
            </article>
          )

          return (
            <Reveal key={`${story.author}-${story.title}`}>
              {story.hasFullStory && story.id ? (
                <Link href={`/stories/${story.id}`} className="block h-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </Reveal>
          )
        })}
      </div>
    </>
  )
}
