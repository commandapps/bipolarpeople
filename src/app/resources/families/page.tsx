'use client'

import Link from 'next/link'
import { ArrowLeftIcon, UserGroupIcon, ExclamationTriangleIcon, PhoneIcon } from '@heroicons/react/24/outline'

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
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <UserGroupIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Resources for Families & Caregivers
              </h1>
              <p className="text-lg text-gray-600">
                Supporting someone with bipolar disorder can be challenging. These resources are designed to help you understand, communicate, and provide effective support.
              </p>
            </div>
          </div>
        </div>

        {/* Understanding Bipolar Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Bipolar Disorder
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Bipolar disorder is a mental health condition characterized by significant mood swings, including emotional highs (mania or hypomania) and lows (depression). Understanding these phases is crucial for providing appropriate support.
            </p>
            <ul className="space-y-2 mb-6">
              <li><strong>Manic Episodes:</strong> Elevated mood, increased energy, reduced need for sleep, impulsive behavior</li>
              <li><strong>Depressive Episodes:</strong> Low mood, lack of energy, difficulty concentrating, changes in sleep and appetite</li>
              <li><strong>Mixed Episodes:</strong> Symptoms of both mania and depression occurring simultaneously</li>
            </ul>
          </div>
        </div>

        {/* How to Support Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Support Your Loved One
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Do's</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Learn about bipolar disorder and its symptoms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Listen without judgment and validate their feelings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Encourage them to stick to their treatment plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Help them maintain a regular routine and sleep schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Be patient and understanding during episodes</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Don'ts</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Don't ask "Are you manic?" or "Did you take your meds?" when they express normal emotions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Don't minimize their experience or say "just snap out of it"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Don't take impulsive or hurtful behavior during episodes personally</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Don't enable destructive behaviors or make excuses for them</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Don't neglect your own mental health and well-being</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Communication Tips */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Communication Tips
          </h2>
          <div className="space-y-4 text-gray-600">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">During Manic Episodes</h3>
              <p>Speak calmly and avoid arguing. Gently redirect if needed. Remove access to credit cards or car keys if judgment is impaired.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">During Depressive Episodes</h3>
              <p>Offer reassurance and avoid toxic positivity. Help with basic tasks without being patronizing. Encourage professional help if needed.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">During Stable Periods</h3>
              <p>Discuss early warning signs together. Create an action plan for future episodes. Maintain open, honest communication.</p>
            </div>
          </div>
        </div>

        {/* Warning Signs Section */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="h-8 w-8 text-amber-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Recognizing Warning Signs
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Signs of Mania/Hypomania:</h3>
                  <p>Decreased sleep, racing thoughts, increased spending, risky behavior, grandiose plans, irritability</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Signs of Depression:</h3>
                  <p>Social withdrawal, loss of interest in activities, changes in appetite/sleep, difficulty concentrating, expressions of hopelessness</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Crisis Warning Signs:</h3>
                  <p>Talk of suicide, giving away possessions, extreme mood changes, disconnection from reality, complete inability to function</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Resources */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <PhoneIcon className="h-8 w-8 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Crisis Resources
              </h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <h3 className="font-semibold">If your loved one is in immediate danger:</h3>
                  <p className="text-lg font-bold text-red-600">Call 911</p>
                </div>
                <div>
                  <h3 className="font-semibold">988 Suicide & Crisis Lifeline:</h3>
                  <p className="text-lg font-bold">Call or text 988</p>
                  <p className="text-sm">24/7, free and confidential support</p>
                </div>
                <div>
                  <h3 className="font-semibold">Crisis Text Line:</h3>
                  <p className="text-lg font-bold">Text HOME to 741741</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Taking Care of Yourself */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Taking Care of Yourself
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Supporting someone with bipolar disorder can be emotionally exhausting. Your own mental health matters too.
            </p>
            <ul className="space-y-2">
              <li>Set healthy boundaries and stick to them</li>
              <li>Seek support from friends, family, or support groups</li>
              <li>Consider therapy for yourself</li>
              <li>Take breaks when needed</li>
              <li>Practice self-care regularly</li>
              <li>Educate yourself but don't become consumed by it</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}