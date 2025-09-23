'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HeartIcon,
  PlusIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentArrowDownIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  timeOfDay: string[]
  prescribedBy: string
  startDate: string
  notes: string
}

interface MedicationEntry {
  id: string
  medicationId: string
  date: string
  time: string
  taken: boolean
  sideEffects: string[]
  effectiveness: number
  notes: string
}

const commonSideEffects = [
  'Drowsiness', 'Nausea', 'Dizziness', 'Headache', 'Weight gain', 
  'Weight loss', 'Dry mouth', 'Tremor', 'Blurred vision', 'Fatigue',
  'Insomnia', 'Anxiety', 'Constipation', 'Diarrhea', 'Memory issues'
]

export default function MedicationTrackerPage() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [entries, setEntries] = useState<MedicationEntry[]>([])
  const [showAddMed, setShowAddMed] = useState(false)
  const [newMed, setNewMed] = useState<Partial<Medication>>({})
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    const savedMeds = localStorage.getItem('bipolar-medications')
    const savedEntries = localStorage.getItem('bipolar-medication-entries')
    
    if (savedMeds) setMedications(JSON.parse(savedMeds))
    if (savedEntries) setEntries(JSON.parse(savedEntries))
  }, [])

  useEffect(() => {
    localStorage.setItem('bipolar-medications', JSON.stringify(medications))
  }, [medications])

  useEffect(() => {
    localStorage.setItem('bipolar-medication-entries', JSON.stringify(entries))
  }, [entries])

  const addMedication = () => {
    if (!newMed.name || !newMed.dosage) return

    const medication: Medication = {
      id: Date.now().toString(),
      name: newMed.name || '',
      dosage: newMed.dosage || '',
      frequency: newMed.frequency || 'Daily',
      timeOfDay: newMed.timeOfDay || ['Morning'],
      prescribedBy: newMed.prescribedBy || '',
      startDate: newMed.startDate || new Date().toISOString().split('T')[0],
      notes: newMed.notes || ''
    }

    setMedications(prev => [...prev, medication])
    setNewMed({})
    setShowAddMed(false)
  }

  const logMedication = (medicationId: string, taken: boolean, sideEffects: string[] = [], effectiveness: number = 5, notes: string = '') => {
    const entry: MedicationEntry = {
      id: Date.now().toString(),
      medicationId,
      date: selectedDate,
      time: new Date().toTimeString().split(' ')[0],
      taken,
      sideEffects,
      effectiveness,
      notes
    }

    setEntries(prev => [...prev, entry])
  }

  const getTodaysEntries = () => {
    return entries.filter(entry => entry.date === selectedDate)
  }

  const getMedicationEntry = (medicationId: string) => {
    return getTodaysEntries().find(entry => entry.medicationId === medicationId)
  }

  const exportData = () => {
    const data = {
      medications,
      entries: entries.filter(entry => {
        const entryDate = new Date(entry.date)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return entryDate >= thirtyDaysAgo
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

        {/* Medications List */}
        {medications.length === 0 ? (
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
            {medications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                entry={getMedicationEntry(medication.id)}
                onLog={(taken, sideEffects, effectiveness, notes) => 
                  logMedication(medication.id, taken, sideEffects, effectiveness, notes)
                }
                onDelete={() => setMedications(prev => prev.filter(m => m.id !== medication.id))}
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
                    value={newMed.name || ''}
                    onChange={(e) => setNewMed(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Lithium, Lamictal, Abilify"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    value={newMed.dosage || ''}
                    onChange={(e) => setNewMed(prev => ({ ...prev, dosage: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 300mg, 25mg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={newMed.frequency || 'Daily'}
                    onChange={(e) => setNewMed(prev => ({ ...prev, frequency: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Prescribed By
                  </label>
                  <input
                    type="text"
                    value={newMed.prescribedBy || ''}
                    onChange={(e) => setNewMed(prev => ({ ...prev, prescribedBy: e.target.value }))}
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
                    value={newMed.startDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewMed(prev => ({ ...prev, startDate: e.target.value }))}
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
                  onClick={addMedication}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                  Add Medication
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
  entry, 
  onLog, 
  onDelete 
}: {
  medication: Medication
  entry?: MedicationEntry
  onLog: (taken: boolean, sideEffects: string[], effectiveness: number, notes: string) => void
  onDelete: () => void
}) {
  const [showLogModal, setShowLogModal] = useState(false)
  const [logData, setLogData] = useState({
    taken: true,
    sideEffects: [] as string[],
    effectiveness: 5,
    notes: ''
  })

  const handleLog = () => {
    onLog(logData.taken, logData.sideEffects, logData.effectiveness, logData.notes)
    setShowLogModal(false)
    setLogData({ taken: true, sideEffects: [], effectiveness: 5, notes: '' })
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
            <h3 className="text-lg font-bold text-gray-900">{medication.name}</h3>
            <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
            {medication.prescribedBy && (
              <p className="text-sm text-gray-500">Prescribed by: {medication.prescribedBy}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {entry ? (
              <div className="flex items-center gap-2">
                {entry.taken ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-600" />
                )}
                <span className="text-sm text-gray-600">
                  {entry.taken ? 'Taken' : 'Missed'} at {entry.time}
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

        {entry && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Today's Log:</span>
              <span className="text-sm text-gray-600">Effectiveness: {entry.effectiveness}/10</span>
            </div>
            {entry.sideEffects.length > 0 && (
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Side Effects: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {entry.sideEffects.map(effect => (
                    <span key={effect} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {entry.notes && (
              <p className="text-sm text-gray-600 italic">"{entry.notes}"</p>
            )}
          </div>
        )}

        <button
          onClick={() => setShowLogModal(true)}
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${
            entry 
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {entry ? 'Update Log' : 'Log Medication'}
        </button>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Log {medication.name}
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
                      Effectiveness (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={logData.effectiveness}
                      onChange={(e) => setLogData(prev => ({ ...prev, effectiveness: Number(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Not effective</span>
                      <span className="font-semibold">{logData.effectiveness}</span>
                      <span>Very effective</span>
                    </div>
                  </div>

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