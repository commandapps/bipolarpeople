'use client'

import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon, BeakerIcon, ChatBubbleLeftRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function TreatmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/resources" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Resources
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <HeartIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Treatment Options</h1>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            Effective treatment for bipolar disorder typically involves a combination of medication, therapy, and lifestyle management strategies.
          </p>

          {/* Research Insight */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-blue-900 mb-3">What Our Research Shows</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">12.9%</div>
                <span className="text-blue-800">report medication challenges as a major struggle</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">17.4%</div>
                <span className="text-blue-800">actively track medication adherence and effects</span>
              </div>
            </div>
          </div>

          {/* Treatment Categories */}
          <div className="space-y-8">
            {/* Medication */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <BeakerIcon className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Medication</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Medications are often the foundation of bipolar disorder treatment. Different types work for different people, and finding the right combination may take time.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Mood Stabilizers</h3>
                  <p className="text-gray-600 text-sm">Help control manic and depressive episodes</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Antipsychotics</h3>
                  <p className="text-gray-600 text-sm">Often used for severe manic episodes</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Antidepressants</h3>
                  <p className="text-gray-600 text-sm">Used carefully, usually with mood stabilizers</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> Medication manages symptoms but doesn't eliminate the daily struggle. Work closely with your healthcare provider to find what works best for you.
                </p>
              </div>
            </div>

            {/* Therapy */}
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Therapy</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Psychotherapy helps you understand your condition, develop coping strategies, and improve relationships.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Cognitive Behavioral Therapy (CBT)</h3>
                  <p className="text-gray-600 text-sm">Helps identify and change negative thought patterns and behaviors</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Interpersonal Therapy</h3>
                  <p className="text-gray-600 text-sm">Focuses on improving relationships and social functioning</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Family Therapy</h3>
                  <p className="text-gray-600 text-sm">Involves family members to improve support and communication</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Group Therapy</h3>
                  <p className="text-gray-600 text-sm">Connect with others who understand your experiences</p>
                </div>
              </div>
            </div>

            {/* Lifestyle Management */}
            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <SparklesIcon className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Lifestyle Management</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Daily habits and lifestyle choices play a crucial role in managing bipolar disorder symptoms.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Sleep Hygiene</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>39.5% of people</strong> track sleep as a crucial episode indicator. Maintaining consistent sleep patterns is vital.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Go to bed and wake up at the same time daily</li>
                    <li>• Avoid screens before bedtime</li>
                    <li>• Create a calming bedtime routine</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Exercise & Nutrition</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Regular physical activity and balanced nutrition support mood stability.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Aim for 30 minutes of moderate exercise daily</li>
                    <li>• Eat regular, balanced meals</li>
                    <li>• Limit alcohol and caffeine</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Finding Help */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-green-900 mb-3">Finding the Right Treatment</h2>
            <p className="text-green-800 mb-4">
              Treatment is highly individual. What works for one person may not work for another. Be patient with the process and communicate openly with your healthcare team.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/tools/medication"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-green-700 px-4 py-2 rounded-lg font-medium border border-green-200 transition-colors text-sm"
              >
                Track Your Medications
              </Link>
              <Link 
                href="/tools/mood-tracker"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-green-700 px-4 py-2 rounded-lg font-medium border border-green-200 transition-colors text-sm"
              >
                Monitor Your Moods
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}