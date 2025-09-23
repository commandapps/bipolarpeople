'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  CalendarDaysIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  UserGroupIcon,
  DocumentTextIcon,
  HeartIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

interface SafetyPlan {
  id: string
  lastUpdated: string
  warningSignsDepression: string[]
  warningSignsMania: string[]
  copingStrategies: string[]
  safeEnvironment: string[]
  supportContacts: Array<{
    name: string
    relationship: string
    phone: string
  }>
  professionalContacts: Array<{
    name: string
    role: string
    phone: string
  }>
  medications: Array<{
    name: string
    dosage: string
    instructions: string
  }>
  hospitalPreferences: string
  additionalNotes: string
}

const defaultSafetyPlan: Omit<SafetyPlan, 'id' | 'lastUpdated'> = {
  warningSignsDepression: [],
  warningSignsMania: [],
  copingStrategies: [],
  safeEnvironment: [],
  supportContacts: [],
  professionalContacts: [],
  medications: [],
  hospitalPreferences: '',
  additionalNotes: ''
}

export default function EpisodePlannerPage() {
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Partial<SafetyPlan>>(defaultSafetyPlan)

  useEffect(() => {
    const saved = localStorage.getItem('bipolar-safety-plan')
    if (saved) {
      setSafetyPlan(JSON.parse(saved))
    }
  }, [])

  const savePlan = () => {
    const newPlan: SafetyPlan = {
      id: safetyPlan?.id || Date.now().toString(),
      lastUpdated: new Date().toISOString(),
      ...editingPlan as Omit<SafetyPlan, 'id' | 'lastUpdated'>
    }

    setSafetyPlan(newPlan)
    localStorage.setItem('bipolar-safety-plan', JSON.stringify(newPlan))
    setIsEditing(false)
    alert('Safety plan saved!')
  }

  const startEditing = () => {
    setEditingPlan(safetyPlan || { ...defaultSafetyPlan })
    setIsEditing(true)
  }

  const addItem = (field: keyof SafetyPlan, item: any) => {
    setEditingPlan(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), item]
    }))
  }

  const removeItem = (field: keyof SafetyPlan, index: number) => {
    setEditingPlan(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index)
    }))
  }

  const exportPlan = () => {
    if (!safetyPlan) return
    
    const planText = `
BIPOLAR EPISODE SAFETY PLAN
Last Updated: ${new Date(safetyPlan.lastUpdated).toLocaleDateString()}

DEPRESSION WARNING SIGNS:
${safetyPlan.warningSignsDepression.map(sign => `• ${sign}`).join('\n')}

MANIA WARNING SIGNS:
${safetyPlan.warningSignsMania.map(sign => `• ${sign}`).join('\n')}

COPING STRATEGIES:
${safetyPlan.copingStrategies.map(strategy => `• ${strategy}`).join('\n')}

CREATING A SAFE ENVIRONMENT:
${safetyPlan.safeEnvironment.map(item => `• ${item}`).join('\n')}

SUPPORT CONTACTS:
${safetyPlan.supportContacts.map(contact => 
  `• ${contact.name} (${contact.relationship}) - ${contact.phone}`
).join('\n')}

PROFESSIONAL CONTACTS:
${safetyPlan.professionalContacts.map(contact => 
  `• ${contact.name} (${contact.role}) - ${contact.phone}`
).join('\n')}

MEDICATIONS:
${safetyPlan.medications.map(med => 
  `• ${med.name} - ${med.dosage} - ${med.instructions}`
).join('\n')}

HOSPITAL PREFERENCES:
${safetyPlan.hospitalPreferences}

ADDITIONAL NOTES:
${safetyPlan.additionalNotes}

CRISIS NUMBERS:
• 988 - Suicide & Crisis Lifeline
• 911 - Emergency Services
• Crisis Text Line - Text HOME to 741741
    `.trim()

    const blob = new Blob([planText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bipolar-safety-plan-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Safety Plan</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePlan}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save Plan
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Depression Warning Signs */}
            <EditSection
              title="Depression Warning Signs"
              items={editingPlan.warningSignsDepression || []}
              placeholder="e.g., Sleeping too much, loss of appetite, withdrawing from friends"
              onAdd={(item) => addItem('warningSignsDepression', item)}
              onRemove={(index) => removeItem('warningSignsDepression', index)}
            />

            {/* Mania Warning Signs */}
            <EditSection
              title="Mania Warning Signs" 
              items={editingPlan.warningSignsMania || []}
              placeholder="e.g., Sleeping very little, racing thoughts, increased spending"
              onAdd={(item) => addItem('warningSignsMania', item)}
              onRemove={(index) => removeItem('warningSignsMania', index)}
            />

            {/* Coping Strategies */}
            <EditSection
              title="Coping Strategies"
              items={editingPlan.copingStrategies || []}
              placeholder="e.g., Deep breathing, calling a friend, going for a walk"
              onAdd={(item) => addItem('copingStrategies', item)}
              onRemove={(index) => removeItem('copingStrategies', index)}
            />

            {/* Safe Environment */}
            <EditSection
              title="Creating a Safe Environment"
              items={editingPlan.safeEnvironment || []}
              placeholder="e.g., Remove sharp objects, ask someone to manage finances"
              onAdd={(item) => addItem('safeEnvironment', item)}
              onRemove={(index) => removeItem('safeEnvironment', index)}
            />

            {/* Support Contacts */}
            <ContactSection
              title="Support Contacts (Family & Friends)"
              contacts={editingPlan.supportContacts || []}
              onAdd={(contact) => addItem('supportContacts', contact)}
              onRemove={(index) => removeItem('supportContacts', index)}
            />

            {/* Professional Contacts */}
            <ContactSection
              title="Professional Contacts"
              contacts={editingPlan.professionalContacts || []}
              onAdd={(contact) => addItem('professionalContacts', contact)}
              onRemove={(index) => removeItem('professionalContacts', index)}
              isProfile={true}
            />

            {/* Medications */}
            <MedicationSection
              medications={editingPlan.medications || []}
              onAdd={(medication) => addItem('medications', medication)}
              onRemove={(index) => removeItem('medications', index)}
            />

            {/* Hospital Preferences */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hospital Preferences
              </h3>
              <textarea
                value={editingPlan.hospitalPreferences || ''}
                onChange={(e) => setEditingPlan(prev => ({ ...prev, hospitalPreferences: e.target.value }))}
                placeholder="Preferred hospital, insurance information, any specific medical needs or preferences..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>

            {/* Additional Notes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Notes
              </h3>
              <textarea
                value={editingPlan.additionalNotes || ''}
                onChange={(e) => setEditingPlan(prev => ({ ...prev, additionalNotes: e.target.value }))}
                placeholder="Any other important information for during a crisis..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
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
              Episode Safety Planner
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create a comprehensive safety plan to help you and your support network 
              manage bipolar episodes effectively and safely.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!safetyPlan ? (
          /* No Plan Yet */
          <div className="text-center py-16">
            <CalendarDaysIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Create Your Safety Plan
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              A safety plan is a personalized strategy that helps you stay safe during 
              bipolar episodes. It includes warning signs, coping strategies, and emergency contacts.
            </p>
            <button
              onClick={startEditing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              <PlusIcon className="h-5 w-5" />
              Create Safety Plan
            </button>
          </div>
        ) : (
          /* Display Existing Plan */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Safety Plan</h2>
                <p className="text-gray-600">
                  Last updated: {new Date(safetyPlan.lastUpdated).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={exportPlan}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <DocumentTextIcon className="h-4 w-4" />
                  Export
                </button>
                <button
                  onClick={startEditing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit Plan
                </button>
              </div>
            </div>

            <div className="space-y-4">