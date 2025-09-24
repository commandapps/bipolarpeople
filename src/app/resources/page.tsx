'use client'

import Link from 'next/link'
import { ArrowLeftIcon, BookOpenIcon, CpuChipIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function AboutBipolarPage() {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpenIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Understanding Bipolar Disorder</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Bipolar disorder is a mental health condition that causes significant shifts in mood, energy, and activity levels that affect a person's ability to carry out day-to-day tasks.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Is Bipolar Disorder?</h2>
            <p>
              Bipolar disorder involves episodes of mood changes that are more extreme than the normal ups and downs most people experience. These episodes can include periods of extremely elevated mood (mania or hypomania) and periods of depression.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Types of Bipolar Disorder</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">Bipolar I Disorder</h3>
                <p className="text-blue-800 text-sm">
                  Defined by manic episodes that last at least 7 days, or by manic symptoms that are so severe that immediate hospital care is needed. Depressive episodes also occur, typically lasting at least 2 weeks.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-900 mb-3">Bipolar II Disorder</h3>
                <p className="text-green-800 text-sm">
                  Defined by a pattern of depressive episodes and hypomanic episodes, but not the full-blown manic episodes that are typical of Bipolar I Disorder.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Experiences</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <p className="text-yellow-800 italic">
                "I feel like a passenger in my own body during episodes, watching myself do things I can't control but remembering everything afterward."
              </p>
              <p className="text-yellow-700 text-sm mt-2">— Community Research Insight</p>
            </div>

            <p>
              Based on our community research, <strong>64.6% of people with bipolar disorder</strong> report that misconceptions and stigma are their biggest challenge. Many describe feeling misunderstood when their experiences don't match common stereotypes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Beyond Mood Swings</h2>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="text-center">
                <CpuChipIcon className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cognitive Effects</h3>
                <p className="text-gray-600 text-sm">
                  25.2% experience brain fog, memory issues, and concentration difficulties
                </p>
              </div>
              
              <div className="text-center">
                <HeartIcon className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Physical Symptoms</h3>
                <p className="text-gray-600 text-sm">
                  Joint pain, fatigue, and other physical manifestations often accompany episodes
                </p>
              </div>
              
              <div className="text-center">
                <BookOpenIcon className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Impact</h3>
                <p className="text-gray-600 text-sm">
                  Affects work, relationships, and basic self-care activities
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold text-green-900 mb-3">Remember: You Are Not Alone</h3>
              <p className="text-green-800">
                Bipolar disorder affects millions of people worldwide. With proper treatment, support, and self-management strategies, people with bipolar disorder can live full, productive lives.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link 
            href="/resources/treatment"
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold text-blue-900 mb-2">Learn About Treatment</h3>
            <p className="text-blue-800 text-sm">Explore medication, therapy, and lifestyle management options</p>
          </Link>
          
          <Link 
            href="/tools/mood-tracker"
            className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold text-green-900 mb-2">Start Tracking</h3>
            <p className="text-green-800 text-sm">Use our mood tracker to identify your patterns</p>
          </Link>
        </div>
      </div>
    </div>
  )
}