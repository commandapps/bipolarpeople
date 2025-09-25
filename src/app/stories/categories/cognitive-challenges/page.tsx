import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon, UserIcon, CalendarIcon, CpuChipIcon } from '@heroicons/react/24/outline'

export default function CognitiveChallengesPage() {
  const stories = [
    {
      id: 9,
      title: "When My Brain Feels Foggy",
      author: "Maria G.",
      date: "2024-01-14",
      excerpt: "Cognitive symptoms can be just as challenging as mood episodes. Here's how I cope with brain fog and memory issues.",
      category: "Cognitive Challenges",
      readTime: "6 min read"
    },
    {
      id: 10,
      title: "Memory Strategies That Work",
      author: "James W.",
      date: "2024-01-11",
      excerpt: "Finding practical solutions for memory problems has helped me maintain my independence and confidence.",
      category: "Cognitive Challenges",
      readTime: "5 min read"
    },
    {
      id: 11,
      title: "Focus and Concentration Tips",
      author: "Rachel K.",
      date: "2024-01-08",
      excerpt: "When attention feels scattered, these techniques help me stay focused and productive throughout the day.",
      category: "Cognitive Challenges",
      readTime: "7 min read"
    },
    {
      id: 12,
      title: "Working Through Decision Fatigue",
      author: "Tom H.",
      date: "2024-01-06",
      excerpt: "Making decisions can feel overwhelming when your brain is already working overtime. Here's what helps me.",
      category: "Cognitive Challenges",
      readTime: "4 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/stories" 
              className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Stories
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <CpuChipIcon className="h-12 w-12 text-purple-200" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Cognitive Challenges</h1>
              <p className="text-xl text-purple-100 leading-relaxed">
                Stories about navigating cognitive symptoms like memory issues, brain fog, and concentration difficulties that often accompany bipolar disorder.
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
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
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Cognitive Strategies</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Help others by sharing the techniques and strategies that help you manage cognitive challenges.
            </p>
            <Link
              href="/stories/share"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
