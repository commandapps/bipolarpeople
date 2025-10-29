import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon, CalendarIcon, HomeIcon } from '@heroicons/react/24/outline'

export default function FamilyCaregiverPage() {
  const stories = [
    {
      id: 21,
      title: "Supporting My Spouse Through Episodes",
      author: "Sarah J.",
      date: "2024-01-14",
      excerpt: "As a partner, learning to support someone with bipolar disorder while taking care of myself has been a journey of growth and understanding.",
      category: "Family/Caregiver Stories",
      readTime: "8 min read"
    },
    {
      id: 22,
      title: "When Your Child Has Bipolar Disorder",
      author: "Michael R.",
      date: "2024-01-11",
      excerpt: "Navigating my teenager's diagnosis taught me about advocacy, patience, and the importance of family support in mental health treatment.",
      category: "Family/Caregiver Stories",
      readTime: "9 min read"
    },
    {
      id: 23,
      title: "Caring for My Aging Parent",
      author: "Lisa M.",
      date: "2024-01-08",
      excerpt: "Supporting my elderly parent with bipolar disorder while managing my own life has required balance, boundaries, and self-compassion.",
      category: "Family/Caregiver Stories",
      readTime: "7 min read"
    },
    {
      id: 24,
      title: "Siblings Supporting Each Other",
      author: "David & Emma K.",
      date: "2024-01-05",
      excerpt: "When both siblings have bipolar disorder, family support becomes even more crucial. Here's how we navigate this journey together.",
      category: "Family/Caregiver Stories",
      readTime: "6 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/stories" 
              className="flex items-center gap-2 text-white hover:text-teal-200 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Stories
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <HomeIcon className="h-12 w-12 text-teal-200" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Family/Caregiver Stories</h1>
              <p className="text-xl text-teal-100 leading-relaxed">
                Stories from family members and caregivers who support loved ones with bipolar disorder, sharing their experiences and insights.
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
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
                  className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium transition-colors"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Caregiver Story</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Help other families and caregivers by sharing your experiences supporting a loved one with bipolar disorder.
            </p>
            <Link
              href="/stories/share"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
