'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  DocumentTextIcon,
  ArrowLeftIcon,
  PrinterIcon,
  DocumentArrowDownIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

interface JournalEntry {
  templateName: string
  date: string
  responses: Record<string, string>
}

const journalTemplates = [
  {
    id: 'daily-checkin',
    name: 'Daily Check-in',
    description: 'Quick daily reflection to track patterns and mood shifts',
    color: 'blue',
    prompts: [
      'How would you rate your overall mood today (1-10)?',
      'What emotions did you experience most strongly?',
      'How many hours did you sleep last night?',
      'What activities brought you joy or satisfaction?',
      'What challenges did you face today?',
      'What are you grateful for today?',
      'What do you want to focus on tomorrow?'
    ]
  },
  {
    id: 'episode-reflection',
    name: 'Episode Reflection',
    description: 'Process and learn from manic or depressive episodes',
    color: 'purple',
    prompts: [
      'What type of episode did you experience (manic, hypomanic, depressive, mixed)?',
      'What early warning signs did you notice?',
      'What triggered this episode (if identifiable)?',
      'How did this episode affect your daily life?',
      'What coping strategies did you try? Which ones helped?',
      'What would you do differently next time?',
      'Who in your support network was helpful during this time?',
      'What did you learn about yourself from this experience?'
    ]
  },
  {
    id: 'therapy-prep',
    name: 'Therapy Preparation',
    description: 'Organize thoughts and goals before therapy sessions',
    color: 'green',
    prompts: [
      'What has happened since your last session?',
      'What challenges are you currently facing?',
      'What victories or progress do you want to share?',
      'What specific topics do you want to discuss?',
      'Are there any new symptoms or concerns?',
      'How are your medications working?',
      'What questions do you have for your therapist?',
      'What goals do you want to work on?'
    ]
  },
  {
    id: 'trigger-analysis',
    name: 'Trigger Analysis',
    description: 'Identify and understand your personal triggers',
    color: 'red',
    prompts: [
      'What situation, event, or stressor occurred?',
      'How did you feel physically in your body?',
      'What emotions came up immediately?',
      'What thoughts went through your mind?',
      'How did you respond or react?',
      'Have you encountered this trigger before?',
      'What patterns do you notice with this trigger?',
      'What coping strategies could help with this trigger in the future?'
    ]
  },
  {
    id: 'gratitude-strengths',
    name: 'Gratitude & Strengths',
    description: 'Focus on positive aspects and personal strengths',
    color: 'yellow',
    prompts: [
      'What are three things you are grateful for today?',
      'What personal strength did you use today?',
      'What compliment would you give yourself?',
      'What challenge have you overcome recently?',
      'Who are the people who support you?',
      'What progress have you made in managing your bipolar disorder?',
      'What brings meaning to your life?',
      'What are you looking forward to?'
    ]
  }
]

export default function JournalPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof journalTemplates[0] | null>(null)
  const [responses, setResponses] = useState<Record<string, string>>({})

  const handleSave = () => {
    if (!selectedTemplate) return

    const entry: JournalEntry = {
      templateName: selectedTemplate.name,
      date: new Date().toISOString(),
      responses
    }

    // Save to localStorage
    const existingEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]')
    existingEntries.push(entry)
    localStorage.setItem('journal-entries', JSON.stringify(existingEntries))

    alert('Journal entry saved!')
    setResponses({})
    setSelectedTemplate(null)
  }

  const handlePrint = () => {
    window.print()
  }

  const exportTemplate = (template: typeof journalTemplates[0]) => {
    const content = `${template.name}\n\nDate: ___________\n\n${
      template.prompts.map((prompt, index) => 
        `${index + 1}. ${prompt}\n\n\n\n`
      ).join('')
    }`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.id}-template.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (selectedTemplate) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Templates
            </button>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PrinterIcon className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>

          {/* Journal Form */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h1>
              <p className="text-gray-600 mt-1">{selectedTemplate.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-6">
              {selectedTemplate.prompts.map((prompt, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {index + 1}. {prompt}
                  </label>
                  <textarea
                    value={responses[index] || ''}
                    onChange={(e) => setResponses(prev => ({ ...prev, [index]: e.target.value }))}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                    placeholder="Take your time to reflect and write your thoughts..."
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Save Entry
              </button>
              <button
                onClick={() => {
                  setResponses({})
                  setSelectedTemplate(null)
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Journal Templates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guided journaling prompts designed specifically for managing bipolar disorder. 
              Reflect, process experiences, and track patterns with structured writing.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {journalTemplates.map((template) => (
            <TemplateCard 
              key={template.id}
              template={template}
              onSelect={() => setSelectedTemplate(template)}
              onExport={() => exportTemplate(template)}
            />
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Benefits of Journaling for Bipolar Disorder
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <DocumentTextIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Process Episodes</h3>
              <p className="text-gray-600 text-sm">
                Understand and learn from manic and depressive episodes through guided reflection.
              </p>
            </div>
            
            <div className="text-center">
              <QuestionMarkCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Identify Triggers</h3>
              <p className="text-gray-600 text-sm">
                Recognize patterns and triggers that may contribute to mood episodes.
              </p>
            </div>
            
            <div className="text-center">
              <HeartIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Improve Therapy</h3>
              <p className="text-gray-600 text-sm">
                Prepare for therapy sessions and communicate more effectively with providers.
              </p>
            </div>

            <div className="text-center">
              <ExclamationTriangleIcon className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">
                Monitor your growth and celebrate victories in managing your condition.
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Journaling Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <ul className="space-y-2">
              <li>• Write without judgment - there are no wrong answers</li>
              <li>• Be honest about your thoughts and feelings</li>
              <li>• Don't worry about grammar or spelling</li>
              <li>• Take breaks if you feel overwhelmed</li>
            </ul>
            <ul className="space-y-2">
              <li>• Review past entries to identify patterns</li>
              <li>• Share insights with your healthcare team</li>
              <li>• Set aside regular time for journaling</li>
              <li>• Use templates as starting points, not rigid rules</li>
            </ul>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-green-800 text-sm">
            <strong>Privacy:</strong> All journal entries are stored locally on your device. 
            You can export templates as text files to write by hand or save digitally. 
            Your personal reflections remain completely private.
          </p>
        </div>

        {/* Crisis Notice */}
        <div className="mt-4 bg-red-50 rounded-lg p-4 border border-red-200">
          <p className="text-red-800 text-sm">
            <strong>Important:</strong> If journaling brings up thoughts of self-harm or crisis, 
            please stop and reach out for support immediately. Visit our{' '}
            <Link href="/crisis-resources" className="underline font-semibold">
              crisis resources page
            </Link>{' '}
            or call 988 for the Crisis Lifeline.
          </p>
        </div>
      </div>
    </div>
  )
}

function TemplateCard({ 
  template, 
  onSelect, 
  onExport 
}: { 
  template: typeof journalTemplates[0]
  onSelect: () => void
  onExport: () => void
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600', 
    green: 'bg-green-50 border-green-200 text-green-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600'
  }

  return (
    <div className={`${colorClasses[template.color as keyof typeof colorClasses] || colorClasses.blue} border rounded-xl p-6 transition-all hover:shadow-md`}>
      <div className="mb-4">
        <DocumentTextIcon className="h-8 w-8 mb-3" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {template.name}
        </h3>
        <p className="text-gray-700 text-sm mb-4">
          {template.description}
        </p>
        <p className="text-xs text-gray-600">
          {template.prompts.length} guided prompts
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSelect}
          className="flex-1 bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg font-semibold border border-gray-200 transition-colors text-sm"
        >
          Start Writing
        </button>
        <button
          onClick={onExport}
          className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg border border-gray-200 transition-colors"
          title="Export as text file"
        >
          <DocumentArrowDownIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}