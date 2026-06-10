import Link from 'next/link'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import { siteConfig } from '@/lib/site-config'

export const metadata = {
  title: 'Terms of Use — BipolarPeople',
}

export default function TermsPage() {
  return (
    <>
      <SectionBand>
        <PageWrap className="max-w-[780px]">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-medium">Terms of Use</h1>
          <p className="mt-4 text-muted text-sm">Last updated: June 2026</p>

          <div className="mt-10 space-y-8 text-muted leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Using this site</h2>
              <p>
                BipolarPeople.com provides stories, educational resources, and links to peer
                communities and research opportunities. By using this site, you agree to use it for
                lawful, personal, non-commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Not medical advice</h2>
              <p>
                Nothing on this site is a substitute for professional medical advice, diagnosis, or
                treatment. Always seek the advice of your physician or qualified health provider. See
                our{' '}
                <Link href="/disclaimer" className="text-accent font-semibold hover:underline">
                  disclaimer
                </Link>{' '}
                for more detail.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Story submissions</h2>
              <p>
                By submitting a story, you represent that it is your own experience (or you have
                permission to share it), that you grant us a license to review and potentially
                publish it with your approval, and that you understand publication is at our
                discretion after review.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">External links</h2>
              <p>
                We link to third-party organizations and book retailers. We are not responsible for
                their content or policies.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Contact</h2>
              <p>
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
