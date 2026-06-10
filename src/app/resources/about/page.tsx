'use client'

import Link from 'next/link'
import { ArrowLeftIcon, BookOpenIcon, CpuChipIcon, HeartIcon } from '@heroicons/react/24/outline'
import CrisisBand from '@/components/ui/CrisisBand'
import { PageWrap } from '@/components/ui/PageElements'

export default function AboutBipolarPage() {
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
            <BookOpenIcon className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-display font-medium text-ink">Understanding Bipolar Disorder</h1>
          </div>

          <div className="prose prose-lg max-w-none text-ink">
            <p className="text-xl text-muted mb-8 leading-relaxed">
              Bipolar disorder is a mental health condition that causes significant shifts in mood,
              energy, and activity levels that affect a person&apos;s ability to carry out day-to-day
              tasks.
            </p>

            <h2 className="text-2xl font-display font-medium mt-8 mb-4">What Is Bipolar Disorder?</h2>
            <p className="text-muted">
              Bipolar disorder involves episodes of mood changes that are more extreme than the
              normal ups and downs most people experience. These episodes can include periods of
              extremely elevated mood (mania or hypomania) and periods of depression.
            </p>

            <h2 className="text-2xl font-display font-medium mt-8 mb-4">Types of Bipolar Disorder</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-[color-mix(in_srgb,var(--indigo)_8%,var(--surface-2))] border border-line rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Bipolar I Disorder</h3>
                <p className="text-muted text-sm">
                  Defined by manic episodes that last at least 7 days, or by manic symptoms severe
                  enough to need immediate hospital care. Depressive episodes also occur, typically
                  lasting at least 2 weeks.
                </p>
              </div>
              <div className="bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface-2))] border border-line rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Bipolar II Disorder</h3>
                <p className="text-muted text-sm">
                  Defined by a pattern of depressive episodes and hypomanic episodes, but not the
                  full-blown manic episodes typical of Bipolar I.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-display font-medium mt-8 mb-4">Beyond Mood Swings</h2>
            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="text-center">
                <CpuChipIcon className="h-12 w-12 text-indigo mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Cognitive Effects</h3>
                <p className="text-muted text-sm">Brain fog, memory issues, and concentration difficulties</p>
              </div>
              <div className="text-center">
                <HeartIcon className="h-12 w-12 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Physical Symptoms</h3>
                <p className="text-muted text-sm">Fatigue and other physical manifestations often accompany episodes</p>
              </div>
              <div className="text-center">
                <BookOpenIcon className="h-12 w-12 text-amber mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Daily Impact</h3>
                <p className="text-muted text-sm">Affects work, relationships, and basic self-care</p>
              </div>
            </div>

            <p className="text-sm text-muted border-t border-line pt-6 mt-8">
              This page is educational only — not medical advice. For diagnosis or treatment, please
              talk with your own healthcare team.
            </p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link
            href="/resources/treatment"
            className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 hover:shadow-[var(--shadow-lg)] transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Learn About Treatment</h3>
            <p className="text-muted text-sm">Medication, therapy, and lifestyle management options</p>
          </Link>
          <Link
            href="/app"
            className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 hover:shadow-[var(--shadow-lg)] transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">BipolarAware App</h3>
            <p className="text-muted text-sm">Passive early-warning tracking — learn more</p>
          </Link>
        </div>
      </PageWrap>

      <CrisisBand />
    </>
  )
}
