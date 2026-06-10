import Link from 'next/link'
import { PageWrap } from '@/components/ui/PageElements'

const explore = [
  { name: 'Stories', href: '/stories' },
  { name: 'Resources', href: '/resources' },
  { name: 'The App', href: '/app' },
  { name: 'Research', href: '/research' },
]

const resources = [
  { name: 'Reading List', href: '/resources/reading-list' },
  { name: 'For Families', href: '/resources/families' },
  { name: 'Connect', href: '/community' },
  { name: 'Crisis Resources', href: '/crisis-resources' },
]

const site = [
  { name: 'About', href: '/resources/about' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-ground text-[#B9C7DA] py-[clamp(3rem,6vw,4.5rem)] pb-10">
      <PageWrap>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">
          <div>
            <div className="font-display text-white text-[1.3rem] font-semibold">BipolarPeople</div>
            <p className="mt-3 max-w-[34ch] text-[#90A1BB] text-[0.92rem] leading-relaxed">
              Changing the story people tell about bipolar disorder — one real life at a time.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-[0.78rem] tracking-[0.12em] uppercase text-[#7E91AC] mb-3.5">
              Explore
            </h4>
            {explore.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-[#C7D4E6] py-1 text-[0.95rem] hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="font-sans text-[0.78rem] tracking-[0.12em] uppercase text-[#7E91AC] mb-3.5">
              Resources
            </h4>
            {resources.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-[#C7D4E6] py-1 text-[0.95rem] hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="font-sans text-[0.78rem] tracking-[0.12em] uppercase text-[#7E91AC] mb-3.5">
              Site
            </h4>
            {site.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-[#C7D4E6] py-1 text-[0.95rem] hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-10 pt-6 border-t border-[#233247] text-[0.84rem] text-[#8294AE] max-w-[75ch] leading-relaxed">
          This website shares stories, education, and peer support. It is not a substitute for
          professional medical advice, diagnosis, or treatment. If you are in crisis, call or text
          988. Not affiliated with any medical organization.
        </p>
      </PageWrap>
    </footer>
  )
}
