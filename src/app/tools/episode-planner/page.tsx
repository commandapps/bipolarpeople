'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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
import { useEpisodePlans } from '@/hooks/useEpisodePlans'

const episodeTypes = [
  { value: 'manic', label: 'Manic Episode', color: 'bg-yellow-100 border-yellow-300', icon: '⚡' },
  { value: 'depressive', label: 'Depressive Episode', color: 'bg-blue-100 border-blue-300', icon: '🌧️' },
  { value: 'mixed', label: 'Mixed Episode', color: 'bg-purple-100 border-purple-300', icon: '🌀' },
  { value: 'maintenance', label: 'Maintenance Plan', color: 'bg-green-100 border-green-300', icon: '🛡️' }
]

export default function EpisodePlannerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { plans, loading, error, saving, createPlan, updatePlan, deletePlan } = useEpisodePlans()
  
  const [isCreating, setIsCreating] = useState(false)
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<'manic' | 'depressive' | 'mixed' | 'maintenance'>('manic')
  const [planData, setPlanData] = useState({
    plan_name: '',
    episode_type: 'manic' as 'manic' | 'depressive' | 'mixed' | 'maintenance',
    warning_signs: [] as string[],
    triggers: [] as string[],
    coping_strategies: [] as string[],
    helpful_activities: [] as string[],
    things_to_avoid: [] as string[],
    emergency_contacts: [] as Array<{ name: string; relationship: string; phone: string }>,
    support_people: [] as string[],
    therapy_plan: '',
    medication_plan: '',
    current_medications: [] as string[],
    emergency_medications: '',
    therapist_name: '',
    therapist_phone: '',
    psychiatrist_name: '',
    psychiatrist_phone: '',
    hospital_preference: '',
    additional_notes: ''
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/tools/episode-planner')
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

  const resetForm = () => {
    setPlanData({
      plan_name: '',
      episode_type: 'manic',
      warning_signs: [],
      triggers: [],
      coping_strategies: [],
      helpful_activities: [],
      things_to_avoid: [],
      emergency_contacts: [],
      support_people: [],
      therapy_plan: '',
      medication_plan: '',
      current_medications: [],
      emergency_medications: '',
      therapist_name: '',
      therapist_phone: '',
      psychiatrist_name: '',
      psychiatrist_phone: '',
      hospital_preference: '',
      additional_notes: ''
    })
    setIsCreating(false)
    setEditingPlanId(null)
  }

  const startCreating = (type: 'manic' | 'depressive' | 'mixed' | 'maintenance') => {
    resetForm()
    setPlanData(prev => ({ ...prev, episode_type: type }))
    setIsCreating(true)
  }

  const startEditing = (plan: any) => {
    setPlanData({
      plan_name: plan.plan_name || '',
      episode_type: plan.episode_type,
      warning_signs: plan.warning_signs || [],
      triggers: plan.triggers || [],
      coping_strategies: plan.coping_strategies || [],
      helpful_activities: plan.helpful_activities || [],
      things_to_avoid: plan.things_to_avoid || [],
      emergency_contacts: plan.emergency_contacts || [],
      support_people: plan.support_people || [],
      therapy_plan: plan.therapy_plan || '',
      medication_plan: plan.medication_plan || '',
      current_medications: plan.current_medications || [],
      emergency_medications: plan.emergency_medications || '',
      therapist_name: plan.therapist_name || '',
      therapist_phone: plan.therapist_phone || '',
      psychiatrist_name: plan.psychiatrist_name || '',
      psychiatrist_phone: plan.psychiatrist_phone || '',
      hospital_preference: plan.hospital_preference || '',
      additional_notes: plan.additional_notes || ''
    })
    setEditingPlanId(plan.id)
    setIsCreating(true)
  }

  const handleSave = async () => {
    if (!planData.plan_name) {
      alert('Please enter a plan name')
      return
    }

    let success
    if (editingPlanId) {
      success = await updatePlan(editingPlanId, planData)
    } else {
      success = await createPlan(planData)
    }

    if (success) {
      resetForm()
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      await deletePlan(id)
    }
  }

  const addArrayItem = (field: string, item: string) => {
    setPlanData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), item]
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setPlanData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  const addContact = (contact: { name: string; relationship: string; phone: string }) => {
    setPlanData(prev => ({
      ...prev,
      emergency_contacts: [...prev.emergency_contacts, contact]
    }))
  }

  const removeContact = (index: number) => {
    setPlanData(prev => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts.filter((_, i) => i !== index)
    }))
  }

  const getPlansByType = (type: string) => {
    return plans.filter(plan => plan.episode_type === type && plan.is_active)
  }

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {editingPlanId ? 'Edit' : 'Create'} {episodeTypes.find(t => t.value === planData.episode_type)?.label}
              </h1>
              <p className="text-gray-600 mt-1">Prepare strategies and contacts for managing episodes</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-400"
              >
                {saving ? 'Saving...' : 'Save Plan'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Plan Name */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Plan Name *
              </label>
              <input
                type="text"
                value={planData.plan_name}
                onChange={(e) => setPlanData(prev => ({ ...prev, plan_name: e.target.value }))}
                placeholder={`e.g., My ${episodeTypes.find(t => t.value === planData.episode_type)?.label}`}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Warning Signs */}
            <EditSection
              title="Warning Signs"
              items={planData.warning_signs}
              placeholder="e.g., Sleeping less, more irritable, racing thoughts"
              onAdd={(item: string) => addArrayItem('warning_signs', item)}
              onRemove={(index: number) => removeArrayItem('warning_signs', index)}
            />

            {/* Triggers */}
            <EditSection
              title="Triggers"
              items={planData.triggers}
              placeholder="e.g., Lack of sleep, stress at work, family conflict"
              onAdd={(item: string) => addArrayItem('triggers', item)}
              onRemove={(index: number) => removeArrayItem('triggers', index)}
            />

            {/* Coping Strategies */}
            <EditSection
              title="Coping Strategies"
              items={planData.coping_strategies}
              placeholder="e.g., Deep breathing, meditation, calling therapist"
              onAdd={(item: string) => addArrayItem('coping_strategies', item)}
              onRemove={(index: number) => removeArrayItem('coping_strategies', index)}
            />

            {/* Helpful Activities */}
            <EditSection
              title="Helpful Activities"
              items={planData.helpful_activities}
              placeholder="e.g., Walking, journaling, listening to music"
              onAdd={(item: string) => addArrayItem('helpful_activities', item)}
              onRemove={(index: number) => removeArrayItem('helpful_activities', index)}
            />

            {/* Things to Avoid */}
            <EditSection
              title="Things to Avoid"
              items={planData.things_to_avoid}
              placeholder="e.g., Alcohol, caffeine after 6pm, making big decisions"
              onAdd={(item: string) => addArrayItem('things_to_avoid', item)}
              onRemove={(index: number) => removeArrayItem('things_to_avoid', index)}
            />

            {/* Emergency Contacts */}
            <ContactSection
              title="Emergency Contacts"
              contacts={planData.emergency_contacts}
              onAdd={addContact}
              onRemove={removeContact}
            />

            {/* Professional Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Contacts</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Therapist Name</label>
                  <input
                    type="text"
                    value={planData.therapist_name}
                    onChange={(e) => setPlanData(prev => ({ ...prev, therapist_name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Therapist Phone</label>
                  <input
                    type="tel"
                    value={planData.therapist_phone}
                    onChange={(e) => setPlanData(prev => ({ ...prev, therapist_phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Psychiatrist Name</label>
                  <input
                    type="text"
                    value={planData.psychiatrist_name}
                    onChange={(e) => setPlanData(prev => ({ ...prev, psychiatrist_name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Psychiatrist Phone</label>
                  <input
                    type="tel"
                    value={planData.psychiatrist_phone}
                    onChange={(e) => setPlanData(prev => ({ ...prev, psychiatrist_phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Hospital Preferences */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Preferences</h3>
              <textarea
                value={planData.hospital_preference}
                onChange={(e) => setPlanData(prev => ({ ...prev, hospital_preference: e.target.value }))}
                placeholder="Preferred hospital, insurance information, any specific medical needs..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            {/* Additional Notes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
              <textarea
                value={planData.additional_notes}
                onChange={(e) => setPlanData(prev => ({ ...prev, additional_notes: e.target.value }))}
                placeholder="Any other important information..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={3}
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
              Episode Planner
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create episode-specific plans to help manage manic, depressive, and mixed episodes effectively.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading plans...</p>
          </div>
        ) : (
          <>
            {/* Episode Type Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {episodeTypes.map((type) => {
                const typePlans = getPlansByType(type.value)
                return (
                  <div key={type.value} className={`rounded-xl p-6 border-2 ${type.color}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{type.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{type.label}</h3>
                          <p className="text-sm text-gray-600">{typePlans.length} plan{typePlans.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => startCreating(type.value as any)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {typePlans.length > 0 && (
                      <div className="space-y-2">
                        {typePlans.map((plan) => (
                          <div key={plan.id} className="bg-white rounded-lg p-3 flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{plan.plan_name}</p>
                              <p className="text-xs text-gray-500">
                                Updated {new Date(plan.updated_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEditing(plan)}
                                className="text-blue-600 hover:text-blue-700 p-1"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(plan.id)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Why Create Episode Plans?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                <ul className="space-y-1">
                  <li>• Identify early warning signs</li>
                  <li>• Plan coping strategies in advance</li>
                  <li>• Have emergency contacts ready</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Share plans with support network</li>
                  <li>• Reduce episode severity</li>
                  <li>• Feel more in control</li>
                </ul>
              </div>
            </div>

            {/* Crisis Resources */}
            <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
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
          </>
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
  onRemove
}: { 
  title: string
  contacts: Array<{ name: string; relationship: string; phone: string }>
  onAdd: (contact: { name: string; relationship: string; phone: string }) => void
  onRemove: (index: number) => void
}) {
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  })

  const handleAdd = () => {
    if (newContact.name.trim() && newContact.relationship.trim() && newContact.phone.trim()) {
      onAdd({
        name: newContact.name.trim(),
        relationship: newContact.relationship.trim(),
        phone: newContact.phone.trim()
      })
      setNewContact({ name: '', relationship: '', phone: '' })
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
          value={newContact.relationship}
          onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
          placeholder="Relationship (e.g., Sister, Best Friend)"
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
                {contact.relationship} - {contact.phone}
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
