'use client'

import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { use } from 'react'

const categoryData = {
  episodes: {
    title: 'Episode Experiences',
    description: 'Real accounts of manic and depressive episodes, recovery, and lessons learned',
    color: 'blue',
    stats: 'Most common stories'
  },
  cognitive: {
    title: 'Cognitive Challenges', 
    description: 'Overcoming brain fog, memory issues, and the path back to mental clarity',
    color: 'purple',
    stats: '25.2% experience this'
  },
  relationships: {
    title: 'Relationships & Family',
    description: 'Rebuilding connections, communication strategies, and finding understanding',
    color: 'green', 
    stats: '15% report challenges'
  },
  work: {
    title: 'Career & Education',
    description: 'Professional success stories, workplace accommodations, and academic comebacks',
    color: 'orange',
    stats: 'Breaking stereotypes'
  },
  recovery: {
    title: 'Recovery & Hope',
    description: 'Long-term stability, finding the right treatment, and thriving with bipolar',
    color: 'red',
    stats: 'Inspiration & hope'
  }
}

// Mock stories for each category
const categoryStories = {
  episodes: [
    {
      id: 1,
      title: "From Passenger to Driver: Taking Control After Psychosis",
      excerpt: "I used to describe episodes as being a passenger in my own body. Here's how I learned to recognize warning signs and stay in the driver's seat.",
      author: "Sarah M.",
      readTime: "8 min read",
      publishedDate: "2024-03-15"
    }
  ],
  cognitive: [
    {
      id: 2,
      title: "My Brain Came Back: Recovering from Medication-Induced Fog",
      excerpt: "Three years of cognitive dulling almost cost me my career. This is how I found the right medication balance and reclaimed my mental sharpness.",
      author: "Michael T.",
      readTime: "6 min read", 
      publishedDate: "2024-03-10"
    }
  ],
  relationships: [
    {
      id: 3,
      title: "Rebuilding Trust: How My Marriage Survived Bipolar",
      excerpt: "After my diagnosis nearly destroyed our relationship, my spouse and I learned to communicate through episodes and build stronger boundaries.",
      author: "Jennifer R.",
      readTime: "10 min read",
      publishedDate: "2024-03-05"
    }
  ],
  work: [],
  recovery: []
}

interface PageProps {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = use(params)
  const categoryInfo = categoryData[category as keyof typeof categoryData]
  const stories = categoryStories[category as keyof typeof categoryStories] || []
  
  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/stories" className="text-blue-600 hover:text-blue-700">
            ← Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    green: 'bg-green-50 border-green-200 text-green-800', 
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
    red: 'bg-red-50 border-red-200 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/stories" className="text-blue-600 hover:text-blue-700">
              Stories
            </Link>
            <span className="text-gray-500">›</span>
            <span className="text-gray-800">{categoryInfo.title}</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${colorClasses[categoryInfo.color]}`}>
              {categoryInfo.stats}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryInfo.title}</h1>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">{categoryInfo.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {stories.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-gray-800 mb-4 line-clamp-3 leading-relaxed">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>By {story.author}</span>
                  <div className="flex items-center gap-4">
                    <span>{new Date(story.publishedDate).toLocaleDateString()}</span>
                    <span>{story.readTime}</span>
                  </div>
                </div>
                <Link 
                  href={`/stories/${story.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read Full Story →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">More Stories Coming Soon</h2>
            <p className="text-gray-800 mb-8">
              We're actively collecting stories in this category. Have an experience to share?
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/stories/share"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Share Your Story
              </Link>
              <Link
                href="/stories"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Browse All Stories
              </Link>
            </div>
          </div>
        )}

        {/* Back to Stories */}
        <div className="mt-12 text-center">
          <Link 
            href="/stories"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to All Stories
          </Link>
        </div>
      </div>
    </div>
  )
}