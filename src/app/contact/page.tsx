import Link from 'next/link'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import { siteConfig } from '@/lib/site-config'

export const metadata = {
  title: 'Contact — BipolarPeople',
}

export default function ContactPage() {
  return (
    <>
      <SectionBand>
        <PageWrap className="max-w-[780px]">
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-medium">Contact</h1>
          <p className="mt-5 text-muted text-lg max-w-[54ch]">
            Questions about the site, story submissions, or research interest — we&apos;d like to
            hear from you.
          </p>

          <div className="mt-10 space-y-6">
            <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
              <h2 className="font-semibold text-ink">General inquiries</h2>
              <p className="mt-2 text-muted">
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent font-semibold">
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>

            <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
              <h2 className="font-semibold text-ink">Share a story</h2>
              <p className="mt-2 text-muted">
                Use our{' '}
                <Link href="/stories/share" className="text-accent font-semibold hover:underline">
                  story submission form
                </Link>{' '}
                — we review every submission before publishing.
              </p>
            </div>

            <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
              <h2 className="font-semibold text-ink">Research volunteers</h2>
              <p className="mt-2 text-muted">
                Express interest on our{' '}
                <Link href="/research" className="text-accent font-semibold hover:underline">
                  research page
                </Link>
                . This is not enrollment — we&apos;ll follow up with full details and consent
                requirements.
              </p>
            </div>

            <div className="bg-surface-2 border border-line rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
              <h2 className="font-semibold text-ink">In crisis?</h2>
              <p className="mt-2 text-muted">
                This site is not a crisis service. Call or text{' '}
                <a href="tel:988" className="text-accent font-semibold">
                  988
                </a>{' '}
                — available 24/7.
              </p>
            </div>
          </div>
        </PageWrap>
      </SectionBand>
      <CrisisBand showMoreResources={false} />
    </>
  )
}
