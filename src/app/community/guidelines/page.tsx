import Link from 'next/link'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'
import { siteConfig } from '@/lib/site-config'

export const metadata = {
  title: 'Community Guidelines — BipolarPeople',
  description: 'Peer support standards for communities we link to and story submissions on BipolarPeople.com.',
}

export default function CommunityGuidelinesPage() {
  return (
    <>
      <SectionBand>
        <PageWrap className="max-w-[780px]">
          <Eyebrow>Community</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-medium">Community Guidelines</h1>
          <p className="mt-4 text-muted text-lg max-w-[54ch]">
            BipolarPeople.com is an advocacy and education site — not a hosted forum. These
            guidelines describe how we handle story submissions here, and the kind of peer support
            culture we point people toward elsewhere.
          </p>

          <div className="mt-10 space-y-8 text-muted leading-relaxed">
            <section className="bg-[color-mix(in_srgb,var(--indigo)_8%,var(--surface-2))] border border-line rounded-[var(--radius)] p-6">
              <h2 className="font-display text-xl text-ink font-medium mb-3">Our promise</h2>
              <p>
                This project exists to reduce stigma and connect people with honest stories,
                education, and peer communities. We do not claim to provide clinical care or
                professional moderation on this website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Peer support, not medical advice</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Share personal experience — not prescriptions or dosage changes</li>
                <li>Encourage people to work with their own healthcare team</li>
                <li>Respect that everyone&apos;s path is different</li>
                <li>Stories on this site are reviewed before publication; we do not publish medical advice</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Privacy and consent</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Story authors may use their name, a pseudonym, or stay anonymous</li>
                <li>We never publish a submission without the author&apos;s approval</li>
                <li>Contact emails from submissions are kept private</li>
                <li>Do not share someone else&apos;s private information without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Respectful communication</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Lead with compassion — many people are in vulnerable moments</li>
                <li>Avoid stigmatizing language about mental health</li>
                <li>Disagree without personal attacks</li>
                <li>Recovery and struggle can coexist in the same story</li>
              </ul>
            </section>

            <section className="bg-[color-mix(in_srgb,var(--amber)_12%,var(--surface-2))] border border-line rounded-[var(--radius)] p-6">
              <h2 className="font-display text-lg text-ink font-medium mb-3">Crisis support</h2>
              <p>
                BipolarPeople.com is not a crisis service. If you or someone else is in immediate
                danger, call <a href="tel:911" className="text-accent font-semibold">911</a> or{' '}
                <a href="tel:988" className="text-accent font-semibold">988</a>. See our{' '}
                <Link href="/crisis-resources" className="text-accent font-semibold hover:underline">
                  crisis resources
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">External communities</h2>
              <p>
                When we link to peer groups like the Bipolar Social Club, DBSA, or NAMI, those
                spaces have their own rules and moderators. We recommend reading each group&apos;s
                guidelines before participating. Peer moderation is not the same as clinical
                oversight.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Story submissions we decline</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Medical advice or medication recommendations</li>
                <li>Detailed descriptions of self-harm methods</li>
                <li>Harassment, hate speech, or personal attacks</li>
                <li>Spam or promotional content</li>
                <li>Content that violates someone&apos;s privacy</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink font-medium mb-3">Questions?</h2>
              <p>
                Contact us at{' '}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent font-semibold">
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </section>
          </div>
        </PageWrap>
      </SectionBand>
      <CrisisBand showMoreResources={false} />
    </>
  )
}
