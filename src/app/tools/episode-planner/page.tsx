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
              onAdd={(item: string) => addItem('warningSignsDepression', item)}
              onRemove={(index: number) => removeItem('warningSignsDepression', index)}
            />

            {/* Mania Warning Signs */}
            <EditSection
              title="Mania Warning Signs" 
              items={editingPlan.warningSignsMania || []}
              placeholder="e.g., Sleeping very little, racing thoughts, increased spending"
              onAdd={(item: string) => addItem('warningSignsMania', item)}
              onRemove={(index: number) => removeItem('warningSignsMania', index)}
            />

            {/* Coping Strategies */}
            <EditSection
              title="Coping Strategies"
              items={editingPlan.copingStrategies || []}
              placeholder="e.g., Deep breathing, calling a friend, going for a walk"
              onAdd={(item: string) => addItem('copingStrategies', item)}
              onRemove={(index: number) => removeItem('copingStrategies', index)}
            />

            {/* Safe Environment */}
            <EditSection
              title="Creating a Safe Environment"
              items={editingPlan.safeEnvironment || []}
              placeholder="e.g., Remove sharp objects, ask someone to manage finances"
              onAdd={(item: string) => addItem('safeEnvironment', item)}
              onRemove={(index: number) => removeItem('safeEnvironment', index)}
            />

            {/* Support Contacts */}
            <ContactSection
              title="Support Contacts (Family & Friends)"
              contacts={editingPlan.supportContacts || []}
              onAdd={(contact: any) => addItem('supportContacts', contact)}
              onRemove={(index: number) => removeItem('supportContacts', index)}
            />

            {/* Professional Contacts */}
            <ContactSection
              title="Professional Contacts"
              contacts={editingPlan.professionalContacts || []}
              onAdd={(contact: any) => addItem('professionalContacts', contact)}
              onRemove={(index: number) => removeItem('professionalContacts', index)}
              isProfile={true}
            />

            {/* Medications */}
            <MedicationSection
              medications={editingPlan.medications || []}
              onAdd={(medication: { name: string; dosage: string; instructions: string }) => addItem('medications', medication)}
              onRemove={(index: number) => removeItem('medications', index)}
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

            <div className="space-y-6">
              {/* Depression Warning Signs */}
              <PlanSection
                title="Depression Warning Signs"
                icon={<ExclamationTriangleIcon className="h-5 w-5" />}
                items={safetyPlan.warningSignsDepression}
                color="red"
              />

              {/* Mania Warning Signs */}
              <PlanSection
                title="Mania Warning Signs"
                icon={<ExclamationTriangleIcon className="h-5 w-5" />}
                items={safetyPlan.warningSignsMania}
                color="yellow"
              />

              {/* Coping Strategies */}
              <PlanSection
                title="Coping Strategies"
                icon={<HeartIcon className="h-5 w-5" />}
                items={safetyPlan.copingStrategies}
                color="green"
              />

              {/* Safe Environment */}
              <PlanSection
                title="Creating a Safe Environment"
                icon={<ShieldCheckIcon className="h-5 w-5" />}
                items={safetyPlan.safeEnvironment}
                color="blue"
              />

              {/* Support Contacts */}
              <ContactDisplaySection
                title="Support Contacts"
                icon={<UserGroupIcon className="h-5 w-5" />}
                contacts={safetyPlan.supportContacts}
                isProfile={false}
              />

              {/* Professional Contacts */}
              <ContactDisplaySection
                title="Professional Contacts"
                icon={<PhoneIcon className="h-5 w-5" />}
                contacts={safetyPlan.professionalContacts}
                isProfile={true}
              />

              {/* Medications */}
              <MedicationDisplaySection
                title="Medications"
                medications={safetyPlan.medications}
              />

              {/* Hospital Preferences */}
              {safetyPlan.hospitalPreferences && (
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                    Hospital Preferences
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{safetyPlan.hospitalPreferences}</p>
                </div>
              )}

              {/* Additional Notes */}
              {safetyPlan.additionalNotes && (
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <DocumentTextIcon className="h-5 w-5 text-gray-600" />
                    Additional Notes
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{safetyPlan.additionalNotes}</p>
                </div>
              )}

              {/* Crisis Resources */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  Crisis Resources
                </h3>
                <div className="space-y-2 text-red-800">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4" />
                    <span><strong>988</strong> - Suicide & Crisis Lifeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4" />
                    <span><strong>911</strong> - Emergency Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span><strong>Crisis Text Line</strong> - Text HOME to 741741</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Component for editing simple string arrays
function EditSection({ 
  title, 
  items, 
  placeholder, 
  onAdd, 
  onRemove 
}: { 
  title: string
  items: string[]
  placeholder: string
  onAdd: (item: string) => void
  onRemove: (index: number) => void
}) {
  const [newItem, setNewItem] = useState('')

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem.trim())
      setNewItem('')
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
          title="Add item"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-700">{item}</span>
            <button
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-700 transition-colors"
              title="Remove item"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Component for editing contact arrays
function ContactSection({ 
  title, 
  contacts, 
  onAdd, 
  onRemove, 
  isProfile = false 
}: { 
  title: string
  contacts: Array<{ name: string; relationship?: string; role?: string; phone: string }>
  onAdd: (contact: { name: string; relationship: string; phone: string } | { name: string; role: string; phone: string }) => void
  onRemove: (index: number) => void
  isProfile?: boolean
}) {
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    role: '',
    phone: ''
  })

  const handleAdd = () => {
    if (newContact.name.trim() && newContact.phone.trim()) {
      if (isProfile) {
        if (newContact.role.trim()) {
          onAdd({
            name: newContact.name.trim(),
            role: newContact.role.trim(),
            phone: newContact.phone.trim()
          })
        }
      } else {
        if (newContact.relationship.trim()) {
          onAdd({
            name: newContact.name.trim(),
            relationship: newContact.relationship.trim(),
            phone: newContact.phone.trim()
          })
        }
      }
      setNewContact({ name: '', relationship: '', role: '', phone: '' })
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-3 mb-4">
        <input
          type="text"
          value={newContact.name}
          onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          value={isProfile ? newContact.role : newContact.relationship}
          onChange={(e) => setNewContact(prev => ({ 
            ...prev, 
            [isProfile ? 'role' : 'relationship']: e.target.value 
          }))}
          placeholder={isProfile ? "Role (e.g., Therapist, Psychiatrist)" : "Relationship (e.g., Sister, Best Friend)"}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="tel"
          value={newContact.phone}
          onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Add Contact
        </button>
      </div>

      <div className="space-y-2">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{contact.name}</div>
              <div className="text-sm text-gray-600">
                {isProfile ? (contact as any).role : (contact as any).relationship} - {contact.phone}
              </div>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-700 transition-colors"
              title="Remove contact"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Component for editing medication arrays
function MedicationSection({ 
  medications, 
  onAdd, 
  onRemove 
}: { 
  medications: Array<{ name: string; dosage: string; instructions: string }>
  onAdd: (medication: { name: string; dosage: string; instructions: string }) => void
  onRemove: (index: number) => void
}) {
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    instructions: ''
  })

  const handleAdd = () => {
    if (newMedication.name.trim() && newMedication.dosage.trim()) {
      onAdd({
        name: newMedication.name.trim(),
        dosage: newMedication.dosage.trim(),
        instructions: newMedication.instructions.trim()
      })
      setNewMedication({ name: '', dosage: '', instructions: '' })
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Medications</h3>
      
      <div className="space-y-3 mb-4">
        <input
          type="text"
          value={newMedication.name}
          onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Medication Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          value={newMedication.dosage}
          onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
          placeholder="Dosage (e.g., 100mg, 2 tablets)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          value={newMedication.instructions}
          onChange={(e) => setNewMedication(prev => ({ ...prev, instructions: e.target.value }))}
          placeholder="Instructions (e.g., Take with food, twice daily)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Add Medication
        </button>
      </div>

      <div className="space-y-2">
        {medications.map((medication, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{medication.name}</div>
              <div className="text-sm text-gray-600">
                {medication.dosage} - {medication.instructions}
              </div>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-700 transition-colors"
              title="Remove medication"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Component for displaying plan sections
function PlanSection({ 
  title, 
  icon, 
  items, 
  color 
}: { 
  title: string
  icon: React.ReactNode
  items: string[]
  color: 'red' | 'yellow' | 'green' | 'blue'
}) {
  const colorClasses = {
    red: 'border-red-200 bg-red-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    green: 'border-green-200 bg-green-50',
    blue: 'border-blue-200 bg-blue-50'
  }

  const iconColors = {
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    blue: 'text-blue-600'
  }

  if (items.length === 0) return null

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border ${colorClasses[color]}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className={iconColors[color]}>{icon}</span>
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <span className="text-gray-400 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Component for displaying contact sections
function ContactDisplaySection({ 
  title, 
  icon, 
  contacts, 
  isProfile 
}: { 
  title: string
  icon: React.ReactNode
  contacts: Array<{ name: string; relationship?: string; role?: string; phone: string }>
  isProfile: boolean
}) {
  if (contacts.length === 0) return null

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-blue-600">{icon}</span>
        {title}
      </h3>
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{contact.name}</div>
              <div className="text-sm text-gray-600">
                {isProfile ? (contact as any).role : (contact as any).relationship}
              </div>
            </div>
            <a 
              href={`tel:${contact.phone}`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {contact.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

// Component for displaying medication sections
function MedicationDisplaySection({ 
  title, 
  medications 
}: { 
  title: string
  medications: Array<{ name: string; dosage: string; instructions: string }>
}) {
  if (medications.length === 0) return null

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">💊</span>
        {title}
      </h3>
      <div className="space-y-3">
        {medications.map((medication, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">{medication.name}</div>
            <div className="text-sm text-gray-600">
              <strong>Dosage:</strong> {medication.dosage}
            </div>
            {medication.instructions && (
              <div className="text-sm text-gray-600">
                <strong>Instructions:</strong> {medication.instructions}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
