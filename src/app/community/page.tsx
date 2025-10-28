// app/community/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { LockClosedIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function CommunityPage() {
  const { data: session, status } = useSession()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              You're Among <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Friends</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with people who truly understand your experience. Share, learn, and find support in a safe, moderated community.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-blue-900">Safe Space Promise</h3>
            </div>
            <p className="text-blue-800 text-sm mb-3">
              Our community is actively moderated by mental health professionals and trained peer supporters. 
              Anonymous participation is always welcome.
            </p>
            {session && (
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <UserGroupIcon className="w-4 h-4" />
                <span>Welcome back, {session.user?.name || 'Member'}!</span>
              </div>
            )}
            {!session && (
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <LockClosedIcon className="w-4 h-4" />
                <span>Private, Members-Only Community</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Community Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Discussion Forums */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Discussion Forums
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Join ongoing conversations about episodes, medications, relationships, and daily life with bipolar.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Daily Check-ins</span>
                  <span className="text-purple-600 font-medium">42 active</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Medication Experiences</span>
                  <span className="text-purple-600 font-medium">28 active</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Episode Support</span>
                  <span className="text-purple-600 font-medium">15 active</span>
                </div>
              </div>
              
              {status === 'loading' ? (
                <div className="w-full bg-gray-300 text-gray-500 text-center py-3 rounded-lg font-semibold">
                  Loading...
                </div>
              ) : session ? (
                <a 
                  href="https://bipolarpeople.discourse.group/session/sso" 
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Enter Forum
                </a>
              ) : (
                <Link 
                  href="/login?returnUrl=/community"
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Login to Access Forum
                </Link>
              )}
            </div>

            {/* Support Groups */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  Support Groups
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Join structured peer support groups led by trained facilitators. Meet regularly with the same group.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-green-800 text-sm">Next Session</div>
                  <div className="text-green-600 text-sm">Tuesday, 7 PM EST</div>
                  <div className="text-green-600 text-sm">Young Adults (18-30)</div>
                </div>
                <div className="text-sm text-gray-600">
                  • Weekly groups by age and life stage<br/>
                  • Anonymous participation welcome<br/>
                  • Professional facilitation
                </div>
              </div>
              
              {status === 'loading' ? (
                <div className="w-full bg-gray-300 text-gray-500 text-center py-3 rounded-lg font-semibold">
                  Loading...
                </div>
              ) : session ? (
                <a 
                  href="https://bipolarpeople.discourse.group/session/sso" 
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Find Your Group
                </a>
              ) : (
                <Link 
                  href="/login?returnUrl=/community"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Login to Access Groups
                </Link>
              )}
            </div>

            {/* Peer Support */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Peer Mentorship
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect one-on-one with someone who's been where you are. Give or receive support from experienced community members.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Matched by experience & interests</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Private messaging available</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Both giving & receiving support</span>
                </div>
              </div>
              
              {status === 'loading' ? (
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-300 text-gray-500 text-center py-3 rounded-lg font-semibold text-sm">
                    Loading...
                  </div>
                  <div className="flex-1 bg-gray-100 text-gray-400 text-center py-3 rounded-lg font-semibold text-sm">
                    Loading...
                  </div>
                </div>
              ) : session ? (
                <div className="flex gap-2">
                  <a 
                    href="https://bipolarpeople.discourse.group/session/sso" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors text-sm"
                  >
                    Find Mentor
                  </a>
                  <a 
                    href="https://bipolarpeople.discourse.group/session/sso" 
                    className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-center py-3 rounded-lg font-semibold transition-colors text-sm"
                  >
                    Be Mentor
                  </a>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link 
                    href="/login?returnUrl=/community"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors text-sm"
                  >
                    Find Mentor
                  </Link>
                  <Link 
                    href="/login?returnUrl=/community"
                    className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-center py-3 rounded-lg font-semibold transition-colors text-sm"
                  >
                    Be Mentor
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Community Standards</h2>
            <p className="text-lg text-gray-600 mb-8">
              We maintain a safe, supportive environment through clear guidelines and active moderation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Protected</h3>
                <p className="text-sm text-gray-600">Anonymous posting options and strict privacy policies</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Actively Moderated</h3>
                <p className="text-sm text-gray-600">Mental health professionals and trained peers monitor discussions</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Peer Support Focus</h3>
                <p className="text-sm text-gray-600">Validation and understanding, not medical advice</p>
              </div>
            </div>
            
            <a href="/community/guidelines" className="text-blue-600 hover:text-blue-800 font-medium">
              Read Full Community Guidelines →
            </a>
          </div>
        </div>
      </section>

      {/* Crisis Resources Integration */}
      <section className="bg-red-50 border-l-4 border-red-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">In Crisis? Get Immediate Help</h3>
              <p className="text-red-700">Our community is for peer support. If you're in crisis, please contact professional services.</p>
            </div>
            <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4 md:flex">
              <a href="tel:988" className="block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center">
                Call 988
              </a>
              <a href="/crisis-resources" className="block border border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg font-semibold transition-colors text-center">
                More Resources
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}