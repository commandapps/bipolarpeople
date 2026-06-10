'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import CrisisBand from '@/components/ui/CrisisBand'
import { Breadcrumb, Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'
import {
  allBooks,
  bookCategories,
  type BookCategory,
} from '@/lib/reading-list-data'

function BookCard({ book }: { book: (typeof allBooks)[0] }) {
  return (
    <article className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)] flex flex-col h-full">
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-[0.72rem] font-bold tracking-wide uppercase text-accent">
          {book.category}
        </span>
        {book.bscCommunity && (
          <span className="text-[0.66rem] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--amber)_20%,transparent)] text-[#9a6a13] border border-[color-mix(in_srgb,var(--amber)_40%,transparent)] dark:text-amber">
            BSC Community
          </span>
        )}
      </div>
      <h3 className="font-display text-xl font-semibold leading-snug">{book.title}</h3>
      <p className="text-muted text-sm mt-1">{book.author}</p>
      <p className="text-muted text-[0.95rem] mt-3 flex-1 leading-relaxed">{book.blurb}</p>
      <a
        href={book.buyUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="mt-5 inline-flex font-semibold text-accent text-sm hover:gap-2 gap-1 transition-all"
      >
        Find this book →
      </a>
    </article>
  )
}

export default function ReadingListPage() {
  const [filter, setFilter] = useState<BookCategory | 'all'>('all')

  const bscBooks = useMemo(() => allBooks.filter((b) => b.bscCommunity), [])

  const filtered = useMemo(() => {
    if (filter === 'all') return allBooks
    return allBooks.filter((b) => b.category === filter)
  }, [filter])

  return (
    <>
      <SectionBand className="pb-0">
        <PageWrap>
          <Breadcrumb items={[{ label: 'Resources', href: '/resources' }, { label: 'Reading List' }]} />
          <Reveal>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.5rem)] max-w-[18ch]">
              Books that helped us — and might help you.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-[54ch] text-muted text-[clamp(1.05rem,1.6vw,1.25rem)]">
              Memoirs, practical guides, and the science — curated by our community, including books
              by members who chose to speak openly about living with bipolar disorder.
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <SectionBand className="pt-6">
        <PageWrap>
          <Reveal>
            <Eyebrow>From our community</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-medium mb-6">
              Written by people in the Bipolar Social Club
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {bscBooks.map((book) => (
              <Reveal key={book.title}>
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
              <button
                type="button"
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                className={`font-semibold text-[0.9rem] px-4 py-2 rounded-full border-[1.5px] cursor-pointer transition-all ${
                  filter === 'all'
                    ? 'bg-accent-press border-accent-press text-white'
                    : 'bg-surface-2 border-line text-ink hover:border-accent'
                }`}
              >
                All ({allBooks.length})
              </button>
              {bookCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  aria-pressed={filter === cat}
                  className={`font-semibold text-[0.9rem] px-4 py-2 rounded-full border-[1.5px] cursor-pointer transition-all ${
                    filter === cat
                      ? 'bg-accent-press border-accent-press text-white'
                      : 'bg-surface-2 border-line text-ink hover:border-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((book) => (
              <Reveal key={book.title}>
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-sm text-muted max-w-[70ch]">
              Book links are provided for convenience. We may earn nothing from them — they are
              recommendations, not endorsements. This list is educational only, not medical advice.{' '}
              <Link href="/disclaimer" className="text-accent font-semibold hover:underline">
                Read our disclaimer
              </Link>
              .
            </p>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <CrisisBand />
    </>
  )
}
