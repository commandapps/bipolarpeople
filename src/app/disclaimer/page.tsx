import Link from 'next/link'
import CrisisBand from '@/components/ui/CrisisBand'
import { Eyebrow, PageWrap, SectionBand } from '@/components/ui/PageElements'

export const metadata = {
  title: 'Disclaimer — BipolarPeople',
}

export default function DisclaimerPage() {
  return (
    <>
      <SectionBand>
        <PageWrap className="max-w-[780px]">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-medium">Medical Disclaimer</h1>

          <div className="mt-10 space-y-6 text-muted leading-relaxed">
            <p className="text-lg">
              BipolarPeople.com shares stories, education, and peer support. It is{' '}
              <strong className="text-ink">not</strong> a substitute for professional medical
              advice, diagnosis, or treatment.
            </p>

            <ul className="list-disc pl-5 space-y-3">
              <li>
                Stories reflect individual experiences. What helped one person may not help another.
              </li>
              <li>
                Resources and reading lists are for general information only — not treatment
                recommendations.
              </li>
              <li>
                Community links point to peer support, not clinical care. Peer support is not
                moderated by clinicians on this site.
              </li>
              <li>
                Research interest forms on this site do not enroll you in a study. Participation
                requires separate informed consent under appropriate oversight.
              </li>
              <li>
                Famous-people and historical attributions reflect public statements or retrospective
                debate — not our clinical diagnoses.
              </li>
            </ul>

            <p>
              <strong className="text-ink">If you are in crisis,</strong> call or text{' '}
              <a href="tel:988" className="text-accent font-semibold">
                988
              </a>{' '}
              or go to{' '}
              <Link href="/crisis-resources" className="text-accent font-semibold hover:underline">
                crisis resources
              </Link>
              .
            </p>

            <p className="text-sm">
              BipolarPeople.com is not affiliated with any medical organization.
            </p>
          </div>
        </PageWrap>
      </SectionBand>
      <CrisisBand showMoreResources={false} />
    </>
  )
}
