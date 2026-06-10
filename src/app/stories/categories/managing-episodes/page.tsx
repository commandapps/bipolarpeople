import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon, CalendarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ManagingEpisodesPage() {
  const stories = [
    {
      id: 5,
      title: "Recognizing My Manic Triggers",
      author: "Jennifer T.",
      date: "2024-01-12",
      excerpt: "Learning to identify the early warning signs of mania helped me prevent full episodes and maintain stability.",
      category: "Managing Episodes",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Coping with Depressive Episodes",
      author: "Robert S.",
      date: "2024-01-09",
      excerpt: "When depression hits, these strategies help me get through the darkest days and find light again.",
      category: "Managing Episodes",
      readTime: "8 min read"
    },
    {
      id: 7,
      title: "My Emergency Action Plan",
      author: "Lisa M.",
      date: "2024-01-07",
      excerpt: "Having a clear plan in place has been crucial for managing crisis situations and getting the help I need.",
      category: "Managing Episodes",
      readTime: "5 min read"
    },
    {
      id: 8,
      title: "Medication Adjustments During Episodes",
      author: "Alex P.",
      date: "2024-01-04",
      excerpt: "Working with my doctor to adjust medications during episodes has been key to my recovery process.",
      category: "Managing Episodes",
      readTime: "7 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/stories" 
              className="flex items-center gap-2 text-white hover:text-orange-200 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Stories
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <ExclamationTriangleIcon className="h-12 w-12 text-orange-200" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Managing Episodes</h1>
              <p className="text-xl text-orange-100 leading-relaxed">
                Practical strategies and real experiences from people who have learned to navigate manic and depressive episodes effectively.
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
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
                  className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Episode Management Tips</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Help others by sharing what works for you when managing manic or depressive episodes.
            </p>
            <Link
              href="/stories/share"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
