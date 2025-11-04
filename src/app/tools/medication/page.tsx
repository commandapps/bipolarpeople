'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  HeartIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentArrowDownIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useMedications } from '@/hooks/useMedications'

const commonSideEffects = [
  'Drowsiness', 'Nausea', 'Dizziness', 'Headache', 'Weight gain', 
  'Weight loss', 'Dry mouth', 'Tremor', 'Blurred vision', 'Fatigue',
  'Insomnia', 'Anxiety', 'Constipation', 'Diarrhea', 'Memory issues'
]

export default function MedicationTrackerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { medications, logs, loading, error, saving, createMedication, logMedication, deleteMedication } = useMedications()
  
  const [showAddMed, setShowAddMed] = useState(false)
  const [newMed, setNewMed] = useState({
    medication_name: '',
    dosage: '',
    dosage_unit: '',
    frequency: '',
    time_of_day: [] as string[],
    prescribed_for: '',
    prescriber_name: '',
    started_date: new Date().toISOString().split('T')[0],
    notes: ''
  })
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/tools/medication')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const handleAddMedication = async () => {
    if (!newMed.medication_name) return

    const success = await createMedication({
      medication_name: newMed.medication_name,
      dosage: newMed.dosage || undefined,
      dosage_unit: newMed.dosage_unit || undefined,
      frequency: newMed.frequency || undefined,
      time_of_day: newMed.time_of_day.length > 0 ? newMed.time_of_day : undefined,
      prescribed_for: newMed.prescribed_for || undefined,
      prescriber_name: newMed.prescriber_name || undefined,
      started_date: newMed.started_date,
      notes: newMed.notes || undefined
    })

    if (success) {
      setNewMed({
        medication_name: '',
        dosage: '',
        dosage_unit: '',
        frequency: '',
        time_of_day: [],
        prescribed_for: '',
        prescriber_name: '',
        started_date: new Date().toISOString().split('T')[0],
        notes: ''
      })
      setShowAddMed(false)
    }
  }

  const handleLogMedication = async (medicationId: number, taken: boolean, sideEffects: string[] = [], moodBefore?: number, moodAfter?: number, notes?: string) => {
    await logMedication({
      medication_id: medicationId,
      taken_at: new Date().toISOString(),
      taken,
      side_effects_experienced: sideEffects.join(', ') || undefined,
      mood_before: moodBefore,
      mood_after: moodAfter,
      notes: notes || undefined
    })
  }

  const getTodaysLogs = () => {
    const selectedDateStr = new Date(selectedDate).toISOString().split('T')[0]
    return logs.filter(log => {
      const logDate = new Date(log.taken_at).toISOString().split('T')[0]
      return logDate === selectedDateStr
    })
  }

  const getMedicationLog = (medicationId: number) => {
    return getTodaysLogs().find(log => log.medication_id === medicationId)
  }

  const exportData = () => {
    const data = {
      medications,
      logs: logs.filter(log => {
        const logDate = new Date(log.taken_at)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return logDate >= thirtyDaysAgo
      })
    }

    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `medication-tracker-${selectedDate}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Filter to show only active medications by default
  const activeMedications = medications.filter(m => m.active)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Medication Tracker
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track medication adherence, side effects, and effectiveness to help optimize 
              your bipolar disorder treatment with your healthcare team.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Date Selector and Export */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-700">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportData}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
              Export Data
            </button>
            <button
              onClick={() => setShowAddMed(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <PlusIcon className="h-4 w-4" />
              Add Medication
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        {/* Medications List */}
        {loading ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading medications...</p>
          </div>
        ) : activeMedications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              No medications added yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start by adding your medications to track adherence and side effects.
            </p>
            <button
              onClick={() => setShowAddMed(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Add Your First Medication
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeMedications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                log={getMedicationLog(medication.id)}
                onLog={(taken, sideEffects, moodBefore, moodAfter, notes) => 
                  handleLogMedication(medication.id, taken, sideEffects, moodBefore, moodAfter, notes)
                }
                onDelete={() => deleteMedication(medication.id)}
                saving={saving}
              />
            ))}
          </div>
        )}

        {/* Add Medication Modal */}
        {showAddMed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Add Medication</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Medication Name *
                  </label>
                  <input
                    type="text"
                    value={newMed.medication_name}
                    onChange={(e) => setNewMed(prev => ({ ...prev, medication_name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Lithium, Lamictal, Abilify"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed(prev => ({ ...prev, dosage: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 300, 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Dosage Unit
                  </label>
                  <input
                    type="text"
                    value={newMed.dosage_unit}
                    onChange={(e) => setNewMed(prev => ({ ...prev, dosage_unit: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., mg, ml"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Frequency
                  </label>
                  <input
                    type="text"
                    value={newMed.frequency}
                    onChange={(e) => setNewMed(prev => ({ ...prev, frequency: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Daily, Twice daily, As needed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Prescriber Name
                  </label>
                  <input
                    type="text"
                    value={newMed.prescriber_name}
                    onChange={(e) => setNewMed(prev => ({ ...prev, prescriber_name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doctor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newMed.started_date}
                    onChange={(e) => setNewMed(prev => ({ ...prev, started_date: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddMed(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMedication}
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {saving ? 'Adding...' : 'Add Medication'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-12 space-y-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Why Track Medications?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <ul className="space-y-1">
                <li>• Monitor medication effectiveness</li>
                <li>• Track side effects and patterns</li>
                <li>• Ensure consistent adherence</li>
              </ul>
              <ul className="space-y-1">
                <li>• Share data with healthcare providers</li>
                <li>• Identify optimal dosing times</li>
                <li>• Support treatment decisions</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800 mb-1">Important Safety Reminders</h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Never stop or change medications without consulting your doctor</li>
                  <li>• Report severe side effects to your healthcare provider immediately</li>
                  <li>• This tracker is for monitoring only, not medical advice</li>
                  <li>• In crisis situations, contact emergency services or call 988</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MedicationCard({ 
  medication, 
  log, 
  onLog, 
  onDelete,
  saving = false
}: {
  medication: { id: number; medication_name: string; dosage?: string; dosage_unit?: string; frequency?: string; prescriber_name?: string }
  log?: { id: number; taken: boolean; taken_at: string; side_effects_experienced?: string; notes?: string }
  onLog: (taken: boolean, sideEffects: string[], moodBefore?: number, moodAfter?: number, notes?: string) => void
  onDelete: () => void
  saving?: boolean
}) {
  const [showLogModal, setShowLogModal] = useState(false)
  const [logData, setLogData] = useState({
    taken: true,
    sideEffects: [] as string[],
    moodBefore: undefined as number | undefined,
    moodAfter: undefined as number | undefined,
    notes: ''
  })

  const handleLog = () => {
    onLog(logData.taken, logData.sideEffects, logData.moodBefore, logData.moodAfter, logData.notes)
    setShowLogModal(false)
    setLogData({ taken: true, sideEffects: [], moodBefore: undefined, moodAfter: undefined, notes: '' })
  }

  const toggleSideEffect = (effect: string) => {
    setLogData(prev => ({
      ...prev,
      sideEffects: prev.sideEffects.includes(effect)
        ? prev.sideEffects.filter(e => e !== effect)
        : [...prev.sideEffects, effect]
    }))
  }

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{medication.medication_name}</h3>
            <p className="text-gray-600">
              {medication.dosage} {medication.dosage_unit || ''} - {medication.frequency || 'Not specified'}
            </p>
            {medication.prescriber_name && (
              <p className="text-sm text-gray-500">Prescribed by: {medication.prescriber_name}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {log ? (
              <div className="flex items-center gap-2">
                {log.taken ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-600" />
                )}
                <span className="text-sm text-gray-600">
                  {log.taken ? 'Taken' : 'Missed'} at {new Date(log.taken_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Not logged today</span>
            )}
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-600 p-1"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {log && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Today's Log:</span>
            </div>
            {log.side_effects_experienced && (
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Side Effects: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {log.side_effects_experienced.split(',').map((effect, idx) => (
                    <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      {effect.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {log.notes && (
              <p className="text-sm text-gray-600 italic">"{log.notes}"</p>
            )}
          </div>
        )}

        <button
          onClick={() => setShowLogModal(true)}
          disabled={saving}
          className={`w-full py-2 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${
            log 
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saving ? 'Saving...' : (log ? 'Update Log' : 'Log Medication')}
        </button>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Log {medication.medication_name}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Did you take this medication?
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setLogData(prev => ({ ...prev, taken: true }))}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      logData.taken 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Yes, Taken
                  </button>
                  <button
                    onClick={() => setLogData(prev => ({ ...prev, taken: false }))}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      !logData.taken 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    No, Missed
                  </button>
                </div>
              </div>

              {logData.taken && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Side Effects (if any)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {commonSideEffects.map(effect => (
                        <button
                          key={effect}
                          onClick={() => toggleSideEffect(effect)}
                          className={`p-2 text-sm rounded-lg transition-colors ${
                            logData.sideEffects.includes(effect)
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {effect}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={logData.notes}
                  onChange={(e) => setLogData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Any additional notes about this medication..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLog}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}