'use client'

import Link from 'next/link'
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'
import { use } from 'react'

// Mock data - in production this would come from your database
const stories = {
  '1': {
    id: 1,
    title: "From Passenger to Driver: Taking Control After Psychosis",
    content: `
I used to describe manic episodes as being a passenger in my own body - watching myself do things I couldn't control, but remembering everything afterward. The worst part wasn't even the episode itself; it was the shame that followed.

## The Episode That Changed Everything

Three years ago, during my most severe manic episode, I truly believed I was receiving messages from the universe. I quit my job via email at 3 AM, convinced I was meant to start a revolutionary nonprofit. I emptied my savings account and drove across three states to "fulfill my destiny."

My family found me in a hotel room, surrounded by notebooks filled with incomprehensible plans to "save humanity." I was hospitalized for two weeks.

## The Passenger Experience

That's when I first used the phrase that resonated with so many others in our community. I felt like a passenger in my own body - aware of what was happening, but unable to stop the train. I watched myself make these decisions, said things I didn't mean, and hurt people I loved.

The hardest part was that everyone expected me to "just get better" after medication. They didn't understand that recovery isn't linear, and that I was dealing with both the medical aspects and the emotional trauma of feeling like I'd lost control of my own mind.

## Learning to Recognize the Warning Signs

Recovery started when I began tracking my patterns with obsessive detail:
- Sleep patterns (less than 6 hours for 3+ nights = red flag)
- Speech pace (family learned to notice when I talked faster)
- Decision-making impulses (wanting to make big changes suddenly)
- Energy levels that felt "wired" rather than naturally high

## From Passenger to Driver

The turning point came when my therapist helped me reframe the passenger metaphor. Instead of being a helpless passenger, I could learn to be a more aware one - someone who notices when the driver (my brain chemistry) is getting reckless, and who has tools to help navigate.

Now I have:
- **Early intervention plans** with my psychiatrist for medication adjustments
- **A support network** trained to recognize my warning signs
- **Grounding techniques** that help when I feel disconnected from my decisions
- **Financial safeguards** (trusted family member has access to accounts during episodes)

## What I Want Others to Know

You're not broken. You're not weak. That passenger feeling? It's real, and it's valid. But with the right support, medication, and self-awareness tools, you can move from the passenger seat to being a more informed co-pilot of your own life.

Recovery doesn't mean episodes never happen. It means having a better navigation system when they do.

---

*If you're experiencing thoughts of self-harm or suicide, please reach out immediately. Call 988 for the Suicide & Crisis Lifeline.*
    `,
    author: "Sarah M.",
    category: 'episodes',
    publishedDate: '2024-03-15',
    readTime: '8 min read',
    tags: ['psychosis', 'recovery', 'early-warning-signs', 'family-support']
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function StoryPage({ params }: PageProps) {
  const { id } = use(params)
  const story = stories[id as keyof typeof stories]
  
  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
          <Link href="/stories" className="text-blue-600 hover:text-blue-700">
            ← Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  const categoryLabels = {
    episodes: 'Episode Experiences',
    cognitive: 'Cognitive Challenges',
    relationships: 'Relationships & Family', 
    work: 'Career & Education',
    recovery: 'Recovery & Hope'
  }

  // Format content with proper paragraph breaks and headings
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        )
      } else if (paragraph.startsWith('- ')) {
        const listItems = paragraph.split('\n- ').filter(item => item.trim())
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-gray-800">
            {listItems.map((item, i) => (
              <li key={i}>{item.replace(/^- /, '')}</li>
            ))}
          </ul>
        )
      } else if (paragraph.startsWith('---')) {
        return <hr key={index} className="my-8 border-gray-300" />
      } else if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
        return (
          <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <p className="text-yellow-800 text-sm italic">
              {paragraph.replace(/^\*/, '').replace(/\*$/, '')}
            </p>
          </div>
        )
      } else if (paragraph.trim()) {
        return (
          <p key={index} className="text-gray-800 leading-relaxed mb-6">
            {paragraph.trim()}
          </p>
        )
      }
      return null
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/stories" className="text-blue-600 hover:text-blue-700">
              Stories
            </Link>
            <span className="text-gray-500">›</span>
            <Link 
              href={`/stories/category/${story.category}`}
              className="text-blue-600 hover:text-blue-700"
            >
              {categoryLabels[story.category as keyof typeof categoryLabels]}
            </Link>
            <span className="text-gray-500">›</span>
            <span className="text-gray-700 truncate">{story.title}</span>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Story Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                {categoryLabels[story.category as keyof typeof categoryLabels]}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{story.title}</h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span>By {story.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>{new Date(story.publishedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>{story.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <TagIcon className="h-4 w-4 text-gray-500" />
              {story.tags.map(tag => (
                <span 
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none">
            {formatContent(story.content)}
          </div>
        </div>

        {/* Related Stories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Stories Like This</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              href="/stories/2"
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all"
            >
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                Cognitive Challenges
              </div>
              <h3 className="font-bold text-gray-900 mb-2">My Brain Came Back: Recovering from Medication-Induced Fog</h3>
              <p className="text-gray-600 text-sm">Three years of cognitive dulling almost cost me my career...</p>
            </Link>
            
            <Link 
              href="/stories/3"
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all"
            >
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                Relationships & Family
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Rebuilding Trust: How My Marriage Survived Bipolar</h3>
              <p className="text-gray-600 text-sm">After my diagnosis nearly destroyed our relationship...</p>
            </Link>
          </div>
        </div>

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
      </article>
    </div>
  )
}