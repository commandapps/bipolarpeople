import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function RelationshipStoriesPage() {
  const stories = [
    {
      id: 13,
      title: "Dating with Bipolar Disorder",
      author: "Sophie L.",
      date: "2024-01-13",
      excerpt: "Navigating romantic relationships while managing bipolar disorder requires honesty, communication, and understanding from both partners.",
      category: "Relationship Stories",
      readTime: "8 min read"
    },
    {
      id: 14,
      title: "When Friends Don't Understand",
      author: "Mark D.",
      date: "2024-01-10",
      excerpt: "Some friendships survived my diagnosis, others didn't. Here's how I learned to set boundaries and find supportive relationships.",
      category: "Relationship Stories",
      readTime: "6 min read"
    },
    {
      id: 15,
      title: "Rebuilding Trust After an Episode",
      author: "Amanda R.",
      date: "2024-01-07",
      excerpt: "After a manic episode damaged my relationships, I had to work hard to rebuild trust and show my loved ones I was committed to stability.",
      category: "Relationship Stories",
      readTime: "7 min read"
    },
    {
      id: 16,
      title: "Finding Love and Acceptance",
      author: "Chris M.",
      date: "2024-01-05",
      excerpt: "My partner's unconditional love and support has been instrumental in my recovery journey. Here's how we make it work.",
      category: "Relationship Stories",
      readTime: "5 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/stories" 
              className="flex items-center gap-2 text-white hover:text-pink-200 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Stories
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <UsersIcon className="h-12 w-12 text-pink-200" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Relationship Stories</h1>
              <p className="text-xl text-pink-100 leading-relaxed">
                Stories about navigating relationships, friendships, and romantic connections while living with bipolar disorder.
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
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
                  className="inline-flex items-center text-pink-600 hover:text-pink-800 font-medium transition-colors"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Relationship Story</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Help others navigate relationships by sharing your experiences with friends, family, and romantic partners.
            </p>
            <Link
              href="/stories/share"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
