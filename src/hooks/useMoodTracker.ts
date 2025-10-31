import { useState, useEffect } from 'react'

interface MoodEntry {
  id: number
  user_id: string
  mood_score: number
  energy_level?: number
  anxiety_level?: number
  irritability_level?: number
  sleep_hours?: number
  sleep_quality?: number
  sleep_notes?: string
  activities?: string[]
  symptoms?: string[]
  notes?: string
  tags?: string[]
  entry_date: string
  entry_time?: string
  created_at: string
  updated_at: string
}

interface CreateMoodEntryData {
  mood_score: number
  energy_level?: number
  anxiety_level?: number
  irritability_level?: number
  sleep_hours?: number
  sleep_quality?: number
  sleep_notes?: string
  activities?: string[]
  symptoms?: string[]
  notes?: string
  tags?: string[]
  entry_date: string
  entry_time?: string
}

export function useMoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async (limit = 30) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/mood?limit=${limit}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch mood entries')
      }
      
      const data = await response.json()
      setEntries(data.entries || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load entries')
      console.error('Fetch mood entries error:', err)
    } finally {
      setLoading(false)
    }
  }

  const createEntry = async (entryData: CreateMoodEntryData): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save mood entry')
      }
      
      const data = await response.json()
      
      // Add new entry to the beginning of the list
      setEntries(prev => [data.entry, ...prev])
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save entry')
      console.error('Create mood entry error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }

  const deleteEntry = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/mood?id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete mood entry')
      }
      
      // Remove entry from local state
      setEntries(prev => prev.filter(entry => entry.id !== id))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete entry')
      console.error('Delete mood entry error:', err)
      return false
    }
  }

  return {
    entries,
    loading,
    error,
    saving,
    createEntry,
    deleteEntry,
    refetch: fetchEntries
  }
}