import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function PersonalJourneysPage() {
  const stories = [
    {
      id: 1,
      title: "My Journey with Bipolar Type 1",
      author: "Sarah M.",
      date: "2024-01-15",
      excerpt: "After years of misdiagnosis, I finally found the right treatment and learned to embrace my condition as part of who I am.",
      category: "Personal Journeys",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "From Darkness to Light: My Recovery Story",
      author: "Michael R.",
      date: "2024-01-10",
      excerpt: "The road to stability wasn't easy, but with the right support system and treatment, I found hope and purpose again.",
      category: "Personal Journeys",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Learning to Live with Rapid Cycling",
      author: "Emma L.",
      date: "2024-01-08",
      excerpt: "Understanding my rapid cycling patterns helped me develop better coping strategies and build a more stable life.",
      category: "Personal Journeys",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Finding My Voice Through Writing",
      author: "David K.",
      date: "2024-01-05",
      excerpt: "Creative expression became my therapy and helped me process the complex emotions that come with bipolar disorder.",
      category: "Personal Journeys",
      readTime: "4 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/stories" 
              className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Stories
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <UserIcon className="h-12 w-12 text-blue-200" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Personal Journeys</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Real stories from people living with bipolar disorder. Discover how others navigate their unique paths to stability, growth, and hope.
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Journey</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your story matters. Help others by sharing your personal experience with bipolar disorder.
            </p>
            <Link
              href="/stories/share"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
