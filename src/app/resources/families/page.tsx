'use client'

import Link from 'next/link'
import { ArrowLeftIcon, UserGroupIcon, HeartIcon, ExclamationTriangleIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function FamiliesPage() {
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
            <UserGroupIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">For Families & Caregivers</h1>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            Supporting a loved one with bipolar disorder can be challenging. You're not alone, and there are ways to help while taking care of yourself.
          </p>

          {/* Research Insight */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-red-900 mb-3">Understanding the Impact</h2>
            <p className="text-red-800 text-sm mb-3">
              Our research shows that <strong>15% of people with bipolar disorder</strong> report significant relationship challenges, often due to misunderstandings about their condition.
            </p>
            <p className="text-red-700 text-sm italic">
              "When I express normal emotions or achieve stability, others frequently attribute it to my disorder ('Are you manic?' or 'Did you take your meds?'). This invalidates my genuine human experiences."
            </p>
          </div>

          <div className="space-y-8">
            {/* Understanding */}
            <div className="border-l-4 border-purple-500 pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Bipolar Disorder</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">It's Not Just Mood Swings</h3>
                  <p className="text-gray-600 text-sm">
                    Bipolar disorder involves intense emotional states that can last days or weeks, not rapid changes throughout the day. These episodes significantly impact daily functioning.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Cognitive Effects Are Real</h3>
                  <p className="text-gray-600 text-sm">
                    25.2% experience brain fog, memory issues, and concentration difficulties. This isn't laziness or lack of effort.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Episodes Feel Uncontrollable</h3>
                  <p className="text-gray-600 text-sm">
                    Many describe feeling like "a passenger in their own body" during episodes - aware but unable to control their actions.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Help */}
            <div className="border-l-4 border-green-500 pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Help</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-900 mb-3">During Stable Periods</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Learn about their specific triggers and warning signs</li>
                    <li>• Encourage consistent sleep schedules and healthy habits</li>
                    <li>• Support their treatment plan and medication routine</li>
                    <li>• Plan for potential episodes together</li>
                    <li>• Celebrate achievements without attributing them to mania</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-red-900 mb-3">During Episodes</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Stay calm and avoid taking behaviors personally</li>
                    <li>• Remove access to credit cards, car keys if necessary</li>
                    <li>• Ensure they're taking prescribed medications</li>
                    <li>• Contact their healthcare provider if symptoms worsen</li>
                    <li>• Know when to seek emergency help</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Communication */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Healthy Communication</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-green-50 rounded-lg p-4 flex-1">
                    <h3 className="font-semibold text-green-900 mb-2">✓ Helpful Approaches</h3>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• "How are you feeling today?"</li>
                      <li>• "What can I do to support you right now?"</li>
                      <li>• "I've noticed you seem [specific observation]"</li>
                      <li>• Listen without trying to "fix" everything</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 flex-1">
                    <h3 className="font-semibold text-red-900 mb-2">✗ Avoid These</h3>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• "Are you manic right now?"</li>
                      <li>• "Just think positive thoughts"</li>
                      <li>• "Everyone has ups and downs"</li>
                      <li>• "Did you take your meds?" (unless safety concern)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Self-Care */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Taking Care of Yourself</h2>
              <p className="text-gray-700 mb-4">
                Caring for someone with bipolar disorder can be emotionally and physically exhausting. Your wellbeing matters too.
              </p>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <ul className="text-orange-800 text-sm space-y-2">
                  <li>• Set healthy boundaries - you can't control their illness</li>
                  <li>• Join a support group for families and caregivers</li>
                  <li>• Consider your own therapy or counseling</li>
                  <li>• Maintain your own friendships and activities</li>
                  <li>• Learn when professional intervention is needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Crisis Resources */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              <h2 className="text-lg font-bold text-red-900">Crisis Resources</h2>
            </div>
            <p className="text-red-800 text-sm mb-4">
              If your loved one is experiencing thoughts of self-harm, substance abuse, or severe symptoms, get help immediately.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="tel:988"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <PhoneIcon className="h-4 w-4" />
                Call 988
              </a>
              <Link
                href="/crisis-resources"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-red-700 px-4 py-2 rounded-lg font-medium border border-red-200 transition-colors text-sm"
              >
                View All Crisis Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}