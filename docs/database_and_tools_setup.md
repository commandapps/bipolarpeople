# Database Schema & Tools Implementation Guide
**For: bipolarpeople.com**  
**Priority #2: Make Tools Functional**

---

## OVERVIEW

Your tracking tools (mood tracker, journal, medication, episode planner) are currently front-end only. This guide will make them save data to your Neon database.

**Timeline: 6-8 hours spread over 2-3 days**

---

## PART 1: DATABASE SCHEMA

### Create Schema File

Create: `/src/lib/schema.sql`

```sql
-- Users table (extended from NextAuth)
-- NextAuth already creates users, but we'll add some fields

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS username VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS display_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS timezone VARCHAR(50) DEFAULT 'America/New_York',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

-- Mood Tracking
CREATE TABLE IF NOT EXISTS mood_entries (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Core mood data
  mood_score INTEGER CHECK (mood_score BETWEEN -5 AND 5),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  anxiety_level INTEGER CHECK (anxiety_level BETWEEN 1 AND 10),
  irritability_level INTEGER CHECK (irritability_level BETWEEN 1 AND 10),
  
  -- Sleep data
  sleep_hours DECIMAL(3,1),
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
  sleep_notes TEXT,
  
  -- Activities
  activities TEXT[], -- Array of activity strings
  
  -- Symptoms
  symptoms TEXT[], -- Array of symptom strings
  
  -- Notes
  notes TEXT,
  tags TEXT[],
  
  -- Timestamps
  entry_date DATE NOT NULL,
  entry_time TIME DEFAULT CURRENT_TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_mood_user_date ON mood_entries(user_id, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_mood_created ON mood_entries(created_at DESC);

-- Medication Tracking
CREATE TABLE IF NOT EXISTS medications (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Medication details
  medication_name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  dosage_unit VARCHAR(20), -- mg, ml, etc
  frequency VARCHAR(100), -- "twice daily", "as needed", etc
  time_of_day TEXT[], -- ["morning", "evening"]
  
  -- Tracking
  started_date DATE,
  ended_date DATE,
  active BOOLEAN DEFAULT true,
  
  -- Purpose & notes
  prescribed_for TEXT,
  prescriber_name VARCHAR(255),
  pharmacy VARCHAR(255),
  notes TEXT,
  side_effects TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_medication_user ON medications(user_id, active DESC);

CREATE TABLE IF NOT EXISTS medication_logs (
  id SERIAL PRIMARY KEY,
  medication_id INTEGER NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  
  -- Log details
  taken_at TIMESTAMP NOT NULL,
  dosage_taken VARCHAR(100),
  taken BOOLEAN DEFAULT true, -- false if missed
  
  -- Context
  notes TEXT,
  side_effects_experienced TEXT,
  mood_before INTEGER CHECK (mood_before BETWEEN -5 AND 5),
  mood_after INTEGER CHECK (mood_after BETWEEN -5 AND 5),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT fk_medication FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_med_log_user ON medication_logs(user_id, taken_at DESC);
CREATE INDEX IF NOT EXISTS idx_med_log_medication ON medication_logs(medication_id, taken_at DESC);

-- Journal Entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Content
  title VARCHAR(255),
  content TEXT NOT NULL,
  
  -- Context
  mood_at_time VARCHAR(50),
  mood_score INTEGER CHECK (mood_score BETWEEN -5 AND 5),
  location VARCHAR(100),
  weather VARCHAR(50),
  
  -- Organization
  tags TEXT[],
  category VARCHAR(50), -- "daily", "episode", "gratitude", etc
  
  -- Privacy
  is_private BOOLEAN DEFAULT true,
  is_favorite BOOLEAN DEFAULT false,
  
  -- Episode tracking
  episode_type VARCHAR(20), -- "manic", "depressive", "mixed", "stable"
  episode_severity INTEGER CHECK (episode_severity BETWEEN 1 AND 10),
  
  -- Timestamps
  entry_date DATE NOT NULL,
  entry_time TIME DEFAULT CURRENT_TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_journal_user_date ON journal_entries(user_id, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_journal_category ON journal_entries(user_id, category);
CREATE INDEX IF NOT EXISTS idx_journal_favorite ON journal_entries(user_id, is_favorite) WHERE is_favorite = true;

-- Episode Plans
CREATE TABLE IF NOT EXISTS episode_plans (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Plan type
  episode_type VARCHAR(20) CHECK (episode_type IN ('manic', 'depressive', 'mixed', 'maintenance')),
  plan_name VARCHAR(255) NOT NULL,
  
  -- Warning signs
  warning_signs TEXT[],
  triggers TEXT[],
  
  -- Coping strategies
  coping_strategies TEXT[],
  helpful_activities TEXT[],
  things_to_avoid TEXT[],
  
  -- Support
  emergency_contacts JSONB, -- [{ name, relationship, phone, email }]
  support_people TEXT[],
  therapy_plan TEXT,
  
  -- Medical
  medication_plan TEXT,
  current_medications TEXT[],
  emergency_medications TEXT,
  
  -- Professional help
  therapist_name VARCHAR(255),
  therapist_phone VARCHAR(20),
  psychiatrist_name VARCHAR(255),
  psychiatrist_phone VARCHAR(20),
  hospital_preference VARCHAR(255),
  
  -- Notes
  additional_notes TEXT,
  last_reviewed_date DATE,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_episode_plan_user ON episode_plans(user_id, is_active DESC);
CREATE INDEX IF NOT EXISTS idx_episode_plan_type ON episode_plans(user_id, episode_type);

-- Episode Timeline (for tracking actual episodes)
CREATE TABLE IF NOT EXISTS episode_timeline (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Episode details
  episode_type VARCHAR(20) CHECK (episode_type IN ('manic', 'hypomanic', 'depressive', 'mixed')),
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  
  -- Duration
  started_date DATE NOT NULL,
  ended_date DATE,
  is_ongoing BOOLEAN DEFAULT true,
  
  -- Description
  description TEXT,
  symptoms_experienced TEXT[],
  triggers_identified TEXT[],
  
  -- Impact
  impact_on_work TEXT,
  impact_on_relationships TEXT,
  impact_on_self_care TEXT,
  hospitalization_required BOOLEAN DEFAULT false,
  
  -- Treatment during episode
  medications_during TEXT[],
  therapy_sessions INTEGER,
  coping_strategies_used TEXT[],
  what_helped TEXT,
  what_didnt_help TEXT,
  
  -- Recovery
  recovery_notes TEXT,
  lessons_learned TEXT,
  
  -- Linked plan
  episode_plan_id INTEGER REFERENCES episode_plans(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_episode_timeline_user ON episode_timeline(user_id, started_date DESC);
CREATE INDEX IF NOT EXISTS idx_episode_timeline_type ON episode_timeline(user_id, episode_type);
CREATE INDEX IF NOT EXISTS idx_episode_timeline_ongoing ON episode_timeline(user_id) WHERE is_ongoing = true;

-- User Settings/Preferences
CREATE TABLE IF NOT EXISTS user_settings (
  user_id VARCHAR(255) PRIMARY KEY,
  
  -- Tracking preferences
  mood_tracking_frequency VARCHAR(20) DEFAULT 'daily', -- "daily", "multiple", "as-needed"
  reminder_times TIME[],
  enable_reminders BOOLEAN DEFAULT true,
  
  -- Display preferences
  theme VARCHAR(20) DEFAULT 'light', -- "light", "dark", "auto"
  timezone VARCHAR(50) DEFAULT 'America/New_York',
  
  -- Privacy
  share_anonymous_data BOOLEAN DEFAULT false,
  profile_visibility VARCHAR(20) DEFAULT 'private', -- "private", "public", "friends"
  
  -- Notifications
  email_reminders BOOLEAN DEFAULT true,
  email_digest BOOLEAN DEFAULT false,
  digest_frequency VARCHAR(20) DEFAULT 'weekly',
  
  -- Data
  data_retention_days INTEGER DEFAULT 0, -- 0 = keep forever
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mood_entries_updated_at BEFORE UPDATE ON mood_entries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON medications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_episode_plans_updated_at BEFORE UPDATE ON episode_plans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_episode_timeline_updated_at BEFORE UPDATE ON episode_timeline
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Run the Schema

**Option A: Via Neon Dashboard**

1. Go to your Neon dashboard
2. Select your database
3. Click "SQL Editor"
4. Paste the schema above
5. Click "Run"

**Option B: Via Command Line**

```bash
# Install psql if you don't have it
brew install postgresql  # Mac
apt-get install postgresql-client  # Linux

# Get your Neon connection string from Vercel/Neon dashboard
# It looks like: postgresql://user:pass@host/database

# Run schema:
psql "your-connection-string-here" < src/lib/schema.sql
```

**Option C: Via Migration Script**

Create `/scripts/migrate.ts`:

```typescript
import { sql } from '@vercel/postgres'
import fs from 'fs'
import path from 'path'

async function runMigration() {
  try {
    const schemaPath = path.join(process.cwd(), 'src/lib/schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    
    console.log('Running migration...')
    await sql.query(schema)
    console.log('✅ Migration complete!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
```

Then run:
```bash
npx tsx scripts/migrate.ts
```

---

## PART 2: CREATE API ENDPOINTS

### 2.1: Mood Tracker API

Create `/src/app/api/mood/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch mood entries
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '30')

    let query = `
      SELECT * FROM mood_entries 
      WHERE user_id = $1
    `
    const params: any[] = [session.user.id]

    if (startDate) {
      params.push(startDate)
      query += ` AND entry_date >= $${params.length}`
    }

    if (endDate) {
      params.push(endDate)
      query += ` AND entry_date <= $${params.length}`
    }

    query += ` ORDER BY entry_date DESC, entry_time DESC LIMIT $${params.length + 1}`
    params.push(limit)

    const { rows } = await sql.query(query, params)

    return NextResponse.json({ entries: rows })

  } catch (error) {
    console.error('Mood fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mood entries' },
      { status: 500 }
    )
  }
}

// POST - Create mood entry
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate required fields
    if (body.mood_score === undefined || body.entry_date === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: mood_score, entry_date' },
        { status: 400 }
      )
    }

    // Validate ranges
    if (body.mood_score < -5 || body.mood_score > 5) {
      return NextResponse.json(
        { error: 'mood_score must be between -5 and 5' },
        { status: 400 }
      )
    }

    const result = await sql.query(
      `INSERT INTO mood_entries (
        user_id, mood_score, energy_level, anxiety_level, irritability_level,
        sleep_hours, sleep_quality, sleep_notes, activities, symptoms,
        notes, tags, entry_date, entry_time
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        session.user.id,
        body.mood_score,
        body.energy_level || null,
        body.anxiety_level || null,
        body.irritability_level || null,
        body.sleep_hours || null,
        body.sleep_quality || null,
        body.sleep_notes || null,
        body.activities || [],
        body.symptoms || [],
        body.notes || null,
        body.tags || [],
        body.entry_date,
        body.entry_time || new Date().toTimeString().split(' ')[0]
      ]
    )

    return NextResponse.json(
      { entry: result.rows[0], message: 'Mood entry created' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Mood creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create mood entry' },
      { status: 500 }
    )
  }
}

// PUT - Update mood entry
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing entry id' }, { status: 400 })
    }

    // Build update query dynamically
    const updateFields: string[] = []
    const values: any[] = [session.user.id, id]
    let paramIndex = 3

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = $${paramIndex}`)
        values.push(value)
        paramIndex++
      }
    })

    if (updateFields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const result = await sql.query(
      `UPDATE mood_entries 
       SET ${updateFields.join(', ')}
       WHERE user_id = $1 AND id = $2
       RETURNING *`,
      values
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }

    return NextResponse.json({ entry: result.rows[0], message: 'Entry updated' })

  } catch (error) {
    console.error('Mood update error:', error)
    return NextResponse.json(
      { error: 'Failed to update mood entry' },
      { status: 500 }
    )
  }
}

// DELETE - Delete mood entry
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing entry id' }, { status: 400 })
    }

    const result = await sql.query(
      'DELETE FROM mood_entries WHERE user_id = $1 AND id = $2',
      [session.user.id, id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Entry deleted' })

  } catch (error) {
    console.error('Mood deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete mood entry' },
      { status: 500 }
    )
  }
}
```

### 2.2: Journal API

Create `/src/app/api/journal/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch journal entries
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = 'SELECT * FROM journal_entries WHERE user_id = $1'
    const params: any[] = [session.user.id]

    if (category) {
      params.push(category)
      query += ` AND category = $${params.length}`
    }

    if (tag) {
      params.push(tag)
      query += ` AND $${params.length} = ANY(tags)`
    }

    query += ` ORDER BY entry_date DESC, entry_time DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const { rows } = await sql.query(query, params)

    return NextResponse.json({ entries: rows })

  } catch (error) {
    console.error('Journal fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch journal entries' }, { status: 500 })
  }
}

// POST - Create journal entry
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body.content || !body.entry_date) {
      return NextResponse.json(
        { error: 'Missing required fields: content, entry_date' },
        { status: 400 }
      )
    }

    const result = await sql.query(
      `INSERT INTO journal_entries (
        user_id, title, content, mood_at_time, mood_score, location, weather,
        tags, category, is_private, is_favorite, episode_type, episode_severity,
        entry_date, entry_time
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        session.user.id,
        body.title || null,
        body.content,
        body.mood_at_time || null,
        body.mood_score || null,
        body.location || null,
        body.weather || null,
        body.tags || [],
        body.category || 'daily',
        body.is_private ?? true,
        body.is_favorite || false,
        body.episode_type || null,
        body.episode_severity || null,
        body.entry_date,
        body.entry_time || new Date().toTimeString().split(' ')[0]
      ]
    )

    return NextResponse.json(
      { entry: result.rows[0], message: 'Journal entry created' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Journal creation error:', error)
    return NextResponse.json({ error: 'Failed to create journal entry' }, { status: 500 })
  }
}

// ... (Add PUT and DELETE similar to mood API)
```

### 2.3: Medication API

Create `/src/app/api/medications/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch medications
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('activeOnly') === 'true'

    let query = 'SELECT * FROM medications WHERE user_id = $1'
    if (activeOnly) {
      query += ' AND active = true'
    }
    query += ' ORDER BY created_at DESC'

    const { rows } = await sql.query(query, [session.user.id])

    return NextResponse.json({ medications: rows })

  } catch (error) {
    console.error('Medication fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch medications' }, { status: 500 })
  }
}

// POST - Add medication
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body.medication_name) {
      return NextResponse.json(
        { error: 'Missing required field: medication_name' },
        { status: 400 }
      )
    }

    const result = await sql.query(
      `INSERT INTO medications (
        user_id, medication_name, dosage, dosage_unit, frequency, time_of_day,
        started_date, active, prescribed_for, prescriber_name, pharmacy, notes, side_effects
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        session.user.id,
        body.medication_name,
        body.dosage || null,
        body.dosage_unit || null,
        body.frequency || null,
        body.time_of_day || [],
        body.started_date || new Date().toISOString().split('T')[0],
        body.active ?? true,
        body.prescribed_for || null,
        body.prescriber_name || null,
        body.pharmacy || null,
        body.notes || null,
        body.side_effects || null
      ]
    )

    return NextResponse.json(
      { medication: result.rows[0], message: 'Medication added' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Medication creation error:', error)
    return NextResponse.json({ error: 'Failed to add medication' }, { status: 500 })
  }
}
```

### 2.4: Medication Logs API

Create `/src/app/api/medications/logs/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// POST - Log medication taken
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body.medication_id) {
      return NextResponse.json(
        { error: 'Missing required field: medication_id' },
        { status: 400 }
      )
    }

    const result = await sql.query(
      `INSERT INTO medication_logs (
        medication_id, user_id, taken_at, dosage_taken, taken,
        notes, side_effects_experienced, mood_before, mood_after
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        body.medication_id,
        session.user.id,
        body.taken_at || new Date().toISOString(),
        body.dosage_taken || null,
        body.taken ?? true,
        body.notes || null,
        body.side_effects_experienced || null,
        body.mood_before || null,
        body.mood_after || null
      ]
    )

    return NextResponse.json(
      { log: result.rows[0], message: 'Medication logged' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Medication log error:', error)
    return NextResponse.json({ error: 'Failed to log medication' }, { status: 500 })
  }
}

// GET - Fetch medication logs
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const medicationId = searchParams.get('medicationId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = `
      SELECT ml.*, m.medication_name, m.dosage 
      FROM medication_logs ml
      JOIN medications m ON ml.medication_id = m.id
      WHERE ml.user_id = $1
    `
    const params: any[] = [session.user.id]

    if (medicationId) {
      params.push(medicationId)
      query += ` AND ml.medication_id = $${params.length}`
    }

    if (startDate) {
      params.push(startDate)
      query += ` AND DATE(ml.taken_at) >= $${params.length}`
    }

    if (endDate) {
      params.push(endDate)
      query += ` AND DATE(ml.taken_at) <= $${params.length}`
    }

    query += ` ORDER BY ml.taken_at DESC LIMIT $${params.length + 1}`
    params.push(limit)

    const { rows } = await sql.query(query, params)

    return NextResponse.json({ logs: rows })

  } catch (error) {
    console.error('Medication logs fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch medication logs' }, { status: 500 })
  }
}
```

### 2.5: Episode Planner API

Create `/src/app/api/episodes/plans/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch episode plans
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const episodeType = searchParams.get('type')
    const activeOnly = searchParams.get('activeOnly') === 'true'

    let query = 'SELECT * FROM episode_plans WHERE user_id = $1'
    const params: any[] = [session.user.id]

    if (episodeType) {
      params.push(episodeType)
      query += ` AND episode_type = $${params.length}`
    }

    if (activeOnly) {
      query += ' AND is_active = true'
    }

    query += ' ORDER BY created_at DESC'

    const { rows } = await sql.query(query, params)

    return NextResponse.json({ plans: rows })

  } catch (error) {
    console.error('Episode plans fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch episode plans' }, { status: 500 })
  }
}

// POST - Create episode plan
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body.episode_type || !body.plan_name) {
      return NextResponse.json(
        { error: 'Missing required fields: episode_type, plan_name' },
        { status: 400 }
      )
    }

    const result = await sql.query(
      `INSERT INTO episode_plans (
        user_id, episode_type, plan_name, warning_signs, triggers,
        coping_strategies, helpful_activities, things_to_avoid,
        emergency_contacts, support_people, therapy_plan, medication_plan,
        current_medications, emergency_medications, therapist_name, therapist_phone,
        psychiatrist_name, psychiatrist_phone, hospital_preference,
        additional_notes, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *`,
      [
        session.user.id,
        body.episode_type,
        body.plan_name,
        body.warning_signs || [],
        body.triggers || [],
        body.coping_strategies || [],
        body.helpful_activities || [],
        body.things_to_avoid || [],
        body.emergency_contacts || [],
        body.support_people || [],
        body.therapy_plan || null,
        body.medication_plan || null,
        body.current_medications || [],
        body.emergency_medications || null,
        body.therapist_name || null,
        body.therapist_phone || null,
        body.psychiatrist_name || null,
        body.psychiatrist_phone || null,
        body.hospital_preference || null,
        body.additional_notes || null,
        body.is_active ?? true
      ]
    )

    return NextResponse.json(
      { plan: result.rows[0], message: 'Episode plan created' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Episode plan creation error:', error)
    return NextResponse.json({ error: 'Failed to create episode plan' }, { status: 500 })
  }
}
```

---

## PART 3: UPDATE FRONT-END TO USE APIS

I'll continue with implementation guides in the next document. This covers:
- Database schema ✅
- API endpoints ✅

Next up:
- Connect front-end to APIs
- Add loading states
- Add error handling
- Test everything

**Should I continue with Part 3 (updating the front-end components)?**

