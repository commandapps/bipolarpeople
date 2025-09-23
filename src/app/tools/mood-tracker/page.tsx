'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ChartBarIcon, 
  CalendarDaysIcon, 
  MoonIcon, 
  SunIcon,
  HeartIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  PlusIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface MoodEntry {
  id: string
  date: string
  mood: number
  energy: number
  anxiety: number
  sleep: number
  notes: string
  activities: string[]
  symptoms: string[]
}

const moodOptions = [
  { value: 1, label: 'Very Low', color: 'bg-red-600', description: 'Severe depression, hopeless' },
  { value: 2, label: 'Low', color: 'bg-red-400', description: 'Depressed, sad' },
  { value: 3, label: 'Slightly Low', color: 'bg-orange-400', description: 'Below normal, down' },
  { value: 4, label: 'Neutral', color: 'bg-gray-400', description: 'Balanced, stable' },
  { value: 5, label: 'Slightly High', color: 'bg-yellow-400', description: 'Above normal, good' },
  { value: 6, label: 'High', color: 'bg-green-400', description: 'Elevated, very good' },
  { value: 7, label: 'Very High', color: 'bg-blue-500', description: 'Manic, extremely elevated' }
]

const commonActivities = [
  'Work/School', 'Exercise', 'Social Time', 'Therapy', 'Meditation', 
  'Creative Activity', 'Outdoor Time', 'Self-Care', 'Chores', 'Rest'
]

const commonSymptoms = [
  'Racing thoughts', 'Brain fog', 'Irritability', 'Anxiety', 'Fatigue',
  'Sleep disturbance', 'Appetite changes', 'Concentration issues', 'Mood swings'
]

export default function MoodTrackerPage() {
  const [currentEntry, setCurrentEntry] = useState<Partial<MoodEntry>>({
    mood: 4,
    energy: 4,
    anxiety: 3,
    sleep: 7,
    notes: '',
    activities: [],
    symptoms: []
  })
  
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [showingHistory, setShowingHistory] = useState(false)

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bipolar-mood-entries')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('bipolar-mood-entries', JSON.stringify(entries))
  }, [entries])

  const handleSaveEntry = () => {
    if (currentEntry.mood === undefined) return

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: currentEntry.mood,
      energy: currentEntry.energy || 4,
      anxiety: currentEntry.anxiety || 3,
      sleep: currentEntry.sleep || 7,
      notes: currentEntry.notes || '',
      activities: currentEntry.activities || [],
      symptoms: currentEntry.symptoms || []
    }

    setEntries(prev => [newEntry, ...prev])
    
    // Reset form
    setCurrentEntry({
      mood: 4,
      energy: 4,
      anxiety: 3,
      sleep: 7,
      notes: '',
      activities: [],
      symptoms: []
    })

    alert('Mood entry saved!')
  }

  const toggleActivity = (activity: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      activities: prev.activities?.includes(activity) 
        ? prev.activities.filter(a => a !== activity)
        : [...(prev.activities || []), activity]
    }))
  }

  const toggleSymptom = (symptom: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      symptoms: prev.symptoms?.includes(symptom) 
        ? prev.symptoms.filter(s => s !== symptom)
        : [...(prev.symptoms || []), symptom]
    }))
  }

  const exportData = () => {
    const dataStr = JSON.stringify(entries, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `mood-tracker-data-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (showingHistory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowingHistory(false)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Tracker
            </button>
            <button
              onClick={exportData}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              Export Data
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mood History</h1>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No mood entries yet</p>
              <p className="text-gray-500">Start tracking to see your patterns over time</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${moodOptions[entry.mood - 1]?.color}`}></div>
                      <span className="text-sm text-gray-600">
                        {moodOptions[entry.mood - 1]?.label}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Mood</span>
                      <div className="text-lg font-bold text-gray-900">{entry.mood}/7</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Energy</span>
                      <div className="text-lg font-bold text-gray-900">{entry.energy}/7</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Anxiety</span>
                      <div className="text-lg font-bold text-gray-900">{entry.anxiety}/7</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Sleep (hrs)</span>
                      <div className="text-lg font-bold text-gray-900">{entry.sleep}h</div>
                    </div>
                  </div>

                  {entry.activities.length > 0 && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700 block mb-2">Activities</span>
                      <div className="flex flex-wrap gap-2">
                        {entry.activities.map((activity) => (
                          <span key={activity} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.symptoms.length > 0 && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700 block mb-2">Symptoms</span>
                      <div className="flex flex-wrap gap-2">
                        {entry.symptoms.map((symptom) => (
                          <span key={symptom} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.notes && (
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Notes</span>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{entry.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Daily Mood Tracker</h1>
              <p className="text-gray-600 mt-1">Track your mood, energy, and patterns over time</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowingHistory(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <ChartBarIcon className="h-5 w-5" />
                View History
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Today's Entry Form */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Check-in</h2>

          {/* Mood Scale */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              How is your mood today?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCurrentEntry(prev => ({ ...prev, mood: option.value }))}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    currentEntry.mood === option.value
                      ? 'border-gray-800 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${option.color} mx-auto mb-2`}></div>
                  <div className="font-semibold text-sm">{option.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Energy Level (1-7)
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={currentEntry.energy || 4}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, energy: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Very Low</span>
                <span className="font-semibold">{currentEntry.energy || 4}</span>
                <span>Very High</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Anxiety Level (1-7)
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={currentEntry.anxiety || 3}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, anxiety: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Very Low</span>
                <span className="font-semibold">{currentEntry.anxiety || 3}</span>
                <span>Very High</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Hours Slept
              </label>
              <input
                type="range"
                min="0"
                max="14"
                value={currentEntry.sleep || 7}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, sleep: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0h</span>
                <span className="font-semibold">{currentEntry.sleep || 7}h</span>
                <span>14h</span>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Activities Today
            </label>
            <div className="flex flex-wrap gap-2">
              {commonActivities.map((activity) => (
                <button
                  key={activity}
                  onClick={() => toggleActivity(activity)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentEntry.activities?.includes(activity)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Symptoms (if any)
            </label>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentEntry.symptoms?.includes(symptom)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Additional Notes (optional)
            </label>
            <textarea
              value={currentEntry.notes || ''}
              onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="How are you feeling? Any significant events or thoughts today?"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveEntry}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            <PlusIcon className="h-6 w-6" />
            Save Today's Entry
          </button>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <HeartIcon className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-blue-900 mb-2">Why Track Your Mood?</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Identify patterns and triggers</li>
              <li>• Share valuable data with your healthcare team</li>
              <li>• Track medication effectiveness</li>
              <li>• Recognize early warning signs</li>
              <li>• Build self-awareness and coping strategies</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <ClockIcon className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-green-900 mb-2">Privacy & Data</h3>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• All data stored locally on your device</li>
              <li>• Nothing shared without your permission</li>
              <li>• Export feature for healthcare providers</li>
              <li>• Delete entries anytime</li>
              <li>• No account required</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Important:</strong> This mood tracker is for personal monitoring only and is not a substitute 
            for professional medical advice. If you're experiencing crisis symptoms, please contact the 
            <Link href="/crisis-resources" className="text-yellow-900 underline font-semibold ml-1">
              crisis resources
            </Link> immediately.
          </p>
        </div>
      </div>
    </div>
  )
}