import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon, UserIcon, CalendarIcon, SunIcon } from '@heroicons/react/24/outline'

export default function RecoveryHopePage() {
  const stories = [
    {
      id: 17,
      title: "Finding Purpose in My Journey",
      author: "Jessica T.",
      date: "2024-01-15",
      excerpt: "After years of struggling, I discovered that my experiences with bipolar disorder could help others on their own healing journey.",
      category: "Recovery & Hope",
      readTime: "6 min read"
    },
    {
      id: 18,
      title: "The Light at the End of the Tunnel",
      author: "Daniel K.",
      date: "2024-01-12",
      excerpt: "Even in my darkest moments, I held onto hope. Here's how I found my way back to stability and joy.",
      category: "Recovery & Hope",
      readTime: "7 min read"
    },
    {
      id: 19,
      title: "Building a Life Worth Living",
      author: "Nicole B.",
      date: "2024-01-09",
      excerpt: "Recovery isn't just about managing symptoms—it's about creating a meaningful life filled with purpose and connection.",
      category: "Recovery & Hope",
      readTime: "8 min read"
    },
    {
      id: 20,
      title: "Gratitude in the Midst of Struggle",
      author: "Ryan P.",
      date: "2024-01-06",
      excerpt: "Learning to find gratitude even during difficult times has been transformative for my mental health and outlook on life.",
      category: "Recovery & Hope",
      readTime: "5 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/stories" 
              className="flex items-center gap-2 text-white hover:text-green-200 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Stories
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <SunIcon className="h-12 w-12 text-green-200" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Recovery & Hope</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Inspiring stories of recovery, resilience, and hope from people who have found stability and meaning in their journey with bipolar disorder.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article key={story.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {story.category}
                  </span>
                  <span className="text-sm text-gray-500">{story.readTime}</span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {story.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {story.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <HeartIcon className="h-4 w-4" />
                    <span>{story.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Link
                  href={`/stories/${story.id}`}
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
                >
                  Read Full Story
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Recovery Story</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Inspire others by sharing your journey of recovery, hope, and resilience.
            </p>
            <Link
              href="/stories/share"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
