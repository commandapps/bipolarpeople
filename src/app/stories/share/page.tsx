'use client'

import Link from 'next/link'
import { ArrowLeftIcon, PencilSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const categories = [
  { id: 'episodes', label: 'Episode Experiences' },
  { id: 'cognitive', label: 'Cognitive Challenges' }, 
  { id: 'relationships', label: 'Relationships & Family' },
  { id: 'work', label: 'Career & Education' },
  { id: 'recovery', label: 'Recovery & Hope' }
]

export default function ShareStoryPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    story: '',
    authorName: '',
    useRealName: false,
    email: '',
    agreeToTerms: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Story submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/stories" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Stories
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <PencilSquareIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Share Your Story</h1>
          </div>

          <p className="text-lg text-gray-600 mb-8">
            Your experience matters. By sharing your story, you help break stigma and provide hope to others on their bipolar journey.
          </p>

          {/* Privacy Notice */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-green-900 mb-3">Your Privacy is Protected</h2>
            <ul className="text-green-800 text-sm space-y-2">
              <li>• You can use a pseudonym or remain anonymous</li>
              <li>• All stories are reviewed before publication</li>
              <li>• We never share personal contact information</li>
              <li>• You can request story removal at any time</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Story Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your story a compelling title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category...</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Story Content */}
            <div>
              <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
                Your Story *
              </label>
              <textarea
                id="story"
                name="story"
                required
                value={formData.story}
                onChange={handleChange}
                rows={12}
                placeholder="Share your experience in your own words. What happened? How did you cope? What did you learn? What would you tell someone going through something similar?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Focus on your journey, what helped you, and messages of hope. Avoid specific medical advice.
              </p>
            </div>

            {/* Author Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
                    Name to display *
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    required
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Your name or preferred pseudonym"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="useRealName"
                    name="useRealName"
                    checked={formData.useRealName}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="useRealName" className="ml-2 text-sm text-gray-700">
                    This is my real name (optional)
                  </label>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="For communication about your story only"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Never displayed publicly. Used only to contact you about your story.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                  I agree that my story may be published on Bipolar People and understand that all stories are reviewed before publication. I confirm this story is based on my personal experience with bipolar disorder. *
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={!formData.agreeToTerms}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Submit Story for Review
              </button>
              <Link
                href="/stories"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Crisis Resources */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
          <div className="flex items-center gap-3 mb-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            <h2 className="text-lg font-bold text-red-900">Need Support Right Now?</h2>
          </div>
          <p className="text-red-800 text-sm mb-4">
            If you're experiencing a mental health crisis while writing your story, please reach out for immediate help.
          </p>
          <div className="flex flex-wrap gap-3">
            <a 
              href="tel:988"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Call 988
            </a>
            <Link
              href="/crisis-resources"
              className="bg-white hover:bg-gray-50 text-red-700 px-4 py-2 rounded-lg font-medium border border-red-200 transition-colors text-sm"
            >
              Crisis Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}