import { useState, useEffect } from 'react'

interface Medication {
  id: number
  user_id: string
  medication_name: string
  dosage?: string
  dosage_unit?: string
  frequency?: string
  time_of_day?: string[]
  started_date?: string
  ended_date?: string
  active: boolean
  prescribed_for?: string
  prescriber_name?: string
  pharmacy?: string
  notes?: string
  side_effects?: string
  created_at: string
  updated_at: string
}

interface MedicationLog {
  id: number
  medication_id: number
  user_id: string
  taken_at: string
  dosage_taken?: string
  taken: boolean
  notes?: string
  side_effects_experienced?: string
  mood_before?: number
  mood_after?: number
  created_at: string
  medication_name?: string
  dosage?: string
}

interface CreateMedicationData {
  medication_name: string
  dosage?: string
  dosage_unit?: string
  frequency?: string
  time_of_day?: string[]
  started_date?: string
  active?: boolean
  prescribed_for?: string
  prescriber_name?: string
  pharmacy?: string
  notes?: string
  side_effects?: string
}

interface CreateMedicationLogData {
  medication_id: number
  taken_at?: string
  dosage_taken?: string
  taken?: boolean
  notes?: string
  side_effects_experienced?: string
  mood_before?: number
  mood_after?: number
}

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [logs, setLogs] = useState<MedicationLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchMedications()
    fetchLogs()
  }, [])

  const fetchMedications = async (activeOnly = true) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/medications?activeOnly=${activeOnly}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch medications')
      }
      
      const data = await response.json()
      setMedications(data.medications || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load medications')
      console.error('Fetch medications error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchLogs = async (medicationId?: number, limit = 50) => {
    try {
      let url = `/api/medications/logs?limit=${limit}`
      if (medicationId) url += `&medicationId=${medicationId}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch medication logs')
      }
      
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load logs')
      console.error('Fetch medication logs error:', err)
    }
  }

  const createMedication = async (medData: CreateMedicationData): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      const response = await fetch('/api/medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add medication')
      }
      
      const data = await response.json()
      setMedications(prev => [data.medication, ...prev])
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add medication')
      console.error('Create medication error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }

  const logMedication = async (logData: CreateMedicationLogData): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      const response = await fetch('/api/medications/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to log medication')
      }
      
      const data = await response.json()
      setLogs(prev => [data.log, ...prev])
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log medication')
      console.error('Log medication error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateMedication = async (id: number, updates: Partial<CreateMedicationData>): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      const response = await fetch('/api/medications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update medication')
      }
      
      const data = await response.json()
      setMedications(prev => prev.map(med => med.id === id ? data.medication : med))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update medication')
      console.error('Update medication error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }

  const deleteMedication = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/medications?id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete medication')
      }
      
      setMedications(prev => prev.filter(med => med.id !== id))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete medication')
      console.error('Delete medication error:', err)
      return false
    }
  }

  return {
    medications,
    logs,
    loading,
    error,
    saving,
    createMedication,
    logMedication,
    updateMedication,
    deleteMedication,
    refetchMedications: fetchMedications,
    refetchLogs: fetchLogs
  }
}