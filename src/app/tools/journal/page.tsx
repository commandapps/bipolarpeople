'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  PencilSquareIcon, 
  TrashIcon, 
  BookmarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'

interface JournalEntry {
  id: number
  title: string | null
  content: string
  mood_at_time: string | null
  mood_score: number | null
  location: string | null
  weather: string | null
  tags: string[]
  category: string
  is_private: boolean
  is_favorite: boolean
  episode_type: string | null
  episode_severity: number | null
  entry_date: string
  entry_time: string
  created_at: string
  updated_at: string
}

interface FormData {
  title: string
  content: string
  mood_at_time: string
  mood_score: number | null
  location: string
  weather: string
  tags: string[]
  category: string
  is_private: boolean
  is_favorite: boolean
  episode_type: string
  episode_severity: number | null
  entry_date: string
}

export default function JournalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterTag, setFilterTag] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    mood_at_time: '',
    mood_score: null,
    location: '',
    weather: '',
    tags: [],
    category: 'daily',
    is_private: true,
    is_favorite: false,
    episode_type: '',
    episode_severity: null,
    entry_date: new Date().toISOString().split('T')[0]
  })
  
  // Tag input
  const [tagInput, setTagInput] = useState('')

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Fetch entries on mount
  useEffect(() => {
    if (session) {
      fetchEntries()
    }
  }, [session])

  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (filterCategory !== 'all') params.append('category', filterCategory)
      if (filterTag !== 'all') params.append('tag', filterTag)
      
      const response = await fetch(`/api/journal?${params.toString()}`, {
        credentials: 'include' // Include cookies in the request
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch journal entries')
      }
      
      const data = await response.json()
      setEntries(data.entries || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching entries:', err)
    } finally {
      setLoading(false)
    }
  }

  // Save journal entry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.content.trim()) {
      setError('Please write something in your journal')
      return
    }
    
    try {
      setSaving(true)
      setError(null)
      
      const endpoint = isEditing && editingId 
        ? `/api/journal?id=${editingId}` 
        : '/api/journal'
      
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.message || errorData.error || 'Failed to save journal entry'
        const errorDetail = errorData.detail ? ` (${errorData.detail})` : ''
        throw new Error(`${errorMessage}${errorDetail}`)
      }
      
      const data = await response.json()
      
      // Update entries list
      if (isEditing && editingId) {
        setEntries(entries.map(entry => 
          entry.id === editingId ? data.entry : entry
        ))
      } else {
        setEntries([data.entry, ...entries])
      }
      
      // Reset form
      resetForm()
      setShowForm(false)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save entry')
      console.error('Error saving entry:', err)
    } finally {
      setSaving(false)
    }
  }

  // Delete entry
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this journal entry?')) {
      return
    }
    
    try {
      const response = await fetch(`/api/journal?id=${id}`, {
        method: 'DELETE',
        credentials: 'include' // Include cookies in the request
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete entry')
      }
      
      setEntries(entries.filter(entry => entry.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete entry')
      console.error('Error deleting entry:', err)
    }
  }

  // Edit entry
  const handleEdit = (entry: JournalEntry) => {
    setFormData({
      title: entry.title || '',
      content: entry.content,
      mood_at_time: entry.mood_at_time || '',
      mood_score: entry.mood_score,
      location: entry.location || '',
      weather: entry.weather || '',
      tags: entry.tags || [],
      category: entry.category,
      is_private: entry.is_private,
      is_favorite: entry.is_favorite,
      episode_type: entry.episode_type || '',
      episode_severity: entry.episode_severity,
      entry_date: entry.entry_date
    })
    setIsEditing(true)
    setEditingId(entry.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Toggle favorite
  const toggleFavorite = async (entry: JournalEntry) => {
    try {
      const response = await fetch(`/api/journal?id=${entry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_favorite: !entry.is_favorite
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update favorite status')
      }
      
      const data = await response.json()
      setEntries(entries.map(e => e.id === entry.id ? data.entry : e))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update favorite')
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      mood_at_time: '',
      mood_score: null,
      location: '',
      weather: '',
      tags: [],
      category: 'daily',
      is_private: true,
      is_favorite: false,
      episode_type: '',
      episode_severity: null,
      entry_date: new Date().toISOString().split('T')[0]
    })
    setIsEditing(false)
    setEditingId(null)
    setTagInput('')
  }

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  // Remove tag
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  // Filter entries
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesSearch
  })

  // Get all unique tags
  const allTags = Array.from(
    new Set(entries.flatMap(entry => entry.tags || []))
  )

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading journal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Journal</h1>
              <p className="mt-1 text-gray-600">
                A safe space to record your thoughts and feelings
              </p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowForm(!showForm)
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              {showForm ? (
                <>
                  <XMarkIcon className="h-5 w-5" />
                  Cancel
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5" />
                  New Entry
                </>
              )}
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search journal entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value)
                    fetchEntries()
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  <option value="daily">Daily</option>
                  <option value="episode">Episode</option>
                  <option value="gratitude">Gratitude</option>
                  <option value="therapy">Therapy Notes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag
                </label>
                <select
                  value={filterTag}
                  onChange={(e) => {
                    setFilterTag(e.target.value)
                    fetchEntries()
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Journal Entry Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isEditing ? 'Edit Entry' : 'New Journal Entry'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.entry_date}
                  onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Give your entry a title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's on your mind? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your thoughts here..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.content.length} characters
                </p>
              </div>

              {/* Mood at Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How were you feeling?
                  </label>
                  <select
                    value={formData.mood_at_time}
                    onChange={(e) => setFormData({ ...formData, mood_at_time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select mood...</option>
                    <option value="great">Great</option>
                    <option value="good">Good</option>
                    <option value="okay">Okay</option>
                    <option value="low">Low</option>
                    <option value="depressed">Depressed</option>
                    <option value="anxious">Anxious</option>
                    <option value="irritable">Irritable</option>
                    <option value="elevated">Elevated</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mood Score (-5 to +5)
                  </label>
                  <input
                    type="number"
                    min="-5"
                    max="5"
                    value={formData.mood_score || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      mood_score: e.target.value ? parseInt(e.target.value) : null 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="daily">Daily Entry</option>
                  <option value="episode">Episode Documentation</option>
                  <option value="gratitude">Gratitude</option>
                  <option value="therapy">Therapy Notes</option>
                  <option value="reflection">Reflection</option>
                </select>
              </div>

              {/* Episode Information (conditional) */}
              {formData.category === 'episode' && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-amber-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Episode Type
                    </label>
                    <select
                      value={formData.episode_type}
                      onChange={(e) => setFormData({ ...formData, episode_type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select type...</option>
                      <option value="manic">Manic</option>
                      <option value="hypomanic">Hypomanic</option>
                      <option value="depressive">Depressive</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Severity (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.episode_severity || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        episode_severity: e.target.value ? parseInt(e.target.value) : null 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              {/* Location & Weather */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Where are you?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weather
                  </label>
                  <input
                    type="text"
                    value={formData.weather}
                    onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                    placeholder="What's the weather like?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    placeholder="Add tags..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-purple-900"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Privacy Options */}
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_private}
                    onChange={(e) => setFormData({ ...formData, is_private: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Keep this entry private
                  </span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_favorite}
                    onChange={(e) => setFormData({ ...formData, is_favorite: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Mark as favorite
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : (isEditing ? 'Update Entry' : 'Save Entry')}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      resetForm()
                      setShowForm(false)
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Journal Entries List */}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm || filterCategory !== 'all' || filterTag !== 'all'
                  ? 'No entries match your filters'
                  : 'No journal entries yet. Start writing!'}
              </p>
            </div>
          ) : (
            filteredEntries.map(entry => (
              <div
                key={entry.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    {entry.title && (
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {entry.title}
                      </h3>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{new Date(entry.entry_date).toLocaleDateString()}</span>
                      {entry.mood_at_time && (
                        <span className="capitalize">• {entry.mood_at_time}</span>
                      )}
                      {entry.mood_score !== null && (
                        <span>• Mood: {entry.mood_score > 0 ? '+' : ''}{entry.mood_score}</span>
                      )}
                      {entry.location && (
                        <span>• 📍 {entry.location}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(entry)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title={entry.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {entry.is_favorite ? (
                        <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <BookmarkIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit entry"
                    >
                      <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete entry"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Category & Episode Info */}
                <div className="flex gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    {entry.category}
                  </span>
                  {entry.episode_type && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      {entry.episode_type}
                      {entry.episode_severity && ` (${entry.episode_severity}/10)`}
                    </span>
                  )}
                  {entry.is_private && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      Private
                    </span>
                  )}
                </div>

                {/* Content */}
                <p className="text-gray-700 whitespace-pre-wrap mb-3">
                  {entry.content.length > 300 
                    ? `${entry.content.substring(0, 300)}...` 
                    : entry.content}
                </p>

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {entry.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Weather */}
                {entry.weather && (
                  <p className="text-sm text-gray-500 mt-2">
                    Weather: {entry.weather}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Empty State CTA */}
        {entries.length === 0 && !showForm && (
          <div className="text-center py-12">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Write Your First Entry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
