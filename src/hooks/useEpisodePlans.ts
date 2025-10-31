import { useState, useEffect } from 'react'

interface EpisodePlan {
  id: number
  user_id: string
  episode_type: 'manic' | 'depressive' | 'mixed' | 'maintenance'
  plan_name: string
  warning_signs?: string[]
  triggers?: string[]
  coping_strategies?: string[]
  helpful_activities?: string[]
  things_to_avoid?: string[]
  emergency_contacts?: any[]
  support_people?: string[]
  therapy_plan?: string
  medication_plan?: string
  current_medications?: string[]
  emergency_medications?: string
  therapist_name?: string
  therapist_phone?: string
  psychiatrist_name?: string
  psychiatrist_phone?: string
  hospital_preference?: string
  additional_notes?: string
  last_reviewed_date?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface CreateEpisodePlanData {
  episode_type: 'manic' | 'depressive' | 'mixed' | 'maintenance'
  plan_name: string
  warning_signs?: string[]
  triggers?: string[]
  coping_strategies?: string[]
  helpful_activities?: string[]
  things_to_avoid?: string[]
  emergency_contacts?: any[]
  support_people?: string[]
  therapy_plan?: string
  medication_plan?: string
  current_medications?: string[]
  emergency_medications?: string
  therapist_name?: string
  therapist_phone?: string
  psychiatrist_name?: string
  psychiatrist_phone?: string
  hospital_preference?: string
  additional_notes?: string
  is_active?: boolean
}

export function useEpisodePlans() {
  const [plans, setPlans] = useState<EpisodePlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async (type?: string, activeOnly = false) => {
    try {
      setLoading(true)
      setError(null)
      
      let url = '/api/episodes/plans?'
      if (type) url += `type=${type}&`
      if (activeOnly) url += 'activeOnly=true'
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch episode plans')
      }
      
      const data = await response.json()
      setPlans(data.plans || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load plans')
      console.error('Fetch episode plans error:', err)
    } finally {
      setLoading(false)
    }
  }

  const createPlan = async (planData: CreateEpisodePlanData): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      const response = await fetch('/api/episodes/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create episode plan')
      }
      
      const data = await response.json()
      setPlans(prev => [data.plan, ...prev])
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create plan')
      console.error('Create episode plan error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }

  const updatePlan = async (id: number, updates: Partial<CreateEpisodePlanData>): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      const response = await fetch('/api/episodes/plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update episode plan')
      }
      
      const data = await response.json()
      setPlans(prev => prev.map(plan => plan.id === id ? data.plan : plan))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update plan')
      console.error('Update episode plan error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }

  const deletePlan = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/episodes/plans?id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete episode plan')
      }
      
      setPlans(prev => prev.filter(plan => plan.id !== id))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete plan')
      console.error('Delete episode plan error:', err)
      return false
    }
  }

  return {
    plans,
    loading,
    error,
    saving,
    createPlan,
    updatePlan,
    deletePlan,
    refetch: fetchPlans
  }
}