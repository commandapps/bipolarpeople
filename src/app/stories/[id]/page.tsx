import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import CrisisBand from '@/components/ui/CrisisBand'
import StoryContent from '@/components/stories/StoryContent'
import { Breadcrumb, Eyebrow, PageWrap, SectionBand, TextLink } from '@/components/ui/PageElements'
import Reveal from '@/components/ui/Reveal'
import {
  getRelatedStories,
  getStoryById,
  publishedStories,
} from '@/lib/stories-data'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return publishedStories.map((story) => ({ id: story.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const story = getStoryById(id)
  if (!story) return { title: 'Story not found' }
  return {
    title: `${story.title} — BipolarPeople`,
    description: story.excerpt.replace(/^"|"$/g, ''),
  }
}

export default async function StoryDetailPage({ params }: Props) {
  const { id } = await params
  const story = getStoryById(id)
  if (!story) notFound()

  const related = getRelatedStories(id)

  return (
    <>
      <section className="relative overflow-hidden py-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(2rem,4vw,3rem)]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.28]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(110% 80% at 85% -20%, var(--indigo) 0%, var(--rose) 12%, transparent 48%)',
            }}
          />
        </div>
        <PageWrap className="relative z-10 max-w-[780px]">
          <Breadcrumb
            items={[
              { label: 'Stories', href: '/stories' },
              { label: 'Community stories', href: '/stories/community' },
              { label: story.author },
            ]}
          />
          <Reveal>
            <Eyebrow className="mt-4">{story.category}</Eyebrow>
            <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-tight">{story.title}</h1>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full grid place-items-center text-white font-bold bg-gradient-to-br from-indigo to-accent">
                  {story.authorInitials}
                </span>
                <div>
                  <b className="block">{story.author}</b>
                  <span className="text-muted text-sm">{story.detail}</span>
                </div>
              </div>
              <span className="text-muted text-sm">{story.readTime} read</span>
            </div>
          </Reveal>
        </PageWrap>
      </section>

      <SectionBand className="pt-0">
        <PageWrap className="max-w-[780px]">
          <Reveal>
            <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-[clamp(1.6rem,3vw,2.4rem)] shadow-[var(--shadow)]">
              <StoryContent content={story.content} />
            </div>
          </Reveal>

          {related.length > 0 && (
            <Reveal>
              <div className="mt-12">
                <h2 className="font-display text-xl font-semibold mb-4">More stories</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/stories/${rel.id}`}
                      className="bg-surface-2 border border-line rounded-[var(--radius)] p-5 shadow-[var(--shadow)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] transition-all"
                    >
                      <span className="text-[0.72rem] font-bold tracking-wide uppercase text-accent">
                        {rel.category}
                      </span>
                      <h3 className="mt-2 font-semibold leading-snug">{rel.title}</h3>
                      <p className="mt-2 text-sm text-muted">{rel.author} · {rel.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="mt-12 text-center">
              <TextLink href="/stories/community">← Back to community stories</TextLink>
              <div className="mt-6">
                <Button href="/stories/share">Share your story →</Button>
              </div>
            </div>
          </Reveal>
        </PageWrap>
      </SectionBand>

      <CrisisBand />
    </>
  )
}
