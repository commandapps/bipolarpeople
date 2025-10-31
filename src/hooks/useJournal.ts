import { useState, useEffect } from 'react'

interface JournalEntry {
  id: number
  user_id: string
  title?: string
  content: string
  mood_at_time?: string
  mood_score?: number
  location?: string
  weather?: string
  tags?: string[]
  category: string
  is_private: boolean
  is_favorite: boolean
  episode_type?: string
  episode_severity?: number
  entry_date: string
  entry_time?: string
  created_at: string
  updated_at: string
}

interface CreateJournalEntryData {
  title?: string
  content: string
  mood_at_time?: string
  mood_score?: number
  location?: string
  weather?: string
  tags?: string[]
  category?: string
  is_private?: boolean
  is_favorite?: boolean
  episode_type?: string
  episode_severity?: number
  entry_date: string
  entry_time?: string
}

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async (limit = 20, category?: string) => {
    try {
      setLoading(true)
      setError(null)
      
      let url = `/api/journal?limit=${limit}`
      if (category) url += `&category=${category}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch journal entries')
      }
      
      const data = await response.json()
      setEntries(data.entries || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load entries')
      console.error('Fetch journal entries error:', err)
    } finally {
      setLoading(false)
    }
  }

  const createEntry = async (entryData: CreateJournalEntryData): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save journal entry')
      }
      
      const data = await response.json()
      setEntries(prev => [data.entry, ...prev])
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save entry')
      console.error('Create journal entry error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateEntry = async (id: number, updates: Partial<CreateJournalEntryData>): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      const response = await fetch('/api/journal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update journal entry')
      }
      
      const data = await response.json()
      setEntries(prev => prev.map(entry => entry.id === id ? data.entry : entry))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update entry')
      console.error('Update journal entry error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }

  const deleteEntry = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/journal?id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete journal entry')
      }
      
      setEntries(prev => prev.filter(entry => entry.id !== id))
      
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete entry')
      console.error('Delete journal entry error:', err)
      return false
    }
  }

  return {
    entries,
    loading,
    error,
    saving,
    createEntry,
    updateEntry,
    deleteEntry,
    refetch: fetchEntries
  }
}