'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  ChartBarIcon, 
  HeartIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  PlusIcon,
  ArrowLeftIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useMoodTracker } from '@/hooks/useMoodTracker'

const moodOptions = [
  { value: -5, label: 'Severely Depressed', color: 'bg-red-900', description: 'Hopeless, can\'t function' },
  { value: -4, label: 'Very Depressed', color: 'bg-red-700', description: 'Extremely low, struggling' },
  { value: -3, label: 'Depressed', color: 'bg-red-500', description: 'Sad, unmotivated' },
  { value: -2, label: 'Low', color: 'bg-orange-500', description: 'Below normal, down' },
  { value: -1, label: 'Slightly Low', color: 'bg-orange-300', description: 'A bit down' },
  { value: 0, label: 'Neutral', color: 'bg-gray-400', description: 'Balanced, stable' },
  { value: 1, label: 'Slightly High', color: 'bg-yellow-400', description: 'A bit elevated' },
  { value: 2, label: 'Good', color: 'bg-green-400', description: 'Happy, motivated' },
  { value: 3, label: 'Very Good', color: 'bg-green-500', description: 'Great mood, energetic' },
  { value: 4, label: 'Elevated', color: 'bg-blue-500', description: 'Very energetic, talkative' },
  { value: 5, label: 'Manic', color: 'bg-purple-600', description: 'Extremely elevated, racing thoughts' }
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
  const { data: session, status } = useSession()
  const router = useRouter()
  const { entries, loading, error, saving, createEntry, deleteEntry } = useMoodTracker()
  
  const [currentEntry, setCurrentEntry] = useState({
    mood_score: 0,
    energy_level: 5,
    anxiety_level: 3,
    sleep_hours: 7,
    sleep_quality: 3,
    notes: '',
    activities: [] as string[],
    symptoms: [] as string[]
  })
  
  const [showingHistory, setShowingHistory] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login?callbackUrl=/tools/mood-tracker')
    return null
  }

  const handleSaveEntry = async () => {
    if (currentEntry.mood_score === undefined) return

    const success = await createEntry({
      ...currentEntry,
      entry_date: new Date().toISOString().split('T')[0],
      entry_time: new Date().toTimeString().split(' ')[0]
    })

    if (success) {
      // Reset form
      setCurrentEntry({
        mood_score: 0,
        energy_level: 5,
        anxiety_level: 3,
        sleep_hours: 7,
        sleep_quality: 3,
        notes: '',
        activities: [],
        symptoms: []
      })
      
      // Show success message
      setSuccessMessage('Mood entry saved successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const handleDeleteEntry = async (id: number) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      await deleteEntry(id)
    }
  }

  const toggleActivity = (activity: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }))
  }

  const toggleSymptom = (symptom: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const getMoodColor = (score: number) => {
    const mood = moodOptions.find(m => m.value === score)
    return mood?.color || 'bg-gray-400'
  }

  const getMoodLabel = (score: number) => {
    const mood = moodOptions.find(m => m.value === score)
    return mood?.label || 'Unknown'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/tools"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Tools
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <HeartIcon className="h-8 w-8 mr-3 text-purple-600" />
                Mood Tracker
              </h1>
              <p className="mt-2 text-gray-600">
                Track your daily mood, energy, and symptoms
              </p>
            </div>
            
            <button
              onClick={() => setShowingHistory(!showingHistory)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <ClockIcon className="h-5 w-5 mr-2" />
              {showingHistory ? 'New Entry' : 'View History'}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-center font-medium">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        {!showingHistory ? (
          /* NEW ENTRY FORM */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">How are you feeling today?</h2>
            
            {/* Mood Scale */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Overall Mood
              </label>
              <div className="space-y-2">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCurrentEntry(prev => ({ ...prev, mood_score: option.value }))}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      currentEntry.mood_score === option.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${option.color} mr-3`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                      {currentEntry.mood_score === option.value && (
                        <div className="text-purple-600 font-medium">Selected</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Level: {currentEntry.energy_level}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentEntry.energy_level}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, energy_level: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Very Low</span>
                <span>Very High</span>
              </div>
            </div>

            {/* Anxiety Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anxiety Level: {currentEntry.anxiety_level}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentEntry.anxiety_level}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, anxiety_level: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>None</span>
                <span>Severe</span>
              </div>
            </div>

            {/* Sleep */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours Slept
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={currentEntry.sleep_hours}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, sleep_hours: parseFloat(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep Quality (1-5)
                </label>
                <select
                  value={currentEntry.sleep_quality}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, sleep_quality: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={1}>1 - Very Poor</option>
                  <option value={2}>2 - Poor</option>
                  <option value={3}>3 - Fair</option>
                  <option value={4}>4 - Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
              </div>
            </div>

            {/* Activities */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Activities Today
              </label>
              <div className="flex flex-wrap gap-2">
                {commonActivities.map((activity) => (
                  <button
                    key={activity}
                    onClick={() => toggleActivity(activity)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      currentEntry.activities.includes(activity)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Symptoms Experienced
              </label>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      currentEntry.symptoms.includes(symptom)
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={currentEntry.notes}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                placeholder="Any additional thoughts, events, or observations..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveEntry}
              disabled={saving}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Save Mood Entry
                </>
              )}
            </button>
          </div>
        ) : (
          /* HISTORY VIEW */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Mood History</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading entries...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12">
                <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No mood entries yet. Start tracking today!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood_score)} mr-2`}></div>
                          <span className="font-medium text-gray-900">
                            {getMoodLabel(entry.mood_score)}
                          </span>
                          <span className="text-gray-400 mx-2">•</span>
                          <span className="text-sm text-gray-500">
                            {new Date(entry.entry_date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Energy:</span>
                            <span className="ml-1 font-medium">{entry.energy_level}/10</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Anxiety:</span>
                            <span className="ml-1 font-medium">{entry.anxiety_level}/10</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Sleep:</span>
                            <span className="ml-1 font-medium">{entry.sleep_hours}h</span>
                          </div>
                        </div>

                        {entry.activities && entry.activities.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs text-gray-500 block mb-1">Activities:</span>
                            <div className="flex flex-wrap gap-1">
                              {entry.activities.map((activity, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {entry.symptoms && entry.symptoms.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs text-gray-500 block mb-1">Symptoms:</span>
                            <div className="flex flex-wrap gap-1">
                              {entry.symptoms.map((symptom, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">"{entry.notes}"</p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="ml-4 text-red-600 hover:text-red-700 p-2"
                        title="Delete entry"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-purple-50 rounded-lg p-6 border border-purple-100">
          <h3 className="font-semibold text-purple-900 mb-2">💡 Tips for Tracking</h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Track at the same time each day for consistency</li>
            <li>• Be honest about your mood - this data is private and helps you identify patterns</li>
            <li>• Note any major life events or changes in your notes</li>
            <li>• Share your mood charts with your therapist or psychiatrist</li>
          </ul>
        </div>
      </div>
    </div>
  )
}