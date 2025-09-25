// app/community/guidelines/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Guidelines - Bipolar People',
  description: 'Our community standards for maintaining a safe, supportive environment.',
}

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Guidelines</h1>
          <p className="text-lg text-gray-600">
            Creating a safe, supportive environment for everyone
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-3">Our Promise to You</h2>
            <p className="text-blue-800 mb-0">
              This community exists to provide peer support, validation, and connection. 
              We are committed to maintaining a space where you can share your experiences 
              safely and receive understanding from others who truly get it.
            </p>
          </div>

          <h2>Core Principles</h2>
          
          <h3>1. Peer Support, Not Medical Advice</h3>
          <ul>
            <li>Share your personal experiences and what has worked for you</li>
            <li>Never provide medical advice or suggest changes to medication</li>
            <li>Always encourage professional medical consultation</li>
            <li>Respect that everyone's journey is different</li>
          </ul>

          <h3>2. Privacy and Anonymity</h3>
          <ul>
            <li>You can participate anonymously or use pseudonyms</li>
            <li>Never share someone else's personal information</li>
            <li>What's shared here, stays here</li>
            <li>Respect others' privacy choices</li>
          </ul>

          <h3>3. Respectful Communication</h3>
          <ul>
            <li>Be kind and compassionate - everyone is fighting a battle</li>
            <li>No judgment about symptoms, medications, or coping strategies</li>
            <li>Avoid stigmatizing language about mental health</li>
            <li>Disagree respectfully when views differ</li>
          </ul>

          <h3>4. Safety First</h3>
          <ul>
            <li>If you're in crisis, please contact emergency services or call 988</li>
            <li>Report concerning posts to moderators immediately</li>
            <li>No detailed discussion of self-harm methods</li>
            <li>Focus on hope and recovery, not just struggles</li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-bold text-yellow-900 mb-3">Crisis Support</h3>
            <p className="text-yellow-800">
              If you or someone in our community is in immediate danger, please:
            </p>
            <ul className="text-yellow-800 mt-2">
              <li>Call 911 for emergencies</li>
              <li>Call 988 (Suicide & Crisis Lifeline)</li>
              <li>Report the situation to our moderation team</li>
            </ul>
          </div>

          <h2>Moderation</h2>
          <p>
            Our community is actively moderated by mental health professionals and 
            trained peer supporters. We review posts and comments to ensure they 
            align with our guidelines and maintain a supportive environment.
          </p>

          <h3>What We Remove</h3>
          <ul>
            <li>Medical advice or medication recommendations</li>
            <li>Detailed self-harm or suicide methods</li>
            <li>Personal attacks or harassment</li>
            <li>Spam or promotional content</li>
            <li>Content that violates privacy</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Questions?</h3>
            <p className="text-gray-700">
              If you have questions about these guidelines or need to report something, 
              please contact our moderation team at{' '}
              <a href="mailto:community@bipolarpeople.com" className="text-blue-600">
                community@bipolarpeople.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}