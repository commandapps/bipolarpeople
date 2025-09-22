import Link from 'next/link'
import { ArrowRightIcon, HeartIcon, UserGroupIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              You Are Not Alone in Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Bipolar Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              A trusted, compassionate community and resource hub for people living with bipolar disorder, 
              their families, caregivers, and mental health professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/community"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                Join Our Community
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link 
                href="/resources"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supporting Every Step of Your Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From lived experiences to practical tools, we&apos;re here to guide, encourage, and connect you.            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<HeartIcon className="w-8 h-8 text-pink-600" />}
              title="Stories & Experiences"
              description="Real stories from people at different stages of their bipolar journey"
              href="/stories"
            />
            <FeatureCard
              icon={<BookOpenIcon className="w-8 h-8 text-blue-600" />}
              title="Educational Resources"
              description="Evidence-based information about symptoms, treatments, and management strategies"
              href="/resources"
            />
            <FeatureCard
              icon={<ChartBarIcon className="w-8 h-8 text-green-600" />}
              title="Tracking Tools"
              description="Mood trackers, journaling templates, and self-monitoring resources"
              href="/tools"
            />
            <FeatureCard
              icon={<UserGroupIcon className="w-8 h-8 text-purple-600" />}
              title="Peer Support"
              description="Connect with others who understand your experience in a safe space"
              href="/community"
            />
          </div>
        </div>
      </section>

      {/* Research Insights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Built on Real Understanding
              </h2>
              <p className="text-lg text-gray-600 mb-6">
              Our platform is informed by extensive research into the bipolar community&apos;s actual needs, 
                challenges, and experiences. We focus on what matters most to you.
              </p>
              <div className="space-y-4">
                <InsightItem
                  statistic="64.6%"
                  description="of people report facing misconceptions and stigma as their biggest challenge"
                />
                <InsightItem
                  statistic="25.2%"
                  description="experience cognitive challenges like brain fog and memory issues"
                />
                <InsightItem
                  statistic="68.6%"
                  description="actively track their mood to identify patterns and triggers"
                />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <blockquote className="text-lg text-gray-700 italic mb-4">
              &ldquo;I feel like a passenger in my own body during episodes, watching myself 
              do things I can&apos;t control but remembering everything afterward.&rdquo;
              </blockquote>
              <p className="text-sm text-gray-500">— Community Research Insight</p>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Resources Banner */}
      <section className="bg-red-50 border-l-4 border-red-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Need Immediate Support?
              </h3>
              <p className="text-red-700">
              If you&apos;re in crisis, please reach out for immediate help.
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4 md:flex">
              <a 
                href="tel:988" 
                className="block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center"
              >
                Call 988 (Crisis Lifeline)
              </a>
              <a 
                href="tel:911" 
                className="block bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center"
              >
                Emergency: 911
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, href }: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  )
}

function InsightItem({ statistic, description }: {
  statistic: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-bold text-sm">
        {statistic}
      </div>
      <p className="text-gray-600 flex-1">{description}</p>
    </div>
  )
}