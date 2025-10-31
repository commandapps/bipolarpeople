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
