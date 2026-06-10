import Link from 'next/link'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import { siteConfig } from '@/lib/site-config'

export const metadata = {
  title: 'Privacy Policy — BipolarPeople',
}

export default function PrivacyPage() {
  return (
    <>
      <SectionBand>
        <PageWrap className="max-w-[780px]">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-medium">Privacy Policy</h1>
          <p className="mt-4 text-muted text-sm">Last updated: June 2026</p>

          <div className="mt-10 space-y-8 text-muted leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">The short version</h2>
              <p>
                BipolarPeople.com is a public advocacy and education website. We do{' '}
                <strong className="text-ink">not</strong> require accounts, and we do{' '}
                <strong className="text-ink">not</strong> collect or store health data from mood
                trackers or journals on this site — those tools are not part of this website.
                Tracking and passive monitoring live in the separate{' '}
                <Link href="/app" className="text-accent font-semibold hover:underline">
                  BipolarAware
                </Link>{' '}
                app, governed by its own privacy policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">What we collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-ink">Story submissions:</strong> If you choose to share a
                  story via our form, we receive the text you submit plus your contact email so we
                  can review and respond. Your email is never displayed publicly.
                </li>
                <li>
                  <strong className="text-ink">Research interest:</strong> If you express interest in
                  research, we receive the contact details you provide. This is not enrollment — full
                  consent happens separately.
                </li>
                <li>
                  <strong className="text-ink">Standard web logs:</strong> Our hosting provider may
                  log IP addresses, browser type, and pages visited for security and performance.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">What we do not do</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>We do not sell your personal information.</li>
                <li>We do not store health tracking data on this website.</li>
                <li>We do not publish story submissions without your explicit approval.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Your choices</h2>
              <p>
                You may request deletion of a published story or of submission data we hold by
                contacting{' '}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent font-semibold">
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Contact</h2>
              <p>
                Questions about this policy:{' '}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent font-semibold">
                  {siteConfig.contactEmail}
                </a>
              </p>
            </section>
          </div>
        </PageWrap>
      </SectionBand>
      <CrisisBand showMoreResources={false} />
    </>
  )
}
