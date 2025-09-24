'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  ChartBarIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  HeartIcon,
  ClockIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  HandshakeIcon,
  BriefcaseIcon,
  ScaleIcon,
  MapPinIcon,
  UserIcon
} from '@heroicons/react/24/outline'

interface ResourceCard {
  id: string
  title: string
  description: string
  category: 'cognitive' | 'family' | 'daily' | 'work' | 'crisis'
  icon: React.ReactNode
  actions: Array<{
    label: string
    href: string
    type: 'primary' | 'secondary' | 'crisis'
  }>
}

const resourceCards: ResourceCard[] = [
  // Cognitive Support
  {
    id: 'memory-aids',
    title: 'Memory Aids & Reminders',
    description: 'Digital and physical tools to help with memory, medication reminders, and daily tasks during cognitive fog.',
    category: 'cognitive',
    icon: <LightBulbIcon className="h-8 w-8" />,
    actions: [
      { label: 'Get Started', href: '/tools/memory-aids', type: 'primary' },
      { label: 'Learn More', href: '/resources/memory-aids', type: 'secondary' }
    ]
  },
  {
    id: 'cognitive-exercises',
    title: 'Cognitive Exercises',
    description: 'Brain training activities and exercises designed to maintain cognitive function during depressive episodes.',
    category: 'cognitive',
    icon: <PuzzlePieceIcon className="h-8 w-8" />,
    actions: [
      { label: 'Start Training', href: '/tools/cognitive-exercises', type: 'primary' },
      { label: 'View Library', href: '/resources/cognitive-library', type: 'secondary' }
    ]
  },
  {
    id: 'decision-tools',
    title: 'Decision-Making Tools',
    description: 'Structured frameworks and checklists to support clear decision-making during episodes.',
    category: 'cognitive',
    icon: <ClipboardDocumentListIcon className="h-8 w-8" />,
    actions: [
      { label: 'Use Tools', href: '/tools/decision-making', type: 'primary' },
      { label: 'Download', href: '/resources/decision-framework', type: 'secondary' }
    ]
  },
  {
    id: 'focus-aids',
    title: 'Reading & Focus Aids',
    description: 'Tools to improve concentration and reading comprehension during cognitive challenges.',
    category: 'cognitive',
    icon: <BookOpenIcon className="h-8 w-8" />,
    actions: [
      { label: 'Try Now', href: '/tools/focus-aids', type: 'primary' },
      { label: 'Browse Tools', href: '/resources/focus-tools', type: 'secondary' }
    ]
  },

  // Family Resources
  {
    id: 'family-education',
    title: 'Family Education Guide',
    description: 'Comprehensive guide to help family members understand bipolar disorder, symptoms, and effective support strategies.',
    category: 'family',
    icon: <AcademicCapIcon className="h-8 w-8" />,
    actions: [
      { label: 'Read Guide', href: '/resources/family-education', type: 'primary' },
      { label: 'Download PDF', href: '/downloads/family-guide.pdf', type: 'secondary' }
    ]
  },
  {
    id: 'communication',
    title: 'Communication Strategies',
    description: 'Tools and techniques for effective communication during episodes and maintaining healthy relationships.',
    category: 'family',
    icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
    actions: [
      { label: 'Learn More', href: '/resources/communication', type: 'primary' },
      { label: 'Practice', href: '/tools/communication-practice', type: 'secondary' }
    ]
  },
  {
    id: 'support-groups',
    title: 'Support Group Directory',
    description: 'Find local and online support groups for families and loved ones of people with bipolar disorder.',
    category: 'family',
    icon: <UserGroupIcon className="h-8 w-8" />,
    actions: [
      { label: 'Find Groups', href: '/resources/support-groups', type: 'primary' },
      { label: 'Join Online', href: '/community', type: 'secondary' }
    ]
  },
  {
    id: 'family-crisis',
    title: 'Crisis Support for Families',
    description: 'Resources and emergency protocols for families during mental health crises.',
    category: 'family',
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    actions: [
      { label: 'Get Help', href: '/crisis-resources', type: 'primary' },
      { label: 'Crisis Plan', href: '/tools/crisis-plan', type: 'secondary' }
    ]
  },

  // Daily Management
  {
    id: 'mood-tracking',
    title: 'Mood Tracking Tools',
    description: 'Digital and printable tools to track mood patterns, triggers, and identify early warning signs.',
    category: 'daily',
    icon: <ChartBarIcon className="h-8 w-8" />,
    actions: [
      { label: 'Start Tracking', href: '/tools/mood-tracker', type: 'primary' },
      { label: 'Download', href: '/downloads/mood-tracker.pdf', type: 'secondary' }
    ]
  },
  {
    id: 'sleep-management',
    title: 'Sleep Management',
    description: 'Sleep tracking tools and strategies to maintain healthy sleep patterns and recognize sleep-related episode indicators.',
    category: 'daily',
    icon: <ClockIcon className="h-8 w-8" />,
    actions: [
      { label: 'Sleep Tools', href: '/tools/sleep-tracker', type: 'primary' },
      { label: 'Sleep Tracker', href: '/downloads/sleep-tracker.pdf', type: 'secondary' }
    ]
  },
  {
    id: 'medication-management',
    title: 'Medication Management',
    description: 'Tools for tracking medication adherence, side effects, and effectiveness over time.',
    category: 'daily',
    icon: <HeartIcon className="h-8 w-8" />,
    actions: [
      { label: 'Track Meds', href: '/tools/medication', type: 'primary' },
      { label: 'Med Log', href: '/downloads/medication-log.pdf', type: 'secondary' }
    ]
  },
  {
    id: 'daily-routine',
    title: 'Daily Routine Builder',
    description: 'Create and maintain healthy daily routines that support stability and well-being.',
    category: 'daily',
    icon: <CalendarDaysIcon className="h-8 w-8" />,
    actions: [
      { label: 'Build Routine', href: '/tools/routine-builder', type: 'primary' },
      { label: 'Templates', href: '/resources/routine-templates', type: 'secondary' }
    ]
  },

  // Work & Career
  {
    id: 'workplace-rights',
    title: 'Workplace Rights & Accommodations',
    description: 'Information about legal rights, reasonable accommodations, and how to advocate for workplace support.',
    category: 'work',
    icon: <ScaleIcon className="h-8 w-8" />,
    actions: [
      { label: 'Know Your Rights', href: '/resources/workplace-rights', type: 'primary' },
      { label: 'Guide', href: '/downloads/accommodation-guide.pdf', type: 'secondary' }
    ]
  },
  {
    id: 'disclosure-strategies',
    title: 'Disclosure Strategies',
    description: 'Guidance on when and how to disclose bipolar disorder to employers and colleagues.',
    category: 'work',
    icon: <HandshakeIcon className="h-8 w-8" />,
    actions: [
      { label: 'Learn More', href: '/resources/disclosure', type: 'primary' },
      { label: 'Practice', href: '/tools/disclosure-practice', type: 'secondary' }
    ]
  },
  {
    id: 'flexible-work',
    title: 'Flexible Work Arrangements',
    description: 'Explore remote work, flexible schedules, and other arrangements that support mental health.',
    category: 'work',
    icon: <BriefcaseIcon className="h-8 w-8" />,
    actions: [
      { label: 'Explore Options', href: '/resources/flexible-work', type: 'primary' },
      { label: 'Template', href: '/downloads/accommodation-request.pdf', type: 'secondary' }
    ]
  },
  {
    id: 'career-development',
    title: 'Career Development',
    description: 'Strategies for building a sustainable career while managing bipolar disorder effectively.',
    category: 'work',
    icon: <ChartBarIcon className="h-8 w-8" />,
    actions: [
      { label: 'Plan Career', href: '/resources/career-development', type: 'primary' },
      { label: 'Resources', href: '/resources/career-resources', type: 'secondary' }
    ]
  },

  // Crisis Support
  {
    id: 'crisis-hotlines',
    title: 'Crisis Hotlines',
    description: '24/7 crisis support numbers and text lines for immediate mental health assistance.',
    category: 'crisis',
    icon: <PhoneIcon className="h-8 w-8" />,
    actions: [
      { label: 'Call 988', href: 'tel:988', type: 'crisis' },
      { label: 'Text 741741', href: 'sms:741741&body=HOME', type: 'secondary' }
    ]
  },
  {
    id: 'emergency-services',
    title: 'Emergency Services Locator',
    description: 'Find nearby emergency rooms, crisis centers, and mental health facilities.',
    category: 'crisis',
    icon: <MapPinIcon className="h-8 w-8" />,
    actions: [
      { label: 'Find Services', href: '/crisis-resources', type: 'primary' },
      { label: 'Save Contacts', href: '/tools/emergency-contacts', type: 'secondary' }
    ]
  },
  {
    id: 'safety-planning',
    title: 'Safety Planning',
    description: 'Create a personalized safety plan with coping strategies and emergency contacts.',
    category: 'crisis',
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    actions: [
      { label: 'Create Plan', href: '/tools/episode-planner', type: 'primary' },
      { label: 'Template', href: '/downloads/safety-plan.pdf', type: 'secondary' }
    ]
  },
  {
    id: 'crisis-team',
    title: 'Crisis Team Contacts',
    description: 'Store and access your personal crisis team contacts including therapists and psychiatrists.',
    category: 'crisis',
    icon: <UserIcon className="h-8 w-8" />,
    actions: [
      { label: 'Manage Contacts', href: '/tools/crisis-contacts', type: 'primary' },
      { label: 'Add Contact', href: '/tools/crisis-contacts?action=add', type: 'secondary' }
    ]
  }
]

const categories = [
  { id: 'all', name: 'All', icon: <PlusIcon className="h-5 w-5" /> },
  { id: 'cognitive', name: 'Cognitive', icon: <LightBulbIcon className="h-5 w-5" /> },
  { id: 'family', name: 'Family', icon: <UserGroupIcon className="h-5 w-5" /> },
  { id: 'daily', name: 'Daily', icon: <CalendarDaysIcon className="h-5 w-5" /> },
  { id: 'work', name: 'Work', icon: <BriefcaseIcon className="h-5 w-5" /> },
  { id: 'crisis', name: 'Crisis', icon: <ExclamationTriangleIcon className="h-5 w-5" /> }
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredCards, setFilteredCards] = useState(resourceCards)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter and search logic
  useEffect(() => {
    let filtered = resourceCards

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(card => card.category === activeFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(card => 
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query)
      )
    }

    setFilteredCards(filtered)
  }, [searchQuery, activeFilter])

  // Load saved preferences
  useEffect(() => {
    const savedFilter = localStorage.getItem('bipolar-resources-filter')
    if (savedFilter && categories.some(cat => cat.id === savedFilter)) {
      setActiveFilter(savedFilter)
    }
  }, [])

  // Save filter preference
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    localStorage.setItem('bipolar-resources-filter', filterId)
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
    }
  }

  // Get button styles based on type
  const getButtonStyles = (type: 'primary' | 'secondary' | 'crisis') => {
    const baseStyles = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
    
    switch (type) {
      case 'primary':
        return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700`
      case 'secondary':
        return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300`
      case 'crisis':
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl`
      default:
        return baseStyles
    }
  }

  // Get category icon and color
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'cognitive':
        return { icon: <LightBulbIcon className="h-6 w-6" />, color: 'text-purple-600', bgColor: 'bg-purple-50' }
      case 'family':
        return { icon: <UserGroupIcon className="h-6 w-6" />, color: 'text-green-600', bgColor: 'bg-green-50' }
      case 'daily':
        return { icon: <CalendarDaysIcon className="h-6 w-6" />, color: 'text-blue-600', bgColor: 'bg-blue-50' }
      case 'work':
        return { icon: <BriefcaseIcon className="h-6 w-6" />, color: 'text-orange-600', bgColor: 'bg-orange-50' }
      case 'crisis':
        return { icon: <ExclamationTriangleIcon className="h-6 w-6" />, color: 'text-red-600', bgColor: 'bg-red-50' }
      default:
        return { icon: <PlusIcon className="h-6 w-6" />, color: 'text-gray-600', bgColor: 'bg-gray-50' }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bipolar Disorder Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evidence-based tools and support for managing bipolar disorder, based on community research and clinical best practices.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Find the Support You Need
            </h2>
            
            {/* Search Box */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search resources..."
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') clearSearch()
                }}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Clear search</span>
                  ×
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilterChange(category.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeFilter === category.id
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <PhoneIcon className="h-6 w-6" />
            <div className="text-center">
              <p className="text-lg font-semibold">
                In Crisis? Call 988 - Suicide & Crisis Lifeline
              </p>
              <p className="text-sm opacity-90">
                Available 24/7 • Free and Confidential
              </p>
            </div>
            <a
              href="tel:988"
              className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            {searchQuery ? `Found ${filteredCards.length} resources matching "${searchQuery}"` : 
             activeFilter === 'all' ? `Showing all ${filteredCards.length} resources` :
             `Showing ${filteredCards.length} ${categories.find(c => c.id === activeFilter)?.name.toLowerCase()} resources`}
          </p>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => {
            const categoryInfo = getCategoryInfo(card.category)
            return (
              <div
                key={card.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                {/* Category Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${categoryInfo.bgColor} ${categoryInfo.color}`}>
                  {categoryInfo.icon}
                  {categories.find(c => c.id === card.category)?.name}
                </div>

                {/* Card Icon */}
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 mb-4">
                  {card.icon}
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {card.description}
                </p>

                {/* Card Actions */}
                <div className="flex flex-col gap-2">
                  {card.actions.map((action, index) => (
                    <Link
                      key={index}
                      href={action.href}
                      className={getButtonStyles(action.type)}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filter selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('all')
                clearSearch()
              }}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/tools" className="hover:text-white transition-colors">Tools</Link></li>
                <li><Link href="/crisis-resources" className="hover:text-white transition-colors">Crisis Support</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Emergency</h3>
              <ul className="space-y-2">
                <li><a href="tel:988" className="hover:text-white transition-colors">988 Crisis Lifeline</a></li>
                <li><a href="tel:911" className="hover:text-white transition-colors">911 Emergency</a></li>
                <li><a href="sms:741741&body=HOME" className="hover:text-white transition-colors">Crisis Text Line</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><Link href="/community" className="hover:text-white transition-colors">Support Groups</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Online Forums</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Peer Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Bipolar People Community. All rights reserved.</p>
            <p className="text-sm mt-2 text-gray-400">
              This information is for educational purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
