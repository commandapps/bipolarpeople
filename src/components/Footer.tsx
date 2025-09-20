import Link from 'next/link'
import { HeartIcon } from '@heroicons/react/24/outline'

const footerNavigation = {
  resources: [
    { name: 'About Bipolar Disorder', href: '/resources/about' },
    { name: 'Treatment Options', href: '/resources/treatment' },
    { name: 'Crisis Resources', href: '/crisis-resources' },
    { name: 'For Families', href: '/resources/families' },
  ],
  community: [
    { name: 'Discussion Forums', href: '/community/forums' },
    { name: 'Support Groups', href: '/community/groups' },
    { name: 'Share Your Story', href: '/stories/share' },
    { name: 'Community Guidelines', href: '/community/guidelines' },
  ],
  tools: [
    { name: 'Mood Tracker', href: '/tools/mood-tracker' },
    { name: 'Journal Templates', href: '/tools/journal' },
    { name: 'Episode Planner', href: '/tools/episode-planner' },
    { name: 'Medication Tracker', href: '/tools/medication' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <HeartIcon className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">Bipolar People</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              A trusted, compassionate community for people living with bipolar disorder, 
              their families, and caregivers.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {footerNavigation.community.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
              Tools
            </h3>
            <ul className="space-y-3">
              {footerNavigation.tools.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="bg-yellow-900 bg-opacity-50 border border-yellow-600 rounded-lg p-4 mb-6">
            <p className="text-yellow-200 text-sm">
              <strong>Important:</strong> This website provides general information and peer support. 
              It is not a substitute for professional medical advice, diagnosis, or treatment. 
              If you are in crisis, please contact emergency services or call 988 (Suicide & Crisis Lifeline).
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Bipolar People. Made with ❤️ for the bipolar community.
            </p>
            <p className="text-gray-300 text-sm mt-2 md:mt-0">
              Not affiliated with any medical organization.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}